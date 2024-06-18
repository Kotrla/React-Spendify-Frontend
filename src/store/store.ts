import { authApi } from './services/authService';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import { usersApi } from './services/usersService';
import { spendingApi } from './services/spendingService';
import { investmentsApi } from './services/investmentsService';

export const store = configureStore({
	reducer: {
		auth: authSlice, //This reducer is to set credentials & consume state in application
		[authApi.reducerPath]: authApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[spendingApi.reducerPath]: spendingApi.reducer,
		[investmentsApi.reducerPath]: investmentsApi.reducer,
	},
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			authApi.middleware,
			usersApi.middleware,
			spendingApi.middleware,
			investmentsApi.middleware
		),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
