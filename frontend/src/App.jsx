import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import MainLayOut from "./layouts/MainLayOut";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayOut />}>
			<Route index="/" element={<HomePage />}></Route>
			<Route path="/about" element={<AboutPage />}></Route>
			<Route path="/listings" element={<ListingsPage />}></Route>
			<Route path="login" element={<LoginPage />}></Route>
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
