import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	Filler,
	annotationPlugin
);

const Graph = ({ data }) => {
	const colorGreen = "#2DC97E";
	const colorRed = "#E64141";
	const colorYellow = "#EEB219";
	const colorBlue = "#0566FC";
	const colorGray = "#968D88";
	const colorBlack = "#111111";
	const barThickness = 120;
	const labelOffsetX = 0;
	const labelOffsetY = 220;
	const labelOffsetR = 90;
	const moneyFormat = (number) => {
		return (
			"$" +
			new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(
				number
			)
		);
	};
	const yearLabels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
	const fairValue = data.TotalDCF;
	const askingPrice = data.TotalInvestment;
	const maxValue = Math.ceil((fairValue * 1.5) / 50000) * 50000;
	return (
		<>
			<div className="py-2 h-[40vh]">
				<Bar
					className="p-4 bg-[#111111] rounded-md shadow-lg"
					data={{
						labels: [""],
						datasets: [
							{
								label: "Undervalued",
								data: [fairValue * 0.9],
								backgroundColor: colorGreen,
								stack: "valuation",
								barThickness: barThickness,
							},
							{
								label: "Fair",
								data: [fairValue * 0.2],
								backgroundColor: colorYellow,
								stack: "valuation",
								barThickness: barThickness,
							},
							{
								label: "Overvalued",
								data: [(fairValue * 0.4).toFixed(0)],
								backgroundColor: colorRed,
								stack: "valuation",
								barThickness: barThickness,
							},
						],
					}}
					options={{
						indexAxis: "y",
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							x: {
								min: 0,
								max: Math.ceil((fairValue * 1.5) / 50000) * 50000,
								stacked: true,
								ticks: { display: true, color: "#fff" },
								grid: {
									display: true,
									color: "#333333",
									lineWidth: 2,
								},
							},
							y: {
								ticks: { display: true },
								stacked: true,
								grid: { display: false },
							},
						},
						plugins: {
							legend: { display: false },
							title: {
								display: true,
								text: "Valuation",
								color: "#fff",
								font: { family: "Inter", weight: 400, size: 24 },
								padding: { bottom: 0 },
							},
							tooltip: { enabled: true },
							annotation: {
								annotations: {
									underValue: {
										type: "line",
										xMin: fairValue * 0.9,
										xMax: fairValue * 0.9,
										borderColor: "transparent",
										borderWidth: 2,
										label: {
											display: true,
											content: ["Under"],
											position: "end",
											xAdjust: labelOffsetX,
											yAdjust: labelOffsetY,
											rotation: labelOffsetR,
											color: colorGreen,
											backgroundColor: "transparent",
											font: { family: "Inter", weight: 600, size: 16 },
											padding: 0,
										},
									},
									fairValue: {
										type: "line",
										xMin: fairValue,
										xMax: fairValue,
										borderColor: "transparent",
										borderDash: [8, 6],
										borderWidth: 3,
										label: {
											display: true,
											content: ["Fair"],
											position: "end",
											xAdjust: labelOffsetX,
											yAdjust: labelOffsetY,
											rotation: labelOffsetR,
											color: colorYellow,
											backgroundColor: "transparent",
											font: { family: "Inter", weight: 600, size: 16 },
											padding: 0,
										},
									},
									overValue: {
										type: "line",
										xMin: fairValue * 1.1,
										xMax: fairValue * 1.1,
										borderColor: "transparent",
										borderWidth: 2,
										label: {
											display: true,
											content: ["Over"],
											position: "end",
											xAdjust: labelOffsetX,
											yAdjust: labelOffsetY,
											rotation: labelOffsetR,
											color: colorRed,
											backgroundColor: "transparent",
											font: { family: "Inter", weight: 600, size: 16 },
											padding: 0,
										},
									},
									NPV: {
										type: "line",
										xMin: fairValue,
										xMax: fairValue,
										yMin: 0.2,
										yMax: -0.2,
										borderColor: "white",
										borderDash: [10, 4],
										borderWidth: 3,
										label: {
											display: true,
											content: [`NPV ${moneyFormat(data.NPV)}`],
											position: "end",
											xAdjust: labelOffsetX,
											yAdjust: -20,
											rotation: 0,
											color: data.NPV < 0 ? colorRed : colorGreen,
											backgroundColor: "transparent",
											font: { family: "Inter", weight: 600, size: 16 },
											padding: 0,
										},
									},
									askingPrice: {
										type: "box",
										xMin: 0,
										xMax: askingPrice,
										yMax: -0.1,
										yMin: 0.1,
										borderWidth: 0,
										backgroundColor: colorBlack + "99",
									},
									askingPriceTip: {
										type: "box",
										xMin: askingPrice - maxValue * 0.3,
										xMax: askingPrice,
										yMax: -0.1,
										yMin: 0.1,
										borderWidth: 0,
										backgroundColor: colorBlack,
										label: {
											display: true,
											content: ["Asking Price", `${moneyFormat(askingPrice)}`],
											position: "middle",
											color: "white",
											font: { family: "Inter", weight: 400, size: 16 },
										},
									},
								},
							},
						},
					}}
				/>
			</div>
		</>
	);
};

export default Graph;
