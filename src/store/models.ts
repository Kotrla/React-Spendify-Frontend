import { SpendingType } from '../features/spending/enums';

export interface IGenericResponse {
	status: string;
	message: string;
}

export interface IResetPasswordRequest {
	resetToken: string;
	password: string;
	passwordConfirm: string;
}

export interface IPostRequest {
	title: string;
	content: string;
	image: string;
	user: string;
}

export interface IUser {
	name: string;
	email: string;
	password: string;
	_id: string;
	id: number;
	created_at: string;
	updated_at: string;
	__v: number;
}

export interface IPostResponse {
	id: string;
	title: string;
	content: string;
	image: string;
	category: string;
	user: IUser;
	created_at: string;
	updated_at: string;
}

export interface ISpending {
	id: number;
	title: string;
	type: SpendingType;
	category: string;
	amount: number;
	date: Date;
	userId: number;
	user?: IUser;
}
