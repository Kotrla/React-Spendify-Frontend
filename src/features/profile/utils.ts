import { IProfileFormInputs } from './models';

export const getChangedData = (data: IProfileFormInputs, profileData: IProfileFormInputs) => {
	const changedData: Partial<IProfileFormInputs> = {};

	if (data.email !== profileData.email) {
		changedData.email = data.email;
	}
	if (data.password !== profileData.password) {
		changedData.password = data.password;
	}
	if (data.name !== profileData.name) {
		changedData.name = data.name;
	}

	return changedData;
};
