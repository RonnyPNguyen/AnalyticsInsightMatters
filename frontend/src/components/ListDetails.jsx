import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import Formula from "./Formula";

const ListDetails = ({ listingsData, marketData }) => {
	const [output, setOutput] = useState([]);
	const moneyFormat = (number) =>
		new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(number);

	const percentFormat = (number) =>
		typeof number === "number" ? `${(number * 100).toFixed(2)}%` : "...";

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
		<div className="">
			<Formula
				listingsData={listingsData}
				marketData={marketData}
				onResult={setOutput}
			/>
			{output ? (
				<div className="font-tabular text-sm w-full">
					<div className="flex justify-between items-center py-2">
						<div>
							<div>{output.businessName}</div>
							<div className="text-gray-500">{`${output.locationSuburb}, ${output.locationState} ${output.locationPostCode}`}</div>
						</div>
						<div className="w-36">
							<div className="flex justify-between items-center">
								<div>Asking:</div>
								<div>{moneyFormat(output.askingPrice)}</div>
							</div>
							<div className="flex justify-between items-center">
								<div>Total:</div>
								<div>{moneyFormat(output.TotalInvestment)}</div>
							</div>
						</div>
					</div>
					<div className="flex justify-between items-center py-2 gap-2">
						<div className="bg-[#2A3439] p-1 text-center rounded-md w-48 text-orange-500">
							<span className="text-white font-light">Growth: </span>{" "}
							{percentFormat(output.GR)}
						</div>
						<div className="bg-[#2A3439] p-1 text-center rounded-md w-48 text-yellow-500">
							<span className="text-white font-light">Return: </span>{" "}
							{percentFormat(output.RRR)}
						</div>
						<div className="bg-[#2A3439] p-1 text-center rounded-md w-48 text-purple-500">
							<span className="text-white font-light">Gross: </span>{" "}
							{percentFormat(output.GrossProfitMargin)}
						</div>
						<div className="bg-[#2A3439] p-1 text-center rounded-md w-48 text-blue-500">
							<span className="text-white font-light">Net: </span>{" "}
							{percentFormat(output.NetProfitMargin)}
						</div>
						<div
							className={`${
								output.NPV > 0 ? "text-green-500" : "text-red-500"
							}  bg-[#2A3439] p-1 text-center rounded-md w-48`}
						>
							<span className="text-white font-light">NPV: </span>
							{moneyFormat(output.NPV)}
						</div>
						<div
							className={`${
								output.ROI > 0 ? "text-green-500" : "text-red-500"
							} bg-[#2A3439] p-1 text-center rounded-md w-48`}
						>
							<span className="text-white font-light">ROI: </span>
							{percentFormat(output.ROI)}
						</div>
					</div>
				</div>
			) : (
				<p className="text-sm text-gray-400 italic">Calculating...</p>
			)}
		</div>
	);
};

export default ListDetails;
