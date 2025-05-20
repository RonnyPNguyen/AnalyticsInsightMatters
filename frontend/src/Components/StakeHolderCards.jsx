import React from "react";

const StakeHolderCards = () => {
	return (
		<section className="text-white font-inter bg-[url('/StakeHolderCardBg3.jpg')] bg-cover bg-center ">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 py-5 ">
				<div className="px-10 py-6 bg-black/10 backdrop-blur-sm rounded-[20px] shadow-lg">
					<p className="font-semibold text-2xl py-4">Investors</p>
					<p className="font-light text-xl py-2">
						Forget of vague listings and guesswork valuations
					</p>
					{/* <p className="font-thin py-2">
						We turn fragmented business listings into structured, actionable DCF
						model
					</p> */}
					<p className="font-thin py-2">
						Streamline your screening process with valuations powered by local
						market trends and real economic factors
					</p>
				</div>
				<div className="px-10 py-6 bg-black/10 backdrop-blur-sm rounded-[20px] shadow-lg">
					<p className="font-semibold text-2xl py-4">Agents</p>
					<p className="font-light text-xl py-2">
						Get your listings in front of serious buyers
					</p>
					{/* <p className="font-thin py-2">
						With our valuation tools and data-driven insights, we add analytical
						depth and visualization to make your listings stand out
					</p> */}
					<p className="font-thin py-2">
						Give buyers the confidence to commit — and sellers the leverage to
						win
					</p>
				</div>
			</div>
		</section>
	);
};

export default StakeHolderCards;
