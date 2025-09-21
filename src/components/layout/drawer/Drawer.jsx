import { useState } from 'react';

import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';

import styles from './Drawer.module.scss';

const Drawer = ({ onClose }) => {
	const [isOrderCompleted, setIsOrderCompleted] = useState(false);
	const { cartItems, removeFromCart } = useCart();
	const { createOrder } = useOrders();

	const totalAmount = cartItems.reduce((sum, item) => +item.price + sum, 0);
	const tax = totalAmount * 0.13;

	const handleCreateOrder = () => {
		const orderId = crypto.randomUUID();
		createOrder(orderId, cartItems);

		cartItems.forEach(({ id }) => removeFromCart(id));
		setIsOrderCompleted(true);
	};

	const renderEmptyState = (title, text, imgSrc) => (
		<div className={styles.cartEmpty}>
			<img
				className={styles.cartEmpty__image}
				width={120}
				src={imgSrc}
				alt={title}
			/>
			<h2 className={styles.cartEmpty__title}>{title}</h2>
			<p className={styles.cartEmpty__text}>{text}</p>
			<button
				className={styles.cartEmpty__button}
				onClick={onClose}
				aria-label='Закрыть корзину'
			>
				<img src='img/arrow.svg' alt='Arrow' />
				Вернуться назад
			</button>
		</div>
	);

	const renderCartItems = () => (
		<>
			<ul className={styles.drawer__items}>
				{cartItems.map((item) => (
					<li key={item.id} className={styles.cartItem}>
						<div
							className={styles.cartItem__image}
							style={{ backgroundImage: `url(${item.imageUrl})` }}
						/>
						<div className={styles.cartItem__info}>
							<p>{item.title}</p>
							<b>{item.price} руб.</b>
						</div>
						<button
							type='button'
							className={styles.cartItem__remove}
							onClick={() => removeFromCart(item.id)}
							aria-label='Удалить товар из корзины'
						>
							<img src='img/btn-remove.svg' alt='Удалить' />
						</button>
					</li>
				))}
			</ul>

			<div className={styles.cartTotalBlock}>
				<ul>
					<li>
						<span>Итого:</span>
						<div />
						<b>{totalAmount.toFixed(2)} руб.</b>
					</li>
					<li>
						<span>НДФЛ 13%:</span>
						<div />
						<b>{tax.toFixed(2)} руб.</b>
					</li>
				</ul>
				<button
					className={styles.cartTotalBlock__button}
					onClick={handleCreateOrder}
					aria-label='Оформить заказ'
				>
					Оформить заказ <img src='img/arrow.svg' alt='Arrow' />
				</button>
			</div>
		</>
	);

	const renderContent = () => {
		if (isOrderCompleted) {
			return renderEmptyState(
				'Заказ оформлен',
				'Ваш заказ скоро будет передан курьерской доставке.',
				'img/complete-order.jpg',
			);
		}

		if (!cartItems.length) {
			return renderEmptyState(
				'Корзина пустая',
				'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.',
				'img/empty-cart.jpg',
			);
		}

		return renderCartItems();
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
				<header className={styles.drawer__header}>
					<h2 className={styles.drawer__title}>Корзина</h2>
					<button
						type='button'
						className={styles.drawer__close}
						onClick={onClose}
						aria-label='Закрыть корзину'
					>
						<img src='img/btn-remove.svg' alt='Close' />
					</button>
				</header>

				{renderContent()}
			</aside>
		</div>
	);
};

export default Drawer;
