export type OnChange = ({
  field,
  value,
}: {
  field: string;
  value: string;
}) => void;

export type InputProps = {
  label: string;
  name: string;
  onChange: OnChange;
  value?: string;
};
