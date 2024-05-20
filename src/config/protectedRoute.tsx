import { useSelector } from 'react-redux';
import { Location, Navigate, useLocation } from 'react-router-dom';
import { selectCurrentToken } from '../store/features/auth/authSlice';

type ProtectedRouteProps = {
	children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
	const token: string | null = useSelector(selectCurrentToken);
	const location: Location<any> = useLocation();

	if (!token) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return children;
};

export default ProtectedRoute;
