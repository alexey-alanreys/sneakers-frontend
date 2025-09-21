import ContentLoader from 'react-content-loader';

import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

import styles from './Card.module.css';

const Card = ({ id, title, imageUrl, price }) => {
	const { cartItems, toggleInCart } = useCart();
	const { favorites, toggleFavorite } = useFavorites();

	if (!id) {
		return (
			<div className={styles['card']}>
				<ContentLoader
					speed={2}
					width={155}
					height={226}
					viewBox='0 0 155 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='10' rx='10' ry='10' width='155' height='140' />
					<rect x='0' y='180' rx='5' ry='5' width='155' height='14' />
					<rect x='0' y='198' rx='5' ry='5' width='100' height='14' />
					<rect x='0' y='234' rx='5' ry='5' width='80' height='30' />
					<rect x='124' y='234' rx='10' ry='10' width='32' height='30' />
				</ContentLoader>
			</div>
		);
	}

	const item = { id, title, imageUrl, price };
	const isFavorite = favorites.some((fav) => fav.id === id);
	const isInCart = cartItems.some((cartItem) => cartItem.id === id);

	return (
		<div className={styles['card']}>
			<button
				className={styles['card-favorite']}
				onClick={() => toggleFavorite(item)}
				aria-label='Добавить в избранное'
			>
				<img src={isFavorite ? 'images/liked.svg' : 'images/unliked.svg'} />
			</button>

			<img className={styles['card-image']} src={imageUrl} alt={title} />
			<h5 className={styles['card-title']}>{title}</h5>

			<div className={styles['card-footer']}>
				<div className={styles['card-price']}>
					<span>Цена:</span>
					<b>{price} руб.</b>
				</div>
				<button
					className={styles['card-plus']}
					onClick={() => toggleInCart(item)}
					aria-label='Добавить в корзину'
				>
					<img
						src={isInCart ? 'images/btn-checked.svg' : 'images/btn-plus.svg'}
					/>
				</button>
			</div>
		</div>
	);
};

export default Card;
