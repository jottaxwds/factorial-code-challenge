import axios, { AxiosResponse } from "axios"
import { DB_URL, DB_SORTING } from "../constants"
import { MetricDB, MetricsAxiosResponse, MetricsResponse } from "../types"
import { handleErrorMessage } from "../utils/api.helpers"
import dayjs from "dayjs"

export const getTotals = async () => {
    try {
    const response: AxiosResponse<MetricsAxiosResponse> = await axios.get(`${DB_URL}/${DB_SORTING}&_page=1`)
    const total = response.headers['x-total-count'] ?? '0'
    return total
  } catch (error) {
    return '0'
  }
}

export const getAllMetrics = async (): Promise<MetricsResponse> => {
    try {
    const response: AxiosResponse<MetricsAxiosResponse> = await axios.get(`${DB_URL}/${DB_SORTING}`)
    const metrics = (response?.data ?? []) as MetricDB[];
    const total = response.headers['x-total-count'] ?? '0'
    return { metrics, total, error: null }
  } catch (error) {
    return { metrics: [], total: '0', error: handleErrorMessage(error) }
  }
}

export const getPaginatedMetrics = async (page: string, pageSize: string): Promise<MetricsResponse> => {
    try {
    const response: AxiosResponse<MetricsAxiosResponse> = await axios.get(
      `${DB_URL}/${DB_SORTING}&_page=${page}&_limit=${pageSize}`
    )
    const total = response.headers['x-total-count'] ?? '0'
    const metrics = (response?.data ?? []) as MetricDB[];
    return { metrics, total, error: null }
  } catch (error) {
    return { metrics: [], total: '0', error: handleErrorMessage(error) }
  }
}

export const saveMetrics = async (metric: MetricDB) => {
  try {
    const metricDb = {
      ...metric,
      id: `${metric.timestamp}-${dayjs().unix() * 1000}`
    }
    const { data: newMetric }: AxiosResponse<MetricDB> = await axios.post<MetricDB>(`${DB_URL}`, metricDb)
    const { headers }: AxiosResponse<MetricsAxiosResponse> = await axios.get(`${DB_URL}/${DB_SORTING}&_page=1`)
    const total = headers['x-total-count'] ?? 0
    return { metric: newMetric, total, error: null }
  } catch (error) {
    return { metric: null, total: null, error: handleErrorMessage(error) }
  }
}