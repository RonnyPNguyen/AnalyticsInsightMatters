import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

import MainLayOut from "./assets/layouts/MainLayOut";
import Home from "./pages/Home";
import About from "./pages/About";
import Listings from "./pages/Listings";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayOut />}>
			<Route index="/" element={<Home />}></Route>
			<Route path="/about" element={<About />}></Route>
			<Route path="/listings" element={<Listings />}></Route>
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
