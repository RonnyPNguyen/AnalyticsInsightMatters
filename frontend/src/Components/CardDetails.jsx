import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Formula from "./Formula";

const CardDetails = ({ offer }) => {
	const [bd, setBd] = useState(null);

	const moneyFormat = (number) =>
		new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(number);

	const percentFormat = (number) =>
		typeof number === "number" ? `${(number * 100).toFixed(2)}%` : "...";

	return (
		<div>
			<Formula data={offer} onResult={setBd} />
			<div className="font-inter flex justify-between items-center py-2">
				<div>
					<p className="text-2xl font-semibold">{offer.BusinessName}</p>
					<div className="text-xs flex items-center space-x-2 text-gray-400">
						<FaMapMarkerAlt className="text-red-500" />
						<p className="text-left">
							{`${offer.Suburb}, ${offer.State} ${offer.Postcode}`}
						</p>
					</div>
				</div>
				<div className="font-inter text-right text-md">
					<p className="">Asking Price</p>
					<p className="">
						{`$${moneyFormat(offer.AskingPrice)} ${
							bd?.SavIncluded === 0 ? "+ SAV" : ""
						}`}{" "}
						{bd?.GstIncluded === 0 ? "+ GST" : ""}
					</p>
				</div>
			</div>
			{bd ? (
				<div className="font-mono">
					<div className="py-2 flex justify-between space-x-2 text-xs text-center">
						<div className="bg-[#2A3439] p-2 rounded-md text-orange-500">
							Growth: {percentFormat(bd.GR)}
						</div>
						<div className="bg-[#2A3439] p-2 rounded-md text-purple-500">
							Return: {percentFormat(bd.RRR)}
						</div>
						<div className="bg-[#2A3439] p-2 rounded-md text-blue-500">
							{bd.employmentType}
						</div>
					</div>
					<div className="text-xs py-2 px-2">
						<div className="flex justify-between">
							<p className="font-light py-1">Annual Revenue: {}</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(bd.TotalRevenue / 5)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="font-light py-1">Annual Net Profit:</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(bd.TotalNetProfit / 5)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="font-light py-1">Profit Margin:</p>
							<div className="flex justify-between">
								<p>{percentFormat(bd.ProfitMargin)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="font-light py-1">
								Total Investment: {bd?.SavIncluded === 0 ? "(+ est. SAV)" : ""}
							</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(bd.TotalInvestment)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="font-light py-1">Total Discounted Cash Flow:</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(bd.TotalDCF)}</p>
							</div>
						</div>
					</div>
					<div className="text-md p-2 bg-[#2A3439] rounded-md text-center font-mono">
						<div className="flex justify-between">
							<p className="font-semibold">Net Present Value: </p>
							<p
								className={`${
									bd.NPV < 0 ? "text-red-600" : "text-green-600"
								} font-semibold`}
							>
								${moneyFormat(bd.NPV)}
							</p>
						</div>
						<div className="flex justify-between font-light">
							<p className="">Estimation: </p>
							<p
								className={`${
									bd.valueEstimation > 0 ? "text-green-600" : "text-red-600"
								}`}
							>
								{bd.valueVerdict}
							</p>
						</div>
					</div>
					<div className="flex justify-between text-gray-400 text-sm py-2">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-inter font-semibold py-1 px-4 rounded-md">
							<Link to={bd.url} target="_blank" rel="noopener noreferrer">
								Source
							</Link>
						</button>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-inter font-semibold py-1 px-4 rounded-md">
							<Link to={`/listings/${offer.id}`}>More Details</Link>
						</button>
					</div>
				</div>
			) : (
				<p className="text-sm text-gray-400 italic">Calculating...</p>
			)}
		</div>
	);
};

export default CardDetails;
