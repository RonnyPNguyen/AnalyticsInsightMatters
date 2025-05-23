import { useState, useEffect, use } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";

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

	return (
		<div className="">
			<div className="font-inter text-white text-center py-20">
				<p className="text-4xl py-4">BUSINESS LISTINGS</p>
				<p className="">Explore our selected offers for sale.</p>
			</div>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className="grid md:grid-cols-2 grid-cols-1 gap-6 px-6">
					{offers.map((offer) => (
						<Card key={offer.id} offer={offer} className="" />
					))}
				</div>
			)}
		</div>
	);
};

export default ListingsPage;
