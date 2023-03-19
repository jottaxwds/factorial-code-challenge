import { NewMetric } from "../../types";
import {
  getAverages,
  getPaginatedMetrics,
  postMetric,
  PostMetricResponse,
} from "../metrics";

jest.mock("axios");

// eslint-disable-next-line import/first
import axios from "axios";

describe("Services", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe("getPaginatedMetrics", () => {
    it("should return metrics and total when axios call succeeds", async () => {
      const metrics = [
        { id: 1, name: "metric 1", timestamp: 0 },
        { id: 2, name: "metric 2", timestamp: 0 },
      ];
      const total = 2;

      const axiosGetSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
        data: { metrics, total },
      });

      const result = await getPaginatedMetrics(0, 10);

      expect(axiosGetSpy).toHaveBeenCalledWith(
        "http://localhost:3001/metrics/paginated?page=0&pageSize=10",
        {}
      );
      expect(result.metrics).toEqual(metrics);
      expect(result.total).toEqual(total);
      expect(result.error).toBeFalsy();
    });

    it("should return empty metrics and total when axios call fails", async () => {
      const axiosGetSpy = jest.spyOn(axios, "get").mockRejectedValueOnce({
        message: "Network Error",
      });

      const result = await getPaginatedMetrics(0, 10);

      expect(axiosGetSpy).toHaveBeenCalledWith(
        "http://localhost:3001/metrics/paginated?page=0&pageSize=10",
        {}
      );
      expect(result.metrics).toEqual([]);
      expect(result.total).toEqual(0);
      expect(result.error).toBeTruthy();
    });
  });

  describe("getAverages", () => {
    it("should return the correct averages", async () => {
      const response = { data: { perHour: 5, perMinute: 10, perDay: 100 } };
      jest.spyOn(axios, "get").mockResolvedValueOnce({ ...response });
      const averages = await getAverages();
      expect(averages).toEqual(response.data);
    });

    it("should return default averages on error", async () => {
      jest.spyOn(axios, "get").mockRejectedValueOnce(new Error("error"));
      const averages = await getAverages();
      expect(averages).toEqual({ perHour: 0, perMinute: 0, perDay: 0 });
    });
  });

  describe("postMetric", () => {
    const mockMetric: NewMetric = {
      name: "CPU",
      value: "800",
      timestamp: 0,
    };

    const mockResponse: PostMetricResponse = {
      metric: {
        id: "1",
        name: "CPU",
        value: "800",
        timestamp: 0,
      },
      total: 1,
      error: false,
    };

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return the expected response on success", async () => {
      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockResolvedValueOnce({
        data: mockResponse,
      });

      const response = await postMetric(mockMetric);

      expect(response).toEqual(mockResponse);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), mockMetric);
    });

    it("should return the expected response on failure", async () => {
      const error = new Error("Something went wrong");

      (
        axios.post as jest.MockedFunction<typeof axios.post>
      ).mockRejectedValueOnce(error);

      const response = await postMetric(mockMetric);

      expect(response).toEqual({ metric: null, total: null, error: true });
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), mockMetric);
    });
  });
});
