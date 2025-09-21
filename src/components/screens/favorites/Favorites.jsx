import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GreenButton from '@/components/ui/green-button/GreenButton';

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
		<div className={styles['favorites-empty']}>
			<img
				className={styles['favorites-empty-image']}
				width={120}
				src='img/sad-face.svg'
				alt='Нет избранного'
			/>
			<h2 className={styles['favorites-empty-title']}>У вас нет избранного</h2>
			<p className={styles['favorites-empty-text']}>
				Вернитесь на главную и добавьте кроссовки в избранное
			</p>
			<GreenButton onClick={() => navigate('/')} size='300px'>
				Вернуться на главную
			</GreenButton>
		</div>
	);

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles['favorites']}>
				<Header onClickCart={handleToggleCart} />

				<main className={styles['favorites-content']}>
					<h1 className={styles['favorites-title']}>Избранное</h1>

					{favorites.length === 0 ? (
						renderEmptyState()
					) : (
						<section className={styles['favorites-items']}>
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
