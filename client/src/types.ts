export interface Metric {
  id: string;
  name: string;
  value: string;
  timestamp: number | null;
}

export type NewMetric = Omit<Metric, "id">;

export interface Averages {
  perHour: number;
  perMinute: number;
  perDay: number;
}

export interface State {
  metrics: Metric[];
  updateMetrics: (metrics: Metric[]) => void;
  total: number;
  updateTotal: (newTotal: number) => void;
  averages: Averages;
  updateAverages: (averages: Averages) => void;
}
