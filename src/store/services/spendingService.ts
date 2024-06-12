import { ISpending } from '../models';
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';
import { SpendingType } from '../../features/spending/enums';

export const spendingApi = createApi({
	reducerPath: 'spendingApi',
	baseQuery: customFetchBase,
	tagTypes: [SpendingType.EXPENSE, SpendingType.INCOME],
	endpoints: builder => ({
		getSpendingByType: builder.query<ISpending[], { spendingType: SpendingType }>({
			query: ({ spendingType }) => ({
				url: `spending/byType?spendingType=${spendingType}`,
				method: 'GET',
			}),
			providesTags: (result, error, { spendingType }) => [spendingType],
		}),
		createSpending: builder.mutation<ISpending, { data: Partial<ISpending> }>({
			query: ({ data }) => ({
				url: `spending`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: (result, error, { data }) => [data.type],
		}),
	}),
});

export const { useGetSpendingByTypeQuery, useCreateSpendingMutation } = spendingApi;
