import { useContext } from 'react';

import CartContext from '@/context/CartContext';

export const useCart = () => {
	const context = useContext(CartContext);

	if (!context) {
		throw new Error('useFavorites must be used within a FavoritesProvider');
	}

	return context;
};
