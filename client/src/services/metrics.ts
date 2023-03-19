import axios, { AxiosResponse } from "axios";
import { Averages, Metric, NewMetric } from "../types";

const BASE_URL = "http://localhost:3001/metrics";

type MetricsResponse = {
  metrics: Metric[];
  total: string;
  error: boolean;
};

const getPaginatedMetrics = async (page: number, pageSize: number) => {
  try {
    const {
      data: { metrics = [], total },
    }: AxiosResponse<MetricsResponse> = await axios.get(
      `${BASE_URL}/paginated?page=${page}&pageSize=${pageSize}`,
      {}
    );
    return { metrics, total, error: false };
  } catch (error) {
    console.error("services -> metrics: getPaginatedMetrics() ERROR:", error);
    return { metrics: [], total: 0, error: true };
  }
};

export const getAverages = async (): Promise<Averages> => {
  try {
    const {
      data: { perHour = 0, perMinute = 0, perDay = 0 },
    }: AxiosResponse<Averages> = await axios.get(`${BASE_URL}/averages`, {});
    return { perHour, perMinute, perDay };
  } catch (error) {
    console.error("services -> metrics: getAverages() ERROR:", error);
    return { perHour: 0, perMinute: 0, perDay: 0 };
  }
};

export interface PostMetricResponse {
  metric: Metric | null;
  total: number;
  error: boolean;
}

const postMetric = async (metric: NewMetric) => {
  try {
    const {
      data: { metric: newMetric, total, error },
    }: AxiosResponse<PostMetricResponse> = await axios.post(
      `${BASE_URL}/save`,
      metric
    );
    return { metric: newMetric, total, error };
  } catch (error) {
    console.error("services -> metrics: postMetric() ERROR:", error);
    return { metric: null, total: null, error: true };
  }
};

export { postMetric, getPaginatedMetrics };
