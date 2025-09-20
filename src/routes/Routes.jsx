import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes.data';

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							element={<route.component />}
						/>
					);
				})}
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
