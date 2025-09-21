import { createContext, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const savedCart = storageService.get(STORAGE_KEYS.CART) || [];
		setCartItems(savedCart);
	}, []);

	const addToCart = (item) => {
		setCartItems((prev) => {
			if (prev.some((i) => i.id === item.id)) return prev;

			const newCart = [...prev, item];
			storageService.set(STORAGE_KEYS.CART, newCart);
			return newCart;
		});
	};

	const removeFromCart = (id) => {
		setCartItems((prev) => {
			const remainingCart = prev.filter((i) => i.id !== id);
			storageService.set(STORAGE_KEYS.CART, remainingCart);
			return remainingCart;
		});
	};

	const toggleInCart = (item) => {
		setCartItems((prev) => {
			const exists = prev.some((i) => i.id === item.id);
			const newCart = exists
				? prev.filter((i) => i.id !== item.id)
				: [...prev, item];

			storageService.set(STORAGE_KEYS.CART, newCart);
			return newCart;
		});
	};

	return (
		<CartContext.Provider
			value={{
				cartItems,
				addToCart,
				removeFromCart,
				toggleInCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
