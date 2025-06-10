import Card from "./Card";
import Spinner from "./Spinner";
import { useLoaderData } from "react-router-dom";

const FeaturedCards = ({ numberOfFeatured = 4 }) => {
	const { listingsData, marketData } = [];
	try {
	} catch (error) {}

	const RecentOffers = listingsData.slice(0, numberOfFeatured);

	return (
		<section className="2xl:px-30">
			<p className="text-center text-white font-writing font-thin text-4xl py-10">
				Featured Listings
			</p>
			{listingsData ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
					{RecentOffers.map((offer) => (
						<Card key={offer.id} data={offer} />
					))}
				</div>
			) : (
				<Spinner loading={true} />
			)}
		</section>
	);
};

export default FeaturedCards;
