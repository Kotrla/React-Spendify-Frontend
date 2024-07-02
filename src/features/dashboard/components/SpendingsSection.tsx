import React, { useState } from 'react';
import { Box, Typography, Collapse, Button, Paper, CircularProgress } from '@mui/material';
import { useGetSpendingByTypeQuery } from '../../../store/services/spendingService';
import { SpendingType } from '../../spending/enums';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const getFormattedDate = date => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const today = new Date();
const startOfYear = new Date(today.getFullYear(), 0, 1);

const colors: string[] = [
	'#FF6384',
	'#36A2EB',
	'#FFCE56',
	'#4BC0C0',
	'#9966FF',
	'#FF9F40',
	'#FF6384',
	'#36A2EB',
	'#FFCE56',
	'#4BC0C0',
	'#9966FF',
	'#FF9F40',
];

const getColors = (length: number) => {
	const colorArray = [];
	for (let i = 0; i < length; i++) {
		colorArray.push(colors[i % colors.length]);
	}
	return colorArray as string[];
};

const SpendingsSection = () => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => {
		setOpen(!open);
	};

	const { data: expenseData, isLoading: isLoadingExpenses } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.EXPENSE,
		fromDate: getFormattedDate(startOfYear),
		toDate: getFormattedDate(today),
	});

	const { data: incomeData, isLoading: isLoadingIncome } = useGetSpendingByTypeQuery({
		spendingType: SpendingType.INCOME,
		fromDate: getFormattedDate(startOfYear),
		toDate: getFormattedDate(today),
	});

	const totalExpenses = expenseData?.reduce((sum, expense) => sum + expense.amount, 0) || 0;
	const totalIncome = incomeData?.reduce((sum, income) => sum + income.amount, 0) || 0;

	const spendingDistribution = expenseData?.reduce((acc, expense) => {
		acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
		return acc;
	}, {});

	const barChartData = {
		labels: expenseData ? expenseData.map(expense => expense.title) : [],
		datasets: [
			{
				label: 'Expenses',
				data: expenseData ? expenseData.map(expense => expense.amount) : [],
				backgroundColor: getColors(expenseData ? expenseData.length : 0),
				borderColor: getColors(expenseData ? expenseData.length : 0),
			},
		],
	};

	const doughnutChartData = {
		labels: spendingDistribution ? Object.keys(spendingDistribution) : [],
		datasets: [
			{
				label: 'Spending Distribution',
				data: spendingDistribution ? Object.values(spendingDistribution) : [],
				backgroundColor: getColors(spendingDistribution ? Object.keys(spendingDistribution).length : 0),
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
				<Button onClick={handleToggle}>{open ? 'Hide Spendings' : 'Show Spendings'}</Button>
				<Collapse in={open}>
					<Box mt={2}>
						{isLoadingExpenses || isLoadingIncome ? (
							<CircularProgress />
						) : (
							<>
								<Box
									mt={2}
									display="flex"
									flexDirection={{ xs: 'column', md: 'row' }}
									gap={2}
									minHeight={400}
									justifyContent="space-between">
									<Box>
										<Typography variant="h6">Yearly Total Expenses</Typography>
										<Typography variant="body1">€{totalExpenses.toFixed(2)}</Typography>
										<Typography variant="h6" mt={2}>
											Yearly Total Income
										</Typography>
										<Typography variant="body1" color="green">
											€{totalIncome.toFixed(2)}
										</Typography>
									</Box>
									<Box sx={{ width: 300, height: 300 }}>
										<Typography variant="h6">Yearly Spending Distribution</Typography>
										<Doughnut data={doughnutChartData} options={chartOptions} />
									</Box>
									<Box sx={{ width: 500, height: 300 }}>
										<Typography variant="h6">Yearly Expenses</Typography>
										<Bar data={barChartData} options={chartOptions} />
									</Box>
								</Box>
							</>
						)}
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
};

export default SpendingsSection;
