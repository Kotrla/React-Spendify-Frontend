import { IAuthFormInputs } from '../models';
import { useForm, SubmitHandler } from 'react-hook-form';

const useAuthForm = (onSubmit: SubmitHandler<IAuthFormInputs>) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthFormInputs>({
		mode: 'onChange',
	});

	return {
		register,
		handleSubmit: handleSubmit(onSubmit),
		errors,
	};
};

export default useAuthForm;
