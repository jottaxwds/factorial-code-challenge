import { render, screen } from "@testing-library/react";
import Averages from "../Averages";

describe("Averages container", () => {
  const defaultProps = {
    daily: {
      value: 80,
      displayValue: "800",
      title: "Daily average",
    },
    perMin: {
      value: 60,
      displayValue: "600",
      title: "Minutly average",
    },
    hourly: {
      value: 20,
      displayValue: "200",
      title: "Hourly average",
    },
  };

  it("Shows averages for hour, day and minute", () => {
    render(<Averages {...defaultProps} />);
    const averages = screen.getAllByTestId("average");
    expect(averages).toHaveLength(3);
  });
});
