import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ title, destination }) => {
	return (
		<div className="block w-fit diagonal-gradient text-center p-[2px] flex mx-auto rounded-xl">
			<Link
				to={destination}
				className="py-2 px-4 font-nav font-thin text-white text-base bg-[#111111] transition duration-300 hover:bg-transparent rounded-xl"
			>
				{title}
			</Link>
		</div>
	);
};

export default NavButton;
