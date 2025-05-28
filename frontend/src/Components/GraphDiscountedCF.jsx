import React from "react";
import { Line } from "react-chartjs-2";

const GraphDiscountedCF = ({ data }) => {
	const yearLabels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
	const colorGreen = "#2DC97E";
	const colorRed = "#E64141";
	const colorBlue = "#0566FC";
	const colorBackground = "#111111";
	const colorWhite = "#FFFFFF";
	const moneyFormat = (number) => {
		return (
			"$" +
			new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(
				number
			)
		);
	};
	return (
		<div className="py-2 lg:h-[60vh] h-[40vh]">
			<Line
				className="p-4 bg-[#111111] rounded-md shadow-lg"
				data={{
					labels: yearLabels,
					datasets: [
						{
							label: "Discounted Cash Flow",
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
							label: "Free Cash Flow",
							data: [
								data.NetOCF1,
								data.NetOCF2,
								data.NetOCF3,
								data.NetOCF4,
								data.NetOCF5 + data.TCF,
							],
							borderColor: colorGreen,
							backgroundColor: (context) => {
								const ctx = context.chart.ctx;
								const gradient = ctx.createLinearGradient(0, 0, 0, 400);
								gradient.addColorStop(0, colorGreen + "99");
								gradient.addColorStop(1, colorGreen + "20");
								return gradient;
							},
							fill: true,
							tension: 0,
						},
					],
				}}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: {
							display: true,
							position: "bottom",
							labels: { color: "#ffffff" },
						},
						title: {
							display: true,
							text: "Cash Flow Analysis",
							color: "#ffffff",
							font: { family: "Inter", weight: 400, size: 24 },
							padding: { bottom: 10 },
						},
					},
					scales: {
						x: {
							font: { family: "Mono", weight: 200, size: 12 },
							ticks: { color: "#ffffff" },
							padding: 10,
						},
						y: {
							ticks: {
								color: "#ffffff",
								font: { family: "Mono", weight: 200, size: 12 },
								padding: 10,
							},
							grid: { color: "#333333" },
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default GraphDiscountedCF;
