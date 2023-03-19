import React from "react";
import { Metric, State } from "./types";

const initialState = {
  metrics: [],
  updateMetrics: () => {},
  total: 0,
  updateTotal: () => {},
  averages: {
    perHour: 0,
    perMinute: 0,
    perDay: 0,
  },
  updateAverages: () => {},
};

const AppContext = React.createContext<State>(initialState);

const AppProvider = ({ children }: { children: any }) => {
  const [metrics, updateMetrics] = React.useState<Metric[]>([]);
  const [total, updateTotal] = React.useState(0);
  const [averages, updateAverages] = React.useState(initialState.averages);

  return (
    <AppContext.Provider
      value={{
        metrics,
        total,
        updateTotal,
        updateMetrics,
        averages,
        updateAverages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
