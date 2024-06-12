import { useState } from 'react';
import { SpendingType } from '../enums';
import { ISpending } from '../../../store/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateSpendingMutation } from '../../../store/services/spendingService';

const useAddSpendingForm = (spendingType: SpendingType, handleClose: VoidFunction) => {
	const defaultValues: Partial<ISpending> = {
		title: '',
		type: spendingType || SpendingType.EXPENSE,
		category: '',
		amount: 0,
		date: new Date().toISOString().split('T')[0],
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
	} = useForm<Partial<ISpending>>({
		mode: 'onChange',
		defaultValues,
	});

	const [createSpending, { isLoading, isError, isSuccess }] = useCreateSpendingMutation();
	const [inputCategoryValue, setInputCategoryValue] = useState('');
	const [isNewCategory, setIsNewCategory] = useState(false);

	const categories = ['Food', 'Travel', 'Utilities', 'Health'];

	const handleCategoryBlur = () => {
		if (inputCategoryValue && !categories.includes(inputCategoryValue)) {
			setIsNewCategory(true);
		} else {
			setIsNewCategory(false);
		}
	};

	const onSubmit: SubmitHandler<Partial<ISpending>> = async data => {
		const spendingData = {
			...data,
			amount: Number(data.amount),
		};

		await createSpending({ data: spendingData }).unwrap();
		handleClose();
		reset();
	};

	return {
		register,
		handleSubmit,
		errors,
		isDirty,
		isValid,
		isLoading,
		isError,
		isSuccess,
		reset,
		setInputCategoryValue,
		inputCategoryValue,
		isNewCategory,
		handleCategoryBlur,
		onSubmit,
		categories,
	};
};

export default useAddSpendingForm;
