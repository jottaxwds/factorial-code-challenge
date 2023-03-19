import React from "react";
import { AppContext } from "../AppContext";
import { DEFAULT_PAGE_SIZE } from "../constants";
import {
  getAverages,
  getPaginatedMetrics,
  postMetric,
} from "../services/metrics";
import { NewMetric } from "../types";

const useMetrics = () => {
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const {
    metrics,
    updateMetrics,
    updateTotal,
    total,
    averages,
    updateAverages,
  } = React.useContext(AppContext);

  const getMoreMetrics = async (page: number, pageSize: number) => {
    setIsLoading(true);
    const {
      metrics: newMetrics,
      total: newTotal,
      error,
    } = await getPaginatedMetrics(page, pageSize);
    if (newMetrics === null || newMetrics === undefined) {
      setIsLoading(false);
      return;
    }
    updateMetrics([...metrics, ...newMetrics]);
    updateAverageValues();
    updateTotal(Number(newTotal));
    setIsLoading(false);
    setError(error);
  };

  const updateAverageValues = async () => {
    const averages = await getAverages();
    updateAverages(averages);
  };

  const loadMetrics = async () => {
    setError(false);
    const {
      metrics: newMetrics,
      total: newTotal,
      error,
    } = await getPaginatedMetrics(0, DEFAULT_PAGE_SIZE);
    updateMetrics(newMetrics);
    updateTotal(Number(newTotal));
    updateAverageValues();
    setError(error);
    setIsLoading(false);
  };

  const saveMetric = async (metric: NewMetric) => {
    setError(false);
    setIsLoading(true);
    const { metric: newMetric, total: newTotal } = await postMetric(metric);
    if (newMetric === null || newMetric === undefined) {
      setIsLoading(false);
      return;
    }
    updateMetrics([...metrics, newMetric]);
    updateAverageValues();
    updateTotal(newTotal);
    setIsLoading(false);
  };

  React.useEffect(() => {
    loadMetrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    isLoading,
    metrics,
    saveMetric,
    getMoreMetrics,
    total,
    averages,
  };
};

export default useMetrics;
