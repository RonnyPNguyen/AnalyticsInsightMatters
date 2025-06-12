import Hero from "../components/Hero";
import StakeHolderCards from "../components/StakeHolderCards";
import FeaturedCards from "../components/FeaturedCards";
import ViewAllListings from "../components/ViewAllListings";
// import { serverDataLoader } from "./ListingsPage";

const HomePage = () => {
	return (
		<section>
			<Hero />
			<StakeHolderCards />
			<FeaturedCards numberOfFeatured={2} />
			<ViewAllListings />
		</section>
	);
};

export default HomePage;
