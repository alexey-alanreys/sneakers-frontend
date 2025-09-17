import Card from '@/components/Card/Card';
import Drawer from '@/components/Drawer/Drawer';
import Header from '@/components/Header';

import './App.scss';

const App = () => {
	return (
		<div className='wrapper clear'>
			<Drawer />
			<Header />
			<div className='content p-40'>
				<h1 className='mb-40'>Все кроссовки</h1>

				<div className='d-flex'>
					<Card />
					<Card />
				</div>
			</div>
		</div>
	);
};

export default App;
