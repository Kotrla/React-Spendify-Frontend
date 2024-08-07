import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { ISpendingTableProps } from '../models';
import { ISpending } from '../../../store/models';
import AddSpendingModal from './AddSpendingModal';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../../../shared/utils/date.utils';
import { useSpendingPeriod } from '../context/SpendingPeriodContext';
import {
	useGetSpendingByTypeQuery,
	useUpdateSpendingMutation,
	useDeleteSpendingMutation,
} from '../../../store/services/spendingService';
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
	IconButton,
	Tooltip,
} from '@mui/material';

const SpendingTable: React.FC<ISpendingTableProps> = ({ spendingType }) => {
	const theme = useTheme();
	const { fromDate, toDate } = useSpendingPeriod();
	const { data: spendingData, isLoading } = useGetSpendingByTypeQuery({ spendingType, fromDate, toDate });
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof ISpending>('title');
	const [selectedSpending, setSelectedSpending] = useState<ISpending | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [updateSpending] = useUpdateSpendingMutation();
	const [deleteSpending] = useDeleteSpendingMutation();

	const handleSort = (property: keyof ISpending) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedData = React.useMemo(() => {
		if (!spendingData) return [];
		return [...spendingData].sort((a, b) => {
			if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
			if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
			return 0;
		});
	}, [spendingData, order, orderBy]);

	const handleEditClick = (spending: ISpending) => {
		setSelectedSpending(spending);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: number) => {
		await deleteSpending(id);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	if (isLoading) return <CircularProgress />;

	if (!spendingData || spendingData.length === 0) return <div>No data available</div>;

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
							{['title', 'type', 'category', 'date', 'amount', 'actions'].map(column => (
								<TableCell key={column}>
									{column !== 'actions' ? (
										<TableSortLabel
											active={orderBy === column}
											direction={orderBy === column ? order : 'asc'}
											onClick={() => handleSort(column as keyof ISpending)}>
											{column.charAt(0).toUpperCase() + column.slice(1)}
										</TableSortLabel>
									) : (
										column.charAt(0).toUpperCase() + column.slice(1)
									)}
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
								<TableCell>
									<Tooltip title="Edit">
										<IconButton color="primary" onClick={() => handleEditClick(spending)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete">
										<IconButton color="secondary" onClick={() => handleDelete(spending.id)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{isModalOpen && (
				<AddSpendingModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					spendingType={spendingType}
					initialValues={selectedSpending}
				/>
			)}
		</>
	);
};

export default SpendingTable;
