import React, { useState } from 'react';
import { Box, Typography, Collapse, Button, Paper } from '@mui/material';
import { useGetSpendingByTypeQuery } from '../../../store/services/spendingService';
import { useGetAllInvestmentsQuery } from '../../../store/services/investmentsService';
import { SpendingType } from '../../spending/enums';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getFormattedDate = date => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 1);
const twentyYearsAgo = new Date(today);
twentyYearsAgo.setFullYear(today.getFullYear() - 20);

const CombinedMetrics = () => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => {
		setOpen(!open);
	};

	const { data: expenseData } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.EXPENSE,
		fromDate: getFormattedDate(twentyYearsAgo),
		toDate: getFormattedDate(today),
	});

	const { data: yearlyExpenseData } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.EXPENSE,
		fromDate: getFormattedDate(startOfYear),
		toDate: getFormattedDate(today),
	});

	const { data: incomeData } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.INCOME,
		fromDate: getFormattedDate(twentyYearsAgo),
		toDate: getFormattedDate(today),
	});

	const { data: yearlyIncomeData } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.INCOME,
		fromDate: getFormattedDate(startOfYear),
		toDate: getFormattedDate(today),
	});

	const { data: investmentsData } = useGetAllInvestmentsQuery();

	const totalExpenses = expenseData?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
	const yearlyExpenses = yearlyExpenseData?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
	const totalIncome = incomeData?.reduce((sum, income) => sum + income.amount, 0) || 0;
	const yearlyIncome = yearlyIncomeData?.reduce((sum, income) => sum + income.amount, 0) || 0;
	const totalInvestments =
		investmentsData?.reduce((sum, investment) => sum + investment.currentValue, 0) || 0;
	const netWorth = totalIncome + totalInvestments - totalExpenses;
	const cashFlow = totalIncome - totalExpenses;
	const yearlyCashFlow = yearlyIncome - yearlyExpenses;

	const chartData = {
		labels: ['Net Worth', 'Total Cash Flow', 'Yearly Cash Flow', 'Total Investment Value'],
		datasets: [
			{
				label: 'Amount in EUR',
				data: [netWorth, cashFlow, yearlyCashFlow, totalInvestments],
				backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF7043'],
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<Paper elevation={3} sx={{ mb: 2 }}>
			<Box p={2}>
				<Button onClick={handleToggle}>{open ? 'Hide Combined Metrics' : 'Show Combined Metrics'}</Button>
				<Collapse in={open}>
					<Box mt={2}>
						<Typography variant="h6">Combined Metrics</Typography>
						<Box sx={{ height: 300 }}>
							<Bar data={chartData} options={chartOptions} />
						</Box>
						<Box display="flex" flexDirection="column" gap={2} mt={2}>
							<Box display="flex" justifyContent="space-between">
								<Typography variant="h6">Net Worth</Typography>
								<Typography variant="body1">€{netWorth.toFixed(2)}</Typography>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography variant="h6">Total Cash Flow</Typography>
								<Box display="flex" gap={1}>
									<Typography variant="body1" sx={{ color: 'green' }}>
										Income: €{totalIncome.toFixed(2)}
									</Typography>
									<Typography variant="body1" sx={{ color: 'red' }}>
										Spending: €{totalExpenses.toFixed(2)}
									</Typography>
								</Box>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography variant="h6">Yearly Cash Flow</Typography>
								<Box display="flex" gap={1}>
									<Typography variant="body1" sx={{ color: 'green' }}>
										Income: €{yearlyIncome.toFixed(2)}
									</Typography>
									<Typography variant="body1" sx={{ color: 'red' }}>
										Spending: €{yearlyExpenses.toFixed(2)}
									</Typography>
								</Box>
							</Box>
							<Box display="flex" justifyContent="space-between">
								<Typography variant="h6">Total Investment Value</Typography>
								<Typography variant="body1">€{totalInvestments.toFixed(2)}</Typography>
							</Box>
						</Box>
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
};

export default CombinedMetrics;
