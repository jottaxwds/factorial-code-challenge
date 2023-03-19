import dayjs from "dayjs";
import React from "react";
import Button from "./components/Button/Button";
import { DEFAULT_DATE_FORMAT, DEFAULT_PAGE_SIZE } from "./constants";
import AddMetric from "./containers/AddMetric/AddMetric";
import Averages from "./containers/Averages/Averages";
import Timeline from "./containers/Timeline/Timeline";
import useMetrics from "./hooks/useMetrics";
import * as S from "./styles";
import { NewMetric } from "./types";

function App() {
  const [showAddMetrics, setShowAddMetrics] = React.useState(false);
  const { metrics, isLoading, saveMetric, getMoreMetrics, total, averages } =
    useMetrics();

  const handleOnSubmitMetric = (metric: NewMetric) => {
    saveMetric(metric);
    setShowAddMetrics(false);
  };

  const chronoItems = React.useMemo(
    () =>
      metrics.map(({ id, name, value, timestamp }) => ({
        title: `${dayjs((timestamp as number) * 1000).format(
          DEFAULT_DATE_FORMAT
        )}`,
        cardTitle: `Metric name: ${name}`,
        cardSubtitle: `Measurement value: ${value}`,
      })),
    [metrics]
  );

  const getAveragePercentage = (average: number) => (average * 100) / 1000;

  return (
    <div className="App">
      {showAddMetrics ? (
        <AddMetric
          onSubmitMetric={handleOnSubmitMetric}
          onClose={() => setShowAddMetrics(false)}
          isLoading={isLoading}
        />
      ) : (
        <></>
      )}
      <S.AppWrapper>
        <S.Actions>
          <S.Title>METRICS</S.Title>
          <Button
            label={"+ Add metric"}
            isDisabled={isLoading}
            onClick={() => setShowAddMetrics(true)}
          />
        </S.Actions>
        <S.Averages>
          <Averages
            hourly={{
              value: getAveragePercentage(averages.perHour),
              displayValue: `${Math.ceil(averages.perHour)}`,
              title: "Metric/hour",
            }}
            daily={{
              value: getAveragePercentage(averages.perDay),
              displayValue: `${Math.ceil(averages.perDay)}`,
              title: "Metric/day",
            }}
            perMin={{
              value: getAveragePercentage(averages.perMinute),
              displayValue: `${Math.ceil(averages.perMinute)}`,
              title: "Metric/min",
            }}
          />
        </S.Averages>
        <Timeline
          total={total}
          items={chronoItems}
          onPaginate={(page) => getMoreMetrics(page, DEFAULT_PAGE_SIZE)}
        />
      </S.AppWrapper>
    </div>
  );
}

export default App;
