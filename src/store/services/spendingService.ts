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
		updateSpending: builder.mutation<ISpending, { id: number; data: Partial<ISpending> }>({
			query: ({ id, data }) => ({
				url: `spending/${id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (result, error, { data }) => [data.type],
		}),
		deleteSpending: builder.mutation<{ message: string }, number>({
			query: id => ({
				url: `spending/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result, error, { id }) => [SpendingType.EXPENSE, SpendingType.INCOME],
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

export const {
	useGetSpendingByTypeQuery,
	useCreateSpendingMutation,
	useUpdateSpendingMutation,
	useDeleteSpendingMutation,
	useGetSpendingCategoriesQuery,
} = spendingApi;
