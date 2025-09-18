import styles from './Drawer.module.scss';

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
	return (
		<div className={styles.overlay}>
			<div className={styles.drawer}>
				<h2 className='d-flex justify-between mb-30'>
					Корзина{' '}
					<img
						className='cu-p'
						onClick={onClose}
						src='img/btn-remove.svg'
						alt='Close'
					/>
				</h2>
				<div className='d-flex flex-column flex'>
					<div className='items flex'>
						{items.map((item) => (
							<div key={item.id} className='cartItem d-flex align-center mb-20'>
								<div
									style={{ backgroundImage: `url(${item.imageUrl})` }}
									className='cartItemImg'
								></div>

								<div className='mr-20 flex'>
									<p className='mb-5'>{item.title}</p>
									<b>{item.price} руб.</b>
								</div>
								<img
									onClick={() => onRemove(item.id)}
									className='removeBtn'
									src='img/btn-remove.svg'
									alt='Remove'
								/>
							</div>
						))}
					</div>
					<div className='cartTotalBlock'>
						{/* <ul>
							<li>
								<span>Итого:</span>
								<div></div>
								<b>{totalPrice} руб. </b>
							</li>
							<li>
								<span>Налог 5%:</span>
								<div></div>
								<b>{(totalPrice / 100) * 5} руб. </b>
							</li>
						</ul>
						<button
							disabled={isLoading}
							onClick={onClickOrder}
							className='greenButton'
						>
							Оформить заказ <img src='img/arrow.svg' alt='Arrow' />
						</button> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Drawer;
