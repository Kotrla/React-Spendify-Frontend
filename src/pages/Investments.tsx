import { Box, useTheme, useMediaQuery } from '@mui/material';
import LiveCryptoTable from '../features/investments/components/LiveCryptoTable';
import LiveStocksTable from '../features/investments/components/LiveStocksTable';
import InvestmentsTable from '../features/investments/components/InvestmentsTable';

function Investments() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={2} mt={2}>
			<Box flex={1}>
				<InvestmentsTable />
			</Box>
			<Box flex={1} display="flex" flexDirection="column" gap={2}>
				<LiveCryptoTable />
				<LiveStocksTable />
			</Box>
		</Box>
	);
}

export default Investments;
