import { createContext, useEffect, useState } from 'react';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		const savedFavorites = storageService.get(STORAGE_KEYS.FAVORITES) || [];
		setFavorites(savedFavorites);
	}, []);

	const addToFavorites = (item) => {
		setFavorites((prev) => {
			if (prev.some((fav) => fav.id === item.id)) return prev;

			const newFavorites = [...prev, item];
			storageService.set(STORAGE_KEYS.FAVORITES, newFavorites);
			return newFavorites;
		});
	};

	const removeFromFavorites = (id) => {
		setFavorites((prev) => {
			const newFavorites = prev.filter((item) => item.id !== id);
			storageService.set(STORAGE_KEYS.FAVORITES, newFavorites);
			return newFavorites;
		});
	};

	const toggleFavorite = (item) => {
		setFavorites((prev) => {
			const exists = prev.some((fav) => fav.id === item.id);
			const newFavorites = exists
				? prev.filter((fav) => fav.id !== item.id)
				: [...prev, item];

			storageService.set(STORAGE_KEYS.FAVORITES, newFavorites);
			return newFavorites;
		});
	};

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addToFavorites,
				removeFromFavorites,
				toggleFavorite,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesContext;
