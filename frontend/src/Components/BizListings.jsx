import React from "react";
import offers from "../../public/sampleData.json";
import BizListing from "./BizListing";

const BizListings = () => {
	const RecentOffers = offers.slice(0, 4);
	return (
		<section>
			<div>
				<h2>Browse Our Listings</h2>
				<p>Selected and Verified</p>
			</div>
			<div>
				{offers.map((offer) => (
					<BizListing offer={offer} key={offer["ID"]} />
				))}
			</div>
		</section>
	);
};

export default BizListings;
