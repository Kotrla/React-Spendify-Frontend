import { SubmitHandler } from 'react-hook-form';

export interface AuthFormInputs {
	email: string;
	password: string;
}

export interface AuthFormProps {
	title: string;
	onSubmit: SubmitHandler<AuthFormInputs>;
	submitButtonText: string;
}
