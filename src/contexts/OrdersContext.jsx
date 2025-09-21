import { createContext, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
	const [orders, setOrders] = useState({});

	useEffect(() => {
		const savedOrders = storageService.get(STORAGE_KEYS.ORDERS) || {};
		setOrders(savedOrders);
	}, []);

	const createOrder = (id, items) => {
		setOrders((prev) => {
			const newOrders = {
				...prev,
				[id]: items,
			};
			storageService.set(STORAGE_KEYS.ORDERS, newOrders);
			return newOrders;
		});
	};

	const cancelOrder = (id) => {
		setOrders((prev) => {
			const { [id]: _, ...remainingOrders } = prev;
			storageService.set(STORAGE_KEYS.ORDERS, remainingOrders);
			return remainingOrders;
		});
	};

	return (
		<OrdersContext.Provider
			value={{
				orders,
				createOrder,
				cancelOrder,
			}}
		>
			{children}
		</OrdersContext.Provider>
	);
};

export default OrdersContext;
