import React, { useState } from 'react';
import { AuthTabValue } from '../features/auth/enums';
import { Box, Container, Tab, Tabs } from '@mui/material';
import LoginForm from '../features/auth/components/LoginForm';
import RegisterForm from '../features/auth/components/RegisterForm';

const LoginPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState<AuthTabValue>(AuthTabValue.Login);

	const handleTabChange = (_, newValue: AuthTabValue) => {
		setActiveTab(newValue);
	};

	return (
		<Container maxWidth="sm">
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				mt={4}
				maxWidth="400px">
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
		</Container>
	);
};

export default LoginPage;
