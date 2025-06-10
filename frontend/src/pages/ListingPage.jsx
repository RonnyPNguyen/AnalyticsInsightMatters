import { useParams, useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import Disclaimer from "../components/Disclaimer";
import ListingPageNav from "../components/ListingPageNav";
import Formula from "../components/Formula";
import GraphBusinessModel from "../components/GraphBusinessModel";
import GraphValuation from "../components/GraphValuation";
import GraphDiscountedCF from "../components/GraphDiscountedCF";
import ViewAllOffer from "../components/ViewAllOffer";

// Single Listing Page
const ListingPage = () => {
	const { id } = useParams();
	const [listing, marketData] = useLoaderData();
	const [output, setOutput] = useState(null);

	const moneyFormat = (value) => {
		return new Intl.NumberFormat("en-AU", {
			style: "currency",
			currency: "AUD",
			maximumFractionDigits: 0,
		}).format(value);
	};
	const percentFormat = (value) => {
		return new Intl.NumberFormat("en-AU", {
			style: "percent",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(value);
	};
	return (
		<section className="md:px-30">
			<Formula
				listingsData={listing}
				marketData={marketData}
				onResult={setOutput}
			/>
			<ListingPageNav data={listing} />
			<div className="font-writing text-center h-60 flex flex-col justify-center text-white">
				<p className="text-4xl font-light py-0">{listing.businessName}</p>
				<p className="text-base font-light text-gray-500">{`${listing.locationSuburb}, ${listing.locationState} ${listing.locationPostCode}`}</p>
				<Disclaimer />
			</div>
			<div className="h-8"></div>
			{output ? (
				<div className="p-10 grid grid-cols-1 gap-8">
					<div className="text-white font-writing text-left">
						<div className="bg-[#111111] px-8 rounded-md p-4 grid grid-cols-1 gap-2">
							<p className="font-light text-2xl">
								Asking Price: {moneyFormat(output.askingPrice)}
								{output.gstIncluded === 1 ? "" : " + GST"}
								{output.savIncluded === 1 ? "" : " + SAV"}
							</p>
							<p className="text-base font-thin ">
								<span className="font-light">Type:</span>
								<span className="font-thin">{` ${output.businessModel}`}</span>
							</p>
							<p className="text-base font-light ">
								<span className="font-light">Industry:</span>
								<span className="font-thin">{` ${output.businessIndustry} > ${output.businessDivision}`}</span>
							</p>
							<div className="flex flex-row items-center space-x-2 text-base text-white py-1 font-light">
								<p className="font-normal">Status: </p>
								<p
									className={`font-writing font-thin px-2 rounded-full w-fit flex items-center space-x-2 ${
										output.listingStatus === 1 ? "bg-green-900" : "bg-red-900"
									}`}
								>
									<BsCircleFill
										className={`text-[8px] ${
											output.listingStatus === 1
												? "text-green-400"
												: "text-red-400"
										}`}
									/>
									<span>
										{output.listingStatus === 1
											? "Available"
											: `Sold for $${output.salePrice}`}
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualRevenue)}</p>
							<p className="text-xs text-green-500">
								Revenue @ {percentFormat(output.GR)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualWages)}</p>
							<p className="text-xs text-red-500">
								Wage @ {percentFormat(output.WPI)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualRent)}</p>
							<p className="text-xs text-red-500">
								Rent @ {percentFormat(output.RY)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualOutgoings)}</p>
							<p className="text-xs text-red-500">
								Outgoings @ {percentFormat(output.CPI)}
							</p>
						</div>
					</div>
					<GraphBusinessModel data={output} />
					<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">
								{percentFormat(output.GrossProfitMargin)}
							</p>
							<p className="text-xs text-purple-500">Gross Profit Margin</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.NetProfitMargin)}</p>
							<p className="text-xs text-blue-500">Net Profit Margin</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.FCFRate)}</p>
							<p className="text-xs text-green-500">Cash Flow Growth Rate</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.RRR)}</p>
							<p className="text-xs text-red-500">Required Return Rate</p>
						</div>
					</div>
					<GraphDiscountedCF data={output} />
					<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xs text-white">Total Investment</p>
							<p className="text-xl">{moneyFormat(output.TotalInvestment)}</p>
							<p className="text-xs text-gray-500 text-center pt-2 hidden md:block">
								(Price + GST + SAV + Fee + Working Capital)
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xs text-white">Estimated Value</p>
							<p className="text-xl">{moneyFormat(output.TotalDCF)}</p>
							<p className="text-xs text-gray-500 text-center pt-2 hidden md:block">
								(Total Cash Flow + Terminal Cash Flow at Discounted Rate)
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xs text-white">Return on Investment</p>
							<p
								className={`text-xl ${
									output.ROI > 0 ? "text-green-500" : "text-red-500"
								}`}
							>
								{percentFormat(output.ROI)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xs text-white">Verdict</p>
							<p
								className={`text-xl ${
									output.valueEstimation > 0.1
										? "text-green-500"
										: output.valueEstimation > -0.1
										? "text-yellow-500"
										: "text-red-500"
								}`}
							>
								{output.valueVerdict}
							</p>
						</div>
					</div>
					<GraphValuation data={output} />
				</div>
			) : (
				<div>Calculating...</div>
			)}
			<ViewAllOffer />
		</section>
	);
};

const serverLoader = async ({ params }) => {
	const { id } = params;
	const listingsResponse = await fetch(
		`https://busy-analytics-server.s3.us-east-1.amazonaws.com/data/listingsData.json`
	);
	const marketResponse = await fetch(
		`https://busy-analytics-server.s3.us-east-1.amazonaws.com/data/marketData.json`
	);
	const listings = await listingsResponse.json();
	const listing = listings.find((item) => item.id === id);
	const marketData = await marketResponse.json();
	return [listing, marketData];
};

export { ListingPage as default, serverLoader };
