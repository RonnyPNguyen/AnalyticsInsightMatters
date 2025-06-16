import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const linkClass = ({ isActive }) =>
		isActive
			? "bg-white text-black rounded-2xl p-2 w-25 hover:scale-105 transition duration-300"
			: "hover:bg-white hover:text-black rounded-2xl p-2 w-25 transition hover:scale-105 duration-300";
	return (
		<>
			<nav className="sticky top-0 z-10">
				<div className="h-16 px-8 flex justify-between items-center bg-black/60 backdrop-blur-lg">
					<div className="w-50">
						<NavLink
							to="/"
							className="flex items-center space-x-2 transition duration-300"
						>
							<h1 className="text-3xl font-logo">AIM Project</h1>
						</NavLink>
					</div>
					<div className="hidden md:flex sm:space-x-4 md:space-x-8 lg:space-x-12 font-nav text-white text-base font-light text-center">
						<NavLink to="/" className={linkClass}>
							Home
						</NavLink>
						<NavLink to="/listings" className={linkClass}>
							Listings
						</NavLink>
						<NavLink to="/about" className={linkClass}>
							About
						</NavLink>
					</div>
					<div className="hidden md:flex w-50 h-8 gap-4 justify-end items-center text-white text-base font-light font-nav">
						<div className="w-200 bg-white p-[2px] rounded-full w-fit transition duration-300 hover:text-black">
							<NavLink
								to="/documentation"
								className="block bg-black rounded-full w-[80px] h-[32px] flex justify-center items-center transition duration-100 hover:bg-transparent hover:scale-105"
							>
								<div>
									<FontAwesomeIcon icon={faBook} className="" />
									<span>{` Docs`} </span>
								</div>
							</NavLink>
						</div>
						<div className="diagonal-gradient p-[2px] rounded-full w-fit transition duration-300">
							<NavLink
								to="/login"
								className="block bg-black rounded-full w-[80px] h-[32px] flex justify-center items-center transition duration-300 hover:bg-transparent hover:scale-105"
							>
								<div>Log In</div>
							</NavLink>
						</div>
					</div>
					<div className="md:hidden">
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
				<div className="fixed top-16 left-0 w-full z-50 md:hidden bg-black px-8 py-4 space-y-4 font-nav text-white text-base font-light">
					<NavLink
						to="/"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(false)}
					>
						Home
					</NavLink>
					<NavLink
						to="/listings"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(false)}
					>
						Listings
					</NavLink>
					<NavLink
						to="/about"
						className="block hover:bg-white hover:text-black rounded-2xl px-4 py-2 transition duration-300"
						onClick={() => setIsOpen(false)}
					>
						About
					</NavLink>
					<div className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full py-[3px] px-[3px] text-center font-base">
						<NavLink
							to="/login"
							className="block bg-black rounded-full transition duration-300 hover:bg-transparent p-2"
							onClick={() => setIsOpen(false)}
						>
							Log In
						</NavLink>
					</div>
				</div>
			)}
		</>
	);
};

export default Navbar;
