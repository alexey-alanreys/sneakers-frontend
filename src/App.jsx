import { useEffect, useState } from 'react';

import { useFetch } from './hooks/useFetch';

import Card from '@/components/Card/Card';
import Drawer from '@/components/Drawer/Drawer';
import Header from '@/components/Header';

import { STORAGE_KEYS } from '@/constants/storage-keys.constants';

import { storageService } from '@/services/storage.service';

import './App.scss';

const App = () => {
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
		<div className='wrapper clear'>
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
					<h1 className='mb-40'>
						{searchValue
							? `Поиск по запросу: "${searchValue}"`
							: 'Все кроссовки'}
					</h1>
					<div className='search-block d-flex'>
						<img src='/img/search.svg' alt='Search' />
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							placeholder='Поиск...'
						/>
					</div>
				</section>
				<section className='items'>
					{items &&
						items
							.filter((item) => item.title.toLowerCase().includes(searchValue))
							.map((item) => (
								<Card
									key={item.id}
									{...item}
									onFavorite={onAddToFavorites}
									onPlus={onAddToCart}
								/>
							))}
				</section>
			</main>
		</div>
	);
};

export default App;
