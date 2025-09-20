import axios from 'axios';
import { useEffect, useState } from 'react';

import Card from '@/components/Card/Card';
import Drawer from '@/components/Drawer/Drawer';
import Header from '@/components/Header';

import './App.scss';

const App = () => {
	const [items, setItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		axios
			.get('https://68cb88e7716562cf5073d1cb.mockapi.io/items')
			.then((res) => setItems(res.data));

		axios
			.get('https://68cb88e7716562cf5073d1cb.mockapi.io/cart')
			.then((res) => setCartItems(res.data));
	}, []);

	const onAddToFavorites = (id) => {
		setFavorites((prev) => {
			const isInFavorites = prev.some((item) => item.id === id);

			if (isInFavorites) {
				return prev.filter((item) => item.id !== id);
			} else {
				const itemToAdd = items.find((item) => item.id === id);

				axios.post(
					'https://68cb88e7716562cf5073d1cb.mockapi.io/favorites',
					itemToAdd,
				);

				return [...prev, itemToAdd];
			}
		});
	};

	const onAddToCart = (id) => {
		setCartItems((prev) => {
			const isInCart = prev.some((item) => item.id === id);

			if (isInCart) {
				return prev.filter((item) => item.id !== id);
			} else {
				const itemToAdd = items.find((item) => item.id === id);

				axios.post(
					'https://68cb88e7716562cf5073d1cb.mockapi.io/cart',
					itemToAdd,
				);

				return [...prev, itemToAdd];
			}
		});
	};

	const onRemoveItem = (id) => {
		axios.delete(`https://68cb88e7716562cf5073d1cb.mockapi.io/cart/${id}`);
		setCartItems((prev) => prev.filter((item) => item.id !== id));
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
