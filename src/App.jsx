import { useEffect, useState } from 'react';

import Card from '@/components/Card/Card';
import Drawer from '@/components/Drawer/Drawer';
import Header from '@/components/Header';

import './App.scss';

const App = () => {
	const [items, setItems] = useState([]);
	const [cartOpened, setCartOpened] = useState(false);

	useEffect(() => {
		fetch('https://68cb88e7716562cf5073d1cb.mockapi.io/items')
			.then((res) => res.json())
			.then((data) => setItems(data));
	}, []);

	return (
		<div className='wrapper clear'>
			{cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
			<Header onClickCart={() => setCartOpened(!cartOpened)} />
			<div className='content p-40'>
				<div className='d-flex align-center justify-between mb-40'>
					<h1 className='mb-40'>Все кроссовки</h1>
					<div className='search-block d-flex'>
						<img src='/img/search.svg' alt='Search' />
						<input placeholder='Поиск...' />
					</div>
				</div>
				<div className='d-flex flex-wrap justify-evenly'>
					{items.length &&
						items.map((item, index) => <Card key={index} {...item} />)}
				</div>
			</div>
		</div>
	);
};

export default App;
