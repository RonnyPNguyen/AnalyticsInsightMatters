import ListDetails from "./ListDetails";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const List = ({ listingsData, marketData }) => {
	return (
		<div className="bg-[#1A1D20] text-white font-tabular p-2 rounded-md hover:scale-105 hover:cursor-pointer transition-transform duration-200">
			<Link to={`/listings/${listingsData.id}`}>
				<ListDetails listingsData={listingsData} marketData={marketData} />
			</Link>
		</div>
	);
};

export default List;
