import { useState, useEffect } from "react";

const Formula = ({ data, onResult }) => {
	const [market, setMarket] = useState([]);
	const [retail, setRetail] = useState([]);
	const [cpiValues, setCpiValues] = useState([]);
	const [avgCpi, setAvgCpi] = useState(null); // add this
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [marketRes, retailRes, cpiRes] = await Promise.all([
					fetch("/api/market"),
					fetch("/api/retail"),
					fetch(
						"https://data.api.abs.gov.au/rest/data/ABS,CPI,1.1.0/3.10001.10.50.?lastNObservations=5",
						{ headers: { Accept: "application/json" } }
					),
				]);
				const [marketData, retailData, cpiData] = await Promise.all([
					marketRes.json(),
					retailRes.json(),
					cpiRes.json(),
				]);
				setMarket(marketData);
				setRetail(retailData);

				const observations =
					cpiData?.data?.dataSets?.[0]?.series?.["0:0:0:0:0"]?.observations;
				if (observations) {
					const values = Object.entries(observations)
						.sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
						.map(([_, v]) => parseFloat(v[0]).toFixed(2));
					setCpiValues(values);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (!loading && market.length && retail.length) {
			const result = calculateFormula(data, market, retail);
			onResult?.(result);
		}
	}, [loading, market, retail, data]);

	return null; // or loading UI if you want
};

function calculateFormula(data, market, retail) {
	const m = {};
	market.forEach((item) => {
		if (item.id && typeof item.value !== "undefined") {
			m[item.id] = item.value;
		}
	});

	// Original Details
	const id = data.id;
	const status = data.Status;
	let AskingPrice = data.AskingPrice;
	let totalPrice;
	let GstIncluded = data.GSTIncluded;
	GstIncluded == 1
		? (totalPrice = AskingPrice)
		: (totalPrice = AskingPrice * 1.1);
	let TransferFee = AskingPrice * 0.1;
	let FR0 = data.Revenue; // Revenue
	let OG0 = data.Outgoings; // Outgoings
	let R0 = data.Rent; // Rent

	// Market Data
	let RRR;
	switch (data.BusinessType) {
		case "Small Business":
			RRR = 0.2;
			break;
		case "Medium Business":
			RRR = 0.16;
			break;
		case "Franchise":
			RRR = 0.1;
			break;
		case "Start-up":
			RRR = 0.3;
			break;
		default:
			RRR = 0.05;
			break;
	}
	const filteredMetric = retail.find(
		(item) => item.State === data.State && item.Industry === data.Industry
	);
	const OS = filteredMetric ? filteredMetric["Salary"] : 0;
	const GR = filteredMetric ? filteredMetric["Turnover Rate"] : 0;
	const CPI = m["CPI Index"];
	const WageIndex = m["Wage Index"];

	let W0, employmentType; // Wages & Employment Type
	switch (data.EmploymentType) {
		case 0:
			W0 = 0;
			employmentType = "Wage Included";
			break;
		case 1:
			W0 = OS;
			employmentType = "Owner Operate";
			break;
		case 2:
			W0 = data.Wages;
			employmentType = "Under Management";
			break;
		case 3:
			W0 = data.Wages + OS;
			employmentType = "Run with Staff";
			break;
	}
	let RG;
	{
		data.RentGrowthIncluded == 1
			? (RG = data.RentGrowth)
			: (RG = m["Region Rent Growth Rate"]);
	}

	// Forecasted Revenue
	const FR1 = FR0 * (1 + GR);
	const FR2 = FR1 * (1 + GR);
	const FR3 = FR2 * (1 + GR);
	const FR4 = FR3 * (1 + GR);
	const FR5 = FR4 * (1 + GR);
	// Outgoings
	const OG1 = OG0 * (1 + CPI);
	const OG2 = OG1 * (1 + CPI);
	const OG3 = OG2 * (1 + CPI);
	const OG4 = OG3 * (1 + CPI);
	const OG5 = OG4 * (1 + CPI);
	// Rent
	const R1 = R0 * (1 + RG);
	const R2 = R1 * (1 + RG);
	const R3 = R2 * (1 + RG);
	const R4 = R3 * (1 + RG);
	const R5 = R4 * (1 + RG);
	// Wage
	const W1 = W0 * (1 + WageIndex);
	const W2 = W1 * (1 + WageIndex);
	const W3 = W2 * (1 + WageIndex);
	const W4 = W3 * (1 + WageIndex);
	const W5 = W4 * (1 + WageIndex);
	// Total Expenses
	const TotalExpense1 = OG1 + W1 + R1;
	const TotalExpense2 = OG2 + W2 + R2;
	const TotalExpense3 = OG3 + W3 + R3;
	const TotalExpense4 = OG4 + W4 + R4;
	const TotalExpense5 = OG5 + W5 + R5;
	// Non-Cash Deductions
	const WC0 = (OG0 + W0 + R0) / 2;
	const Dep = data.AskingPrice / 2 / 10;
	const SGA = data.SGA; // applicable for franchises
	// Initial Investment
	let SAV;
	let SavIncluded = data.SAVIncluded;
	if (SavIncluded == 1) {
		SAV = 0;
	} else {
		SAV = data.StatedNetProfit / m["Industry ITR"];
	}
	const TotalInvestment = totalPrice + TransferFee + WC0 + SAV;
	// Taxes amd Interest
	const TaxRate = m.Taxes;
	const InterestRate = m.InterestRate;
	// Cash Flow Year 1 to Year 5
	const EBITDA1 = FR1 - TotalExpense1;
	const EBIT1 = EBITDA1 - SGA - Dep;
	const NI1 = EBIT1 * (1 - TaxRate);
	const OCF1 = NI1 + Dep;
	const WC1 = WC0 - WC0 / 5;
	const NWC1 = WC1 - WC0;
	const NetOCF1 = OCF1 - NWC1;
	const DCF1 = NetOCF1 / Math.pow(1 + RRR, 1);

	const EBITDA2 = FR2 - TotalExpense2;
	const EBIT2 = EBITDA2 - SGA - Dep;
	const NI2 = EBIT2 * (1 - TaxRate);
	const OCF2 = NI2 + Dep;
	const WC2 = WC1 - WC0 / 5;
	const NWC2 = WC2 - WC1;
	const NetOCF2 = OCF2 - NWC2;
	const DCF2 = NetOCF2 / Math.pow(1 + RRR, 2);

	const EBITDA3 = FR3 - TotalExpense3;
	const EBIT3 = EBITDA3 - SGA - Dep;
	const NI3 = EBIT3 * (1 - TaxRate);
	const OCF3 = NI3 + Dep;
	const WC3 = WC2 - WC0 / 5;
	const NWC3 = WC3 - WC2;
	const NetOCF3 = OCF3 - NWC3;
	const DCF3 = NetOCF3 / Math.pow(1 + RRR, 3);

	const EBITDA4 = FR4 - TotalExpense4;
	const EBIT4 = EBITDA4 - SGA - Dep;
	const NI4 = EBIT4 * (1 - TaxRate);
	const OCF4 = NI4 + Dep;
	const WC4 = WC3 - WC0 / 5;
	const NWC4 = WC4 - WC3;
	const NetOCF4 = OCF4 - NWC4;
	const DCF4 = NetOCF4 / Math.pow(1 + RRR, 4);

	const EBITDA5 = FR5 - TotalExpense5;
	const EBIT5 = EBITDA5 - SGA - Dep;
	const NI5 = EBIT5 * (1 - TaxRate);
	const OCF5 = NI5 + Dep;
	const WC5 = WC4 - WC0 / 5;
	const NWC5 = WC5 - WC4;
	const NetOCF5 = OCF5 - NWC5;
	const TCF = (NetOCF5 * (GR + 0.01)) / (RRR - (GR + 0.01)); // Terminal Cash Flow
	const DCF5 = (NetOCF5 + TCF) / Math.pow(1 + RRR, 5);

	const TotalNetProfit = NI1 + NI2 + NI3 + NI4 + NI5;
	const TotalRevenue = FR1 + FR2 + FR3 + FR4 + FR5;
	const ProfitMargin = TotalNetProfit / TotalRevenue;
	const TotalDCF = DCF1 + DCF2 + DCF3 + DCF4 + DCF5;
	const NPV = TotalDCF - TotalInvestment;
	const valueEstimation = NPV / AskingPrice;
	const valueVerdict =
		valueEstimation > 0.2
			? "Excellent Deal"
			: valueEstimation > 0.05
			? "Good Value"
			: valueEstimation > -0.05
			? "Fair Value"
			: valueEstimation > -0.2
			? "Poor Value"
			: "Overestimated";
	const url = data.URL;
	return {
		id,
		AskingPrice,
		TransferFee,
		FR0,
		OG0,
		R0,
		RG,
		OS,
		W0,
		GR,
		CPI,
		WageIndex,
		RRR,
		employmentType,
		FR1,
		FR2,
		FR3,
		FR4,
		FR5,
		OG1,
		OG2,
		OG3,
		OG4,
		OG5,
		R1,
		R2,
		R3,
		R4,
		R5,
		W1,
		W2,
		W3,
		W4,
		W5,
		TotalExpense1,
		TotalExpense2,
		TotalExpense3,
		TotalExpense4,
		TotalExpense5,
		WC0,
		Dep,
		SGA,
		SAV,
		SavIncluded,
		TaxRate,
		InterestRate,
		EBITDA1,
		EBIT1,
		NI1,
		OCF1,
		WC1,
		NWC1,
		NetOCF1,
		DCF1,
		EBITDA2,
		EBIT2,
		NI2,
		OCF2,
		WC2,
		NWC2,
		NetOCF2,
		DCF2,
		EBITDA3,
		EBIT3,
		NI3,
		OCF3,
		WC3,
		NWC3,
		NetOCF3,
		DCF3,
		EBITDA4,
		EBIT4,
		NI4,
		OCF4,
		WC4,
		NWC4,
		NetOCF4,
		DCF4,
		EBITDA5,
		EBIT5,
		NI5,
		OCF5,
		WC5,
		NWC5,
		NetOCF5,
		TCF,
		DCF5,
		TotalNetProfit,
		TotalRevenue,
		ProfitMargin,
		TotalInvestment,
		TotalDCF,
		NPV,
		valueEstimation,
		valueVerdict,
		url,
		status,
	};
}

export default Formula;
