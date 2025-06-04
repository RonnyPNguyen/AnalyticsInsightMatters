import { TypeAnimation } from "react-type-animation";

function Hero() {
	return (
		<section className="py-10 bg-transparent px-10">
			<p className="text-white font-writing font-thin text-6xl py-10 text-center">
				Business. Analyzed. Fast.
			</p>
			<p className="text-white font-writing font-thin text-2xl py-5 text-center">
				Selected business listings across all platforms will be analyzed using
				our customized financial models to quickly assess their profitability
				and feasibility.
			</p>

			{/* <TypeAnimation
					sequence={[
						"Selected business listings across the web will be analyzed using our customized financial models to quickly assess their profitability and feasibility.",
					]}
					wrapper="p"
					cursor={false}
					speed={80}
					className="text-white font-inter font-thin text-2xl py-4 text-center min-h-[160px]"
					repeat={0}
				/> */}
		</section>
	);
}

export default Hero;
