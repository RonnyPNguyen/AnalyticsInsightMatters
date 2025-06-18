import ListDetails from "./ListDetails";
import { useEffect, useState } from "react";

const List = ({ listingsData, marketData }) => {
	return (
		<div className="bg-[#1A1D20] text-white font-tabular p-2 rounded-md">
			<ListDetails listingsData={listingsData} marketData={marketData} />
		</div>
	);
};

export default List;
