import { useState, useEffect } from "react";
import Card from "../components/Card";
import Disclaimer from "../components/Disclaimer";
import NewListing from "../components/NewListing";

const ListingsPage = () => {
	const [loading, setLoading] = useState(true);
	const [listingsData, setListingsData] = useState([]);
	const [marketData, setMarketData] = useState();
	useEffect(() => {
		const serverData = async () => {
			try {
				const [listingsRes, marketRes] = await Promise.all([
					fetch("api/data/listingsData.json"),
					fetch("api/data/marketData.json"),
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

	const latestOffers = listingsData
		.slice()
		.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
	const biggestOffers = latestOffers
		.slice()
		.sort((a, b) => b.askingPrice - a.askingPrice);

	const [view, setView] = useState("latest");
	const sortedOffers = view === "latest" ? latestOffers : biggestOffers;

	return (
		<section className="2xl:px-30">
			<div className="h-8"></div>
			<div className="font-writing text-white text-center h-60 flex flex-col justify-center">
				<p className="text-4xl font-light">Business Listings</p>
				<p className="text-base font-light text-gray-500">
					Explore our selected offers for sale.
				</p>
				<Disclaimer />
			</div>
			<div className="font-writing flex flex-row justify-center h-8">
				<p className="py-1 text-white font-thin mr-2">Sort by:</p>
				<select
					value={view}
					onChange={(e) => setView(e.target.value)}
					className="px-4 py-1 bg-[#111111] rounded-md text-gray-200 font-thin text-center focus:ring-2 focus:ring-blue-400"
				>
					<option value="latest">Latest Date</option>
					<option value="biggest">Asking Price</option>
				</select>
			</div>
			{sortedOffers ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
					{sortedOffers.map((offer) => (
						<Card key={offer.id} listingsData={offer} marketData={marketData} />
					))}
				</div>
			) : (
				<div>Loading...</div>
			)}
			<NewListing />
		</section>
	);
};

export default ListingsPage;
