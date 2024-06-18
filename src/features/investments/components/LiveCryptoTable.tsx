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
} from '@mui/material';

const LiveCryptoTable: React.FC = () => {
	const theme = useTheme();
	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const { data: cryptoData, isLoading } = useGetCryptoDataQuery({ page, limit });

	const [order, setOrder] = useState<'asc' | 'desc'>('asc');
	const [orderBy, setOrderBy] = useState<keyof (typeof cryptoData.data)[0]>('name');

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
		return <div>No data available</div>;
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'market_cap_rank'}
									direction={orderBy === 'market_cap_rank' ? order : 'asc'}
									onClick={() => handleSort('market_cap_rank')}>
									Nr
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'name'}
									direction={orderBy === 'name' ? order : 'asc'}
									onClick={() => handleSort('name')}>
									Name
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'symbol'}
									direction={orderBy === 'symbol' ? order : 'asc'}
									onClick={() => handleSort('symbol')}>
									Symbol
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'current_price'}
									direction={orderBy === 'current_price' ? order : 'asc'}
									onClick={() => handleSort('current_price')}>
									Current Price (EUR)
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'market_cap'}
									direction={orderBy === 'market_cap' ? order : 'asc'}
									onClick={() => handleSort('market_cap')}>
									Market Cap (EUR)
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'total_volume'}
									direction={orderBy === 'total_volume' ? order : 'asc'}
									onClick={() => handleSort('total_volume')}>
									Total Volume (EUR)
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sortedData.map((crypto, index) => (
							<TableRow key={crypto.id}>
								<TableCell>{crypto.market_cap_rank}</TableCell>
								<TableCell>{crypto.name}</TableCell>
								<TableCell>{crypto.symbol}</TableCell>
								<TableCell>
									{crypto.current_price.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })}
								</TableCell>
								<TableCell>
									{crypto.market_cap.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })}
								</TableCell>
								<TableCell>
									{crypto.total_volume.toLocaleString('en-GB', { style: 'currency', currency: 'EUR' })}
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
