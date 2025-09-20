import { useState } from 'react';
import ContentLoader from 'react-content-loader';

import styles from './Card.module.scss';

const Card = ({
	id,
	title,
	imageUrl,
	price,
	onFavorite,
	onPlus,
	favorited = false,
	loading = false,
}) => {
	const [isFavorite, setIsFavorite] = useState(favorited);
	const [isAdded, setIsAdded] = useState(false);

	const onClickFavorite = () => {
		setIsFavorite(!isFavorite);
		onFavorite(id);
	};

	const onClickPlus = () => {
		setIsAdded(!isAdded);
		onPlus(id);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={155}
					height={250}
					viewBox='0 0 155 265'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
					<rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
					<rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
					<rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
					<rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<button
							className={styles.card__favorite}
							onClick={onClickFavorite}
							aria-label='Добавить в закладки'
						>
							<img
								src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'}
								alt='Закладки'
							/>
						</button>
					)}
					<img className={styles.card__image} src={imageUrl} alt={title} />
					<h5 className={styles.card__title}>{title}</h5>

					<div className={styles.card__footer}>
						<div className={styles.card__price}>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && (
							<button
								className={styles.card__plus}
								onClick={onClickPlus}
								aria-label='Добавить в корзину'
							>
								<img
									src={isAdded ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
									alt='Добавить'
								/>
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Card;
