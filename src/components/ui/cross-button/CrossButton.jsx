import styles from './CrossButton.module.css';

const CrossButton = ({ onClick }) => {
	return (
		<button type='button' className={styles['cross-button']} onClick={onClick}>
			<img
				className={styles['cross-button-icon']}
				src={`${import.meta.env.BASE_URL}images/btn-cross.svg`}
				alt='Cross'
			/>
		</button>
	);
};

export default CrossButton;
