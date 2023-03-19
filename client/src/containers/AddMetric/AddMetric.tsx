import dayjs from "dayjs";
import React from "react";
import Button from "../../components/Button/Button";
import DateTime from "../../components/DateTime/DateTime";
import Dialog from "../../components/Dialog/Dialog";
import { MaxWidth } from "../../components/FormGroup/FormGroup";
import Input, { InputType } from "../../components/Input/Input";
import { NewMetric } from "../../types";
import * as S from "./styles";

interface AddMetricProps {
  onClose?: () => void;
  onSubmitMetric: (metric: NewMetric) => void;
  isLoading?: boolean;
}

enum MetricField {
  NAME = "name",
  VALUE = "value",
  TIMESTAMP = "timestamp",
}

interface NewMetricDataChangeArgs {
  field: MetricField;
  value: string | Date | number;
}

const AddMetric = ({
  onClose,
  onSubmitMetric,
  isLoading = false,
}: AddMetricProps) => {
  const [metricData, setMetricData] = React.useState<NewMetric>({
    name: "",
    value: "0",
    timestamp: dayjs().unix(),
  });

  const handleNewMetricDataChange = ({
    field,
    value,
  }: NewMetricDataChangeArgs) => {
    const newMetricData = { ...metricData, [field]: value };
    setMetricData(newMetricData);
  };

  const handleSubmitNewMetric = () => {
    onSubmitMetric(metricData);
  };

  return (
    <Dialog
      onClose={() => {
        onClose?.();
      }}
    >
      <>
        <S.Title>New metric:</S.Title>
        <S.Form>
          <Input
            label={"Name"}
            name={"name"}
            onChange={({ field, value }) =>
              handleNewMetricDataChange({ field: field as MetricField, value })
            }
            value={metricData.name}
            maxWidth={MaxWidth.l}
          />
          <Input
            label={"Value"}
            name={"value"}
            onChange={({ field, value }) =>
              handleNewMetricDataChange({ field: field as MetricField, value })
            }
            type={InputType.NUMERIC}
            max={994}
            maxWidth={MaxWidth.l}
            value={metricData.value}
          />
          <DateTime
            label={"Date:"}
            name={"date"}
            id={"date"}
            onChange={({ field, value }) =>
              handleNewMetricDataChange({ field: field as MetricField, value })
            }
            maxWidth={MaxWidth.l}
          />
        </S.Form>
        <S.Actions>
          <Button
            label="Add"
            onClick={handleSubmitNewMetric}
            isDisabled={metricData.name === "" || isLoading}
          />
        </S.Actions>
      </>
    </Dialog>
  );
};

export default AddMetric;
