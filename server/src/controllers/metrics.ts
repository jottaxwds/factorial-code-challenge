import dayjs from 'dayjs'
import { Metric, MetricDB, MetricsResponse } from '../types'
import axios, { AxiosResponse } from 'axios'
import { DB_SORTING, DB_URL } from '../constants'

const handleErrorMessage = error => {
  const { response } = error
  const { status, data } = response ?? {}
  const errorText = data?.message || error.message
  return `Error ${status}: ${errorText}`
}

export const getTotals = async (): Promise<number> => {
  try {
    const response: AxiosResponse<MetricsResponse> = await axios.get(`${DB_URL}/${DB_SORTING}&_page=1`)
    const total = response.headers['x-total-count'] ?? 0
    return total
  } catch (error) {
    return 0
  }
}

export const getAllMetrics = async () => {
  try {
    const response: AxiosResponse<MetricsResponse> = await axios.get(`${DB_URL}/${DB_SORTING}`)
    const { data: metrics = [] } = response ?? { data: [] }
    return { metrics: metrics as Metric[], error: null }
  } catch (error) {
    return { metrics: [], error: handleErrorMessage(error) }
  }
}

export const getPaginatedMetrics = async (page: string, pageSize: string) => {
  try {
    const response: AxiosResponse<MetricsResponse> = await axios.get(
      `${DB_URL}/${DB_SORTING}&_page=${page}&_limit=${pageSize}`
    )
    const total = response.headers['x-total-count'] ?? 0
    const { data: metrics = [] } = response ?? { data: [] }
    return { metrics, total, error: null }
  } catch (error) {
    return { metrics: [], total: '0', error: handleErrorMessage(error) }
  }
}

export const saveMetricToDb = async (metric: MetricDB) => {
  try {
    const metricDb = {
      ...metric,
      id: `${metric.timestamp}-${dayjs().unix() * 1000}`
    }
    const { data: newMetric }: AxiosResponse<MetricDB> = await axios.post<MetricDB>(`${DB_URL}`, metricDb)
    const { headers }: AxiosResponse<MetricsResponse> = await axios.get(`${DB_URL}/${DB_SORTING}&_page=1`)
    const total = headers['x-total-count'] ?? 0
    return { metric: newMetric, total, error: null }
  } catch (error) {
    return { metrics: [], total: null, error: handleErrorMessage(error) }
  }
}
