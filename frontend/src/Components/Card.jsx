import { Link } from "react-router-dom";
import market from "../data/marketData.json";

import Formula from "./Formula";
import TestFormula from "./TestFormula";

const Card = ({ offer }) => {
	return (
		<div className="bg-white h-100 flex flex-row">
			<Formula className="h-full" b={offer} market={market}></Formula>
			<div className="h-full bg-blue-500 ">
				<img src="" alt="" />
			</div>
		</div>
	);
};

export default Card;
