import { useState } from 'react';

import { useCart } from '@/hooks/useCart';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Orders.module.scss';

function Orders() {
	const [cartOpened, setCartOpened] = useState(false);
	const { cartItems } = useCart();

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles.orders}>
				<Header onClickCart={() => setCartOpened(!cartOpened)} />

				<main className={styles.orders__content}>
					<section className={styles.orders__topbar}>
						<h1 className={styles.orders__title}>Мои заказы</h1>
					</section>

					<section className={styles.orders__items}>
						{cartItems &&
							cartItems.map((favorite) => (
								<Card key={favorite.id} {...favorite} />
							))}
					</section>
				</main>
			</div>
		</>
	);
}

export default Orders;
