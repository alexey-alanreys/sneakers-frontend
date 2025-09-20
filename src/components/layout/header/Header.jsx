import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

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
					<li className={`${styles.navItem}`} onClick={onClickCart}>
						<img src='img/cart.svg' alt='Корзина' />
						<span>12 999 руб.</span>
					</li>
					<li
						className={`${styles.navItem}`}
						onClick={() => navigate('/favorites')}
					>
						<img src='img/heart.svg' alt='Закладки' />
						<span>Закладки</span>
					</li>
					<li
						className={`${styles.navItem}`}
						onClick={() => navigate('/orders')}
					>
						<img src='img/user.svg' alt='Профиль' />
						<span>Профиль</span>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
