import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Formula from "./Formula";

const CardDetails = ({ data }) => {
	const [output, setOutput] = useState(null);

	const moneyFormat = (number) =>
		new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(number);

	const percentFormat = (number) =>
		typeof number === "number" ? `${(number * 100).toFixed(2)}%` : "...";

	// Map of Australian state full names to abbreviations
	const stateAbbreviations = {
		"New South Wales": "NSW",
		Victoria: "VIC",
		Queensland: "QLD",
		"South Australia": "SA",
		"Western Australia": "WA",
		Tasmania: "TAS",
		"Northern Territory": "NT",
		"Australian Capital Territory": "ACT",
	};

	const getStateAbbreviation = (stateName) =>
		stateAbbreviations[stateName] || stateName;

	return (
		<div>
			<Formula data={data} onResult={setOutput} />
			<div className="font-tabular flex justify-between items-center py-2">
				<div>
					<p className="text-base font-semibold">{data.BusinessName}</p>
					<div className="text-xs flex items-center space-x-2 text-gray-400">
						<FaMapMarkerAlt className="text-red-500" />
						<p className="text-left">
							{`${data.Suburb}, ${getStateAbbreviation(data.State)} ${
								data.Postcode
							}`}
						</p>
					</div>
				</div>
				<div className="font-tabular text-right">
					<p className="text-xs text-gray-400">Asking Price</p>
					<p className="text-base">
						{`$${moneyFormat(data.AskingPrice)} ${
							output?.SavIncluded === 0 ? "+ SAV" : ""
						}`}{" "}
						{output?.GstIncluded === 0 ? "+ GST" : ""}
					</p>
				</div>
			</div>
			{output ? (
				<div className="font-tabular">
					<div className="py-2 flex justify-between space-x-2 text-xs text-center">
						<div className="bg-[#2A3439] p-2 rounded-md text-orange-500">
							Growth: {percentFormat(output.GR)}
						</div>
						<div className="bg-[#2A3439] p-2 rounded-md text-purple-500">
							Return: {percentFormat(output.RRR)}
						</div>
						<div className="bg-[#2A3439] p-2 rounded-md text-blue-500">
							{output.employmentType}
						</div>
					</div>
					<div className="text-xs font-light py-2 px-2">
						<div className="flex justify-between">
							<p className="py-1">Annual Revenue: {}</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(output.TotalRevenue / 5)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="py-1">Annual Net Profit:</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(output.TotalNetProfit / 5)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="py-1">Profit Margin:</p>
							<div className="flex justify-between">
								<p>{percentFormat(output.NetProfitMargin)}</p>
							</div>
						</div>
						{/* <div className="flex justify-between">
							<p className="py-1">
								Total Investment: {output?.SavIncluded === 0 ? "(+ est. SAV)" : ""}
							</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(output.TotalInvestment)}</p>
							</div>
						</div>
						<div className="flex justify-between">
							<p className="font-light py-1">Total Discounted Cash Flow:</p>
							<div className="flex justify-between">
								<p>$</p>
								<p>{moneyFormat(output.TotalDCF)}</p>
							</div>
						</div> */}
					</div>
					<div className="text-base p-2 bg-[#2A3439] rounded-md text-center font-tabular font-normal">
						<div className="flex justify-between">
							<p className="">Net Present Value: </p>
							<p
								className={`${
									output.NPV < 0 ? "text-red-600" : "text-green-600"
								} `}
							>
								${moneyFormat(output.NPV)}
							</p>
						</div>
						<div className="flex justify-between">
							<p className="">Estimation: </p>
							<p
								className={`${
									output.valueEstimation > 0.1
										? "text-green-600"
										: output.valueEstimation > -0.1
										? "text-yellow-500"
										: "text-red-600"
								}`}
							>
								{output.valueVerdict}
							</p>
						</div>
					</div>
					<div className="text-base flex justify-between text-gray-400 pt-4">
						<button className="bg-[#2A3439] hover:bg-white hover:text-black text-white font-tabular font-semibold px-3 py-1 rounded-md">
							<Link to={output.url} target="_blank" rel="noopener noreferrer">
								Source
							</Link>
						</button>
						<button className="bg-[#2A3439] hover:bg-white hover:text-black text-white font-tabular font-semibold px-3 py-1 rounded-md">
							<Link to={`/listings/${data.id}`}>Analyze</Link>
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
