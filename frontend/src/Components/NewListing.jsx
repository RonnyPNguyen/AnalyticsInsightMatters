import React from "react";
import NavButton from "./NavButton";

const NewListing = () => {
	return (
		<section className="py-10 flex flex-col items-center justify-center">
			<NavButton title="New Listing" destination="/newlisting" />
		</section>
	);
};

export default NewListing;
