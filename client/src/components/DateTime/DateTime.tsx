import dayjs from "dayjs";
import { useState } from "react";
import FormGroup, { MaxWidth } from "../FormGroup/FormGroup";
import Label from "../Label/Label";
import * as S from "./styles";

interface DateTimeProps {
  label: string;
  name: string;
  id: string;
  onChange: ({ field, value }: { field: string; value: number }) => void;
  maxWidth?: MaxWidth;
}

function DateTime({
  name,
  id,
  label,
  onChange,
  maxWidth,
}: DateTimeProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(dayjs().toDate());

  function handleDateChange(date: any): void {
    const newDate = dayjs(date).toDate();
    setSelectedDate(newDate);
    onChange({ field: name, value: newDate.getTime() });
  }

  return (
    <FormGroup maxWidth={maxWidth}>
      <Label value={label} htmlFor={name} />
      <S.DateField
        inputProps={{ name, id, "data-testid": "datetime-field" }}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </FormGroup>
  );
}

export default DateTime;
