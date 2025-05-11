import { HashRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import BizListings from "./components/BizListings";
import ViewAllOffer from "./components/ViewAllOffer";

// Pages
import About from "./pages/About";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";

function App() {
	return (
		<>
			<h1> This is the Main APP</h1>
			<Navbar />
			<Hero />
			<BizListings />
			<ViewAllOffer />
			<Footer />
		</>
	);
}

export default App;
