import React, { useState } from 'react';
import { ISpendingTableProps } from '../models';
import { ISpending } from '../../../store/models';
import { useSpendingPeriod } from '../context/SpendingPeriodContext';
import { useGetSpendingByTypeQuery } from '../../../store/services/spendingService';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	TableSortLabel,
	useTheme,
} from '@mui/material';
import { formatDate } from '../../../shared/utils/date.utils';

const SpendingTable: React.FC<ISpendingTableProps> = ({ spendingType }) => {
	const theme = useTheme();
	const { fromDate, toDate } = useSpendingPeriod();
	const { data: spendingData, isLoading } = useGetSpendingByTypeQuery({
		spendingType,
		fromDate,
		toDate,
	});

	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof ISpending>('title');

	const handleSort = (property: keyof ISpending) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedData = React.useMemo(() => {
		if (!spendingData) return [];
		return [...spendingData].sort((a, b) => {
			if (a[orderBy] < b[orderBy]) {
				return order === 'asc' ? -1 : 1;
			}
			if (a[orderBy] > b[orderBy]) {
				return order === 'asc' ? 1 : -1;
			}
			return 0;
		});
	}, [spendingData, order, orderBy]);

	if (isLoading) {
		return <CircularProgress />;
	}

	if (!spendingData || spendingData.length === 0) {
		return <div>No data available</div>;
	}

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
						{['title', 'type', 'category', 'date', 'amount'].map(column => (
							<TableCell key={column}>
								<TableSortLabel
									active={orderBy === column}
									direction={orderBy === column ? order : 'asc'}
									onClick={() => handleSort(column as keyof ISpending)}>
									{column.charAt(0).toUpperCase() + column.slice(1)}
								</TableSortLabel>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{sortedData.map((spending: ISpending) => (
						<TableRow key={spending.id} sx={{ backgroundColor: '#393939' }}>
							<TableCell>{spending.title}</TableCell>
							<TableCell>{spending.type}</TableCell>
							<TableCell>{spending.category}</TableCell>
							<TableCell>{formatDate(spending.date)}</TableCell>
							<TableCell>{spending.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default SpendingTable;
