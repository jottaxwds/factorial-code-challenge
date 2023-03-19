import * as S from "./styles";

interface LabelProps {
  value: string;
  htmlFor?: string;
}

const Label = ({ value, htmlFor = "" }: LabelProps) => (
  <S.Label htmlFor={htmlFor}>{value}</S.Label>
);

export default Label;
