import { useState, useEffect } from "react";
import Card from "../components/Card";
import List from "../components/List";
import Disclaimer from "../components/Disclaimer";
import NewListing from "../components/NewListing";
import { BsGridFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa6";

const ListingsPage = () => {
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

	const latestOffers = listingsData
		.slice()
		.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
	const biggestOffers = latestOffers
		.slice()
		.sort((a, b) => b.askingPrice - a.askingPrice);

	const [view, setView] = useState("latest");
	const sortedOffers = view === "latest" ? latestOffers : biggestOffers;

	const [layout, setLayOut] = useState("grid");
	const [gridSelected, setGridSelected] = useState(true);
	const [listSelected, setListSelected] = useState(false);

	const handleLayoutChange = (newLayout) => {
		if (layout === newLayout) return;
		setLayOut(newLayout);
		setGridSelected(!gridSelected);
		setListSelected(!listSelected);
	};
	const gridSelectedClass = gridSelected
		? "text-white hover:cursor-pointer"
		: "text-gray-500 hover:text-gray-400 hover:cursor-pointer";
	const listSelectedClass = listSelected
		? "text-white hover:cursor-pointer"
		: "text-gray-500 hover:text-gray-400 hover:cursor-pointer";

	return (
		<section className="">
			<div className="h-8"></div>
			<div className="font-writing text-white text-center h-60 flex flex-col justify-center">
				<p className="text-4xl font-light">Business Listings</p>
				<p className="text-base font-light text-gray-500">
					Explore our selected offers for sale.
				</p>
				<Disclaimer />
			</div>
			<div className="h-8 flex flex-row justify-center gap-4">
				<div className="font-writing flex flex-row justify-center h-8">
					<p className="py-1 text-white font-thin mr-2">Sort by:</p>
					<select
						value={view}
						onChange={(e) => setView(e.target.value)}
						className="px-2 py-1 bg-[#111111] rounded-md text-gray-200 font-thin text-center focus:ring-2 focus:ring-blue-400"
					>
						<option value="latest">Latest Date</option>
						<option value="biggest">Asking Price</option>
					</select>
				</div>
				<div className="font-writing flex flex-row justify-center h-8">
					<p className="py-1 text-white font-thin mr-2">View:</p>
					<div className="bg-[#111111] flex flex-row justify-center items-center gap-4 rounded-md px-2">
						<button className="">
							<BsGridFill
								size="24px"
								className={gridSelectedClass}
								onClick={() => handleLayoutChange("grid")}
							/>
						</button>
						<button className="text-white">
							<FaListUl
								size="24px"
								className={listSelectedClass}
								onClick={() => handleLayoutChange("list")}
							/>
						</button>
					</div>
				</div>
			</div>
			{layout === "grid" ? (
				sortedOffers ? (
					<div className="2xl:w-384 2xl:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 p-10">
						{sortedOffers.map((offer) => (
							<Card
								key={offer.id}
								listingsData={offer}
								marketData={marketData}
							/>
						))}
					</div>
				) : (
					<div>Loading...</div>
				)
			) : sortedOffers ? (
				<div className="xl:w-320 xl:mx-auto grid grid-cols-1 gap-10 p-10">
					{sortedOffers.map((offer) => (
						<List key={offer.id} listingsData={offer} marketData={marketData} />
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
