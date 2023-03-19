/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../../../constants";
import { data } from "../../../testData";
import Timeline from "../Timeline";

const chronoItems = data.metrics.map(({ name, value, timestamp }) => ({
  title: `${dayjs((timestamp as number) * 1000).format(DEFAULT_DATE_FORMAT)}`,
  cardTitle: `Metric name: ${name}`,
  cardSubtitle: `Measurement value: ${value}`,
}));

describe("Timeline container", () => {
  const defaultProps = {
    total: 100,
    onPaginate: () => {},
    items: chronoItems,
  };

  it("Should show given items in the timeline", () => {
    render(<Timeline {...defaultProps} />);
    const timelineItems = screen.getAllByTestId("timeline-item");
    expect(timelineItems).toHaveLength(17);
  });

  it.skip("Should call `onPaginate` providing new page number when last item is reached", async () => {
    const paginate = jest.fn();
    render(<Timeline {...defaultProps} items={[]} onPaginate={paginate} />);
    const goToLast = screen.getByTitle("Go to Last");
    fireEvent.click(goToLast);
    await waitFor(() => {
      expect(paginate).toHaveBeenCalled();
    });
  });
});
