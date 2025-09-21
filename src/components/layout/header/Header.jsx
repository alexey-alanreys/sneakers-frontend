import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

const Header = ({ onClickCart }) => {
	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<a href='/' className={styles.logo}>
				<img
					className={styles.logoImage}
					width={40}
					height={40}
					src='img/logo.png'
					alt='React Sneakers Logo'
				/>
				<div className={styles.logoText}>
					<h3>React Sneakers</h3>
					<p>Магазин лучших кроссовок</p>
				</div>
			</a>

			<nav className={styles.nav}>
				<ul className={styles.navList}>
					<li
						className={`${styles.navItem}`}
						onClick={onClickCart}
						aria-label='Открыть корзину'
					>
						<img src='img/cart.svg' alt='Корзина' />
						<span>Корзина</span>
					</li>
					<li
						className={`${styles.navItem}`}
						onClick={() => navigate('/favorites')}
						aria-label='Перейти в избранное'
					>
						<img src='img/heart.svg' alt='Избранное' />
						<span>Избранное</span>
					</li>
					<li
						className={`${styles.navItem}`}
						onClick={() => navigate('/orders')}
						aria-label='Перейти в заказы'
					>
						<img src='img/user.svg' alt='Профиль' />
						<span>Заказы</span>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
