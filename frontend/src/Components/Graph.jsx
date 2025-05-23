import { useState } from "react";
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

import annotationPlugin from "chartjs-plugin-annotation";
import { Bar, Line } from "react-chartjs-2";

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
	const fairValue = data.TotalDCF.toFixed(0);
	const currentPrice = data.TotalInvestment.toFixed(0);
	const chartOptions = (title) => ({
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				labels: { color: "#fff" },
			},
			title: {
				display: true,
				text: title,
				color: "#fff",
				font: { family: "Inter", weight: 400, size: 24 },
				padding: { bottom: 30 },
			},
		},
		scales: {
			x: {
				ticks: { color: "#fff" },
				font: { family: "Inter, sans-serif", weight: 200, size: 12 },
				padding: 0,
			},
			y: {
				ticks: {
					color: "#fff",
					font: { family: "Inter, sans-serif", weight: 200, size: 12 },
					padding: 10,
				},
				grid: { color: "#333" },
				beginAtZero: true,
			},
		},
	});

	return (
		<>
			<div className="py-2 lg:h-[60vh] h-[40vh]">
				<Bar
					className="p-4 bg-[#111111] rounded-md shadow-lg"
					data={{
						labels: yearLabels,
						datasets: [
							{
								label: "Revenue",
								data: [
									data.FR1 || 0,
									data.FR2 || 0,
									data.FR3 || 0,
									data.FR4 || 0,
									data.FR5 || 0,
								],
								backgroundColor: colorGreen,
								borderWidth: 2,
							},
							{
								label: "Total Expenses",
								data: [
									data.TotalExpense1,
									data.TotalExpense2,
									data.TotalExpense3,
									data.TotalExpense4,
									data.TotalExpense5,
								],
								backgroundColor: colorRed,
								// borderColor: "#E6414199",
								borderWidth: 3,
							},
							{
								label: "Net Profit",
								data: [
									data.EBITDA1 || 0,
									data.EBITDA2 || 0,
									data.EBITDA3 || 0,
									data.EBITDA4 || 0,
									data.EBITDA5 || 0,
								],
								backgroundColor: colorBlue,
								borderWidth: 2,
							},
						],
					}}
					options={chartOptions("Business Model")}
				/>
			</div>
			<div className="py-2 lg:h-[60vh] h-[40vh]">
				<Line
					className="p-4 bg-[#111111] rounded-md shadow-lg"
					data={{
						labels: yearLabels,
						datasets: [
							{
								label: "Discounted CF",
								data: [data.DCF1, data.DCF2, data.DCF3, data.DCF4, data.DCF5],
								borderColor: colorRed,
								backgroundColor: (context) => {
									const ctx = context.chart.ctx;
									const gradient = ctx.createLinearGradient(0, 0, 0, 400);
									gradient.addColorStop(0, colorRed);
									gradient.addColorStop(1, colorRed + "50");
									return gradient;
								},
								fill: true,
								tension: 0,
							},
							{
								label: "Operating CF",
								data: [data.OCF1, data.OCF2, data.OCF3, data.OCF4, data.OCF5],
								borderColor: colorGreen,
								backgroundColor: (context) => {
									const ctx = context.chart.ctx;
									const gradient = ctx.createLinearGradient(0, 0, 0, 400);
									gradient.addColorStop(0, colorGreen);
									gradient.addColorStop(1, colorGreen + "20");
									return gradient;
								},
								fill: true,
								tension: 0,
							},
							{
								label: "Free CF",
								data: [
									data.NetOCF1,
									data.NetOCF2,
									data.NetOCF3,
									data.NetOCF4,
									data.NetOCF5,
								],
								borderColor: colorBlue,
								backgroundColor: (context) => {
									const ctx = context.chart.ctx;
									const gradient = ctx.createLinearGradient(0, 0, 0, 400);
									gradient.addColorStop(0, colorBlue + "99");
									gradient.addColorStop(1, colorBlue + "20");
									return gradient;
								},
								fill: true,
								tension: 0,
							},
						],
					}}
					options={chartOptions("Discounted Cash Flow")}
				/>
			</div>
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
										xMax: currentPrice,
										yMax: -0.1,
										yMin: 0.1,
										borderWidth: 0,
										backgroundColor: colorBlack + "99",
									},
									askingPriceTip: {
										type: "box",
										xMin: currentPrice * 0.6,
										xMax: currentPrice,
										yMax: -0.1,
										yMin: 0.1,
										borderWidth: 0,
										backgroundColor: colorBlack,
										label: {
											display: true,
											content: ["Asking Price", `${moneyFormat(currentPrice)}`],
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
