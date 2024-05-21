import { useLocation } from 'react-router-dom';

function useUrlContains(route: string) {
	const location = useLocation();

	return location.pathname.includes(route);
}

export default useUrlContains;
