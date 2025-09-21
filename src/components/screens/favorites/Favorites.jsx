import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFavorites } from '@/hooks/useFavorites';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Favorites.module.css';

const Favorites = () => {
	const [cartOpened, setCartOpened] = useState(false);
	const { favorites } = useFavorites();

	const navigate = useNavigate();

	const handleToggleCart = () => setCartOpened((prev) => !prev);

	const renderEmptyState = () => (
		<div className={styles.favoritesEmpty}>
			<img
				className={styles.favoritesEmpty__image}
				width={120}
				src='img/sad-face.svg'
				alt='Нет избранного'
			/>
			<h2 className={styles.favoritesEmpty__title}>У вас нет избранного</h2>
			<p className={styles.favoritesEmpty__text}>
				Вернитесь на главную и добавьте кроссовки в избранное
			</p>
			<button
				type='button'
				className={styles.favoritesEmpty__button}
				onClick={() => navigate('/')}
				aria-label='Вернуться на главную'
			>
				<img src='img/arrow.svg' />
				Вернуться на главную
			</button>
		</div>
	);

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles.favorites}>
				<Header onClickCart={handleToggleCart} />

				<main className={styles.favorites__content}>
					<section className={styles.favorites__topbar}>
						<h1 className={styles.favorites__title}>Избранное</h1>
					</section>

					{favorites.length === 0 ? (
						renderEmptyState()
					) : (
						<section className={styles.favorites__items}>
							{favorites.map((favorite) => (
								<Card key={favorite.id} {...favorite} />
							))}
						</section>
					)}
				</main>
			</div>
		</>
	);
};

export default Favorites;
