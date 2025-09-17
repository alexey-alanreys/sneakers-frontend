import React from 'react';

import styles from './Card.module.scss';

const Card = () => {
	return (
		<div className={styles.card}>
			<>
				<div className={styles.favorite}>
					<img src={'img/liked.svg'} alt='Unliked' />
				</div>
				<img
					width='100%'
					height={135}
					src={'/img/sneakers/1.jpg'}
					alt='Sneakers'
				/>
				<h5>{}</h5>
				<div className='d-flex justify-between align-center'>
					<div className='d-flex flex-column'>
						<span>Цена:</span>
						<b>{550} руб.</b>
					</div>
					<img className={styles.plus} src={'img/btn-checked.svg'} alt='Plus' />
				</div>
			</>
		</div>
	);
};

export default Card;
