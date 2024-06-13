import React, { useState } from 'react';
import { SpendingType } from '../enums';
import SpendingTable from './SpendingTable';
import { AppBar, Tabs, Tab, Box, Button } from '@mui/material';
import TabPanel from '../../../shared/components/TabPanel/TabPanel';
import AddSpendingModal from './AddSpendingModal';

const SpendingTabs: React.FC = () => {
	const [value, setValue] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const spendingType = value === 0 ? SpendingType.EXPENSE : SpendingType.INCOME;

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<Box display="flex" flexDirection="column">
			<AppBar position="static">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Tabs value={value} onChange={handleChange} aria-label="spending tabs">
						<Tab label="Expenses" />
						<Tab label="Income" />
					</Tabs>
					<Box px={1}>
						<Button
							variant="contained"
							color="success"
							sx={{ p: '5px 5px', fontSize: '14px' }}
							onClick={handleOpenModal}>
							+
						</Button>
					</Box>
				</Box>
			</AppBar>
			<TabPanel value={value} index={0}>
				<SpendingTable spendingType={SpendingType.EXPENSE} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<SpendingTable spendingType={SpendingType.INCOME} />
			</TabPanel>
			{isModalOpen && (
				<AddSpendingModal isOpen={isModalOpen} onClose={handleCloseModal} spendingType={spendingType} />
			)}
		</Box>
	);
};

export default SpendingTabs;
