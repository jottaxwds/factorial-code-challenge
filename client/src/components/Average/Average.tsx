import * as S from "./styles";

export interface AverageProps {
  title: string;
  value: number;
  displayValue: string;
}

const Average = ({ title, value, displayValue }: AverageProps) => {
  return (
    <S.AverageWrapper>
      <S.Title>{title}</S.Title>
      <S.Progress value={value} text={displayValue} />
    </S.AverageWrapper>
  );
};

export default Average;
