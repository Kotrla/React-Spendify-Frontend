import { Box } from '@mui/material';
import { TabPanelProps } from './models';

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			{...other}>
			{value === index && <Box py={1}>{children}</Box>}
		</div>
	);
};

export default TabPanel;
