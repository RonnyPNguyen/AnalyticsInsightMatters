import { Link } from "react-router-dom";

const ViewAllOffer = () => {
	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<div className="block w-fit diagonal-gradient text-center p-[2px]">
				<Link
					to="/listings"
					className="block py-1 px-6 font-mont font-light text-white text-2xl bg-black transition duration-300 hover:bg-transparent hover:scale-105"
				>
					View All Offers
				</Link>
			</div>
		</div>
	);
};

export default ViewAllOffer;
