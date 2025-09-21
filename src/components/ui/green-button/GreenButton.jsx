import styles from './GreenButton.module.css';

const GreenButton = ({
	children,
	onClick = null,
	direction = 'left',
	textSize = 'small',
	size = '100%',
}) => {
	return (
		<button
			className={`${styles['green-button']}`}
			style={{ width: size }}
			onClick={onClick}
		>
			<div className={styles['button-content']}>
				{direction === 'left' && (
					<img
						className={`${styles['green-button-icon']} ${styles.left}`}
						src='img/arrow.svg'
						alt='arrow'
					/>
				)}

				<span className={styles[textSize]}>{children}</span>

				{direction === 'right' && (
					<img
						className={`${styles['green-button-icon']} ${styles.right}`}
						src='img/arrow.svg'
						alt='arrow'
					/>
				)}
			</div>
		</button>
	);
};

export default GreenButton;
