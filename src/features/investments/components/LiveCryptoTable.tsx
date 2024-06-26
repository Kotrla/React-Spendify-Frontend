import React, { useState } from 'react';
import { useGetCryptoDataQuery } from '../../../store/services/investmentsService';
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
	{ id: 'market_cap_rank', label: 'Nr' },
	{ id: 'name', label: 'Name' },
	{ id: 'symbol', label: 'Symbol' },
	{ id: 'current_price', label: 'Current Price (EUR)' },
	{ id: 'price_change_percentage_24h', label: '24h Change (%)' },
	{ id: 'ath', label: 'ATH (EUR)' },
	{ id: 'ath_change_percentage', label: 'ATH Change (%)' },
];

const LiveCryptoTable: React.FC = () => {
	const theme = useTheme();
	const [limit] = useState(5);
	const [page, setPage] = useState(1);
	const { data: cryptoData, isLoading } = useGetCryptoDataQuery({ page, limit });

	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof (typeof cryptoData.data)[0]>('market_cap_rank');

	const handleSort = (property: keyof (typeof cryptoData.data)[0]) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const sortedData = React.useMemo(() => {
		if (!cryptoData) return [];
		return cryptoData.data.slice().sort((a, b) => {
			if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
			if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
			return 0;
		});
	}, [cryptoData, order, orderBy]);

	if (isLoading) {
		return <CircularProgress />;
	}

	if (!cryptoData || cryptoData.data.length === 0) {
		return (
			<>
				<Typography variant="h6" component="div" gutterBottom>
					Cryptocurrencies
				</Typography>
				<div>No data available</div>
			</>
		);
	}

	return (
		<>
			<Typography variant="h6" component="div" gutterBottom>
				Cryptocurrencies
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
										onClick={() => handleSort(header.id as keyof (typeof cryptoData.data)[0])}>
										{header.label}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedData.map(crypto => (
							<TableRow key={crypto.id}>
								<TableCell>{crypto.market_cap_rank}</TableCell>
								<TableCell>
									<Box display="flex" alignItems="center">
										<img
											src={crypto.image}
											alt={crypto.name}
											style={{ width: 24, height: 24, marginRight: 8 }}
										/>
										{crypto.name}
									</Box>
								</TableCell>
								<TableCell>{crypto.symbol}</TableCell>
								<TableCell>
									{crypto.current_price.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })}
								</TableCell>
								<TableCell
									style={{
										color:
											crypto.price_change_percentage_24h < 0
												? theme.palette.error.main
												: theme.palette.success.main,
									}}>
									{crypto.price_change_percentage_24h.toFixed(2)}%
								</TableCell>
								<TableCell>
									{crypto.ath.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })}
								</TableCell>
								<TableCell
									style={{
										color:
											crypto.ath_change_percentage < 0
												? theme.palette.error.main
												: theme.palette.success.main,
									}}>
									{crypto.ath_change_percentage.toFixed(2)}%
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				count={Math.ceil(cryptoData.total / limit)}
				page={page}
				onChange={(event, value) => setPage(value)}
			/>
		</>
	);
};

export default LiveCryptoTable;
