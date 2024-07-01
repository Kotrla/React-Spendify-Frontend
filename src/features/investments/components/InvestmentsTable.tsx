import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import InvestmentModal from './InvestmentModal';
import { IInvestment } from '../../../store/models';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate } from '../../../shared/utils/date.utils';
import {
	useGetAllInvestmentsQuery,
	useDeleteInvestmentMutation,
} from '../../../store/services/investmentsService';
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
	Button,
	Pagination,
	Box,
	Typography,
	IconButton,
	Tooltip,
} from '@mui/material';

const headers = [
	{ id: 'title', label: 'Title' },
	{ id: 'type', label: 'Type' },
	{ id: 'boughtValue', label: 'Bought Value (EUR)' },
	{ id: 'currentValue', label: 'Current Value (EUR)' },
	{ id: 'percentageDiff', label: 'Change (%)' },
	{ id: 'date', label: 'Date' },
];

const InvestmentsTable: React.FC = () => {
	const theme = useTheme();
	const [rowsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof IInvestment>('title');
	const [selectedInvestment, setSelectedInvestment] = useState<IInvestment | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [deleteInvestment] = useDeleteInvestmentMutation();
	const { data: investments, isLoading } = useGetAllInvestmentsQuery();

	const handleSort = (property: keyof IInvestment) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleDelete = async (id: number) => {
		await deleteInvestment(id);
	};

	const handleEditClick = (investment: IInvestment) => {
		const investmentWithFormattedDate = {
			...investment,
			date: new Date(investment.date).toISOString().split('T')[0],
		};
		setSelectedInvestment(investmentWithFormattedDate);
		setIsModalOpen(true);
	};

	const handleAddClick = () => {
		setSelectedInvestment(null);
		setIsModalOpen(true);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const calculatePercentageDiff = (boughtValue: number, currentValue: number) => {
		if (boughtValue === 0) return '0%';
		const diff = ((currentValue - boughtValue) / boughtValue) * 100;
		return diff.toFixed(2) + '%';
	};

	const sortedData = React.useMemo(() => {
		if (!investments) return [];

		return investments.slice().sort((a, b) => {
			if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
			if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
			return 0;
		});
	}, [investments, order, orderBy]);

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
				<Typography variant="h6" component="div">
					Investments
				</Typography>
				<Button variant="contained" color="primary" onClick={handleAddClick}>
					Add Investment
				</Button>
			</Box>
			{isLoading ? (
				<CircularProgress />
			) : (
				<>
					{!investments || investments.length === 0 ? (
						<>
							<Typography variant="h6" component="div">
								Investments
							</Typography>
							<Button variant="contained" color="primary" onClick={handleAddClick}>
								Add Investment
							</Button>
							<div>No data available</div>
						</>
					) : (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
										{headers.map(header => (
											<TableCell key={header.id}>
												<TableSortLabel
													active={orderBy === header.id}
													direction={orderBy === header.id ? order : 'asc'}
													onClick={() => handleSort(header.id as keyof IInvestment)}>
													{header.label}
												</TableSortLabel>
											</TableCell>
										))}
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sortedData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map(investment => (
										<TableRow key={investment.id} sx={{ backgroundColor: '#393939' }}>
											<TableCell>{investment.title}</TableCell>
											<TableCell>{investment.type}</TableCell>
											<TableCell>
												{investment.boughtValue.toLocaleString('en-US', {
													style: 'currency',
													currency: 'EUR',
												})}
											</TableCell>
											<TableCell>
												{investment.currentValue.toLocaleString('en-US', {
													style: 'currency',
													currency: 'EUR',
												})}
											</TableCell>
											<TableCell>
												<Typography
													color={
														investment.currentValue > investment.boughtValue
															? 'green'
															: investment.currentValue < investment.boughtValue
																? 'red'
																: 'inherit'
													}>
													{calculatePercentageDiff(investment.boughtValue, investment.currentValue)}
												</Typography>
											</TableCell>
											<TableCell>{formatDate(investment.date)}</TableCell>
											<TableCell>
												<Tooltip title="Edit">
													<IconButton color="primary" onClick={() => handleEditClick(investment)}>
														<EditIcon />
													</IconButton>
												</Tooltip>
												<Tooltip title="Delete">
													<IconButton color="secondary" onClick={() => handleDelete(investment.id)}>
														<DeleteIcon />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</>
			)}
			{investments && investments.length > 0 && (
				<Pagination
					count={Math.ceil(investments.length / rowsPerPage)}
					page={page}
					onChange={(event, value) => setPage(value)}
				/>
			)}
			{isModalOpen && (
				<InvestmentModal isOpen={isModalOpen} onClose={handleModalClose} initialValues={selectedInvestment} />
			)}
		</>
	);
};

export default InvestmentsTable;
