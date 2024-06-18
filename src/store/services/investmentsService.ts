import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';
import { ICryptoLiveResponse, IStocksLiveResponse } from '../models';

export const investmentsApi = createApi({
	reducerPath: 'investmentsApi',
	baseQuery: customFetchBase,
	endpoints: builder => ({
		getCryptoData: builder.query<ICryptoLiveResponse, { page: number; limit: number }>({
			query: ({ page, limit }) => ({
				url: `investments/live/crypto?page=${page}&limit=${limit}`,
				method: 'GET',
			}),
		}),
		getStockData: builder.query<IStocksLiveResponse, void>({
			query: () => ({
				url: 'investments/live/stocks',
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetCryptoDataQuery, useGetStockDataQuery } = investmentsApi;
