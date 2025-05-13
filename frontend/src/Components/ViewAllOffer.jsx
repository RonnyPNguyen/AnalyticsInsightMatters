import { Link } from "react-router-dom";
const ViewAllOffer = () => {
	return (
		<section className="m-auto max-w-lg text-center py-10">
			<Link
				to="/Listings"
				className="py-4 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
			>
				View All Offers
			</Link>
		</section>
	);
};
export default ViewAllOffer;
