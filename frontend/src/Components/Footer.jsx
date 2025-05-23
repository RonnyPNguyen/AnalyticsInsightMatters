import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div>
			<div className="h-16 text-center">
				<p>FinAlytics by Ronny</p>
				<Link to={"/documentation"}>Documentation</Link>
				<p className="text-gray-500 text-sm">
					© 2025 FinAlytic. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
