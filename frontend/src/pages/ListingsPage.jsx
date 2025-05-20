import React from "react";
import { Link } from "react-router-dom";
import businessData from "../data/businessData.json";
import Card from "../components/Card";

const ListingsPage = () => {
	return (
		<section className="h-screen">
			<div>
				<div className="font-inter text-white text-center py-10">
					<p className="text-4xl p-5">Listings</p>
					<p className="p-2">Explore our selected businesses for sale.</p>
				</div>
				<div>
					{businessData.map((offer) => (
						<Card key={offer.id} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ListingsPage;
