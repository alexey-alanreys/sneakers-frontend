import { useState } from 'react';

import { useOrders } from '@/hooks/useOrders';

import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Orders.module.css';

function Orders() {
	const [cartOpened, setCartOpened] = useState(false);
	const { orders, cancelOrder } = useOrders();

	const ordersArray = Object.entries(orders || {});

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles.orders}>
				<Header onClickCart={() => setCartOpened(!cartOpened)} />

				<main className={styles.orders__content}>
					<section className={styles.orders__topbar}>
						<h1 className={styles.orders__title}>Мои заказы</h1>
					</section>

					<section className={styles.orders__list}>
						{ordersArray.length > 0 ? (
							ordersArray.map(([orderId, items]) => (
								<div key={orderId} className={styles.orderCard}>
									<div className={styles.orderCard__header}>
										<h2 className={styles.orderCard__title}>
											Заказ #{orderId.slice(0, 8)}
										</h2>
										<button
											className={styles.orderCard__cancel}
											onClick={() => cancelOrder(orderId)}
											aria-label='Отменить заказ'
										>
											<img src='/img/btn-remove.svg' alt='Cancel' />
										</button>
									</div>

									<ul className={styles.orderCard__items}>
										{items.map((item) => (
											<li key={item.id} className={styles.cartItem}>
												<div
													className={styles.cartItem__image}
													style={{ backgroundImage: `url(${item.imageUrl})` }}
												/>
												<div className={styles.cartItem__info}>
													<p>{item.title}</p>
													<b>{item.price} руб.</b>
												</div>
											</li>
										))}
									</ul>
								</div>
							))
						) : (
							<p className={styles.orders__empty}>У вас пока нет заказов.</p>
						)}
					</section>
				</main>
			</div>
		</>
	);
}

export default Orders;
