import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

import styles from './Home.module.scss';

const Home = () => {
	const [items, setItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);

	const { data, loading, error } = useFetch(
		'https://68cb88e7716562cf5073d1cb.mockapi.io/items',
	);

	useEffect(() => {
		if (data && data.length > 0) {
			setItems(data);
		}
	}, [data]);

	useEffect(() => {
		const savedFavorites = storageService.get(STORAGE_KEYS.FAVORITES) || [];
		setFavorites(savedFavorites);

		const savedCart = storageService.get(STORAGE_KEYS.CART) || [];
		setCartItems(savedCart);
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

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<>
			{cartOpened && (
				<Drawer
					onClose={() => setCartOpened(false)}
					onRemove={onRemoveItem}
					items={cartItems}
				/>
			)}

			<div className={styles.home}>
				<Header onClickCart={() => setCartOpened(!cartOpened)} />

				<main className={styles.home__content}>
					<section className={styles.home__topbar}>
						<h1 className={styles.home__title}>
							{searchValue
								? `Поиск по запросу: "${searchValue}"`
								: 'Все кроссовки'}
						</h1>
						<div className={styles.search}>
							<img
								src='/img/search.svg'
								alt='Search'
								className={styles.search__icon}
							/>
							<input
								onChange={onChangeSearchInput}
								value={searchValue}
								placeholder='Поиск...'
								className={styles.search__input}
							/>
						</div>
					</section>

					<section className={styles.home__items}>
						{items &&
							items
								.filter((item) =>
									item.title.toLowerCase().includes(searchValue.toLowerCase()),
								)
								.map((item) => (
									<Card
										key={item.id}
										{...item}
										onFavorite={onAddToFavorites}
										onPlus={onAddToCart}
										favorited={favorites.some((fav) => fav.id === item.id)}
									/>
								))}
					</section>
				</main>
			</div>
		</>
	);
};

export default Home;
