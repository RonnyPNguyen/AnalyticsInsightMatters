import Hero from "../components/Hero";
import StakeHolderCards from "../components/StakeHolderCards";
// import FeaturedCards from "../components/FeaturedCards";
import ViewAllOffer from "../components/ViewAllOffer";
// import { serverDataLoader } from "./ListingsPage";

const HomePage = () => {
	return (
		<section>
			<Hero />
			<StakeHolderCards />
			{/* <FeaturedCards numberOfFeatured={2} loader={serverDataLoader} /> */}
			<ViewAllOffer />
		</section>
	);
};

export default HomePage;
