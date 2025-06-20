import React from "react";
import { Bar } from "react-chartjs-2";

const GraphBusinessModel = ({ data }) => {
	const yearLabels = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
	const colorGreen = "#2DC97E";
	const colorRed = "#E64141";
	const colorBlue = "#0566FC";
	const colorYellow = "#F2C94C";
	const colorPurple = "#9B51E0";
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
		<div className="lg:h-[60vh] h-[40vh]">
			<Bar
				className="p-4 bg-[#111111] rounded-md shadow-lg"
				data={{
					labels: yearLabels,
					datasets: [
						{
							label: "Revenue",
							data: [
								data.AR1 || 0,
								data.AR2 || 0,
								data.AR3 || 0,
								data.AR4 || 0,
								data.AR5 || 0,
							],
							backgroundColor: colorGreen,
							borderWidth: 2,
						},
						{
							label: "Expenses",
							data: [
								data.TotalExpense1,
								data.TotalExpense2,
								data.TotalExpense3,
								data.TotalExpense4,
								data.TotalExpense5,
							],
							backgroundColor: colorRed,
							borderWidth: 3,
						},
						{
							label: "EBITDA",
							data: [
								data.EBITDA1 || 0,
								data.EBITDA2 || 0,
								data.EBITDA3 || 0,
								data.EBITDA4 || 0,
								data.EBITDA5 || 0,
							],
							backgroundColor: colorPurple,
							borderWidth: 2,
						},
						{
							label: "Net Income",
							data: [
								data.NI1 || 0,
								data.NI2 || 0,
								data.NI3 || 0,
								data.NI4 || 0,
								data.NI5 || 0,
							],
							backgroundColor: colorBlue,
							borderWidth: 2,
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
							text: "Business Model Overview",
							color: "#ffffff",
							font: { family: "Inter", weight: 400, size: 24 },
							padding: { bottom: 20 },
						},
					},
					scales: {
						x: {
							ticks: {
								color: "#ffffff",
								font: { family: "Roboto Mono", weight: 100, size: 12 },
								padding: 10,
							},
							font: { family: "Roboto Mono", weight: 100, size: 12 },
							padding: 0,
						},
						y: {
							ticks: {
								color: "#ffffff",
								font: { family: "Roboto Mono", weight: 100, size: 12 },
								padding: 10,
							},
							font: { family: "Roboto Mono", weight: 100, size: 12 },
							padding: 0,
							grid: { color: "#333" },
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default GraphBusinessModel;
