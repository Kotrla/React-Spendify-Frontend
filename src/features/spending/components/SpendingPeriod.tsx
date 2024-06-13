import React from 'react';
import dayjs from 'dayjs';
import { PeriodType } from '../enums';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useSpendingPeriod } from '../context/SpendingPeriodContext';
import { Box, MenuItem, FormControl, Select, SelectChangeEvent, TextField, IconButton } from '@mui/material';

const SpendingPeriod: React.FC = () => {
	const { periodType, selectedDate, setPeriodType, setSelectedDate } = useSpendingPeriod();

	const handlePeriodChange = (event: SelectChangeEvent<PeriodType>) => {
		setPeriodType(event.target.value as PeriodType);
		setSelectedDate(new Date());
	};

	const handleYearChange = (event: SelectChangeEvent<string>) => {
		setSelectedDate(new Date(`${event.target.value}-01-01`));
	};

	const handleMonthChange = (event: SelectChangeEvent<string>) => {
		const [year, month] = event.target.value.split('-');
		setSelectedDate(new Date(Number(year), Number(month) - 1, 1));
	};

	const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedDate(new Date(event.target.value));
	};

	const incrementDate = () => {
		const newDate = new Date(selectedDate);
		switch (periodType) {
			case PeriodType.YEARLY:
				newDate.setFullYear(newDate.getFullYear() + 1);
				break;
			case PeriodType.MONTHLY:
				newDate.setMonth(newDate.getMonth() + 1);
				break;
			case PeriodType.DAILY:
				newDate.setDate(newDate.getDate() + 1);
				break;
		}
		setSelectedDate(newDate);
	};

	const decrementDate = () => {
		const newDate = new Date(selectedDate);
		switch (periodType) {
			case PeriodType.YEARLY:
				newDate.setFullYear(newDate.getFullYear() - 1);
				break;
			case PeriodType.MONTHLY:
				newDate.setMonth(newDate.getMonth() - 1);
				break;
			case PeriodType.DAILY:
				newDate.setDate(newDate.getDate() - 1);
				break;
		}
		setSelectedDate(newDate);
	};

	const renderDateInput = () => {
		switch (periodType) {
			case PeriodType.YEARLY:
				return (
					<FormControl variant="outlined" sx={{ width: '200px' }}>
						<Select value={selectedDate.getFullYear().toString()} onChange={handleYearChange}>
							{Array.from({ length: 21 }, (_, index) => (
								<MenuItem key={index} value={(dayjs().year() - 10 + index).toString()}>
									{dayjs().year() - 10 + index}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);
			case PeriodType.MONTHLY:
				return (
					<FormControl variant="outlined" sx={{ width: '200px' }}>
						<Select
							value={`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`}
							onChange={handleMonthChange}>
							{Array.from({ length: 21 * 12 }, (_, index) => {
								const year = dayjs().year() - 10 + Math.floor(index / 12);
								const month = index % 12;
								return (
									<MenuItem key={index} value={`${year}-${String(month + 1).padStart(2, '0')}`}>
										{dayjs(new Date(year, month)).format('MMMM YYYY')}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				);
			case PeriodType.DAILY:
				return (
					<TextField
						variant="outlined"
						value={dayjs(selectedDate).format('YYYY-MM-DD')}
						onChange={handleDayChange}
						type="date"
						sx={{ width: '200px' }}
					/>
				);
		}
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" gap={1} mb={2}>
			<FormControl variant="outlined" sx={{ width: '200px' }}>
				<Select value={periodType} onChange={handlePeriodChange}>
					<MenuItem value={PeriodType.YEARLY}>Yearly</MenuItem>
					<MenuItem value={PeriodType.MONTHLY}>Monthly</MenuItem>
					<MenuItem value={PeriodType.DAILY}>Daily</MenuItem>
				</Select>
			</FormControl>
			<Box display="flex" alignItems="center" gap={2} sx={{ width: 'fit-content' }}>
				<IconButton onClick={decrementDate}>
					<ChevronLeft />
				</IconButton>
				{renderDateInput()}
				<IconButton onClick={incrementDate}>
					<ChevronRight />
				</IconButton>
			</Box>
		</Box>
	);
};

export default SpendingPeriod;
