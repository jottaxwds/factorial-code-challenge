import React from "react";
import { InputProps as CommonInputProps } from "../commonTypes";
import FormGroup, { MaxWidth } from "../FormGroup/FormGroup";
import Label from "../Label/Label";
import * as S from "./styles";

export enum InputType {
  NUMERIC = "numeric",
  TEXT = "text",
}

type InputProps = CommonInputProps & {
  value?: string;
  type?: InputType;
  max?: number;
  maxWidth?: MaxWidth;
};

const Input = ({
  value = "",
  label,
  name,
  onChange,
  type = InputType.TEXT,
  max = 995,
  maxWidth,
}: InputProps) => {
  const isTypeNumeric = React.useMemo(() => type === InputType.NUMERIC, [type]);

  const isValidNumber = React.useCallback(
    (numericValue: string) => {
      const numbersOnlyRegex = /^[0-9]*$/;
      if (numbersOnlyRegex.test(numericValue)) {
        return Number(numericValue) <= max;
      }
      return false;
    },
    [max]
  );

  const [inputValue, setInputValue] = React.useState(() => {
    if (!value) {
      return isTypeNumeric ? "0" : "";
    }
    return isTypeNumeric && !isValidNumber(value) ? "0" : value;
  });

  React.useEffect(() => {
    if (!value || value === undefined) {
      setInputValue(isTypeNumeric ? "0" : "");
      return;
    }
    if (InputType.NUMERIC && !isValidNumber(value)) {
      return;
    }
    setInputValue(value);
  }, [type, isValidNumber, value, isTypeNumeric]);

  const onChangeHandler = React.useCallback(
    ({ target: { value: newValue } }: React.ChangeEvent<HTMLInputElement>) => {
      if (isTypeNumeric && !isValidNumber(newValue)) {
        return;
      }
      if (isTypeNumeric && inputValue === "0" && newValue !== "") {
        const digits = newValue.split("");
        setInputValue(digits.length > 1 ? digits[1] : digits[0]);
        onChange({ field: name, value: newValue });
        return;
      }
      setInputValue(!newValue && isTypeNumeric ? "0" : newValue);
      onChange({ field: name, value: newValue });
    },
    [isValidNumber, isTypeNumeric, inputValue, onChange, name]
  );

  return React.useMemo(
    () => (
      <FormGroup maxWidth={maxWidth}>
        <Label value={label} htmlFor={name} />
        <S.Input
          id={name}
          value={inputValue}
          name={name}
          onChange={onChangeHandler}
          data-testid={"input"}
          {...(type === InputType.NUMERIC && {
            max,
            maxLength: `${max}`.length,
            inputMode: "numeric",
            pattern: "[0-9]*",
          })}
        />
      </FormGroup>
    ),
    [maxWidth, label, name, inputValue, onChangeHandler, type, max]
  );
};

export default Input;
