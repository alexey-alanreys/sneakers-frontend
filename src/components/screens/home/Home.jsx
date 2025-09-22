import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import Layout from '@/components/layout/Layout';
import Card from '@/components/layout/card/Card';

import { ITEMS_API_URL } from '@/constants/api.constants';

import styles from './Home.module.css';

const Home = () => {
	const [items, setItems] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [showSkeleton, setShowSkeleton] = useState(false);

	const { data, loading, error } = useFetch(ITEMS_API_URL);

	useEffect(() => {
		if (data?.length) setItems(data);
	}, [data]);

	useEffect(() => {
		if (loading) {
			setShowSkeleton(true);
		} else {
			const timeout = setTimeout(() => setShowSkeleton(false), 500);
			return () => clearTimeout(timeout);
		}
	}, [loading]);

	const onChangeSearchInput = (event) => setSearchValue(event.target.value);

	const visibleItems =
		!showSkeleton && !error
			? items.filter((item) =>
					item.title.toLowerCase().includes(searchValue.toLowerCase()),
				)
			: [];

	return (
		<Layout>
			<main className={styles['home']}>
				<section className={styles['home-topbar']}>
					<h1 className={styles['home-title']}>
						{searchValue
							? `Результаты поиска для "${searchValue}"`
							: 'Все кроссовки'}
					</h1>
					<div className={styles['search']}>
						<img
							src={`${import.meta.env.BASE_URL}images/search.svg`}
							alt='Search'
							className={styles['search-icon']}
						/>
						<input
							onChange={onChangeSearchInput}
							value={searchValue}
							placeholder='Поиск...'
							className={styles['search-input']}
						/>
					</div>
				</section>

				<section className={styles['home-items']}>
					{showSkeleton &&
						Array.from({ length: 12 }, (_, i) => <Card key={i} />)}

					{error && <p>Произошла ошибка загрузки товаров</p>}

					{visibleItems.map((item) => (
						<Card key={item.id} {...item} />
					))}
				</section>
			</main>
		</Layout>
	);
};

export default Home;
