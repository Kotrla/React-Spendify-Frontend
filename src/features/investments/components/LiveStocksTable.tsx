import React, { useState } from 'react';
import { useGetStockDataQuery } from '../../../store/services/investmentsService';
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
	Pagination,
	Box,
	Typography,
} from '@mui/material';

const headers = [
	{ id: 'symbol', label: 'Symbol' },
	{ id: 'currentPrice', label: 'Current Price (USD)' },
	{ id: 'open', label: 'Open (USD)' },
	{ id: 'high', label: 'High (USD)' },
	{ id: 'low', label: 'Low (USD)' },
	{ id: 'close', label: 'Close (USD)' },
	{ id: 'volume', label: 'Volume' },
];

const LiveStocksTable: React.FC = () => {
	const theme = useTheme();
	const [page, setPage] = useState(1);
	const limit = 5;
	const { data: stockData, isLoading } = useGetStockDataQuery();

	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof (typeof stockData.stocks)[0]>('symbol');

	const handleSort = (property: keyof (typeof stockData.stocks)[0]) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedData = React.useMemo(() => {
		if (!stockData) return [];
		return stockData.stocks.slice().sort((a, b) => {
			if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
			if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
			return 0;
		});
	}, [stockData, order, orderBy]);

	const paginatedData = React.useMemo(() => {
		const start = (page - 1) * limit;
		const end = start + limit;
		return sortedData.slice(start, end);
	}, [sortedData, page, limit]);

	if (isLoading) {
		return <CircularProgress />;
	}

	if (!stockData || stockData.stocks.length === 0) {
		return (
			<>
				<Typography variant="h6" component="div" gutterBottom>
					Stocks
				</Typography>
				<div>No data available</div>
			</>
		);
	}

	return (
		<>
			<Typography variant="h6" component="div" gutterBottom>
				Stocks
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
							{headers.map(header => (
								<TableCell key={header.id}>
									<TableSortLabel
										active={orderBy === header.id}
										direction={orderBy === header.id ? order : 'asc'}
										onClick={() => handleSort(header.id as keyof (typeof stockData.stocks)[0])}>
										{header.label}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((stock, index) => (
							<TableRow key={`${stock.symbol}-${index}`}>
								<TableCell>{stock.symbol}</TableCell>
								<TableCell>
									{stock.currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</TableCell>
								<TableCell>
									{stock.open.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</TableCell>
								<TableCell>
									{stock.high.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</TableCell>
								<TableCell>
									{stock.low.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</TableCell>
								<TableCell>
									{stock.close.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
								</TableCell>
								<TableCell>{stock.volume.toLocaleString('en-US')}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				count={Math.ceil(stockData.total / limit)}
				page={page}
				onChange={(event, value) => setPage(value)}
			/>
		</>
	);
};

export default LiveStocksTable;
