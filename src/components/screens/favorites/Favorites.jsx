import { useNavigate } from 'react-router-dom';

import GreenButton from '@/components/ui/green-button/GreenButton';

import { useFavorites } from '@/hooks/useFavorites';

import Layout from '@/components/layout/Layout';
import Card from '@/components/layout/card/Card';

import styles from './Favorites.module.css';

const Favorites = () => {
	const { favorites } = useFavorites();

	const navigate = useNavigate();

	const renderEmptyState = () => (
		<div className={styles['favorites-empty']}>
			<img
				className={styles['favorites-empty-image']}
				width={120}
				src={`${import.meta.env.BASE_URL}images/sad-face.svg`}
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
		<Layout>
			<main className={styles['favorites']}>
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
		</Layout>
	);
};

export default Favorites;
