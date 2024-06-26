import React from 'react';
import LiveCryptoTable from '../features/investments/components/LiveCryptoTable';
import LiveStocksTable from '../features/investments/components/LiveStocksTable';

function Investments() {
	return (
		<>
			<LiveCryptoTable />
			<LiveStocksTable />
		</>
	);
}

export default Investments;
