import Hero from "../components/Hero";
import FeaturedCards from "../components/FeaturedCards";
import ViewAllOffer from "../components/ViewAllOffer";
import StakeHolderCards from "../components/StakeHolderCards";

const HomePage = () => {
	return (
		<section>
			<Hero />
			<StakeHolderCards />
			<FeaturedCards numberOfFeatured={4} />
			<ViewAllOffer />
		</section>
	);
};

export default HomePage;
