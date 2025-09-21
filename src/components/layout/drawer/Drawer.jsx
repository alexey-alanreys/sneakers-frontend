import { useState } from 'react';

import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';

import styles from './Drawer.module.css';

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
		<div className={styles['cart-empty']}>
			<img
				className={styles['cart-empty-image']}
				width={120}
				src={imgSrc}
				alt={title}
			/>
			<h2 className={styles['cart-empty-title']}>{title}</h2>
			<p className={styles['cart-empty-text']}>{text}</p>
			<button
				className={styles['cart-empty-button']}
				onClick={onClose}
				aria-label='Закрыть корзину'
			>
				<img
					className={styles['cart-empty-button-icon']}
					src='img/arrow.svg'
					alt='Стрелка'
				/>
				Закрыть корзину
			</button>
		</div>
	);

	const renderCartItems = () => (
		<>
			<ul className={styles['drawer-items']}>
				{cartItems.map((item) => (
					<li key={item.id} className={styles['cart-item']}>
						<div
							className={styles['cart-item-image']}
							style={{ backgroundImage: `url(${item.imageUrl})` }}
						/>
						<div className={styles['cart-item-info']}>
							<p>{item.title}</p>
							<b>{item.price} руб.</b>
						</div>
						<button
							type='button'
							className={styles['cart-item-remove']}
							onClick={() => removeFromCart(item.id)}
							aria-label='Удалить товар из корзины'
						>
							<img
								className={styles['cart-item-remove-icon']}
								src='img/btn-remove.svg'
								alt='Удалить'
							/>
						</button>
					</li>
				))}
			</ul>

			<div className={styles['cart-total-block']}>
				<ul>
					<li>
						<span>Итого:</span>
						<div />
						<b>{totalAmount.toFixed(2)} руб.</b>
					</li>
					<li>
						<span>НДС 13%:</span>
						<div />
						<b>{tax.toFixed(2)} руб.</b>
					</li>
				</ul>
				<button
					className={styles['cart-total-block-button']}
					onClick={handleCreateOrder}
					aria-label='Оформить заказ'
				>
					Оформить заказ{' '}
					<img
						className={styles['cart-total-block-button-icon']}
						src='img/arrow.svg'
						alt='Стрелка'
					/>
				</button>
			</div>
		</>
	);

	const renderContent = () => {
		if (isOrderCompleted) {
			return renderEmptyState(
				'Заказ оформлен',
				'Ваш заказ скоро будет передан курьерской доставке',
				'img/grinning-face.svg',
			);
		}

		if (!cartItems.length) {
			return renderEmptyState(
				'Корзина пустая',
				'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ',
				'img/anxious-face.svg',
			);
		}

		return renderCartItems();
	};

	return (
		<div className={styles['overlay']} onClick={onClose}>
			<aside className={styles['drawer']} onClick={(e) => e.stopPropagation()}>
				<header className={styles['drawer-header']}>
					<h2 className={styles['drawer-title']}>Корзина</h2>
					<button
						type='button'
						className={styles['drawer-close']}
						onClick={onClose}
						aria-label='Закрыть корзину'
					>
						<img
							className={styles['drawer-close-icon']}
							src='img/btn-remove.svg'
							alt='Закрыть'
						/>
					</button>
				</header>

				{renderContent()}
			</aside>
		</div>
	);
};

export default Drawer;
