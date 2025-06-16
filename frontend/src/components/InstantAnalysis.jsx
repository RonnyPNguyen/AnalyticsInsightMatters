import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Formula from "../components/Formula";
import GraphBusinessModel from "../components/GraphBusinessModel";
import GraphDiscountedCF from "../components/GraphDiscountedCF";
import GraphValuation from "../components/GraphValuation";
import FullWorkSheet from "../components/FullWorkSheet";

const InstantAnalysis = ({ data }) => {
	const [output, setOutput] = useState(null);
	const [marketData, setMarketData] = useState(null);

	const moneyFormat = (value) => {
		return new Intl.NumberFormat("en-AU", {
			style: "currency",
			currency: "AUD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(value);
	};
	const percentFormat = (value) => {
		return new Intl.NumberFormat("en-AU", {
			style: "percent",
			minimumFractionDigits: 1,
			maximumFractionDigits: 1,
		}).format(value);
	};

	useEffect(() => {
		const serverData = async () => {
			try {
				const marketRes = await fetch("api/data/marketData.json");
				const marketJson = await marketRes.json();
				setMarketData(marketJson);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		serverData();
	}, []);
	console.log(data);
	return (
		<section>
			<Formula
				listingsData={data}
				marketData={marketData}
				onResult={setOutput}
			/>
			{output ? (
				<div className="grid grid-cols-1 gap-8 py-4">
					<p className="font-writing text-4xl font-light text-center">
						Analysis Result
					</p>
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
					<GraphValuation data={output} />
					<div className="text-white font-tabular grid grid-cols-2 ld:grid-cols-4 gap-4">
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{output.TotalInvestment}</p>
							<p className="text-sm text-orange-500">Total Investment</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{output.TotalDCF}</p>
							<p className="text-sm text-orange-500">Total Value</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{percentFormat(output.ROI)}</p>
							<p className="text-sm text-orange-500">ROI</p>
						</div>
						<div className="bg-[#111111] w-full py-6 flex flex-col items-center justify-center rounded-md">
							<p className="text-xl">{output.valueVerdict}</p>
							<p className="text-sm text-orange-500">Verdict</p>
						</div>
					</div>
					{/* <FullWorkSheet data={output} /> */}
				</div>
			) : (
				<div>Calculating...</div>
			)}
		</section>
	);
};

export default InstantAnalysis;
