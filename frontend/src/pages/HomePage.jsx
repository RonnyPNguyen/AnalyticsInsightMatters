import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import ViewAllOffer from "../components/ViewAllOffer";
import Footer from "../components/Footer";

const HomePage = () => {
	return (
		<section>
			<Hero />
			<div>
				<HomeCards numberOfFeatured={5} />
			</div>
		</section>
	);
};

export default HomePage;
