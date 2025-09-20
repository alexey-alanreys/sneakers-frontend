import { useEffect, useState } from 'react';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

const Favorites = () => {
	const [favorites, setFavorites] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		const savedFavorites = storageService.get(STORAGE_KEYS.FAVORITES) || [];
		setFavorites(savedFavorites);
	}, []);

	const onAddToFavorites = (id) => {
		setFavorites((prev) => {
			const isInFavorites = prev.some((item) => item.id === id);
			let newFavorites;

			if (isInFavorites) {
				newFavorites = prev.filter((item) => item.id !== id);
			} else {
				const itemToAdd = items.find((item) => item.id === id);
				newFavorites = [...prev, itemToAdd];
			}

			storageService.set(STORAGE_KEYS.FAVORITES, newFavorites);
			return newFavorites;
		});
	};

	const onAddToCart = (id) => {
		setCartItems((prev) => {
			const isInCart = prev.some((item) => item.id === id);
			let newCart;

			if (isInCart) {
				newCart = prev.filter((item) => item.id !== id);
			} else {
				const itemToAdd = items.find((item) => item.id === id);
				newCart = [...prev, itemToAdd];
			}

			storageService.set(STORAGE_KEYS.CART, newCart);
			return newCart;
		});
	};

	const onRemoveItem = (id) => {
		const newCart = cartItems.filter((item) => item.id !== id);
		storageService.set(STORAGE_KEYS.CART, newCart);
		setCartItems(newCart);
	};

	return (
		<div className='wrapper'>
			{cartOpened && (
				<Drawer
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					items={cartItems}
				/>
			)}
			<Header onClickCart={() => setCartOpened(!cartOpened)} />
			<main className='content p-40'>
				<section className='d-flex align-center justify-between mb-40'>
					<h1>Мои закладки</h1>
				</section>
				<section className='items'>
					{favorites &&
						favorites.map((favorite) => (
							<Card
								key={favorite.id}
								{...favorite}
								onFavorite={onAddToFavorites}
								onPlus={onAddToCart}
								favorited={true}
							/>
						))}
				</section>
			</main>
		</div>
	);
};

export default Favorites;
