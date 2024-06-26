import React from 'react';
import AuthForm from './AuthForm';
import { IAuthFormInputs } from '../models';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../../store/hooks';
import { RoutesEnum } from '../../../core/routes/routes';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { useLoginMutation } from '../../../store/services/authService';

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit: SubmitHandler<IAuthFormInputs> = async data => {
		try {
			const response = await login(data);

			dispatch(setCredentials(response.data));
			navigate(`${RoutesEnum.APP}/${RoutesEnum.HOME}`);
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return <AuthForm title="Login" onSubmit={onSubmit} submitButtonText="Login" />;
};

export default LoginForm;
