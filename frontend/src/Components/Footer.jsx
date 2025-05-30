import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
	return (
		<div className="pt-12">
			<div className="">
				<div className="text-center text-sm font-thin text-white mx-auto bg-[#111111]">
					<p className="text-2xl font-thin pt-4 pb-2">Contact</p>
					<p className="pb-2">
						Report bugs, suggest features, or simply hello!
					</p>
					<p className="pb-2">phuong.nguyentien192@gmail.com</p>
					<div className="pb-4 flex flex-row justify-center space-x-4">
						<Link
							to="https://github.com/RonnyPNguyen"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faGithub} size="2x" />
						</Link>
						<Link
							to="https://www.linkedin.com/in/ronnynguyen/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FontAwesomeIcon icon={faLinkedin} size="2x" />
						</Link>
					</div>
				</div>
			</div>
			<div className="text-gray-500 text-center text-sm py-2">
				© 2025 FinAlytic by Ronny Nguyen. All rights reserved.
			</div>
		</div>
	);
};

export default Footer;
