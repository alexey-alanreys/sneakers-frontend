import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';

export const AppProviders = ({ children }) => (
	<FavoritesProvider>
		<CartProvider>{children}</CartProvider>
	</FavoritesProvider>
);
