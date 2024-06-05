import { UseFormReset } from 'react-hook-form';

export type ProfileFormSubmitHandler = (
	data: IProfileFormInputs,
	reset: UseFormReset<IProfileFormInputs>
) => void;

export interface IProfileFormProps {
	title: string;
	onSubmit: ProfileFormSubmitHandler;
	submitButtonText: string;
	defaultValues: IProfileFormInputs;
}
export interface IProfileFormInputs {
	email: string;
	name: string;
	password: string;
}
