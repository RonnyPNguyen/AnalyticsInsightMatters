import { useState, useEffect, use } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import Disclaimer from "../components/Disclaimer";

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
	const loadedOffers = view === "latest" ? latestOffers : biggestOffers;

	return (
		<div className="lg:px-40">
			<div className="font-writing text-white text-center pt-20">
				<p className="text-4xl font-light py-0">Business Listings</p>
				<p className="text-base font-light text-gray-500">
					Explore our selected offers for sale.
				</p>
				<Disclaimer />
			</div>
			<div className="font-writing flex flex-row justify-center py-2">
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
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6">
					{loadedOffers.map((offer) => (
						<Card key={offer.id} offer={offer} className="" />
					))}
				</div>
			)}
		</div>
	);
};

export default ListingsPage;
