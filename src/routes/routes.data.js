import Favorites from '@/components/screens/favorites/Favorites';
import Home from '@/components/screens/home/Home';
import Orders from '@/components/screens/orders/Orders';

export const routes = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/favorites',
		component: Favorites,
	},
	{
		path: '/orders',
		component: Orders,
	},
];
