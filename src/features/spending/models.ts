import { ISpending } from '../../store/models';
import { PeriodType, SpendingType } from './enums';

export interface ISpendingTableProps {
	spendingType: SpendingType;
}

export interface IAddSpendingModalProps {
	isOpen: boolean;
	onClose: () => void;
	spendingType: SpendingType;
	initialValues?: ISpending;
}

export interface ISpendingPeriodContextProps {
	periodType: PeriodType;
	selectedDate: Date;
	fromDate: string;
	toDate: string;
	setPeriodType: (periodType: PeriodType) => void;
	setSelectedDate: (date: Date) => void;
}
