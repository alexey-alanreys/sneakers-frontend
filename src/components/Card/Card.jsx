import { useState } from 'react';

import styles from './Card.module.scss';

const Card = ({ id, title, imageUrl, price, onFavorite, onPlus }) => {
	const [isAdded, setIsAdded] = useState(false);

	return (
		<div className={styles.card}>
			<>
				<div className={styles.favorite} onClick={onFavorite}>
					<img src={'img/unliked.svg'} alt='Unliked' />
				</div>
				<img width='100%' height={135} src={imageUrl} alt='Sneakers' />
				<h5>{title}</h5>
				<div className='d-flex justify-between align-center'>
					<div className='d-flex flex-column align-start'>
						<span className='mb-5'>Цена:</span>
						<b>{price} руб.</b>
					</div>
					<img
						className={styles.plus}
						onClick={() => setIsAdded(!isAdded)}
						src={isAdded ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
						alt='Plus'
					/>
				</div>
			</>
		</div>
	);
};

export default Card;
