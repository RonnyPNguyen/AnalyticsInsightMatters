import React from "react";
import FinancialTable from "./FinancialTable";

const FullWorkSheet = ({ data }) => {
	const [showDetails, setShowDetails] = React.useState(false);
	const businessModelRows = [
		{
			Revenue: [
				data.annualRevenue,
				data.AR1,
				data.AR2,
				data.AR3,
				data.AR4,
				data.AR5,
			],
		},
		{
			Outgoings: [
				data.annualOutgoings,
				data.OG1,
				data.OG2,
				data.OG3,
				data.OG4,
				data.OG5,
			],
		},
		{ Wages: [data.annualWages, data.W1, data.W2, data.W3, data.W4, data.W5] },
		{ Rent: [data.annualRent, data.R1, data.R2, data.R3, data.R4, data.R5] },
	];
	const initialInvestmentRows = [
		{ "Asking Price": [data.askingPrice, "-", "-", "-", "-", "-"] },
		{ GST: [data.estimatedGST, "-", "-", "-", "-", "-"] },
		{ SAV: [data.estimatedSAV, "-", "-", "-", "-", "-"] },
	];
	const operatingCashFlowRows = [
		{
			EBITDA: [
				"-",
				data.EBITDA1,
				data.EBITDA2,
				data.EBITDA3,
				data.EBITDA4,
				data.EBITDA5,
			],
		},
		{
			SGA: [
				"-",
				data.EBITDA1 * data.sgaRate,
				data.EBITDA2 * data.sgaRate,
				data.EBITDA3 * data.sgaRate,
				data.EBITDA4 * data.sgaRate,
				data.EBITDA5 * data.sgaRate,
			],
		},
		{
			Depreciation: [
				"-",
				data.depreciationRate * data.AR1,
				data.depreciationRate * data.AR2,
				data.depreciationRate * data.AR3,
				data.depreciationRate * data.AR4,
				data.depreciationRate * data.AR5,
			],
		},
		{
			EBIT: ["-", data.EBIT1, data.EBIT2, data.EBIT3, data.EBIT4, data.EBIT5],
		},
		{
			Taxes: [
				"-",
				data.EBIT1 * data.taxRate,
				data.EBIT2 * data.taxRate,
				data.EBIT3 * data.taxRate,
				data.EBIT4 * data.taxRate,
				data.EBIT5 * data.taxRate,
			],
		},
		{
			"Net Income": ["-", data.NI1, data.NI2, data.NI3, data.NI4, data.NI5],
		},
		{
			"Non-Cash": [
				"-",
				data.depreciationRate * data.AR1,
				data.depreciationRate * data.AR2,
				data.depreciationRate * data.AR3,
				data.depreciationRate * data.AR4,
				data.depreciationRate * data.AR5,
			],
		},
		{
			"Operating Cash Flow": [
				"-",
				data.OCF1,
				data.OCF2,
				data.OCF3,
				data.OCF4,
				data.OCF5,
			],
		},
	];
	const workingCapitalRows = [
		{
			"Working Capital": [
				data.workingCapital,
				data.WC1,
				data.WC2,
				data.WC3,
				data.WC4,
				data.WC5,
			],
		},
		{
			NWC: ["-", data.NWC1, data.NWC2, data.NWC3, data.NWC4, data.NWC5],
		},
	];
	const incrementalCashFlowRows = [
		{
			"Predicted Cash flow": [
				-data.TotalInvestment,
				data.NetOCF1,
				data.NetOCF2,
				data.NetOCF3,
				data.NetOCF4,
				data.NetOCF5,
			],
		},
		{
			"Discounted Cash flow": [
				-data.TotalInvestment,
				data.DCF1,
				data.DCF2,
				data.DCF3,
				data.DCF4,
				data.DCF5,
			],
		},
		{ NPV: [data.NPV, "-", "-", "-", "-", "-"] },
	];
	return (
		<div>
			{showDetails ? (
				<div>
					<div className="flex flex-col gap-4 bg-[#111111] p-2 text-center">
						<div>
							<h2 className="text-lg font-semibold mb-4 mt-2 text-white">
								Business Model
							</h2>
							<FinancialTable rows={businessModelRows} />
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-4 text-white">
								Initial Investment
							</h2>
							<FinancialTable rows={initialInvestmentRows} />
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-4 text-white">
								Operating Cash Flow
							</h2>
							<FinancialTable rows={operatingCashFlowRows} />
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-4 text-white">
								Working Capital
							</h2>
							<FinancialTable rows={workingCapitalRows} />
						</div>
						<div>
							<h2 className="text-lg font-semibold mb-4 text-white">
								Incremental Cash Flow
							</h2>
							<FinancialTable rows={incrementalCashFlowRows} />
						</div>
					</div>
					<button
						className="mt-4 italic bg-[#333333] rounded-lg hover:bg-gray-900 text-blue-500 p-4 hover:hover:cursor-pointer w-full mx-auto"
						onClick={() => setShowDetails(!showDetails)}
					>
						Show less
					</button>
				</div>
			) : (
				<div>
					<button
						className="italic bg-[#333333] rounded-lg hover:bg-gray-900 text-blue-500 p-4 hover:hover:cursor-pointer w-full mx-auto"
						onClick={() => setShowDetails(!showDetails)}
					>
						Show Full WorkSheet
					</button>
				</div>
			)}
		</div>
	);
};

export default FullWorkSheet;
