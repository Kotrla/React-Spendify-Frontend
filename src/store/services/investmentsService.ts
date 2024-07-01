import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';
import { InvestmentTags } from '../../features/investments/enums';
import {
	ICreateInvestmentRequest,
	ICryptoLiveResponse,
	IInvestment,
	IStocksLiveResponse,
	IUpdateInvestmentRequest,
} from '../models';

export const investmentsApi = createApi({
	reducerPath: 'investmentsApi',
	baseQuery: customFetchBase,
	tagTypes: [InvestmentTags.USER_INVESTMENTS],
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
		getAllInvestments: builder.query<IInvestment[], void>({
			query: () => ({
				url: 'investments',
				method: 'GET',
			}),
			providesTags: [InvestmentTags.USER_INVESTMENTS],
		}),
		addInvestment: builder.mutation<IInvestment, ICreateInvestmentRequest>({
			query: newInvestment => ({
				url: 'investments',
				method: 'POST',
				body: newInvestment,
			}),
			invalidatesTags: [InvestmentTags.USER_INVESTMENTS],
		}),
		updateInvestment: builder.mutation<IInvestment, { id: number; updateData: IUpdateInvestmentRequest }>({
			query: ({ id, updateData }) => ({
				url: `investments/${id}`,
				method: 'PATCH',
				body: updateData,
			}),
			invalidatesTags: [InvestmentTags.USER_INVESTMENTS],
		}),
		deleteInvestment: builder.mutation<{ message: string }, number>({
			query: id => ({
				url: `investments/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [InvestmentTags.USER_INVESTMENTS],
		}),
	}),
});

export const {
	useGetCryptoDataQuery,
	useGetStockDataQuery,
	useGetAllInvestmentsQuery,
	useAddInvestmentMutation,
	useUpdateInvestmentMutation,
	useDeleteInvestmentMutation,
} = investmentsApi;
