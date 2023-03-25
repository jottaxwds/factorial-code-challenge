import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { MetricDB } from "../types";

export const generateOverlappingDatesDataSet = (): number[] => {
    const startDate = dayjs().subtract(5, 'day')
    const endDate = dayjs()
    const dates = [];

    for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'hour')) {
        dates.push(date.unix())
    }

    return dates;
}

export const buildMetricsData = (amount: number, dates: number[], name: string): MetricDB[] => ([...new Array(amount)].map(() => ({
        id: `${faker.helpers.arrayElement(dates)}-${dayjs().unix() * 1000}`,
        timestamp: faker.helpers.arrayElement(dates),
        name,
        value: faker.random.numeric(3)
      })));