import { useParams, useLoaderData, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import Disclaimer from "../components/Disclaimer";
import ListingPageNav from "../components/ListingPageNav";
import Formula from "../components/Formula";
import GraphBusinessModel from "../components/GraphBusinessModel";
import GraphValuation from "../components/GraphValuation";
import GraphDiscountedCF from "../components/GraphDiscountedCF";
import FullWorkSheet from "../components/FullWorkSheet";
import ViewAllListings from "../components/ViewAllListings";

// Single Listing Page
const ListingPage = () => {
	const { id } = useParams();
	const [listing, marketData] = useLoaderData();
	const [output, setOutput] = useState(null);
	const [showDetail, setShowDetail] = useState(false);

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
		<section className="lg:w-260 mx-auto">
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
				<div className="p-5 grid grid-cols-1 gap-8">
					<div className="text-white font-writing text-left">
						<div className="bg-[#111111] px-8 rounded-md p-4 grid grid-cols-1 gap-2">
							<p className="font-light text-2xl">
								Asking Price: {moneyFormat(output.askingPrice)}
								{output.gstValue === 0 ? "" : " + GST"}
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
							<p className="text-sm text-green-500">
								Revenue @ {percentFormat(output.GR)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualWages)}</p>
							<p className="text-sm text-yellow-500">
								Wage @ {percentFormat(output.WPI)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualRent)}</p>
							<p className="text-sm text-orange-500">
								Rent @ {percentFormat(output.RY)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(output.annualOutgoings)}</p>
							<p className="text-sm text-red-500">
								Outgoings @ {percentFormat(output.CPI)}
							</p>
						</div>
					</div>
					<GraphBusinessModel data={output} />
					<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(output.annualProfit)}</p>
							<p className="text-sm text-purple-500">Avg. Gross Profit</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">
								{percentFormat(output.GrossProfitMargin)}
							</p>
							<p className="text-sm text-purple-500">Gross Profit Margin</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">
								{moneyFormat(output.TotalNetProfit / 5)}
							</p>
							<p className="text-sm text-blue-500">Avg. Net Profit</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.NetProfitMargin)}</p>
							<p className="text-sm text-blue-500">Net Profit Margin</p>
						</div>
					</div>
					<GraphDiscountedCF data={output} />
					{showDetail ? (
						<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl">{percentFormat(output.FCFRate)}</p>
								<p className="text-sm text-green-500">Cash Flow Growth</p>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl">{percentFormat(output.RRR)}</p>
								<p className="text-sm text-red-500">Required Return</p>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<div className="grid grid-cols-2 text-white font-tabular text-sm text-white px-2">
									<p className="">Asking:</p>
									<p className="text-right">
										{moneyFormat(output.askingPrice)}
									</p>
									<p className="">Est. SAV:</p>
									<p className="text-right">
										{moneyFormat(output.estimatedSAV)}
									</p>
									<p className="">GST:</p>
									<p className="text-right">{moneyFormat(output.gstValue)}</p>
									<p className="">Total:</p>
									<p className="text-right">
										{moneyFormat(output.TotalInvestment)}
									</p>
								</div>
								<button
									className="text-gray-500 text-xs hover:text-gray-300 pt-2 hover:cursor-pointer italic"
									onClick={() => setShowDetail(!showDetail)}
								>
									less details
								</button>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl ">{moneyFormat(output.TotalDCF)}</p>
								<p className="text-sm text-blue-500">Estimated Value</p>
							</div>
						</div>
					) : (
						<div className="text-white font-tabular grid grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl">{percentFormat(output.FCFRate)}</p>
								<p className="text-sm text-green-500">Cash Flow Growth</p>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl">{percentFormat(output.RRR)}</p>
								<p className="text-sm text-red-500">Required Return</p>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl ">
									{moneyFormat(output.TotalInvestment)}
								</p>
								<p className="text-sm text-purple-500">Total Investment</p>
								<button
									className="text-gray-500 text-xs hover:text-gray-300 pt-2 hover:cursor-pointer italic"
									onClick={() => setShowDetail(!showDetail)}
								>
									more details
								</button>
							</div>
							<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
								<p className="text-xl ">{moneyFormat(output.TotalDCF)}</p>
								<p className="text-sm text-blue-500">Estimated Value</p>
							</div>
						</div>
					)}

					<GraphValuation data={output} />
					<div className="text-white font-tabular grid grid-cols-2 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.ROI)}</p>
							<p className="text-sm text-orange-500">ROI</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{output.valueVerdict}</p>
							<p className="text-sm text-orange-500">Verdict</p>
						</div>
					</div>
					<FullWorkSheet data={output} />
				</div>
			) : (
				<div>Calculating...</div>
			)}
			<ViewAllListings />
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
