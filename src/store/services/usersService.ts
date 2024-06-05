import { IUser } from '../models';
import { createApi } from '@reduxjs/toolkit/query/react';
import customFetchBase from '../features/auth/customFetchBase';

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: customFetchBase,
	tagTypes: ['profileData'],
	endpoints: builder => ({
		getProfile: builder.query<IUser, { id: number }>({
			query: ({ id }) => ({
				url: `users/${id}`,
				method: 'GET',
			}),
			providesTags: ['profileData'],
		}),
		updateProfile: builder.mutation<IUser, { id: number; data: Partial<IUser> }>({
			query: ({ id, data }) => ({
				url: `users/${id}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['profileData'],
		}),
	}),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = usersApi;
