import React from 'react';
import ReactDOM from 'react-dom';
import { SpendingType } from '../enums';
import { yellow } from '@mui/material/colors';
import { IAddSpendingModalProps } from '../models';
import Autocomplete from '@mui/material/Autocomplete';
import useAddSpendingForm from '../hooks/useAddSpendingForm';
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

const AddSpendingModal: React.FC<IAddSpendingModalProps> = ({
	isOpen,
	onClose,
	spendingType,
	initialValues,
}) => {
	const handleClose = () => {
		onClose();
		reset();
	};

	const {
		register,
		handleSubmit,
		errors,
		isDirty,
		isValid,
		isLoading,
		isError,
		isSuccess,
		reset,
		setInputCategoryValue,
		inputCategoryValue,
		isNewCategory,
		handleCategoryBlur,
		onSubmit,
		categories,
	} = useAddSpendingForm(spendingType, handleClose, initialValues);

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
							Add Spending
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
							<FormControl fullWidth error={!!errors['title']}>
								<TextField
									label="Title"
									variant="outlined"
									fullWidth
									{...register('title', { required: 'Title is required' })}
								/>
								<FormHelperText>{errors['title']?.message as string}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors['type']}>
								<TextField
									label="Type"
									variant="outlined"
									fullWidth
									select
									{...register('type', { required: 'Type is required' })}
									defaultValue={spendingType || SpendingType.EXPENSE}>
									<MenuItem value={SpendingType.EXPENSE}>Expense</MenuItem>
									<MenuItem value={SpendingType.INCOME}>Income</MenuItem>
								</TextField>
								<FormHelperText>{errors['type']?.message as string}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors['category']}>
								<Autocomplete
									freeSolo
									options={categories.map(category => category.name)}
									inputValue={inputCategoryValue}
									onInputChange={(_event, newInputValue) => {
										setInputCategoryValue(newInputValue);
									}}
									onBlur={handleCategoryBlur}
									renderInput={params => (
										<TextField
											{...params}
											label="Category"
											variant="outlined"
											fullWidth
											{...register('category', { required: 'Category is required' })}
										/>
									)}
								/>
								<FormHelperText>{errors['category']?.message as string}</FormHelperText>
								{isNewCategory && (
									<FormHelperText sx={{ color: yellow[700] }}>
										This is a new category and will be created.
									</FormHelperText>
								)}
							</FormControl>
							<FormControl fullWidth error={!!errors['amount']}>
								<TextField
									label="Amount"
									variant="outlined"
									fullWidth
									type="number"
									{...register('amount', { required: 'Amount is required' })}
								/>
								<FormHelperText>{errors['amount']?.message as string}</FormHelperText>
							</FormControl>
							<FormControl fullWidth error={!!errors['date']}>
								<TextField
									label="Date"
									variant="outlined"
									fullWidth
									type="date"
									InputLabelProps={{ shrink: true }}
									{...register('date', { required: 'Date is required' })}
								/>
								<FormHelperText>{errors['date']?.message as string}</FormHelperText>
							</FormControl>
							<Box display="flex" justifyContent="space-between" width="100%">
								<Button variant="outlined" color="secondary" onClick={handleClose}>
									Close
								</Button>
								<Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
									{isLoading ? 'Adding...' : 'Add'}
								</Button>
							</Box>
							{isError && (
								<FormHelperText error={true}>Failed to create spending. Please try again.</FormHelperText>
							)}
							{isSuccess && <FormHelperText>Spending successfully added.</FormHelperText>}
						</Box>
					</Box>
				</Container>
			</Box>
		</Modal>
	);

	return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement);
};

export default AddSpendingModal;
