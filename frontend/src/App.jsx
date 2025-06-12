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
import ListingPage, { serverLoader } from "./pages/ListingPage";
import DocumentationPage from "./pages/DocumentationPage";
import NewListing from "./pages/NewListing";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayOut />}>
			<Route index="/" element={<HomePage />}></Route>
			<Route path="/about" element={<AboutPage />}></Route>
			<Route
				path="/listings/:id"
				element={<ListingPage />}
				loader={serverLoader}
			></Route>
			<Route path="/listings" element={<ListingsPage />}></Route>
			<Route path="/login" element={<LoginPage />}></Route>
			<Route path="/documentation" element={<DocumentationPage />}></Route>
			<Route path="/new-listing" element={<NewListing />}></Route>
		</Route>
	)
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
