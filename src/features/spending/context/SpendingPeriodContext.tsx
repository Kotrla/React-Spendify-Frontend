import dayjs from 'dayjs';
import { PeriodType } from '../enums';
import { ISpendingPeriodContextProps } from '../models';
import React, { createContext, useContext, useState, useMemo } from 'react';

const SpendingPeriodContext = createContext<ISpendingPeriodContextProps | undefined>(undefined);

export const SpendingPeriodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [periodType, setPeriodType] = useState<PeriodType>(PeriodType.DAILY);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const fromDate = useMemo(() => {
		switch (periodType) {
			case PeriodType.YEARLY:
				return dayjs(selectedDate).startOf('year').format('YYYY-MM-DD');
			case PeriodType.MONTHLY:
				return dayjs(selectedDate).startOf('month').format('YYYY-MM-DD');
			case PeriodType.DAILY:
				return dayjs(selectedDate).format('YYYY-MM-DD');
			default:
				return dayjs(selectedDate).format('YYYY-MM-DD');
		}
	}, [periodType, selectedDate]);

	const toDate = useMemo(() => {
		switch (periodType) {
			case PeriodType.YEARLY:
				return dayjs(selectedDate).endOf('year').format('YYYY-MM-DD');
			case PeriodType.MONTHLY:
				return dayjs(selectedDate).endOf('month').format('YYYY-MM-DD');
			case PeriodType.DAILY:
				return dayjs(selectedDate).format('YYYY-MM-DD');
			default:
				return dayjs(selectedDate).format('YYYY-MM-DD');
		}
	}, [periodType, selectedDate]);

	return (
		<SpendingPeriodContext.Provider
			value={{
				periodType,
				selectedDate,
				fromDate,
				toDate,
				setPeriodType,
				setSelectedDate,
			}}>
			{children}
		</SpendingPeriodContext.Provider>
	);
};

export const useSpendingPeriod = () => {
	const context = useContext(SpendingPeriodContext);
	if (!context) {
		throw new Error('useSpendingPeriod must be used within a SpendingPeriodProvider');
	}
	return context;
};
