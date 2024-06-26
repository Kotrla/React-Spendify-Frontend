import React from 'react';
import { IAuthFormProps } from '../models';
import useAuthForm from '../hooks/useAuthForm';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const AuthForm: React.FC<IAuthFormProps> = ({ title, onSubmit, submitButtonText }) => {
	const { register, handleSubmit, errors } = useAuthForm(onSubmit);

	return (
		<Container maxWidth="xs">
			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4}>
				<Typography variant="h5" component="h1" gutterBottom>
					{title}
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						label="Email"
						variant="outlined"
						margin="normal"
						fullWidth
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address',
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						label="Password"
						variant="outlined"
						margin="normal"
						fullWidth
						type="password"
						{...register('password', {
							required: 'Password is required',
							minLength: { value: 6, message: 'Password must be at least 6 characters long' },
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					{title === 'Register' && (
						<TextField
							label="Name"
							variant="outlined"
							margin="normal"
							fullWidth
							{...register('name', {
								required: 'Name is required',
								minLength: { value: 4, message: 'Name must be at least 4 characters long' },
							})}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					)}
					<Button type="submit" variant="contained" color="primary" fullWidth>
						{submitButtonText}
					</Button>
				</form>
			</Box>
		</Container>
	);
};

export default AuthForm;
