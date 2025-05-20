import retailIndustry from "../data/retailIndustryMetrics.json";
import { Link } from "react-router-dom";

const Formula = ({ b, market }) => {
	const m = Object.assign({}, ...market);

	let RRR;
	switch (b.BusinessType) {
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
	let RG;
	{
		b.RentGrowthIncluded == 1
			? (RG = b.RentGrowth)
			: (RG = m["Region Rent Growth Rate"]);
	}

	const filteredMetric = retailIndustry.find(
		(item) => item.State === b.State && item.Industry === b.Industry
	);

	let OS = filteredMetric["Salary"];
	let GR = filteredMetric["Turnover Rate"];

	let FR0 = b.Revenue;
	let FR1 = FR0 * (1 + GR);
	let FR2 = FR1 * (1 + GR);
	let FR3 = FR2 * (1 + GR);
	let FR4 = FR3 * (1 + GR);
	let FR5 = FR4 * (1 + GR);

	let OG0 = b.Outgoings;
	let OG1 = OG0 * (1 + m["CPI Index"]);
	let OG2 = OG1 * (1 + m["CPI Index"]);
	let OG3 = OG2 * (1 + m["CPI Index"]);
	let OG4 = OG3 * (1 + m["CPI Index"]);
	let OG5 = OG4 * (1 + m["CPI Index"]);

	let W0;
	switch (b.EmploymentType) {
		case 0:
			W0 = 0;
			break;
		case 1:
			W0 = OS;
			break;
		case 2:
			W0 = b.Wages;
			break;
	}

	let W1 = W0 * (1 + m["Wage Index"]);
	let W2 = W1 * (1 + m["Wage Index"]);
	let W3 = W2 * (1 + m["Wage Index"]);
	let W4 = W3 * (1 + m["Wage Index"]);
	let W5 = W4 * (1 + m["Wage Index"]);

	let R0 = b.Rent;
	let R1 = R0 * (1 + RG);
	let R2 = R1 * (1 + RG);
	let R3 = R2 * (1 + RG);
	let R4 = R3 * (1 + RG);
	let R5 = R4 * (1 + RG);

	let TransferAndSetupFee = b.AskingPrice * 0.1;
	let WC0 = (OG0 + W0 + R0) / 2;
	let SAV;
	if (b.SAVIncluded == 1) {
		SAV = 0;
	} else {
		SAV = b.StatedNetProfit / m["Industry ITR"];
	}
	let TotalInvestment = b.AskingPrice + TransferAndSetupFee + WC0 + SAV;

	// Cash Flow

	let depreciation = b.AskingPrice / 2 / 10;
	let EBITDA1 = FR1 - OG1 - W1 - R1;
	let EBIT1 = EBITDA1 - b.SGA - depreciation;
	let NetIncome1 = EBIT1 * (1 - m.Taxes);
	let OCF1 = NetIncome1 + depreciation;
	let WC1 = WC0 - WC0 / 5;
	let NWC1 = WC1 - WC0;
	let NetOCF1 = OCF1 - NWC1;
	let DCF1 = NetOCF1 / Math.pow(1 + RRR, 1);

	let EBITDA2 = FR2 - OG2 - W2 - R2;
	let EBIT2 = EBITDA2 - b.SGA - depreciation;
	let NetIncome2 = EBIT2 * (1 - m.Taxes);
	let OCF2 = NetIncome2 + depreciation;
	let WC2 = WC1 - WC1 / 5;
	let NWC2 = WC2 - WC1;
	let NetOCF2 = OCF2 - NWC2;
	let DCF2 = NetOCF2 / Math.pow(1 + RRR, 2);

	let EBITDA3 = FR3 - OG3 - W3 - R3;
	let EBIT3 = EBITDA3 - b.SGA - depreciation;
	let NetIncome3 = EBIT3 * (1 - m.Taxes);
	let OCF3 = NetIncome3 + depreciation;
	let WC3 = WC2 - WC2 / 5;
	let NWC3 = WC3 - WC2;
	let NetOCF3 = OCF3 - NWC3;
	let DCF3 = NetOCF3 / Math.pow(1 + RRR, 3);

	let EBITDA4 = FR4 - OG4 - W4 - R4;
	let EBIT4 = EBITDA4 - b.SGA - depreciation;
	let NetIncome4 = EBIT4 * (1 - m.Taxes);
	let OCF4 = NetIncome4 + depreciation;
	let WC4 = WC3 - WC3 / 5;
	let NWC4 = WC4 - WC3;
	let NetOCF4 = OCF4 - NWC4;
	let DCF4 = NetOCF4 / Math.pow(1 + RRR, 4);

	let EBITDA5 = FR5 - OG5 - W5 - R5;
	let EBIT5 = EBITDA5 - b.SGA - depreciation;
	let NetIncome5 = EBIT5 * (1 - m.Taxes);
	let OCF5 = NetIncome5 + depreciation;
	let WC5 = WC4 - WC4 / 5;
	let NWC5 = WC5 - WC4;
	let NetOCF5 = OCF5 - NWC5;

	let TCF = (NetOCF5 * RRR) / (RRR - RG);
	let DCF5 = (NetOCF5 + TCF) / Math.pow(1 + RRR, 5);

	let TotalDiscountedCF = DCF1 + DCF2 + DCF3 + DCF4 + DCF5;
	let NPV = TotalDiscountedCF - TotalInvestment;

	RRR = (RRR * 100).toFixed(2);
	GR = (GR * 100).toFixed(2);

	return (
		<div>
			<p>{b.BusinessName}</p>
			<p>GrowthRate = {`${GR}%`}</p>
			<p>RRR = {`${RRR}%`}</p>
			<p>NPV = {NPV.toFixed(2)}</p>
			<button className="">
				<Link to={`/Listings/${b.ID}`}>View more</Link>
			</button>
		</div>
	);
};

export default Formula;
