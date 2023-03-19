import Average, { AverageProps } from "../../components/Average/Average";
import * as S from "./styles";

interface AveragesProps {
  daily: AverageProps;
  hourly: AverageProps;
  perMin: AverageProps;
}

const Averages = ({ daily, hourly, perMin }: AveragesProps) => {
  return (
    <S.AveragesWrapper>
      <Average {...daily} />
      <Average {...hourly} />
      <Average {...perMin} />
    </S.AveragesWrapper>
  );
};

export default Averages;
