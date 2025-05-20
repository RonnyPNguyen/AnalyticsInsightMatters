import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<nav className="sticky top-0 z-10">
				<div className="px-8 py-2 flex justify-between items-center bg-black/60 backdrop-blur-lg">
					<div className="w-40">
						<Link
							to="/"
							className="flex items-center space-x-2 transition duration-300"
						>
							<h1 className="text-white text-3xl font-coralpixels">
								FinAlytics
							</h1>
						</Link>
					</div>
					<div className="hidden sm:flex sm:space-x-4 md:space-x-8 lg:space-x-12 font-mont text-white text-base font-light text-center">
						<Link
							to="/"
							className="hover:bg-white hover:text-black rounded-2xl p-2 w-25 hover:scale-105 transition duration-300"
						>
							Home
						</Link>
						<Link
							to="/listings"
							className="hover:bg-white hover:text-black rounded-2xl p-2 w-25 transition hover:scale-105 duration-300"
						>
							Listings
						</Link>
						<Link
							to="/about"
							className="hover:bg-white hover:text-black rounded-2xl p-2 w-25 hover:scale-105 transition duration-300"
						>
							About
						</Link>
					</div>
					<div className="hidden sm:flex w-40 h-8 justify-end items-center text-white text-base font-light font-mont">
						<div className="diagonal-gradient p-[2px] rounded-full w-fit transition duration-300">
							<Link
								to="/login"
								className="block bg-black rounded-full px-6 py-1 transition duration-300 hover:bg-transparent sm:px-3 hover:scale-105"
							>
								Log In
							</Link>
						</div>
					</div>

					<div className="sm:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-white text-2xl hover:cursor-pointer hover:scale-105 transition duration-300"
						>
							{isOpen ? <FiX /> : <FiMenu />}
						</button>
					</div>
				</div>
			</nav>

			{isOpen && (
				<div className="sm:hidden bg-black px-8 py-4 space-y-4 font-mont text-white text-base font-light transition duration-300">
					<Link
						to="/"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(!isOpen)}
					>
						Home
					</Link>
					<Link
						to="/listings"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(!isOpen)}
					>
						Listings
					</Link>
					<Link
						to="/about"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(!isOpen)}
					>
						About
					</Link>
					<div className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full py-[3px] px-[3px] text-center font-base">
						<Link
							to="/login"
							className="block bg-black rounded-full transition duration-300 hover:bg-transparent p-2"
							onClick={() => setIsOpen(!isOpen)}
						>
							Log In
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
