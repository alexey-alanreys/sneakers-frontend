import { useState } from 'react';

import { useFavorites } from '@/hooks/useFavorites';

import Card from '@/components/layout/card/Card';
import Drawer from '@/components/layout/drawer/Drawer';
import Header from '@/components/layout/header/Header';

import styles from './Favorites.module.css';

const Favorites = () => {
	const [cartOpened, setCartOpened] = useState(false);
	const { favorites } = useFavorites();

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<div className={styles.favorites}>
				<Header onClickCart={() => setCartOpened(!cartOpened)} />

				<main className={styles.favorites__content}>
					<section className={styles.favorites__topbar}>
						<h1 className={styles.favorites__title}>Избранное</h1>
					</section>

					<section className={styles.favorites__items}>
						{favorites &&
							favorites.map((favorite) => (
								<Card key={favorite.id} {...favorite} />
							))}
					</section>
				</main>
			</div>
		</>
	);
};

export default Favorites;
