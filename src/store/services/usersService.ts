import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: customFetchBase,
	endpoints: builder => ({
		getProfile: builder.query({
			query: () => ({
				url: 'users',
				method: 'GET',
			}),
			keepUnusedDataFor: 5,
		}),
	}),
});

export const { useGetProfileQuery } = usersApi;
