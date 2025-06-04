import { useState, useEffect, use } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Disclaimer from "../components/Disclaimer";
import NewListing from "../components/NewListing";

const ListingsPage = () => {
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchOffers = async () => {
			try {
				const res = await fetch("/api/offers");
				const data = await res.json();
				setOffers(data);
			} catch (error) {
				console.error("Error fetching offers:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchOffers();
	}, []);

	const latestOffers = offers
		.slice()
		.sort((a, b) => new Date(b.DateAdded) - new Date(a.DateAdded));

	const biggestOffers = latestOffers
		.slice()
		.sort((a, b) => b.AskingPrice - a.AskingPrice);

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
			{offers ? (
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
					{sortedOffers.map((offer) => (
						<Card key={offer.id} data={offer} />
					))}
				</div>
			) : (
				Spinner({ loading: loading })
			)}
			<NewListing />
		</section>
	);
};

export default ListingsPage;
