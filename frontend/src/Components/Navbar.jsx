const Navbar = () => {
	return (
		<>
			<div>
				<nav className="bg-gray-800 p-5 flex justify-between items-center">
					<a href="/">
						<img src="./src/assets/react.svg" alt="" />
					</a>
					<div className="flex space-x-4">
						<button className="bg-red-500 border border-white rounded-lg p-1 w-18">
							Home
						</button>
						<button className="bg-red-500 border border-white rounded-lg p-1 w-18">
							Listings
						</button>
						<button className="bg-red-500 border border-white rounded-lg p-1 w-18">
							About
						</button>
					</div>
					<div>
						<button className="bg-green-500 text-white rounded-lg p-1 w-12">
							Login
						</button>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
