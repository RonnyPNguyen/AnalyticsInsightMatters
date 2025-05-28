import CardDetails from "./CardDetails";
import { useEffect, useState } from "react";

const Card = ({ offer, className = "" }) => {
	return (
		<div
			className={`flex flex-col flex-row w-full font-inter text-white ${className} bg-[#111111] hover:scale-102 transition-transform duration-200 ease-in-out rounded-xl overflow-hidden hover:ring-2`}
		>
			<div className="w-full w-5/8 p-4">
				<CardDetails offer={offer} />
			</div>
			<div className="hidden lg:flex lg:w-3/8">
				<img src="/cafe.webp" alt="Preview" className="object-cover" />
			</div>
		</div>
	);
};

export default Card;
