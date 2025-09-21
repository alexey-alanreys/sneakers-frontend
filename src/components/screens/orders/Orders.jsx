import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GreenButton from '@/components/ui/green-button/GreenButton';

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
		<div className={styles['orders-empty']}>
			<img
				className={styles['orders-empty-image']}
				width={120}
				src='img/crying-face.svg'
				alt='Нет заказов'
			/>
			<h2 className={styles['orders-empty-title']}>У вас нет заказов</h2>
			<p className={styles['orders-empty-text']}>
				Вернитесь на главную и оформите новый заказ
			</p>
			<GreenButton onClick={() => navigate('/')} size='300px'>
				Вернуться на главную
			</GreenButton>
		</div>
	);

	const renderOrderCard = (orderId, items) => (
		<div key={orderId} className={styles['order-card']}>
			<header className={styles['order-card-header']}>
				<h2 className={styles['order-card-title']}>
					Заказ #{orderId.slice(0, 8)}
				</h2>
				<button
					type='button'
					className={styles['order-card-cancel']}
					onClick={() => cancelOrder(orderId)}
					aria-label='Отменить заказ'
				>
					<img src='/img/btn-remove.svg' alt='' />
				</button>
			</header>

			<ul className={styles['order-card-items']}>
				{items.map(({ id, imageUrl, title, price }) => (
					<li key={id} className={styles['cart-item']}>
						<div
							className={styles['cart-item-image']}
							style={{ backgroundImage: `url(${imageUrl})` }}
						/>
						<div className={styles['cart-item-info']}>
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

			<div className={styles['orders']}>
				<Header onClickCart={handleToggleCart} />

				<main className={styles['orders-content']}>
					<h1 className={styles['orders-title']}>Мои заказы</h1>

					{ordersArray.length === 0 ? (
						renderEmptyState()
					) : (
						<section className={styles['orders-list']}>
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
