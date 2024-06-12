import React from 'react';
import { RootState } from '../store/store';
import { useAppSelector } from '../store/hooks';
import { CircularProgress } from '@mui/material';
import { getChangedData } from '../features/profile/utils';
import ProfileForm from '../features/profile/components/ProfileForm';
import { selectCurrentUserID } from '../store/features/auth/authSlice';
import { IProfileFormInputs, ProfileFormSubmitHandler } from '../features/profile/models';
import { useUpdateProfileMutation, useGetProfileQuery } from '../store/services/usersService';

const Profile: React.FC = () => {
	const userID = useAppSelector((state: RootState) => selectCurrentUserID(state));
	const { data: profileData, isLoading } = useGetProfileQuery({ id: userID });

	const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

	const onSubmit: ProfileFormSubmitHandler = async (data, reset) => {
		if (!profileData) return;

		const changedData: Partial<IProfileFormInputs> = getChangedData(data, profileData);

		try {
			const response = await updateProfile({ id: profileData.id, data: changedData });

			reset(response.data);
		} catch (error) {
			console.error('Update profile failed:', error);
		}
	};

	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<ProfileForm
			title="Update Profile"
			onSubmit={onSubmit}
			submitButtonText="Update"
			defaultValues={profileData}
		/>
	);
};

export default Profile;
