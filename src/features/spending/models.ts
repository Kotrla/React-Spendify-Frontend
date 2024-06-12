import { SpendingType } from './enums';

export interface SpendingTableProps {
	spendingType: SpendingType;
}

export interface AddSpendingModalProps {
	isOpen: boolean;
	onClose: () => void;
	spendingType: SpendingType;
}
