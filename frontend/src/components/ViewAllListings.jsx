import { Link } from "react-router-dom";
import NavButton from "./NavButton";

const ViewAllListings = () => {
	return (
		<section className="py-10 flex flex-col items-center justify-center">
			<NavButton title="View All Offers" destination="/listings" />
		</section>
	);
};

export default ViewAllListings;
