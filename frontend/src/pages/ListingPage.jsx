import { useParams, useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import Formula from "../components/Formula";
import { BsCircleFill } from "react-icons/bs";
import ViewAllOffer from "../components/ViewAllOffer";
import FullWorkSheet from "../components/FullWorkSheet";
import GraphBusinessModel from "../components/GraphBusinessModel";
import GraphValuation from "../components/GraphValuation";
import GraphDiscountedCF from "../components/GraphDiscountedCF";
import ListingPageNav from "../components/ListingPageNav";
import Disclaimer from "../components/Disclaimer";

const ListingPage = () => {
	const [data, setData] = useState(null);
	const { id } = useParams();
	const offer = useLoaderData();

	const moneyFormat = (number) => {
		return (
			"$" +
			new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(
				number
			)
		);
	};

	const percentFormat = (number) => {
		return new Intl.NumberFormat("en-AU", {
			style: "percent",
			minimumFractionDigits: 2,
		}).format(number);
	};

	return (
		<div className="text-white">
			<Formula data={offer} onResult={setData} />
			<ListingPageNav data={offer} />
			{data ? (
				<div className="lg:px-40 px-6">
					<div className="pt-12">
						<div className="font-writing text-white text-center">
							<p className="text-4xl font-light py-0">{offer.BusinessName}</p>
							<p className="text-base font-light text-gray-500">{`${offer.Suburb}, ${offer.State} ${offer.Postcode}`}</p>
							<Disclaimer />
						</div>
						<div className="text-left font-writing text-white py-2">
							<div className="bg-[#111111] px-8 rounded-md py-6">
								<p className="font-light text-2xl py-2">
									Asking Price: {moneyFormat(offer.AskingPrice)}
									{offer.GSTIncluded === 1 ? "" : " + GST"}
									{offer.SavIncluded === 1 ? "" : " + SAV"}
								</p>
								<p className="text-base py-1 font-thin ">
									<span className="font-light">Type:</span>
									<span className="font-thin">{` ${offer.BusinessType}`}</span>
								</p>
								<p className="text-base py-1 font-light ">
									<span className="font-light">Industry:</span>
									<span className="font-thin">{` ${offer.Industry}`}</span>
								</p>
								<p className="text-base py-1 font-light ">
									<span className="font-light">Employment:</span>
									<span className="font-thin">{` ${data.employmentType}`}</span>
								</p>
								<p className="text-base py-1 font-light ">
									<span className="font-light">Date Listed: </span>
									<span className="font-thin">
										{offer.DateAdded
											? new Date(offer.DateAdded).toLocaleDateString("en-AU", {
													year: "numeric",
													month: "numeric",
													day: "numeric",
											  })
											: "N/A"}
									</span>
								</p>
								<div className="flex flex-row items-center space-x-2 text-base text-white py-1 font-light">
									<p className="font-normal">Status: </p>
									<p
										className={`font-writing font-thin px-2 rounded-full w-fit flex items-center space-x-2 ${
											offer.ListingStatus === 1 ? "bg-green-900" : "bg-red-900"
										}`}
									>
										<BsCircleFill
											className={`text-[8px] ${
												offer.ListingStatus === 1
													? "text-green-400"
													: "text-red-400"
											}`}
										/>
										<span>
											{offer.ListingStatus === 1
												? "Available"
												: `Sold for $${offer.SoldPrice}`}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="font-tabular grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(data.FR0)}</p>
							<p className="text-xs text-green-500">
								Revenue @ {percentFormat(data.GR)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(data.W0)}</p>
							<p className="text-xs text-red-500">
								Wage @ {percentFormat(data.WageIndex)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(data.R0)}</p>
							<p className="text-xs text-red-500">
								Rent @ {percentFormat(data.RG)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-2xl">{moneyFormat(data.OG0)}</p>
							<p className="text-xs text-red-500">
								Outgoings @ {percentFormat(data.CPI)}
							</p>
						</div>
					</div>
					<GraphBusinessModel data={data} />
					<div className="font-tabular grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(data.GrossProfitMargin)}</p>
							<p className="text-xs text-purple-500">Gross Profit Margin</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(data.NetProfitMargin)}</p>
							<p className="text-xs text-blue-500">Net Profit Margin</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(data.FCFRate)}</p>
							<p className="text-xs text-green-500">Cash Flow Growth Rate</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(data.RRR)}</p>
							<p className="text-xs text-red-500">Required Return Rate</p>
						</div>
					</div>
					<GraphDiscountedCF data={data} />
					<div className="font-tabular grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.TotalInvestment)}</p>
							<p className="text-xs text-white">Total Investment</p>
							<p className="text-xs text-gray-500 text-center pt-2 hidden md:block">
								(Price + GST + SAV + Fee + Working Capital)
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.TotalDCF)}</p>
							<p className="text-xs text-white">Estimated Value</p>
							<p className="text-xs text-gray-500 text-center pt-2 hidden md:block">
								(Total Cash Flow + Terminal Cash Flow at Discounted Rate)
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p
								className={`text-xl ${
									data.ROI > 0 ? "text-green-500" : "text-red-500"
								}`}
							>
								{percentFormat(data.ROI)}
							</p>
							<p className="text-xs text-white">Return on Investment</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p
								className={`text-xl ${
									data.valueEstimation > 0.1
										? "text-green-500"
										: data.valueEstimation > -0.1
										? "text-yellow-500"
										: "text-red-500"
								}`}
							>
								{data.valueVerdict}
							</p>
							<p className="text-xs text-white">Verdict</p>
						</div>
					</div>
					<GraphValuation data={data} />
				</div>
			) : (
				<p className="text-xs italic text-gray-400">Calculating financial...</p>
			)}
			<FullWorkSheet />
			<ViewAllOffer />
		</div>
	);
};

const offerLoader = async ({ params }) => {
	const res = await fetch(`/api/offers/${params.id}`);
	if (!res.ok) throw new Error("Failed to load offer.");
	const data = await res.json();
	return data;
};

export { ListingPage as default, offerLoader };
