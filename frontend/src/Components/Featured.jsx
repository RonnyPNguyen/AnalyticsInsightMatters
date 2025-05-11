import React from "react";
import Card from "./Card";

const Featured = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			<Card />
			<Card />
			<Card />
			<Card />
		</div>
	);
};

export default Featured;
