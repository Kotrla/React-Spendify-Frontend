import React from 'react';
import ReactDOM from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { InvestmentType } from '../enums';
import { ICreateInvestmentRequest } from '../../../store/models';
import {
	useAddInvestmentMutation,
	useUpdateInvestmentMutation,
} from '../../../store/services/investmentsService';
import {
	Box,
	Button,
	Container,
	TextField,
	Typography,
	Modal,
	MenuItem,
	FormControl,
	FormHelperText,
} from '@mui/material';

const modalStyles = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	width: '90%',
	maxWidth: '600px',
};

interface InvestmentModalProps {
	isOpen: boolean;
	onClose: () => void;
	initialValues?: Partial<ICreateInvestmentRequest> & { id?: number };
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ isOpen, onClose, initialValues }) => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isDirty, isValid },
		reset,
	} = useForm<ICreateInvestmentRequest>({
		defaultValues: initialValues || {
			title: '',
			type: InvestmentType.STOCK,
			boughtValue: 0,
			currentValue: 0,
			date: '',
		},
	});
	const [addInvestment, { isLoading, isError, isSuccess }] = useAddInvestmentMutation();
	const [updateInvestment] = useUpdateInvestmentMutation();

	const handleClose = () => {
		onClose();
		reset();
	};

	const onSubmit = async (data: ICreateInvestmentRequest) => {
		const parsedData = {
			...data,
			boughtValue: parseFloat(data.boughtValue.toString()),
			currentValue: parseFloat(data.currentValue.toString()),
		};

		if (initialValues && initialValues.id) {
			await updateInvestment({ id: initialValues.id, updateData: parsedData });
		} else {
			await addInvestment(parsedData);
		}
		handleClose();
	};

	const modalContent = (
		<Modal open={isOpen} onClose={handleClose}>
			<Box sx={modalStyles}>
				<Container>
					<Box
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						gap={2}
						width="100%">
						<Typography variant="h5" component="h1" gutterBottom>
							{initialValues?.id ? 'Edit Investment' : 'Add Investment'}
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit(onSubmit)}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 2,
								width: '100%',
							}}>
							<FormControl fullWidth error={!!errors.title}>
								<TextField
									label="Title"
									variant="outlined"
									fullWidth
									{...register('title', { required: 'Title is required' })}
								/>
								<FormHelperText>{errors.title?.message}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors.type}>
								<Controller
									name="type"
									control={control}
									render={({ field }) => (
										<TextField label="Type" variant="outlined" fullWidth select {...field}>
											{Object.values(InvestmentType).map(type => (
												<MenuItem key={type} value={type}>
													{type}
												</MenuItem>
											))}
										</TextField>
									)}
								/>
								<FormHelperText>{errors.type?.message}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors.boughtValue}>
								<TextField
									label="Bought Value"
									variant="outlined"
									fullWidth
									type="number"
									inputProps={{ step: '0.01' }}
									{...register('boughtValue', { required: 'Bought value is required' })}
								/>
								<FormHelperText>{errors.boughtValue?.message}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors.currentValue}>
								<TextField
									label="Current Value"
									variant="outlined"
									fullWidth
									type="number"
									inputProps={{ step: '0.01' }}
									{...register('currentValue', { required: 'Current value is required' })}
								/>
								<FormHelperText>{errors.currentValue?.message}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors.date}>
								<TextField
									label="Date"
									variant="outlined"
									fullWidth
									type="date"
									InputLabelProps={{ shrink: true }}
									{...register('date', { required: 'Date is required' })}
								/>
								<FormHelperText>{errors.date?.message}</FormHelperText>
							</FormControl>
							<Box display="flex" justifyContent="space-between" width="100%">
								<Button variant="outlined" color="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
									{isLoading ? 'Saving...' : initialValues?.id ? 'Update' : 'Add'}
								</Button>
							</Box>
							{isError && (
								<FormHelperText error={true}>Failed to save investment. Please try again.</FormHelperText>
							)}
							{isSuccess && <FormHelperText>Investment successfully saved.</FormHelperText>}
						</Box>
					</Box>
				</Container>
			</Box>
		</Modal>
	);

	return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement);
};

export default InvestmentModal;
