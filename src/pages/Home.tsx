import { Box } from '@mui/material';
import CombinedMetrics from '../features/dashboard/components/CombinedMetrics';
import SpendingsSection from '../features/dashboard/components/SpendingsSection';
import InvestmentsSection from '../features/dashboard/components/InvestmentsSection';

function Home() {
	return (
		<Box>
			<CombinedMetrics />
			<SpendingsSection />
			<InvestmentsSection />
		</Box>
	);
}

export default Home;
