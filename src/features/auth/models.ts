import { SubmitHandler } from 'react-hook-form';

export interface IAuthFormInputs {
	email: string;
	password: string;
	name?: string;
}

export interface IAuthFormProps {
	title: string;
	onSubmit: SubmitHandler<IAuthFormInputs>;
	submitButtonText: string;
}
