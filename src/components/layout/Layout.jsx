import { useState } from 'react';

import styles from './Layout.module.css';
import Drawer from './drawer/Drawer';
import Header from './header/Header';

const Layout = ({ children }) => {
	const [cartOpened, setCartOpened] = useState(false);

	const handleToggleCart = () => setCartOpened((prev) => !prev);

	return (
		<>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

			<section className={styles['wrapper']}>
				<Header onClickCart={handleToggleCart} />
				{children}
			</section>
		</>
	);
};

export default Layout;
