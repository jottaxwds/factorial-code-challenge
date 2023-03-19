import { Metric } from './types'

export function getAverages(metrics: Metric[]) {
  const hours: { [key: string]: { total: number; count: number } } = {}
  const minutes: { [key: string]: { total: number; count: number } } = {}
  const days: { [key: string]: { total: number; count: number } } = {}

  metrics.reduce(
    (result, metric) => {
      const date = new Date(metric.timestamp)
      const hourKey = date.getUTCHours()
      const minuteKey = `${hourKey}:${date.getUTCMinutes()}`
      const dayKey = date.toISOString().slice(0, 10)

      if (!result.hours[hourKey]) {
        result.hours[hourKey] = { total: 0, count: 0 }
      }
      result.hours[hourKey].total += parseInt(metric.value)
      result.hours[hourKey].count++

      // update minute object
      if (!result.minutes[minuteKey]) {
        result.minutes[minuteKey] = { total: 0, count: 0 }
      }
      result.minutes[minuteKey].total += parseInt(metric.value)
      result.minutes[minuteKey].count++

      // update day object
      if (!result.days[dayKey]) {
        result.days[dayKey] = { total: 0, count: 0 }
      }
      result.days[dayKey].total += parseInt(metric.value)
      result.days[dayKey].count++

      return result
    },
    { hours, minutes, days }
  )

  return {
    hourly: Object.entries(hours).map(([key, value]) => ({ hour: key, average: value.total / value.count })),
    minutly: Object.entries(minutes).map(([key, value]) => ({ minute: key, average: value.total / value.count })),
    daily: Object.entries(days).map(([key, value]) => ({ day: key, average: value.total / value.count }))
  }
}
