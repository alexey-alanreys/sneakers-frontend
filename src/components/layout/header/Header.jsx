import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes.constants';

import styles from './Header.module.css';

const Header = ({ onClickCart }) => {
	const navigate = useNavigate();

	return (
		<header className={styles['header']}>
			<div
				className={styles['logo']}
				onClick={() => navigate(ROUTES.HOME)}
				style={{ cursor: 'pointer' }}
				aria-label='Перейти на главную'
			>
				<img
					className={styles['logo-image']}
					width={40}
					height={40}
					src={`${import.meta.env.BASE_URL}images/logo.png`}
					alt='React Sneakers Logo'
				/>
				<div className={styles['logo-text']}>
					<h3>React Sneakers</h3>
					<p>Магазин лучших кроссовок</p>
				</div>
			</div>

			<nav className={styles['nav']}>
				<ul className={styles['nav-list']}>
					<li
						className={styles['nav-item']}
						onClick={onClickCart}
						aria-label='Открыть корзину'
					>
						<img
							src={`${import.meta.env.BASE_URL}images/cart.svg`}
							alt='Корзина'
						/>
						<span>Корзина</span>
					</li>
					<li
						className={styles['nav-item']}
						onClick={() => navigate(ROUTES.FAVORITES)}
						aria-label='Перейти в избранное'
					>
						<img
							src={`${import.meta.env.BASE_URL}images/heart.svg`}
							alt='Избранное'
						/>
						<span>Избранное</span>
					</li>
					<li
						className={styles['nav-item']}
						onClick={() => navigate(ROUTES.ORDERS)}
						aria-label='Перейти в заказы'
					>
						<img
							src={`${import.meta.env.BASE_URL}images/orders.svg`}
							alt='Заказы'
						/>
						<span>Заказы</span>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
