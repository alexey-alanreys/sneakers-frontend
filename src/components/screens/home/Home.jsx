import { useEffect, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Home.module.scss';

const Home = () => {
	const [items, setItems] = useState([]);
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

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value);
	};

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

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
						{loading && [...Array(12)].map((_, i) => <Card key={i} />)}

						{error && <p>Произошла ошибка загрузки товаров</p>}

						{!loading &&
							items
								.filter((item) =>
									item.title.toLowerCase().includes(searchValue.toLowerCase()),
								)
								.map((item) => <Card key={item.id} {...item} />)}
					</section>
				</main>
			</div>
		</>
	);
};

export default Home;
