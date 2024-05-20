import { AuthFormInputs } from '../models';
import { useForm, SubmitHandler } from 'react-hook-form';

const useAuthForm = (onSubmit: SubmitHandler<AuthFormInputs>) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AuthFormInputs>();

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
	};
};

export default useAuthForm;
