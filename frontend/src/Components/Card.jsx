import CardDetails from "./CardDetails";
import { useEffect, useState } from "react";

const Card = ({ listingsData, marketData }) => {
	return (
		<div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between text-white bg-[#111111] hover:scale-102 transition-transform duration-200 ease-in-out rounded-xl overflow-hidden hover:ring-2">
			<div className="h-50 md:h-full md:w-80 lg:w-full lg:h-50 xl:h-full xl:w-80">
				<img
					src={`https://busy-analytics-server.s3.us-east-1.amazonaws.com/thumbnails/${listingsData.id}.jpg`}
					alt="Preview"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="p-4 w-full">
				<CardDetails listingsData={listingsData} marketData={marketData} />
			</div>
		</div>
	);
};

export default Card;
