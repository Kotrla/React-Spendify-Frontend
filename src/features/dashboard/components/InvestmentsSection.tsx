import { useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useGetAllInvestmentsQuery } from '../../../store/services/investmentsService';
import { Box, Typography, Collapse, Button, Paper, CircularProgress } from '@mui/material';
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

const colors = [
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

const getColors = length => Array.from({ length }, (_, i) => colors[i % colors.length]);

const InvestmentsSection = () => {
	const [open, setOpen] = useState(true);

	const handleToggle = () => {
		setOpen(!open);
	};

	const { data: investmentsData, isLoading } = useGetAllInvestmentsQuery();

	if (isLoading) {
		return (
			<Paper elevation={3} sx={{ mb: 2 }}>
				<Box p={2}>
					<CircularProgress />
				</Box>
			</Paper>
		);
	}

	if (!investmentsData) {
		return (
			<Paper elevation={3} sx={{ mb: 2 }}>
				<Box p={2}>
					<Typography variant="h6">No investment data available</Typography>
				</Box>
			</Paper>
		);
	}

	const totalInvestments = investmentsData.reduce((sum, investment) => sum + investment.currentValue, 0) || 0;

	const investmentDistribution = investmentsData.reduce((acc, investment) => {
		const type = investment.type || 'Unknown';
		acc[type] = (acc[type] || 0) + investment.currentValue;
		return acc;
	}, {});

	const topInvestments = investmentsData;

	const barChartData = {
		labels: topInvestments.map(investment => investment.title),
		datasets: [
			{
				label: 'Investment Value',
				data: topInvestments.map(investment => investment.currentValue),
				backgroundColor: getColors(topInvestments.length),
			},
		],
	};

	const doughnutChartData = {
		labels: Object.keys(investmentDistribution),
		datasets: [
			{
				label: 'Investment Distribution',
				data: Object.values(investmentDistribution),
				backgroundColor: getColors(Object.keys(investmentDistribution).length),
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
				<Button onClick={handleToggle}>{open ? 'Hide Investments' : 'Show Investments'}</Button>
				<Collapse in={open}>
					<Box mt={2}>
						<Box
							mt={2}
							display="flex"
							flexDirection={{ xs: 'column', md: 'row' }}
							gap={2}
							minHeight={400}
							justifyContent="space-between">
							<Box>
								<Typography variant="h6">Yearly Total Investment Value</Typography>
								<Typography variant="body1">€{totalInvestments.toFixed(2)}</Typography>
							</Box>
							<Box sx={{ width: 300, height: 300 }}>
								<Typography variant="h6">Yearly Investment Distribution</Typography>
								<Doughnut data={doughnutChartData} options={chartOptions} />
							</Box>
							<Box sx={{ width: 500, height: 300 }}>
								<Typography variant="h6">Top Performing Investments</Typography>
								<Bar data={barChartData} options={chartOptions} />
							</Box>
						</Box>
					</Box>
				</Collapse>
			</Box>
		</Paper>
	);
};

export default InvestmentsSection;
