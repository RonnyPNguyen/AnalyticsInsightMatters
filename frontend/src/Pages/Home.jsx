import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BizListings from "../components/BizListings";
import ViewAllOffer from "../components/ViewAllOffer";
import Footer from "../components/Footer";

function Home() {
	return (
		<>
			<h1> This is the Main APP</h1>
			<Hero />
			<BizListings />
			<ViewAllOffer />
		</>
	);
}

export default Home;
