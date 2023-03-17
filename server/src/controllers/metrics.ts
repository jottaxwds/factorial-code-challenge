import dayjs from 'dayjs'
import { Metric, MetricDB, MetricsResponse } from '../types'
import axios, { AxiosResponse } from 'axios'
import { DB_URL } from '../constants'

const handleErrorMessage = error => {
  const { response } = error
  const { status, data } = response ?? {}
  const errorText = data?.message || error.message
  return `Error ${status}: ${errorText}`
}

export const getAllMetrics = async () => {
  try {
    const response: AxiosResponse<MetricsResponse> = await axios.get(DB_URL)
    const { data: metrics = [] } = response ?? { data: [] }
    return { metrics, error: null }
  } catch (error) {
    return { metrics: [], error: handleErrorMessage(error) }
  }
}
export const saveMetricToDb = async (metric: Metric) => {
  try {
    const metricDb = {
      ...metric,
      id: `${metric.timestamp}-${dayjs().unix()}`
    }
    const { data: newMetric }: AxiosResponse<MetricDB> = await axios.post<MetricDB>(DB_URL, metricDb)
    return { metric: newMetric, error: null }
  } catch (error) {
    return { metrics: [], error: handleErrorMessage(error) }
  }
}
