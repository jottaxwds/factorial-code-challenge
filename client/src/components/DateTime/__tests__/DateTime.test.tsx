import { fireEvent, render, screen } from "@testing-library/react";
import dayjs from "dayjs";
import DateTime from "../DateTime";

describe("DateTime", () => {
  const defaultProps = {
    name: "dateTime",
    id: "dateTimeId",
    label: "Date & Time",
    onChange: () => {},
  };
  it("Should apply todays date on init", () => {
    render(<DateTime {...defaultProps} />);
    const dateTimeField = screen.getByTestId("datetime-field");
    const todaysDate = dayjs().format("MM/DD/YYYY h:mm A");
    expect(dateTimeField).toHaveValue(`${todaysDate}`);
  });

  it("Should trigger `onChange` once date is changed", () => {
    const handleChangeMock = jest.fn();
    render(<DateTime {...defaultProps} onChange={handleChangeMock} />);
    const dateTimeField = screen.getByTestId("datetime-field");
    const dateStringFormat = "2023-03-17 05:30 PM";
    const dateMomentFormat = dayjs(dateStringFormat, "YYYY-MM-DD hh:mm A");
    fireEvent.change(dateTimeField, { target: { value: dateMomentFormat } });
    expect(handleChangeMock).toHaveBeenCalledWith({
      field: "dateTime",
      value: 1679070600000,
    });
  });
});
