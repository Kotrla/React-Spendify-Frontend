import { Mutex } from 'async-mutex';
import { logout } from './authSlice';
import { RootState } from '../../store';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const baseUrl = `${import.meta.env['VITE_SPENDIFY_API_URL']}`;

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl,
});

const customFetchBase: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions: any
) => {
	try {
		const release = await mutex.acquire();
		let result;
		const mergedArgs = typeof args === 'string' ? args : { ...args };

		const includeHeaders = extraOptions?.includeHeaders !== undefined ? extraOptions?.includeHeaders : true;

		if (includeHeaders) {
			const token = (api.getState() as RootState).auth.access_token;
			const headers = new Headers();

			if (token) {
				headers.set('Authorization', `Bearer ${token}`);
			}

			result = await baseQuery({ ...(mergedArgs as FetchArgs), headers }, api, extraOptions);
		} else {
			result = await baseQuery(mergedArgs, api, extraOptions);
		}

		release();
		if ((result.error?.data as any)?.message === 'You are not logged in') {
			const refreshRelease = await mutex.acquire();

			try {
				const refreshResult = await baseQuery(
					{ credentials: 'include', url: 'auth/refresh' },
					api,
					extraOptions
				);

				if (refreshResult.data) {
					result = await baseQuery(mergedArgs, api, extraOptions);
				} else {
					api.dispatch(logout());
					window.location.href = '/login';
				}
			} finally {
				refreshRelease();
			}
		}

		return result;
	} catch (error) {
		console.error('Error in customFetchBase:', error);
		throw error;
	}
};

export default customFetchBase;
