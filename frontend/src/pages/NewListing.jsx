import { useState } from "react";
import InstantAnalysis from "../components/InstantAnalysis";
import Disclaimer from "../components/Disclaimer";

const inputFields = [
	{ id: { hidden: true, label: "id", type: "text" } },
	{
		businessName: {
			label: "Business Name",
			description: "Official name or descriptive name",
			type: "text",
		},
	},
	{
		businessDescription: {
			label: "Description",
			description: "Describe business model and key financial variables",
			type: "text",
		},
	},
	{
		businessIndustry: {
			label: "Industry",
			type: "select",
			options: [
				"Wholesale trade",
				"Retail trade",
				"Accommodation and food services",
				"Transport, postal and warehousing",
				"Rental, hiring and real estate services",
				"Education and training (private)",
				"Health care and social assistance (private)",
				"Arts and recreation services",
				"Other services",
			],
		},
	},
	{
		businessDivision: {
			label: "Division",
			type: "select",
			options: [
				"Cafe and restaurant catering",
				"Cafe and restaurant takeaways",
				"Nail, hair salon & personal Care",
				"Food retailing",
				"Other store-based retailing",
				"Non-store retailing and retail commission-based",
				"Clothing & fashion boutique",
				"Fitness & gym facilities",
				"Automotive retail & services",
				"Rental & hiring services",
				"Real estate services",
				"Education and training services",
			],
		},
	},
	{
		businessModel: {
			label: "Business Model",
			type: "select",
			options: [
				"Owner Operated",
				"Mixed Management",
				"Owner Administrated",
				"Under Management",
				"Franchise",
			],
		},
	},
	{
		businessSize: {
			label: "Business Size",
			type: "select",
			options: [
				"Small (1 to 4 employees)",
				"Medium (5 to 19 employees)",
				"Large (20+ employees)",
			],
		},
	},
	{
		locationState: {
			label: "State",
			type: "select",
			options: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
		},
	},
	{
		locationSuburb: {
			label: "Suburb",
			type: "text",
		},
	},
	{
		locationPostCode: { label: "Post Code", type: "text" },
	},
	{
		askingPrice: {
			label: "Asking Price",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		salePrice: {
			label: "Sale Price (if Sold)",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		annualRevenue: {
			label: "Annual Revenue",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		annualOutgoings: {
			label: "Annual Outgoings",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		annualWages: {
			label: "Annual Wages",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		annualRent: {
			label: "Annual Rent",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		annualProfit: {
			label: "Annual Profit",
			description: "Enter AUD amount (AUD)",
			type: "number",
			defaultValue: 0,
		},
	},
	{
		gstValue: {
			label: "GST Value?",
			description: "Enter percentage amount (%) or 0% if included",
			type: "number",
			defaultValue: 0,
			allowZero: true,
		},
	},
	{
		savIncluded: {
			label: "SAV included in Price?",
			type: "select",
			options: [
				{ label: "Yes", value: 1 },
				{ label: "No", value: 0 },
			],
			defaultValue: 1,
		},
	},
	{
		savValue: {
			label: "SAV Value",
			description:
				"Enter AUD amount or 0 (SAV will be estimated if not included in Price)",
			type: "number",
			defaultValue: 0,
			allowZero: true,
		},
	},
	{
		yieldIncluded: {
			label: "Rental Yield Included?",
			type: "select",
			options: [
				{ label: "Yes", value: 1 },
				{ label: "No", value: 0 },
			],
			defaultValue: 1,
		},
	},
	{
		yieldValue: {
			label: "Rental Yield Value",
			description: "Percentage (%) or 0",
			type: "number",
			defaultValue: 0,
			allowZero: true,
		},
	},
	{
		sgaValue: {
			label: "SGA Value (for franchises only)",
			description: "Percentage (%) or 0",
			type: "number",
			defaultValue: 0,
			allowZero: true,
		},
	},
	{
		tradingDays: {
			label: "Trading Days",
			type: "select",
			options: [1, 2, 3, 4, 5, 6, 7],
			defaultValue: 7,
		},
	},
	{
		listingStatus: {
			label: "Listing Status",
			type: "select",
			options: [
				{ label: "Available", value: 1 },
				{ label: "Sold", value: 0 },
			],
			defaultValue: 1,
		},
	},
	{
		dateAdded: {
			label: "Date Added",
			type: "text",
			placeholder: "DD/MM/YYYY",
		},
	},
	{
		listingVerified: {
			hidden: true,
			label: "Verification Status",
			description: "Verified or Pending (default)",
			type: "select",
			options: [
				{ label: "Verified", value: 1 },
				{ label: "Pending", value: 0 },
			],
			defaultValue: 0,
		},
	},
	{
		listingUrl: {
			label: "Listing URL",
			type: "text",
		},
	},
];

const NewListing = () => {
	const initialState = inputFields.reduce((acc, fieldObj) => {
		const key = Object.keys(fieldObj)[0];
		const config = fieldObj[key];
		let defaultVal =
			config.defaultValue ?? (config.type === "select" ? "" : "");
		acc[key] = defaultVal;
		return acc;
	}, {});

	const [formData, setFormData] = useState(initialState);
	const [showAnalysis, setShowAnalysis] = useState(false);
	const [errors, setErrors] = useState({});

	const handleChange = (key, value) => {
		console.log("value changed:", key, value);
		setFormData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const isFormComplete = () => {
		return inputFields.every((fieldObj) => {
			const key = Object.keys(fieldObj)[0];
			const config = fieldObj[key];
			if (config.hidden) return true;
			return (
				formData[key] !== "" &&
				formData[key] !== null &&
				formData[key] !== undefined
			);
		});
	};

	const handleSubmit = async () => {
		const newErrors = {};

		inputFields.forEach((fieldObj) => {
			const key = Object.keys(fieldObj)[0];
			const config = fieldObj[key];
			if (config.hidden) return;
			if (!formData[key]) {
				newErrors[key] = `${config.label} is required.`;
			}
		});

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			alert("Please fill out all required fields.");
			return;
		}
		setErrors({});

		try {
			const res = await fetch(
				"https://jejntf5vuajt7qxvukf3i425vi0ufggn.lambda-url.us-east-1.on.aws/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);

			if (!res.ok) throw new Error("Server Error");

			const result = await res.json();
			alert("Submission successful!");
			setFormData(initialState);
			setShowAnalysis(false);
		} catch (err) {
			console.error("Submit failed:", err);
			alert("Failed to submit. Please try again.");
		}
	};

	return (
		<div className="p-6 max-w-4xl mx-auto text-white">
			<div className="font-writing text-white text-center h-60 flex flex-col justify-center">
				<p className="text-4xl font-light">Add New Listing</p>
				<p className="text-base font-light text-gray-500">
					Evaluate your business listing with our quick analysis tool.
				</p>
				<Disclaimer />
			</div>
			<form className="space-y-4 py-4">
				{inputFields.map((fieldObj, index) => {
					const key = Object.keys(fieldObj)[0];
					const config = fieldObj[key];
					if (config.hidden) return null;
					return (
						<div key={index} className="flex flex-col">
							<label htmlFor={key} className="font-medium">
								{`${config.label}`}
								{config.description && (
									<span className="text-gray-500 text-sm">
										{` - ${config.description}`}
									</span>
								)}
							</label>
							{config.type === "select" ? (
								<select
									id={key}
									name={key}
									value={formData[key]}
									onChange={(e) =>
										handleChange(
											key,
											isNaN(e.target.value)
												? e.target.value
												: Number(e.target.value)
										)
									}
									className={`border p-2 rounded mt-1 ${
										errors[key] ? "border-red-500" : "border-gray-300"
									}`}
								>
									<option value="">-- Select --</option>
									{config.options.map((opt, idx) => {
										const value = typeof opt === "object" ? opt.value : opt;
										const label = typeof opt === "object" ? opt.label : opt;
										return (
											<option key={idx} value={value}>
												{label}
											</option>
										);
									})}
								</select>
							) : (
								<input
									id={key}
									name={key}
									type={config.type}
									value={formData[key]}
									onChange={(e) =>
										handleChange(
											key,
											config.type === "number"
												? Number(e.target.value)
												: e.target.value
										)
									}
									className={`border p-2 rounded mt-1 ${
										errors[key] ? "border-red-500" : "border-gray-300"
									}`}
								/>
							)}
						</div>
					);
				})}
			</form>
			{showAnalysis ? (
				<div className="">
					<InstantAnalysis data={formData} />
					<div className="block w-fit diagonal-gradient text-center p-[2px] flex mx-auto rounded-xl my-4">
						<button
							type="button"
							onClick={() => setShowAnalysis(!showAnalysis)}
							className="py-2 w-50 font-nav font-thin text-white text-base bg-[#111111] transition duration-300 hover:bg-transparent hover:cursor-pointer rounded-xl"
						>
							Analyze Again
						</button>
					</div>
				</div>
			) : (
				<div className="block w-fit diagonal-gradient text-center p-[2px] flex mx-auto rounded-xl my-4">
					<button
						type="button"
						onClick={() => setShowAnalysis(!showAnalysis)}
						className="py-2 w-50 font-nav font-thin text-white text-base bg-[#111111] transition duration-300 hover:bg-transparent hover:cursor-pointer rounded-xl"
					>
						Quick Analyze
					</button>
				</div>
			)}
			<div className="block w-fit bg-gray-400 text-center p-[2px] flex mx-auto rounded-xl my-4">
				<button
					type="button"
					onClick={handleSubmit}
					disabled={!isFormComplete()}
					className={`rounded-xl py-2 w-50 ${
						isFormComplete()
							? "bg-green-600 hover:bg-green-700 text-white"
							: "bg-gray-400 text-gray-200 cursor-not-allowed"
					}`}
				>
					Submit Listing
				</button>
			</div>
		</div>
	);
};

export default NewListing;
