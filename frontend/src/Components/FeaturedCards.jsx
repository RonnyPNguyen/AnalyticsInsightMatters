import React from "react";
import offers from "../data/businessData.json";
import Card from "./Card";
import ViewAllOffer from "./ViewAllOffer";

const FeaturedCards = ({ numberOfFeatured = 4 }) => {
	const RecentOffers = offers.slice(0, numberOfFeatured);
	return (
		<section className="py-10">
			<p className="text-center text-white font-inter font-thin text-4xl">
				Featured Listings
			</p>
			<div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5 py-5 px-5">
				{RecentOffers.map((offer) => (
					<Card offer={offer} key={offer["ID"]} />
				))}
			</div>
		</section>
	);
};

export default FeaturedCards;
