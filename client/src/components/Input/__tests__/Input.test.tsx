/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input, { InputType } from "../Input";

describe("Input", () => {
  describe("Text mode", () => {
    it("Should show empty value if no value is given", () => {
      render(<Input label={"example"} name={"example"} onChange={() => {}} />);
      const inputElement = screen.getByTestId("input");
      expect(inputElement.textContent).toEqual("");
    });

    it("Should show given value", () => {
      render(
        <Input
          label={"example"}
          name={"example"}
          value={"hello"}
          onChange={() => {}}
        />
      );
      const inputElement = screen.getByDisplayValue("hello");
      expect(inputElement).toBeTruthy();
    });

    it("Should call given onChange handler when value is changed", () => {
      const changeHandler = jest.fn();
      render(
        <Input label={"example"} name={"example"} onChange={changeHandler} />
      );
      const inputElement = screen.getByTestId("input");
      fireEvent.change(inputElement, { target: { value: "hi" } });
      expect(changeHandler).toBeCalledTimes(1);
      expect(changeHandler).toHaveBeenCalledWith({
        value: "hi",
        field: "example",
      });
    });
  });

  describe("Numeric mode", () => {
    it("Should show value as 0 when theres no given value", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={10}
        />
      );
      const inputElement = screen.getByTestId("input");
      expect(inputElement).toHaveValue("0");
    });

    it("Should NOT show 0 as given value if its not a valid number", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={10}
          value={"haha"}
        />
      );
      const inputElement = screen.getByTestId("input");
      expect(inputElement).toHaveDisplayValue("0");
    });

    it("Should show value as 0 when input is cleared", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={10}
          value={"9"}
        />
      );
      const inputElement = screen.getByTestId("input");
      act(() => userEvent.clear(inputElement));
      expect(inputElement).toHaveDisplayValue("0");
    });

    it("Should not allow anything diferent than a number", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={100}
          value={"9"}
        />
      );
      const inputElement = screen.getByTestId("input");
      act(() => userEvent.type(inputElement, "a"));
      expect(inputElement).toHaveDisplayValue("9");
    });

    it("Should NOT take values below it given max value", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={100}
          value={"9"}
        />
      );
      const inputElement = screen.getByTestId("input");
      act(() => userEvent.type(inputElement, "344"));
      expect(inputElement).toHaveDisplayValue("93");
    });

    it("Should take typed value without 0 first when current value is 0", () => {
      render(
        <Input
          label={"numeric"}
          name={"numeric"}
          onChange={() => {}}
          type={InputType.NUMERIC}
          max={100}
          value={"0"}
        />
      );
      const inputElement = screen.getByTestId("input");
      act(() => userEvent.type(inputElement, "3"));
      expect(inputElement).toHaveDisplayValue("3");
    });
  });
});
