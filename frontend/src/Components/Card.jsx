import { Link } from "react-router-dom";

const Card = ({ offer }) => {
	return (
		<div className="bg-blue-900 h-80 flex flex-col justify-center items-center px-10">
			<div className="bg-pink-500 sm:w-150 lg:w-full h-full">
				<h1 className="text-black-100">{offer.Region}</h1>
				<h1 className="text-black-100">{offer.Industry}</h1>
				<h1 className="text-black-100">{offer.Revenue}</h1>
				<h1 className="text-black-100">{offer.URL}</h1>
				<button>
					<Link to={`/Listings/${offer.ID}`}>View more</Link>
				</button>
			</div>
		</div>
	);
};

export default Card;
