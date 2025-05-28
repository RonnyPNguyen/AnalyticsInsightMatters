import { useState } from "react";
import { useParams, useLoaderData, Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Formula from "../components/Formula";
import { BsCircleFill } from "react-icons/bs";
import ViewAllOffer from "../components/ViewAllOffer";
import FullWorkSheet from "../components/FullWorkSheet";
import GraphBusinessModel from "../components/GraphBusinessModel";
import GraphValuation from "../components/GraphValuation";
import GraphDiscountedCF from "../components/GraphDiscountedCF";

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

	const formatPercent = (number) => {
		return new Intl.NumberFormat("en-AU", {
			style: "percent",
			minimumFractionDigits: 2,
		}).format(number);
	};

	return (
		<div className="p-4 text-white">
			<Formula data={offer} onResult={setData} />
			<div className="flex justify-between items-center text-base">
				<Link
					to="/listings"
					className="p-1 font-mont w-fit flex items-center rounded-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
				>
					<FaArrowLeft className="mr-2" />
					<p>Back to Listings</p>
				</Link>
				<Link
					to={offer.URL}
					target="_blank"
					rel="noopener noreferrer"
					className="p-1 font-mont w-fit flex items-center rounded-md hover:bg-white hover:text-black transition duration-300 ease-in-out"
				>
					<p>Data Source</p>
					<FaArrowRight className="ml-2" />
				</Link>
			</div>
			{data ? (
				<div className="lg:px-40">
					<div className="py-2">
						<div className="text-center font-inter py-20">
							<p className="text-4xl font-bold">{offer.BusinessName}</p>
							<p className="text-xs text-gray-500">{`${offer.Suburb}, ${offer.State} ${offer.Postcode}`}</p>
						</div>
						<div className="text-left font-inter">
							<div className="bg-[#111111] p-4 rounded-md py-6">
								<p className="font-[400] text-2xl text-white py-2">
									Asking Price: {moneyFormat(offer.AskingPrice)}
									{offer.GSTIncluded === 1 ? "" : " + GST"}
									{offer.SavIncluded === 1 ? "" : " + SAV"}
								</p>
								<p className="text-base text-white py-1 font-light ">
									<span className="font-medium">Type:</span>
									<span className="font-light">{` ${offer.BusinessType}`}</span>
								</p>
								<p className="text-base text-white py-1 font-light ">
									<span className="font-medium">Industry:</span>
									<span className="font-light">{` ${offer.Industry}`}</span>
								</p>
								<p className="text-base text-white py-1 font-light ">
									<span className="font-medium">Date Listed: </span>
									<span className="font-light">
										{offer.DateAdded
											? new Date(offer.DateAdded).toLocaleDateString("en-AU", {
													year: "numeric",
													month: "numeric",
													day: "numeric",
											  })
											: "N/A"}
									</span>
								</p>
								<div className="flex flex-row items-center space-x-2 text-base text-white py-1 font-light  ">
									<p className="font-medium">Status: </p>
									<p
										className={`font-inter text-xs px-2 rounded-full w-fit flex items-center space-x-2 ${
											offer.ListingStatus === 1
												? "bg-green-900 text-green-300"
												: "bg-red-900 text-red-300"
										}`}
									>
										<BsCircleFill
											className={`text-[8px] ${
												offer.ListingStatus === 1
													? "text-green-300"
													: "text-red-300"
											}`}
										/>
										<span>
											{offer.ListingStatus === 1
												? "Available"
												: `Sold at $${offer.SoldPrice}`}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.FR0)}</p>
							<p className="text-xs text-green-500">
								Revenue @ {formatPercent(data.GR)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.W0)}</p>
							<p className="text-xs text-blue-500">
								Wage @ {formatPercent(data.WageIndex)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.R0)}</p>
							<p className="text-xs text-purple-500">
								Rent @ {formatPercent(data.RG)}
							</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{moneyFormat(data.OG0)}</p>
							<p className="text-xs text-orange-500">
								Outgoings @ {formatPercent(data.CPI)}
							</p>
						</div>
					</div>
					<GraphBusinessModel data={data} />
					<div className="font-mono grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{formatPercent(data.GR)}</p>
							<p className="text-xs text-green-500">Industry Growth Rate</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{formatPercent(data.RRR)}</p>
							<p className="text-xs text-red-500">Required Return Rate</p>
						</div>
					</div>
					<GraphDiscountedCF data={data} />
					<GraphValuation data={data} />
				</div>
			) : (
				<p className="text-xs italic text-gray-400">
					Calculating financials...
				</p>
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
