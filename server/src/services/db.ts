import { faker } from '@faker-js/faker'
import fs from 'fs'
import dayjs from 'dayjs'
import { Metric } from '../types'

const generateMetricsData = (amount: number, name = 'CPU'): Metric[] => {
  const metrics = []
  const startDate = dayjs().subtract(5, 'day')
  const endDate = dayjs()
  const dates = []

  for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'hour')) {
    dates.push(date.unix())
  }
  while (amount > 0) {
    const timestamp = faker.helpers.arrayElement(dates)
    const metric = {
      id: `${timestamp}-${dayjs().unix()}`,
      timestamp,
      name,
      value: faker.random.numeric(3)
    }
    metrics.push(metric)
    amount--
  }
  return metrics
}

const saveMetricsToJSONDb = async (metrics: Metric[]) => {
  await fs.writeFileSync('./db.json', JSON.stringify({ metrics: [...metrics] }))
}

export const initDB = async () => {
  await fs.readFile('./db.json', async (err, data: Buffer) => {
    if (err) {
      await saveMetricsToJSONDb(generateMetricsData(10))
      return
    }

    try {
      const obj = JSON.parse(data.toString())
      const metrics = obj.metrics
      if (Array.isArray(metrics) && metrics.length > 0) {
        return
      }
      await saveMetricsToJSONDb(generateMetricsData(10))
    } catch (err) {
      console.error('Error creating database:', err)
      await saveMetricsToJSONDb(generateMetricsData(10))
    }
  })
}
