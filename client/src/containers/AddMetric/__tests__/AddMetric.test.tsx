/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import { act } from "react-dom/test-utils";
import AddMetric from "../AddMetric";

describe("AddMetric", () => {
  const defaultProps = {
    onClose: () => {},
    onSubmitMetric: () => {},
  };
  it("Should call `onClose` when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<AddMetric {...defaultProps} onClose={onCloseMock} />);
    const closeButton = screen.queryAllByRole("button")[0];
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("Should NOT submit any metric if `Add` button is disabled and clicked", () => {
    const submitMock = jest.fn();
    render(<AddMetric {...defaultProps} onSubmitMetric={submitMock} />);
    const submitMetric = screen.getAllByRole("button")[1];
    fireEvent.click(submitMetric);
    expect(submitMetric).toBeDisabled();
    expect(submitMock).not.toHaveBeenCalled();
  });

  it("Should submit metric if data is valid and `Add` button is clicked", () => {
    const submitMock = jest.fn();
    render(<AddMetric {...defaultProps} onSubmitMetric={submitMock} />);
    const submitMetric = screen.getAllByRole("button")[1];
    const [nameInput, valueInput] = screen.getAllByTestId("input");
    const dateTimeField = screen.getByTestId("datetime-field");
    act(() => userEvent.type(nameInput, "CPU"));
    act(() => userEvent.type(valueInput, "25"));
    act(() => userEvent.click(submitMetric));
    const dateStringFormat = "2023-03-17 05:30 PM";
    const dateDayjsFormat = dayjs(dateStringFormat);
    const dateDayjsStringFormat = dateDayjsFormat.format("YYYY-MM-DD hh:mm A");
    fireEvent.change(dateTimeField, {
      target: { value: dateDayjsStringFormat },
    });
    expect(submitMock).toHaveBeenCalled();
    expect(submitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "CPU",
        value: "25",
      })
    );
  });
});
