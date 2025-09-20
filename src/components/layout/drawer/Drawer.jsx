import styles from './Drawer.module.scss';

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
	return (
		<div
			className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}
			onClick={onClose}
		>
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

				{items.length > 0 ? (
					<>
						<ul className={styles.drawer__items}>
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
									<button
										type='button'
										className={styles.cartItem__remove}
										onClick={() => onRemove(item.id)}
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
									<b>12 999 руб. </b>
								</li>
								<li>
									<span>НДФЛ 13%:</span>
									<div />
									<b>{((12999 * 13) / 100).toFixed(0)} руб.</b>
								</li>
							</ul>
							<button className={styles.greenButton}>
								Оформить заказ <img src='img/arrow.svg' alt='Arrow' />
							</button>
						</div>
					</>
				) : (
					<div className={styles.cartEmpty}>
						<img width='120' src='img/empty-cart.jpg' alt='Empty cart' />
						<h2 className={styles.cartEmpty__title}>Корзина пустая</h2>
						<p className={styles.cartEmpty__text}>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button className={styles.greenButton} onClick={onClose}>
							<img src='img/arrow.svg' alt='Arrow' />
							Вернуться назад
						</button>
					</div>
				)}
			</aside>
		</div>
	);
};

export default Drawer;
