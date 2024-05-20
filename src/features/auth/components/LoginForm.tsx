import React from 'react';
import AuthForm from './AuthForm';
import { AuthFormInputs } from '../models';
import { SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../store/hooks';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { useLoginMutation } from '../../../store/services/authService';

const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit: SubmitHandler<AuthFormInputs> = async data => {
		try {
			const response = await login(data);

			dispatch(setCredentials(response.data));
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return <AuthForm title="Login" onSubmit={onSubmit} submitButtonText="Login" />;
};

export default LoginForm;
