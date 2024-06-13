import SpendingTabs from '../features/spending/components/SpendingTabs';
import SpendingPeriod from '../features/spending/components/SpendingPeriod';
import { SpendingPeriodProvider } from '../features/spending/context/SpendingPeriodContext';

function Spending() {
	return (
		<SpendingPeriodProvider>
			<SpendingPeriod />
			<SpendingTabs />
		</SpendingPeriodProvider>
	);
}

export default Spending;
