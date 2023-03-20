import { getAverages } from '../utils'
import { Metric } from '../types'
import dayjs from 'dayjs'

const metrics: Metric[] = [
  { name: '', timestamp: dayjs('2022-02-01T01:00:00.000Z').unix() * 1000, value: '10' },
  { name: '', timestamp: dayjs('2022-02-01T02:00:00.000Z').unix() * 1000, value: '20' },
  { name: '', timestamp: dayjs('2022-02-01T03:00:00.000Z').unix() * 1000, value: '30' }
]

describe('getAverages', () => {
  it('calculates hourly averages correctly', () => {
    const averages = getAverages(metrics)
    expect(averages.hourly).toEqual([
      { hour: '1', average: 10 },
      { hour: '2', average: 20 },
      { hour: '3', average: 30 }
    ])
  })

  it('calculates minutely averages correctly', () => {
    const averages = getAverages(metrics)
    expect(averages.minutly).toEqual([
      { minute: '1:0', average: 10 },
      { minute: '2:0', average: 20 },
      { minute: '3:0', average: 30 }
    ])
  })

  it('calculates daily averages correctly', () => {
    const averages = getAverages(metrics)

    expect(averages.daily).toEqual([{ day: '2022-02-01', average: 20 }])
  })
})
