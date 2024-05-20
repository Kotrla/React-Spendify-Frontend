import React, { useState } from 'react';
import { AuthTabValue } from '../features/auth/enums';
import { Box, Tab, Tabs } from '@mui/material';
import LoginForm from '../features/auth/components/LoginForm';
import RegisterForm from '../features/auth/components/RegisterForm';

const LoginPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<AuthTabValue>(AuthTabValue.Login);

	const handleTabChange = (_, newValue: AuthTabValue) => {
		setActiveTab(newValue);
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="center">
			<Box maxWidth="400px" width="100%" textAlign="center">
				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth">
					<Tab value={AuthTabValue.Login} label="Login" />
					<Tab value={AuthTabValue.Register} label="Register" />
				</Tabs>
				{activeTab === AuthTabValue.Login && <LoginForm />}
				{activeTab === AuthTabValue.Register && <RegisterForm />}
			</Box>
		</Box>
	);
};

export default LoginPage;
