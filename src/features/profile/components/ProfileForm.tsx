import React from 'react';
import { useForm } from 'react-hook-form';
import { IProfileFormInputs, IProfileFormProps } from '../models';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const ProfileForm: React.FC<IProfileFormProps> = ({ title, onSubmit, submitButtonText, defaultValues }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
	} = useForm<IProfileFormInputs>({ defaultValues });

	return (
		<Container maxWidth="xs">
			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
				<Typography variant="h5" component="h1" gutterBottom>
					{title}
				</Typography>
				<form onSubmit={handleSubmit(data => onSubmit(data, reset))}>
					<TextField
						label="Email"
						variant="outlined"
						margin="normal"
						fullWidth
						{...register('email', {
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address',
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						label="Name"
						variant="outlined"
						margin="normal"
						fullWidth
						{...register('name', {
							minLength: { value: 2, message: 'Name must be at least 2 characters long' },
						})}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<TextField
						label="Password"
						variant="outlined"
						margin="normal"
						fullWidth
						type="password"
						{...register('password', {
							minLength: { value: 6, message: 'Password must be at least 6 characters long' },
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth disabled={!isDirty || !isValid}>
						{submitButtonText}
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default ProfileForm;
