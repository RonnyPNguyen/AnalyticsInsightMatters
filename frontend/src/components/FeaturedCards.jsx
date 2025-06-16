import Card from "./Card";
import { useState, useEffect } from "react";

const FeaturedCards = ({ numberOfFeatured = 4 }) => {
	const [loading, setLoading] = useState(true);
	const [listingsData, setListingsData] = useState([]);
	const [marketData, setMarketData] = useState();
	useEffect(() => {
		const serverData = async () => {
			try {
				const [listingsRes, marketRes] = await Promise.all([
					fetch(
						"https://busy-analytics-server.s3.us-east-1.amazonaws.com/data/listingsData.json"
					),
					fetch(
						"https://busy-analytics-server.s3.us-east-1.amazonaws.com/data/marketData.json"
					),
				]);
				const listingsJson = await listingsRes.json();
				const marketJson = await marketRes.json();

				setListingsData(listingsJson);
				setMarketData(marketJson);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		serverData();
	}, []);

	const RecentOffers = listingsData.slice(0, numberOfFeatured);

	return (
		<section className="2xl:px-30">
			<p className="text-center text-white font-writing font-thin text-4xl py-10">
				Featured Listings
			</p>
			{listingsData ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
					{RecentOffers.map((offer) => (
						<Card key={offer.id} listingsData={offer} marketData={marketData} />
					))}
				</div>
			) : (
				<div>Loading</div>
			)}
		</section>
	);
};

export default FeaturedCards;
