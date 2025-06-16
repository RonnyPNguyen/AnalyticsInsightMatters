import { useState, useEffect } from "react";

const Formula = ({ listingsData, marketData, onResult }) => {
	useEffect(() => {
		if (listingsData && marketData) {
			const result = calculateFormula(listingsData, marketData);
			onResult(result);
		}
	}, [listingsData, marketData]);

	return null;
};

function calculateFormula(listingsData, marketData) {
	const data = listingsData;
	let market;
	if (Array.isArray(marketData)) {
		market = marketData[0];
	} else {
		market = marketData;
	}

	const id = data.id;
	const businessName = data.businessName;
	const businessDescription = data.businessDescription;
	const businessIndustry = data.businessIndustry;
	const businessDivision = data.businessDivision;
	const businessModel = data.businessModel;
	const businessSize = data.businessSize;
	const locationState = data.locationState;
	const locationSuburb = data.locationSuburb;
	const locationPostCode = data.locationPostCode;
	const askingPrice = data.askingPrice;
	const salePrice = data.salePrice;
	const annualRevenue = data.annualRevenue;
	const annualOutgoings = data.annualOutgoings;
	const annualWages = data.annualWages;
	const annualRent = data.annualRent;
	const annualProfit = data.annualProfit;
	const gstValue = data.gstValue / 100;
	const savIncluded = data.savIncluded;
	const savValue = data.savValue;
	const yieldIncluded = data.yieldIncluded;
	const yieldValue = data.yieldValue / 100;
	const sgaValue = data.sgaValue;
	const tradingDays = data.tradingDays;
	const listingStatus = data.listingStatus;
	const dateAdded = data.dateAdded;
	const listingVerified = data.listingVerified;
	const listingUrl = data.listingUrl;

	const CPI = market.CPI / 100;
	const WPI = market.WPI / 100;
	const growthByState = market.growthByState;
	const stockLevelByIndustry = market.stockLevelByIndustry;
	const rentalYieldByCapital = market.rentalYieldByCapital;
	const capitals = {
		NSW: "Sydney",
		VIC: "Melbourne",
		QLD: "Brisbane",
		WA: "Perth",
		SA: "Adelaide",
		TAS: "Hobart",
		ACT: "Canberra",
		NT: "Darwin",
	};
	const states = {
		NSW: "New South Wales",
		VIC: "Victoria",
		QLD: "Queensland",
		WA: "Western Australia",
		SA: "South Australia",
		TAS: "Tasmania",
		ACT: "Australian Capital Territory",
		NT: "Northern Territory",
	};
	let GR = growthByState[states[locationState]] / 100; // Growth Rate
	let SL = stockLevelByIndustry[businessIndustry] / 100; // Stock at Value Rate

	let RY;
	if (yieldIncluded === 0) {
		RY = market.rentalYieldByCapital[capitals[locationState]] / 100;
	} else {
		RY = yieldValue; // Rental Yield
	}

	// Market Case
	let RRR = 0.15; // Default Rate of Return

	let ownerSalary = 72000;
	let totalWages = 0; // Default Wages
	switch (businessModel) {
		case "Owner Operated":
			RRR = 0.2; // Owner Operated
			totalWages = annualWages + ownerSalary; // 100% Owner Involvement
			break;
		case "Mixed Management":
			RRR = 0.18; // Mixed Management
			totalWages = annualWages + ownerSalary * 0.5; // 50% Owner Involvement
			break;
		case "Owner Administrated":
			RRR = 0.15; // Owner Administrated
			totalWages = annualWages + ownerSalary * 0.2; // 33% Owner Involvement
			break;
		case "Under Management":
			RRR = 0.12; // Management
			totalWages = annualWages; // 0% Owner Involvement
			break;
		case "Franchise":
			RRR = 0.1; // Franchise
			totalWages = annualWages; // 0% Owner Involvement
			break;
		default:
	}

	// Forecasted Revenue
	const AR1 = annualRevenue * (1 + GR);
	const AR2 = AR1 * (1 + GR);
	const AR3 = AR2 * (1 + GR);
	const AR4 = AR3 * (1 + GR);
	const AR5 = AR4 * (1 + GR);
	// Outgoings
	const OG1 = annualOutgoings * (1 + CPI);
	const OG2 = OG1 * (1 + CPI);
	const OG3 = OG2 * (1 + CPI);
	const OG4 = OG3 * (1 + CPI);
	const OG5 = OG4 * (1 + CPI);
	// Rent
	const R1 = annualRent * (1 + RY);
	const R2 = R1 * (1 + RY);
	const R3 = R2 * (1 + RY);
	const R4 = R3 * (1 + RY);
	const R5 = R4 * (1 + RY);
	// Wages
	const W1 = totalWages * (1 + WPI);
	const W2 = W1 * (1 + WPI);
	const W3 = W2 * (1 + WPI);
	const W4 = W3 * (1 + WPI);
	const W5 = W4 * (1 + WPI);
	// Total Expenses
	const TotalExpense1 = OG1 + W1 + R1;
	const TotalExpense2 = OG2 + W2 + R2;
	const TotalExpense3 = OG3 + W3 + R3;
	const TotalExpense4 = OG4 + W4 + R4;
	const TotalExpense5 = OG5 + W5 + R5;
	// Non-Cash Deductions
	const workingCapital = (annualOutgoings + totalWages + annualRent) / 2; // 6-months Buffer
	const depreciationRate = 0.04;

	let estimatedSAV = 0;
	if (savIncluded === 0 && savValue === 0) {
		estimatedSAV = SL * annualRevenue;
	}

	let estimatedGST = 0;
	if (gstValue !== 0) {
		estimatedGST = askingPrice * 0.1;
	}
	let sgaRate = 0;
	if (sgaValue !== 0) {
		sgaRate = sgaValue;
	}

	const TotalInvestment =
		askingPrice + estimatedGST + estimatedSAV + workingCapital;

	// Taxes, Interest, and SGA
	const taxRate = 0.25;
	const interestRate = 0;
	const loanAmount = 0;

	// Cash Flow Year 1 to Year 5
	const EBITDA1 = AR1 - TotalExpense1;
	const EBIT1 = EBITDA1 * (1 - sgaRate) - depreciationRate * AR1;
	const NI1 = EBIT1 * (1 - taxRate) - interestRate * loanAmount;
	const OCF1 = NI1 + depreciationRate * AR1;
	const WC1 = workingCapital - workingCapital / 5;
	const NWC1 = WC1 - workingCapital;
	const NetOCF1 = OCF1 - NWC1;
	const DCF1 = NetOCF1 / Math.pow(1 + RRR, 1);

	const EBITDA2 = AR2 - TotalExpense2;
	const EBIT2 = EBITDA2 * (1 - sgaRate) - depreciationRate * AR2;
	const NI2 = EBIT2 * (1 - taxRate) - interestRate * loanAmount;
	const OCF2 = NI2 + depreciationRate * AR2;
	const WC2 = WC1 - workingCapital / 5;
	const NWC2 = WC2 - WC1;
	const NetOCF2 = OCF2 - NWC2;
	const DCF2 = NetOCF2 / Math.pow(1 + RRR, 2);

	const EBITDA3 = AR3 - TotalExpense3;
	const EBIT3 = EBITDA3 * (1 - sgaRate) - depreciationRate * AR3;
	const NI3 = EBIT3 * (1 - taxRate) - interestRate * loanAmount;
	const OCF3 = NI3 + depreciationRate * AR3;
	const WC3 = WC2 - workingCapital / 5;
	const NWC3 = WC3 - WC2;
	const NetOCF3 = OCF3 - NWC3;
	const DCF3 = NetOCF3 / Math.pow(1 + RRR, 3);

	const EBITDA4 = AR4 - TotalExpense4;
	const EBIT4 = EBITDA4 * (1 - sgaRate) - depreciationRate * AR4;
	const NI4 = EBIT4 * (1 - taxRate) - interestRate * loanAmount;
	const OCF4 = NI4 + depreciationRate * AR4;
	const WC4 = WC3 - workingCapital / 5;
	const NWC4 = WC4 - WC3;
	const NetOCF4 = OCF4 - NWC4;
	const DCF4 = NetOCF4 / Math.pow(1 + RRR, 4);

	const EBITDA5 = AR5 - TotalExpense5;
	const EBIT5 = EBITDA5 * (1 - sgaRate) - depreciationRate * AR5;
	const NI5 = EBIT5 * (1 - taxRate) - interestRate * loanAmount;
	const OCF5 = NI5 + depreciationRate * AR5;
	const WC5 = WC4 - workingCapital / 5;
	const NWC5 = WC5 - WC4;
	const NetOCF5 = OCF5 - NWC5;
	const TCF = 0;
	const ExitCF = NetOCF5 + TCF;
	const DCF5 = (NetOCF5 + TCF) / Math.pow(1 + RRR, 5);

	// Financial Analysis
	const TotalRevenue = AR1 + AR2 + AR3 + AR4 + AR5;
	const TotalGrossProfit = EBITDA1 + EBITDA2 + EBITDA3 + EBITDA4 + EBITDA5;
	const TotalNetProfit = NI1 + NI2 + NI3 + NI4 + NI5;
	const GrossProfitMargin = TotalGrossProfit / TotalRevenue;
	const NetProfitMargin = TotalNetProfit / TotalRevenue;
	const FCFRate = Math.pow(ExitCF / NetOCF1, 1 / 5) - 1;
	const TotalDCF = DCF1 + DCF2 + DCF3 + DCF4 + DCF5;
	const NPV = TotalDCF - TotalInvestment;
	const ROI = NPV / TotalInvestment;
	const valueEstimation = 1 - TotalInvestment / TotalDCF;
	const valueVerdict =
		valueEstimation > 0.1
			? "Undervalued"
			: valueEstimation > -0.1
			? "Fair Deal"
			: "Overvalued";
	return {
		id,
		businessName,
		businessDescription,
		businessIndustry,
		businessDivision,
		businessModel,
		businessSize,
		locationState,
		locationSuburb,
		locationPostCode,
		askingPrice,
		salePrice,
		annualRevenue,
		annualOutgoings,
		annualWages,
		annualRent,
		annualProfit,
		gstValue,
		savIncluded,
		savValue,
		yieldIncluded,
		yieldValue,
		sgaValue,
		tradingDays,
		listingStatus,
		dateAdded,
		listingVerified,
		listingUrl,
		estimatedSAV,
		estimatedGST,
		sgaRate,
		depreciationRate,
		taxRate,
		workingCapital,
		AR1,
		AR2,
		AR3,
		AR4,
		AR5,
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
		GR,
		CPI,
		WPI,
		RY,
		RRR,
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
		ExitCF,
		DCF5,
		TotalGrossProfit,
		TotalNetProfit,
		TotalRevenue,
		TotalInvestment,
		GrossProfitMargin,
		NetProfitMargin,
		FCFRate,
		TotalDCF,
		NPV,
		ROI,
		valueEstimation,
		valueVerdict,
	};
}

export default Formula;
