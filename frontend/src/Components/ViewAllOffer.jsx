import { Link } from "react-router-dom";

const ViewAllOffer = () => {
	return (
		<div className="py-10 flex flex-col items-center justify-center">
			<div className="block w-fit diagonal-gradient text-center rounded-full p-[2px]">
				<Link
					to="/login"
					className="block py-1 px-6 font-mont font-light text-white text-2xl bg-black rounded-full transition duration-300 hover:bg-transparent hover:scale-105"
				>
					View All Offers
				</Link>
			</div>
		</div>
	);
};

export default ViewAllOffer;
