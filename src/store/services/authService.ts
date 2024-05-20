import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: async (args, api, extraOptions) =>
		customFetchBase(args, api, { ...extraOptions, includeHeaders: false }),
	endpoints: builder => ({
		login: builder.mutation({
			query: credentials => ({
				url: 'users/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: credentials => ({
				url: 'users/register',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
