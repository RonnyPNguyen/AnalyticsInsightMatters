import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BizListings from "../components/BizListings";
import ViewAllOffer from "../components/ViewAllOffer";
import Footer from "../components/Footer";

import React from "react";

const HomePage = () => {
	return (
		<div>
			<Navbar />
			<Hero />
			<BizListings />
			<ViewAllOffer />
			<Footer />
		</div>
	);
};

export default HomePage;
