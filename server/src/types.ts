export interface MetricDB {
  id: string
  timestamp: Date
  value: string
  name: string
}

export type Metric = Omit<MetricDB, 'id'>

export interface MetricsResponse {
  metrics: MetricDB[]
}

export function isMetricData(data: MetricDB): data is MetricDB {
  return (
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.value === 'string' &&
    typeof data.timestamp === 'number'
  )
}

export interface GetAllMetricsResponse {
  metrics: Metric[]
  total: string
  error: string | null
}
