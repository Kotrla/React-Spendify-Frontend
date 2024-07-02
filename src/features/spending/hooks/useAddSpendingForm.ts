import { SpendingType } from '../enums';
import { useEffect, useState } from 'react';
import { ISpending } from '../../../store/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSpendingPeriod } from '../context/SpendingPeriodContext';
import {
	useCreateSpendingMutation,
	useGetSpendingCategoriesQuery,
} from '../../../store/services/spendingService';

const useAddSpendingForm = (
	initialSpendingType: SpendingType,
	handleClose: VoidFunction,
	initialValues?: ISpending
) => {
	const { fromDate } = useSpendingPeriod();

	const defaultValues: Partial<ISpending> = initialValues ?? {
		title: '',
		type: initialSpendingType || SpendingType.EXPENSE,
		category: '',
		amount: 0,
		date: fromDate,
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
		reset,
		watch,
	} = useForm<Partial<ISpending>>({
		mode: 'onChange',
		defaultValues,
	});

	const [createSpending, { isLoading, isError, isSuccess }] = useCreateSpendingMutation();
	const [inputCategoryValue, setInputCategoryValue] = useState('');
	const [isNewCategory, setIsNewCategory] = useState(false);

	const spendingType = watch('type', initialSpendingType);

	const {
		data: categoriesData,
		isLoading: isCategoriesLoading,
		refetch,
	} = useGetSpendingCategoriesQuery({ spendingType });

	const categories = categoriesData || [];

	const handleCategoryBlur = () => {
		if (inputCategoryValue && !categories.find(category => category.name === inputCategoryValue)) {
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

	useEffect(() => {
		refetch();
	}, [spendingType, refetch]);

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
