import styles from './Drawer.module.scss';

const Drawer = () => {
	return (
		<div style={{ display: 'none' }} className='overlay'>
			<div className={styles.drawer}>
				<h2 className='d-flex justify-between mb-30'>
					Корзина <img className='cu-p' src='img/btn-remove.svg' alt='Close' />
				</h2>
				<div className='items flex'>
					<div className='cartItem d-flex align-center mb-20'>
						<div
							style={{ backgroundImage: `url(/img/sneakers/1.jpg)` }}
							className='cartItemImg'
						></div>

						<div className='mr-20 flex'>
							<p className='mb-5'>{}</p>
							<b>12 999 руб.</b>
						</div>
						<img className='removeBtn' src='img/btn-remove.svg' alt='Remove' />
					</div>
				</div>
				<div className='cartTotalBlock'>
					<ul>
						<li>
							<span>Итого:</span>
							<div></div>
							<b>{5000} руб. </b>
						</li>
						<li>
							<span>Налог 5%:</span>
							<div></div>
							<b>{(5000 / 100) * 5} руб. </b>
						</li>
					</ul>
					<button className='greenButton'>
						Оформить заказ <img src='img/arrow.svg' alt='Arrow' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
