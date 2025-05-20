import retailIndustry from "../data/retailIndustryMetrics.json";
const TestFormula = ({ b, m }) => {
	const filteredMetric = retailIndustry.find(
		(item) => item.State === b.State && item.Industry === b.Industry
	);

	let OS = filteredMetric["Salary"];

	return (
		<div>
			<p>{b.BusinessName}</p>
			<p>{m.Industry}</p>
		</div>
	);
};
export default TestFormula;
