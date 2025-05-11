import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<div>
				<nav className="bg-gray-800 p-5 flex justify-between items-center">
					<a to="/">
						<img src="./src/assets/react.svg" alt="" />
					</a>
					<div className="flex space-x-4 text-center">
						<Link
							to="/"
							className="bg-red-500 border border-white rounded-lg p-1 w-18"
						>
							Home
						</Link>
						<Link
							to="/listings"
							className="bg-red-500 border border-white rounded-lg p-1 w-18"
						>
							Listings
						</Link>
						<Link
							to="/about"
							className="bg-red-500 border border-white rounded-lg p-1 w-18"
						>
							About
						</Link>
					</div>
					<div>
						<a to="/" className="bg-green-500 text-white rounded-lg p-1 w-12">
							Login
						</a>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
