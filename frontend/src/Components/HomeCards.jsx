import React from "react";
import offers from "../data/sampleData.json";
import Card from "./Card";
import ViewAllOffer from "./ViewAllOffer";

const HomeCards = ({ numberOfFeatured = 4 }) => {
	const RecentOffers = offers.slice(0, numberOfFeatured);
	return (
		<section>
			<p className="text-center text-white font-inter font-thin text-4xl py-2">
				Featured
			</p>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 py-4">
				{RecentOffers.map((offer) => (
					<Card offer={offer} key={offer["ID"]} />
				))}
			</div>
			<div className="flex justify-center">
				<ViewAllOffer />
			</div>
		</section>
	);
};

export default HomeCards;
