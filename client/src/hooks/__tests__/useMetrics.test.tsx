/* eslint-disable testing-library/no-unnecessary-act */
import { act, renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { AppProvider } from "../../AppContext";
import { data } from "../../testData";
import useMetrics from "../useMetrics";

jest.mock("../../services/metrics.ts", () => ({
  getAverages: jest.fn(),
  getPaginatedMetrics: jest.fn(),
  postMetric: jest.fn(),
}));

// eslint-disable-next-line import/first
import {
  getAverages,
  getPaginatedMetrics,
  postMetric,
} from "../../services/metrics";

const defaultMetricsResponse = { metrics: [], total: 0, error: null };
const defaultAveragesResponse = { perHour: 0, perMinute: 0, perDay: 0 };

const withContentMetricsResponse = {
  metrics: [...data.metrics],
  total: data.metrics.length,
  error: null,
};
const withContentAverageResponse = { perHour: 10, perMinute: 20, perDay: 30 };

describe("useMetrics hook", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should have `isLoading` as `true` on init", async () => {
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...defaultMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...defaultAveragesResponse,
    }));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    const { result } = renderHook(() => useMetrics(), { wrapper });
    expect(result.current.isLoading).toBe(true);
  });

  it("Should update metrics, total and averages on init", async () => {
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...withContentAverageResponse,
    }));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    await act(() => renderHook(() => useMetrics(), { wrapper }));
    expect(getPaginatedMetrics).toHaveBeenCalled();
    expect(getAverages).toHaveBeenCalled();
  });

  it("Should paginate metrics", async () => {
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...withContentAverageResponse,
    }));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    const { result } = await act(() =>
      renderHook(() => useMetrics(), { wrapper })
    );
    expect(getPaginatedMetrics).toHaveBeenCalledTimes(1);
    expect(getAverages).toHaveBeenCalledTimes(1);
    expect(result.current.total).toEqual(17);
    expect(result.current.metrics).toHaveLength(17);
    await act(() => result.current.getMoreMetrics(2, 10));
    expect(getPaginatedMetrics).toHaveBeenCalledTimes(2);
    expect(getAverages).toHaveBeenCalledTimes(2);
    expect(result.current.metrics).toHaveLength(34);
  });

  it("Should NOT paginate metrics if new metrics are not in the response", async () => {
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...withContentAverageResponse,
    }));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    const { result } = await act(() =>
      renderHook(() => useMetrics(), { wrapper })
    );
    expect(getPaginatedMetrics).toHaveBeenCalledTimes(1);
    expect(getAverages).toHaveBeenCalledTimes(1);
    expect(result.current.total).toEqual(17);
    expect(result.current.metrics).toHaveLength(17);

    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
      metrics: undefined,
    }));

    await act(() => result.current.getMoreMetrics(2, 10));
    expect(getPaginatedMetrics).toHaveBeenCalledTimes(2);
    expect(getAverages).toHaveBeenCalledTimes(1);
    expect(result.current.metrics).toHaveLength(17);
  });

  it("Should post new metric when `saveMetric` is called", async () => {
    const newMetric = { name: "CPU", value: "500", timestamp: dayjs().unix() };
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...withContentAverageResponse,
    }));
    (postMetric as jest.Mock).mockImplementation(() => ({
      metric: { ...newMetric, id: "" },
      total: 1,
    }));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    const { result } = await act(() =>
      renderHook(() => useMetrics(), { wrapper })
    );
    await act(() => result.current.saveMetric(newMetric));
    expect(postMetric).toHaveBeenCalled();
    expect(postMetric).toHaveBeenCalledWith(newMetric);
    expect(result.current.isLoading).toEqual(false);
    expect(getAverages).toHaveBeenCalledTimes(2);
  });

  it("Should NOT call to update context data if post failed", async () => {
    const newMetric = { name: "CPU", value: "500", timestamp: dayjs().unix() };
    (getPaginatedMetrics as jest.Mock).mockImplementation(() => ({
      ...withContentMetricsResponse,
    }));
    (getAverages as jest.Mock).mockImplementation(() => ({
      ...withContentAverageResponse,
    }));
    (postMetric as jest.Mock).mockImplementation(() => ({}));
    const wrapper = ({ children }: { children: React.ReactNode }) => {
      return <AppProvider>{children}</AppProvider>;
    };
    const { result } = await act(() =>
      renderHook(() => useMetrics(), { wrapper })
    );
    await act(() => result.current.saveMetric(newMetric));
    expect(postMetric).toHaveBeenCalled();
    expect(postMetric).toHaveBeenCalledWith(newMetric);
    expect(result.current.isLoading).toEqual(false);
    expect(getAverages).toHaveBeenCalledTimes(1);
    expect(result.current.metrics).toHaveLength(17);
  });
});
