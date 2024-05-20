import React from 'react';
import AuthForm from './AuthForm';
import { AuthFormInputs } from '../models';
import { SubmitHandler } from 'react-hook-form';
import { useRegisterMutation } from '../../../store/services/authService';

const RegisterForm: React.FC = () => {
	const [register] = useRegisterMutation();

	const onSubmit: SubmitHandler<AuthFormInputs> = async data => {
		try {
			const response = await register(data);
		} catch (error) {
			console.error('register failed:', error);
		}
	};

	return <AuthForm title="Register" onSubmit={onSubmit} submitButtonText="Register" />;
};

export default RegisterForm;
