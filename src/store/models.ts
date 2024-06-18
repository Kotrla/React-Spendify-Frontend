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

export interface ISpending {
	id: number;
	title: string;
	type: SpendingType;
	category: string;
	amount: number;
	date: string;
	userId: number;
	spendingCategoryId: number;
	spendingCategory: ISpendingCategory;
}

export interface ISpendingCategory {
	id: number;
	name: string;
	userId?: number;
}
export interface ICryptoLive {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	last_updated: string;
}

export interface ICryptoLiveResponse {
	total: number;
	page: number;
	limit: number;
	data: ICryptoLive[];
}

export interface IStocksLive {
	ticker: string;
	adjusted: boolean;
	queryCount: number;
	request_id: string;
	resultsCount: number;
	status: string;
	results: {
		T: string; // Symbol
		c: number; // Close price
		h: number; // High price
		l: number; // Low price
		n: number; // Number of transactions
		o: number; // Open price
		t: number; // Timestamp
		v: number; // Volume
		vw: number; // Volume weighted average price
	}[];
}

export interface IStock {
	symbol: string;
	close: number;
	high: number;
	low: number;
	numTransactions: number;
	open: number;
	timestamp: number;
	volume: number;
	volumeWeighted: number;
	currentPrice: number;
}

export interface IStocksLiveResponse {
	total: number;
	stocks: IStock[];
}
