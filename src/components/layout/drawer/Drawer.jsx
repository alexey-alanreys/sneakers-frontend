import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CrossButton from '@/components/ui/cross-button/CrossButton';
import GreenButton from '@/components/ui/green-button/GreenButton';

import { useCart } from '@/hooks/useCart';
import { useOrders } from '@/hooks/useOrders';

import { ROUTES } from '@/constants/routes.constants';

import styles from './Drawer.module.css';

const Drawer = ({ onClose }) => {
	const [isOrderCompleted, setIsOrderCompleted] = useState(false);
	const { cartItems, removeFromCart } = useCart();
	const { createOrder } = useOrders();

	const navigate = useNavigate();

	const totalAmount = cartItems.reduce((sum, item) => +item.price + sum, 0);
	const tax = totalAmount * 0.13;

	const handleCreateOrder = () => {
		const orderId = crypto.randomUUID();
		createOrder(orderId, cartItems);

		cartItems.forEach(({ id }) => removeFromCart(id));
		setIsOrderCompleted(true);
	};

	const renderEmptyState = () => {
		const stateProps = isOrderCompleted
			? {
					imageSrc: 'images/grinning-face.svg',
					title: 'Заказ оформлен',
					text: 'Ваш заказ скоро будет передан курьерской доставке',
					buttonText: 'Перейти в заказы',
					onButtonClick: () => navigate(ROUTES.ORDERS),
					buttonDirection: 'right',
				}
			: {
					imageSrc: 'images/anxious-face.svg',
					title: 'Корзина пустая',
					text: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ',
					buttonText: 'Закрыть корзину',
					onButtonClick: onClose,
					buttonDirection: 'left',
				};

		return (
			<div className={styles['cart-empty']}>
				<img
					className={styles['cart-empty-image']}
					width={120}
					src={`${import.meta.env.BASE_URL}${stateProps.imageSrc}`}
					alt={stateProps.title}
				/>
				<h2 className={styles['cart-empty-title']}>{stateProps.title}</h2>
				<p className={styles['cart-empty-text']}>{stateProps.text}</p>
				{stateProps.buttonText && (
					<GreenButton
						onClick={stateProps.onButtonClick}
						direction={stateProps.buttonDirection}
					>
						{stateProps.buttonText}
					</GreenButton>
				)}
			</div>
		);
	};

	const renderCartItems = () => (
		<>
			<ul className={styles['drawer-items']}>
				{cartItems.map((item) => (
					<li key={item.id} className={styles['cart-item']}>
						<img
							className={styles['cart-item-image']}
							src={`${import.meta.env.BASE_URL}${item.imageUrl}`}
						/>

						<div className={styles['cart-item-info']}>
							<p>{item.title}</p>
							<b>{item.price} руб.</b>
						</div>
						<CrossButton onClick={() => removeFromCart(item.id)} />
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
				<GreenButton
					onClick={handleCreateOrder}
					direction='right'
					textSize='large'
				>
					Оформить заказ
				</GreenButton>
			</div>
		</>
	);

	const renderContent = () => {
		if (isOrderCompleted || !cartItems.length) return renderEmptyState();
		return renderCartItems();
	};

	return (
		<div className={styles['overlay']} onClick={onClose}>
			<aside className={styles['drawer']} onClick={(e) => e.stopPropagation()}>
				<header className={styles['drawer-header']}>
					<h2 className={styles['drawer-title']}>Корзина</h2>
					<CrossButton onClick={onClose} />
				</header>

				{renderContent()}
			</aside>
		</div>
	);
};

export default Drawer;
