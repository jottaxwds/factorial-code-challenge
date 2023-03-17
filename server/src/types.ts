export interface MetricDB {
  id: string
  timestamp: Date
  value: number
  name: string
}

export type Metric = Omit<MetricDB, 'id'>

export interface MetricsResponse {
  metrics: MetricDB[]
}

export function isMetricData(data: any): data is { metric: Metric } {
  return (
    typeof data === 'object' &&
    data.metric &&
    typeof data.metric.name === 'string' &&
    typeof data.metric.value === 'string' &&
    typeof data.metric.timestamp === 'number'
  )
}
