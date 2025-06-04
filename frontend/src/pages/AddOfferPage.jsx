import Disclaimer from "../components/Disclaimer";
import { useState } from "react";

const AddOfferPage = () => {
	const [id, setid] = useState("");
	const [BusinessName, setBusinessName] = useState("");
	const [Suburb, setSuburb] = useState("");
	const [State, setState] = useState("");
	const [Postcode, setPostcode] = useState("");
	const [Industry, setIndustry] = useState("");
	const [AskingPrice, setAskingPrice] = useState("");
	const [StatedSAV, setStatedSAV] = useState("");
	const [Revenue, setRevenue] = useState("");
	const [Outgoings, setOutgoings] = useState("");
	const [Wages, setWages] = useState("");
	const [Rent, setRent] = useState("");
	const [StatedNetProfit, setStatedNetProfit] = useState("");
	const [EmploymentType, setEmploymentType] = useState("");
	const [GSTIncluded, setGSTIncluded] = useState("");
	const [SAVIncluded, setSAVIncluded] = useState("");
	const [RentGrowthIncluded, setRentGrowthIncluded] = useState("");
	const [RentGrowth, setRentGrowth] = useState("");
	const [BusinessType, setBusinessType] = useState("");
	const [SGA, setSGA] = useState("");
	const [TradingDays, setTradingDays] = useState("");
	const [ListingStatus, setListingStatus] = useState("");
	const [SoldPrice, setSoldPrice] = useState("");
	const [URL, setURL] = useState("");
	const [DateAdded, setDateAdded] = useState("");

	return (
		<section className="min-h-screen py-12">
			<div className="max-w-4xl mx-auto px-4 text-white space-y-10">
				<div className="font-writing text-center h-60 flex flex-col justify-center">
					<p className="text-4xl text-white font-light">Analyze Your Own</p>
					<p className="text-base text-gray-500 font-light">
						Use our financial model to analyze your business performance
					</p>
				</div>

				<form action="/submit-listing" method="POST" className="space-y-6">
					<div>
						<label className="block text-base text-gray-500 ml-2 mb-1">
							Asking Price
						</label>
						<input
							type="number"
							min={1}
							name="AskingPrice"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Is SAV Included?
							</label>
							<select
								name="SAVIncluded"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							>
								<option value="1" selected>
									Yes
								</option>
								<option value="0">No</option>
							</select>
						</div>
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Is GST Included?
							</label>
							<select
								name="GSTIncluded"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							>
								<option value="1" selected>
									Yes
								</option>
								<option value="0">No</option>
							</select>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">State</label>
							<select
								name="State"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								placeholder="Select State"
							>
								<option value="NSW">New South Wales</option>
								<option value="VIC">Victoria</option>
								<option value="QLD">Queensland</option>
								<option value="WA">Western Australia</option>
								<option value="SA">South Australia</option>
								<option value="TAS">Tasmania</option>
								<option value="ACT">Australian Capital Territory</option>
								<option value="NT">Northern Territory</option>
							</select>
						</div>
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Suburb (optional)
							</label>
							<input
								type="text"
								name="Suburb"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							/>
						</div>
					</div>

					<div>
						<label className="text-base text-gray-500 ml-2 mb-1">Revenue</label>
						<input
							type="number"
							min={1}
							name="Revenue"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							placeholder="annual"
							required
						/>
					</div>

					<div>
						<label className="text-base text-gray-500 ml-2 mb-1">
							Outgoings
						</label>
						<input
							type="number"
							name="Outgoings"
							placeholder="annual"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>

					<div>
						<label className="text-base text-gray-500 ml-2 mb-1">Wages</label>
						<input
							type="number"
							name="Wages"
							placeholder="annual"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>
					<div>
						<label className="text-base text-gray-500 ml-2 mb-1">Rent</label>
						<input
							type="number"
							name="Rent"
							placeholder="annual"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Is Rent Growth Included?
							</label>
							<select
								name="RentGrowthIncluded"
								id="rentGrowthIncluded"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								onChange={(e) => {
									const growthInput =
										document.getElementById("rentGrowthInput");
									if (growthInput) {
										growthInput.disabled = e.target.value !== "1";
									}
								}}
								required
							>
								<option value="1">Yes</option>
								<option value="0" selected>
									No
								</option>
							</select>
						</div>
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Rent Growth (%)
							</label>
							<input
								type="number"
								name="RentGrowth"
								id="rentGrowthInput"
								disabled
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								placeholder="Standard 4.00%"
								required
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Industry
							</label>
							<select
								name="Industry"
								placeholder="Select A Retail Industry"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							>
								<option value="0">Catering Service (Cafe, Restaurant)</option>
								<option value="1">Takeaway Service (Cafe, Restaurant)</option>
								<option value="2">Boutique</option>
							</select>
						</div>
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Employment Type
							</label>
							<select
								name="EmploymentType"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							>
								<option value="1">Under Management (Use given wage)</option>
								<option value="0">
									Owner Operate (Salary of equal position)
								</option>
							</select>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Stated Net Profit (optional)
							</label>
							<input
								type="number"
								name="StatedNetProfit"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							/>
						</div>
						<div>
							<label className="text-base text-gray-500 ml-2 mb-1">
								Business Size
							</label>
							<select
								name="BusinessSize"
								className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
								required
							>
								<option value="1">Small (1-5 employees)</option>
								<option value="2">Medium (6-20 employees)</option>
								<option value="3">Large (21+ employees)</option>
							</select>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
						>
							Analyze Business
						</button>
					</div>
				</form>

				<div>
					<p>Result Analyzed</p>
				</div>

				<p className="text-2xl text-white font-light text-center">
					Add Details to Submit Your Listing
				</p>
				<form action="" className="space-y-6">
					<div>
						<label className="text-base text-gray-500 ml-2 mb-1 block">
							Business Name
						</label>
						<input
							type="text"
							name="BusinessName"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>

					<div>
						<label className="text-base text-gray-500 ml-2 mb-1 block">
							Postcode
						</label>
						<input
							type="text"
							name="Postcode"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
							required
						/>
					</div>

					<div>
						<label className="text-base text-gray-500 ml-2 mb-1 block">
							Listing URL
						</label>
						<input
							type="url"
							name="URL"
							className="w-full bg-[#111111] text-white font-tabular font-thin px-4 py-2 rounded-lg"
						/>
					</div>
				</form>

				<div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
					>
						Submit Listing
					</button>
				</div>
			</div>
		</section>
	);
};

export default AddOfferPage;
