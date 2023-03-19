import * as S from "./styles";

export interface AverageProps {
  title: string;
  value: number;
  displayValue: string;
}

const Average = ({ title, value, displayValue }: AverageProps) => {
  return (
    <S.AverageWrapper data-testid={"average"}>
      <S.Title>{title}</S.Title>
      <S.Progress
        data-testid={"average-progress"}
        value={value}
        text={displayValue}
      />
    </S.AverageWrapper>
  );
};

export default Average;
