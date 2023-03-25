import * as metricsServices from '../services/metrics.service';

export const getTotals = metricsServices.getTotals;

export const getAllMetrics = metricsServices.getAllMetrics;

export const getPaginatedMetrics = metricsServices.getPaginatedMetrics;

export const saveMetricToDb = metricsServices.saveMetrics;
