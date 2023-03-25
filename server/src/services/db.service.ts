import fs from 'fs'
import { Metric } from '../types'
import { buildMetricsData, generateOverlappingDatesDataSet } from '../utils/dataBuilders'
import { DB_JSON_PATH, DEFAULT_DB_DATA_AMOUNT, DEFAULT_DB_METRIC_NAME } from '../constants';

const generateMetricsData = (amount: number, name = DEFAULT_DB_METRIC_NAME): Metric[] => {
  const dates = generateOverlappingDatesDataSet();
  const metrics = buildMetricsData(amount, dates, name);
  return metrics;
}

const saveMetricsToJSONDb = async (metrics: Metric[]) => {
  await fs.writeFileSync(DB_JSON_PATH, JSON.stringify({ metrics: [...metrics] }))
}

export const initDB = async (dataSize?: number) => {
  try {
    const data = fs.readFileSync(DB_JSON_PATH);
    const obj = JSON.parse(data.toString());
      const metrics = obj.metrics;
      if (Array.isArray(metrics) && metrics.length > 0) {
        return;
      }
      await saveMetricsToJSONDb(generateMetricsData(dataSize ?? DEFAULT_DB_DATA_AMOUNT));
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error('Error creating database:', error);
    await saveMetricsToJSONDb(generateMetricsData(dataSize ?? DEFAULT_DB_DATA_AMOUNT));
  }
  // fs.readFile(DB_JSON_PATH, async (err, data: Buffer) => {
  //   if (err) {
  //     await saveMetricsToJSONDb(generateMetricsData(dataSize ?? DEFAULT_DB_DATA_AMOUNT));
  //     return;
  //   }

  //   try {
  //     const obj = JSON.parse(data.toString());
  //     const metrics = obj.metrics;
  //     if (Array.isArray(metrics) && metrics.length > 0) {
  //       return;
  //     }
  //     await saveMetricsToJSONDb(generateMetricsData(dataSize ?? DEFAULT_DB_DATA_AMOUNT));
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.error('Error creating database:', err);
  //     await saveMetricsToJSONDb(generateMetricsData(dataSize ?? DEFAULT_DB_DATA_AMOUNT));
  //   }
  // })
}
