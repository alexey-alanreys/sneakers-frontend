import { useNavigate } from 'react-router-dom';

import CrossButton from '@/components/ui/cross-button/CrossButton';
import GreenButton from '@/components/ui/green-button/GreenButton';

import { useOrders } from '@/hooks/useOrders';

import Layout from '@/components/layout/Layout';

import styles from './Orders.module.css';

const Orders = () => {
	const { orders, cancelOrder } = useOrders();

	const navigate = useNavigate();

	const ordersArray = Object.entries(orders || {});

	const renderEmptyState = () => (
		<div className={styles['orders-empty']}>
			<img
				className={styles['orders-empty-image']}
				width={120}
				src={`${import.meta.env.BASE_URL}images/crying-face.svg`}
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
				<CrossButton onClick={() => cancelOrder(orderId)}></CrossButton>
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
		<Layout>
			<main className={styles['orders']}>
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
		</Layout>
	);
};

export default Orders;
