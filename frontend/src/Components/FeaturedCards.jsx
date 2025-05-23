import { useState, useEffect } from "react";
// import offers from "../data/businessData.json";
import Card from "./Card";
import Spinner from "./Spinner";

const FeaturedCards = ({ numberOfFeatured = 4 }) => {
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const res = await fetch("/api/offers");
				const data = await res.json();
				setOffers(data);
				console.log("Data fetched:");
			} catch (error) {
				console.error("Error fetching offers:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchOffers();
	}, []);

	const RecentOffers = offers.slice(0, numberOfFeatured);

	return (
		<section className="py-10">
			<p className="text-center text-white font-inter font-thin text-4xl">
				Featured Listings
			</p>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 py-5 px-5">
					{RecentOffers.map((offer) => (
						<Card key={offer.id} offer={offer} className="" />
					))}
				</div>
			)}
		</section>
	);
};

export default FeaturedCards;
