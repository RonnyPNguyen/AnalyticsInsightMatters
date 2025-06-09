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
				const res = await fetch(
					"https://busyanalytics.s3.us-east-1.amazonaws.com/data/listingsJun.json"
				);
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
		<section className="2xl:px-30">
			<p className="text-center text-white font-writing font-thin text-4xl py-10">
				Featured Listings
			</p>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
					{RecentOffers.map((offer) => (
						<Card key={offer.id} data={offer} />
					))}
				</div>
			)}
		</section>
	);
};

export default FeaturedCards;
