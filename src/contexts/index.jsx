import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import { OrdersProvider } from './OrdersContext';

export const AppProviders = ({ children }) => (
	<CartProvider>
		<FavoritesProvider>
			<OrdersProvider>{children}</OrdersProvider>
		</FavoritesProvider>
	</CartProvider>
);
