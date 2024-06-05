import { RootState } from '../../store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
	access_token: string | null;
	userID: number | null;
}

const INITIAL_STATE = {
	access_token: null,
	userID: null,
} as IAuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers: {
		setCredentials: (state: IAuthState, action: PayloadAction<IAuthState>) => {
			const { access_token, userID } = action.payload;

			state.access_token = access_token;
			state.userID = userID;
		},
		logout: () => INITIAL_STATE,
	},
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state!.auth.access_token;
export const selectCurrentUserID = (state: RootState) => state!.auth.userID;
