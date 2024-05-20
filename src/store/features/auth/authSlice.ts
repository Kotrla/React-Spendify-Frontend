import { RootState } from '../../store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
	email: string | null;
	access_token: string | null;
}

const INITIAL_STATE = {
	email: null,
	access_token: null,
} as IAuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers: {
		setCredentials: (state: IAuthState, action: PayloadAction<IAuthState>) => {
			const { email, access_token } = action.payload;

			state.email = email;
			state.access_token = access_token;
		},
		logout: () => INITIAL_STATE,
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state: RootState) => state!.auth.email;
export const selectCurrentToken = (state: RootState) => state!.auth.access_token;
