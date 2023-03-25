import axios, { AxiosResponse } from 'axios';
import { getAllMetrics, getPaginatedMetrics, getTotals, saveMetrics } from '../metrics.service';
import { MetricsAxiosResponse as MetricsResponse } from '../../types';
import { DB_SORTING, DB_URL } from '../../constants';
import dayjs from 'dayjs';

// Mock the Axios get method
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const defaultAxiosResponse = {
    data: [],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: null,
  }

const metrics = [{ id: '1', value: '10', timestamp: 1234567, name: 'CPU' }, { id: '2', value: '20', timestamp: 8901234, name: 'CPU' }];
describe('metrics.service', () => {
    describe('getTotals', () => {
      it('returns the total count', async () => {
        const totalCount = 10;
        const headers = { 'x-total-count': totalCount };
        const response: AxiosResponse = {
            ...defaultAxiosResponse,
            headers,
        };
        mockedAxios.get.mockResolvedValueOnce(response);
        const result = await getTotals();
        expect(result).toBe(totalCount);
      });
    
      it('returns 0 when the API call fails', async () => {
        const errorMessage = 'Something went wrong';
        mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
        const result = await getTotals();
    
        expect(result).toBe('0');
      });
    
      it('returns 0 when the total count header is not present', async () => {
        const response: AxiosResponse = {
            ...defaultAxiosResponse
        };
        mockedAxios.get.mockResolvedValueOnce(response);
        const result = await getTotals();
        expect(result).toBe('0');
      });
    });
    describe('getAllMetrics', () => {
        it('returns the metrics and no error when the API call succeeds', async () => {
          const response: AxiosResponse = {
            ...defaultAxiosResponse,
            data: metrics,
            headers: { 'x-total-count': `${metrics.length}` }
          };
          mockedAxios.get.mockResolvedValueOnce(response);
          const result = await getAllMetrics();
          expect(result).toEqual({ metrics, total: '2', error: null });
        });
      
        it('returns no metrics and an error message when the API call fails', async () => {
          mockedAxios.get.mockRejectedValueOnce(new Error());
          const result = await getAllMetrics();
          expect(result.metrics).toEqual([]);
        });
      
        it('returns an empty array of metrics and no error when the API returns no data', async () => {
          const response: AxiosResponse = {
            ...defaultAxiosResponse,
            data: null,
          };
          mockedAxios.get.mockResolvedValueOnce(response);
          const result = await getAllMetrics();
          expect(result).toEqual({ metrics: [], total: '0', error: null });
        });
    });
    describe('getPaginatedMetrics', () => {
        it('returns the metrics, total, and no error when the API call succeeds', async () => {
          const totalCount = 2;
          const response: AxiosResponse = {
            ...defaultAxiosResponse,
            data: metrics,
            headers: { 'x-total-count': totalCount }
          };
          mockedAxios.get.mockResolvedValueOnce(response);
          const page = '1';
          const pageSize = '10';
          const result = await getPaginatedMetrics(page, pageSize);
          expect(result).toEqual({ metrics, total: totalCount, error: null });
        });
      
        it('returns no metrics, total 0 and an error message when the API call fails', async () => {
          const errorMessage = 'Something went wrong';
          mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
          const page = '1';
          const pageSize = '10';
          const result = await getPaginatedMetrics(page, pageSize);
          expect(result).toEqual({ metrics: [], total: '0', error: `Error undefined: ${errorMessage}` });
        });
      
        it('returns an empty array of metrics, total 0 and no error when the API returns no data', async () => {
          const response: AxiosResponse = {
            ...defaultAxiosResponse,
            data: null,
          };
          mockedAxios.get.mockResolvedValueOnce(response);
          const page = '1';
          const pageSize = '10';
          const result = await getPaginatedMetrics(page, pageSize);
          expect(result).toEqual({ metrics: [], total: '0', error: null });
        });
    });
    describe('saveMetrics', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });

        const mockMetricDB = metrics[0];
      
        it('should save a new metric and return the updated total', async () => {
          const mockHeaders = {
            'x-total-count': '10',
          };
          const mockResponse: AxiosResponse<MetricsResponse> = {
            ...defaultAxiosResponse,
            data: { metrics: [] },
            headers: mockHeaders,
          };
          mockedAxios.post.mockResolvedValueOnce({ data: mockMetricDB });
          mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
          const result = await saveMetrics(mockMetricDB);
      
          expect(result).toEqual({
            metric: mockMetricDB,
            total: '10',
            error: null,
          });
          expect(mockedAxios.post).toHaveBeenCalledTimes(1);
          expect(mockedAxios.post).toHaveBeenCalledWith(`${DB_URL}`, {
            ...mockMetricDB,
            id: `${mockMetricDB.timestamp}-${dayjs().unix() * 1000}`,
          });
          expect(mockedAxios.get).toHaveBeenCalledTimes(1);
          expect(mockedAxios.get).toHaveBeenCalledWith(`${DB_URL}/${DB_SORTING}&_page=1`);
        });
      
        it('should handle errors and return an error object', async () => {
          const mockError = new Error('Unable to save metric');
          mockedAxios.post.mockRejectedValueOnce(mockError);
      
          const result = await saveMetrics(mockMetricDB);
      
          expect(result).toEqual({
            metric: null,
            total: null,
            error: 'Error undefined: Unable to save metric',
          });
          expect(mockedAxios.post).toHaveBeenCalledTimes(1);
          expect(mockedAxios.post).toHaveBeenCalledWith(`${DB_URL}`, {
            ...mockMetricDB,
            id: `${mockMetricDB.timestamp}-${dayjs().unix() * 1000}`,
          });
          expect(mockedAxios.get).not.toHaveBeenCalled();
        });
      });
});