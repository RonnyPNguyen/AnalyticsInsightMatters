import { Link } from "react-router-dom";
const ViewAllOffer = () => {
	return (
		<div className="w-40 h-8 justify-center items-center text-white text-base font-light font-mont">
			<div className="diagonal-gradient p-[2px] rounded-full w-fit transition duration-300">
				<Link
					to="/login"
					className="block bg-black rounded-full px-6 py-1 transition duration-300 hover:bg-transparent"
				>
					View All Offers
				</Link>
			</div>
		</div>
	);
};
export default ViewAllOffer;
