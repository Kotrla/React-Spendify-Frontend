import { ISpending, ISpendingCategory } from '../models';
import { createApi } from '@reduxjs/toolkit/query/react';
import { SpendingType } from '../../features/spending/enums';
import customFetchBase from '../features/auth/customFetchBase';

export const spendingApi = createApi({
	reducerPath: 'spendingApi',
	baseQuery: customFetchBase,
	tagTypes: [SpendingType.EXPENSE, SpendingType.INCOME],
	endpoints: builder => ({
		getSpendingByType: builder.query<
			ISpending[],
			{ spendingType: SpendingType; fromDate: string; toDate: string }
		>({
			query: ({ spendingType, fromDate, toDate }) => ({
				url: `spending/byType?spendingType=${spendingType}&fromDate=${fromDate}&toDate=${toDate}`,
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
		getSpendingCategories: builder.query<ISpendingCategory[], { spendingType: SpendingType }>({
			query: ({ spendingType }) => ({
				url: `spending/categories?spendingType=${spendingType}`,
				method: 'GET',
			}),
			providesTags: (result, error, { spendingType }) => [spendingType],
		}),
	}),
});

export const { useGetSpendingByTypeQuery, useCreateSpendingMutation, useGetSpendingCategoriesQuery } =
	spendingApi;
