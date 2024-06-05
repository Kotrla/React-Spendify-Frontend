import React from 'react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.ts';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
