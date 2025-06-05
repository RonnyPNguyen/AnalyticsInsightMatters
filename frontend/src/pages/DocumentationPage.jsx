import React from "react";

const DocumentationPage = () => {
	return (
		<div className="font-writing px-8 lg:w-250 md:mx-autotext-white text-justify">
			<div>
				<h2 className="text-2xl font-bold mb-4">Documentation</h2>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2">1. Data Collection</h3>
				<p className="font-medium text-lg">Key Information (User Input):</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- Revenue: Reported or estimated annual revenue</p>
					<p>- Rent: Current yearly rental costs</p>
					<p>- Wages: Total staff wages or owner salary</p>
					<p>
						- Outgoings: Operating expenses such as utilities, supplies, etc.
					</p>
				</div>

				<p className="font-medium text-lg mt-4">
					Hidden Information (Calculated or Inferred):
				</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- SAV: Calculated when not included in asking price</p>
					<p>- Rent Growth: Provided or replaced with market rate</p>
					<p>- Employment Type: Owner-operated, under management, etc.</p>
					<p>- Owner Salary: From industry benchmarks</p>
					<p>- SGA: Only applies to franchise businesses</p>
					<p>- Business Size: Affects required rate of return (RRR)</p>
					<p>- Industry: Used to fetch turnover rate and owner salary</p>
				</div>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2">2. Market Index</h3>
				<p className="font-medium text-lg">Market Inputs Used:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- CPI: Adjusts outgoings over time</p>
					<p>- Wage Index: Projects wage increases</p>
					<p>- Region Rent Growth: Used if rent growth not provided</p>
					<p>- Industry Turnover Rate: Used to forecast revenue</p>
				</div>

				<p className="font-medium text-lg mt-4">Data Sources:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- ABS (Australian Bureau of Statistics)</p>
					<p>- ATO (Australian Tax Office)</p>
					<p>- IBISWorld</p>
					<p>- Franchise Council of Australia</p>
				</div>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2">3. Valuation Framework</h3>
				<p className="font-medium text-lg">Business Model & Assumptions:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- Supports different types: Small, Medium, Franchise, Start-up</p>
					<p>- Adjusts for employment model and industry type</p>
				</div>

				<p className="font-medium text-lg mt-4">Projected Cash Flow:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- Forecasts Revenue, Rent, Wages, Outgoings for 5 years</p>
					<p>- CPI, Wage Index, Turnover Rate used for annual growth</p>
					<p>- Depreciation and working capital changes included</p>
				</div>

				<p className="font-medium text-lg mt-4">Valuation Metrics:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>- EBITDA, Net Profit, and Operating Cash Flow for each year</p>
					<p>- Terminal value calculated based on Year 5 cash flow</p>
					<p>- DCF model subtracts investment from discounted flows</p>
				</div>

				<p className="font-medium text-lg mt-4">Outcome:</p>
				<div className="ml-4 space-y-1 mt-1">
					<p>
						- NPV, ROI, and Value Verdict (Undervalued / Fair Deal / Overvalued)
					</p>
					<p>- Clear interpretation of business value vs asking price</p>
				</div>
			</div>
		</div>
	);
};

export default DocumentationPage;
