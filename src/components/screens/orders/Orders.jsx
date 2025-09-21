import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrders } from '@/hooks/useOrders';

import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Orders.module.css';

function Orders() {
	const [cartOpened, setCartOpened] = useState(false);
	const { orders, cancelOrder } = useOrders();

	const navigate = useNavigate();

	const ordersArray = Object.entries(orders || {});

	const handleToggleCart = () => setCartOpened((prev) => !prev);

	const renderEmptyState = () => (
		<div className={styles.ordersEmpty}>
			<img
				className={styles.ordersEmpty__image}
				width={120}
				src='img/crying-face.svg'
				alt='Нет заказов'
			/>
			<h2 className={styles.ordersEmpty__title}>У вас нет заказов</h2>
			<p className={styles.ordersEmpty__text}>
				Вернитесь на главную и оформите новый заказ
			</p>
			<button
				type='button'
				className={styles.ordersEmpty__button}
				onClick={() => navigate('/')}
				aria-label='Вернуться на главную'
			>
				<img src='img/arrow.svg' alt='Arrow' />
				Вернуться на главную
			</button>
		</div>
	);

	const renderOrderCard = (orderId, items) => (
		<div key={orderId} className={styles.orderCard}>
			<header className={styles.orderCard__header}>
				<h2 className={styles.orderCard__title}>
					Заказ #{orderId.slice(0, 8)}
				</h2>
				<button
					type='button'
					className={styles.orderCard__cancel}
					onClick={() => cancelOrder(orderId)}
					aria-label='Отменить заказ'
				>
					<img src='/img/btn-remove.svg' alt='' />
				</button>
			</header>

			<ul className={styles.orderCard__items}>
				{items.map(({ id, imageUrl, title, price }) => (
					<li key={id} className={styles.cartItem}>
						<div
							className={styles.cartItem__image}
							style={{ backgroundImage: `url(${imageUrl})` }}
						/>
						<div className={styles.cartItem__info}>
							<p>{title}</p>
							<b>{price} руб.</b>
						</div>
					</li>
				))}
			</ul>
		</div>
	);

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles.orders}>
				<Header onClickCart={handleToggleCart} />

				<main className={styles.orders__content}>
					<section className={styles.orders__topbar}>
						<h1 className={styles.orders__title}>Мои заказы</h1>
					</section>

					{ordersArray.length === 0 ? (
						renderEmptyState()
					) : (
						<section className={styles.orders__list}>
							{ordersArray.map(([orderId, items]) =>
								renderOrderCard(orderId, items),
							)}
						</section>
					)}
				</main>
			</div>
		</>
	);
}

export default Orders;
