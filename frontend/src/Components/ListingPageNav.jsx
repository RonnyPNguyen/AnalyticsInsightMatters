import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ListingPageNav = ({ data }) => {
	return (
		<div className="flex justify-between items-center text-base font-nav px-4 h-8">
			<Link
				to="/listings"
				className="p-1 w-fit flex items-center rounded-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
			>
				<FaArrowLeft className="mr-2" />
				<p>Back to Listings</p>
			</Link>
			<Link
				to={data.URL}
				target="_blank"
				rel="noopener noreferrer"
				className="p-1 w-fit flex items-center rounded-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
			>
				<p>Data Source</p>
				<FaArrowRight className="ml-2" />
			</Link>
		</div>
	);
};

export default ListingPageNav;
