import React from "react";
import { Link } from "react-router-dom";
import NavButton from "../components/NavButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBackwardStep,
	faForwardStep,
	faPlay,
} from "@fortawesome/free-solid-svg-icons";

const AboutPage = () => {
	return (
		<>
			<section className="text-center text-white bg-[url('/AboutPageBanner.jpg')] bg-cover bg-center">
				<div className="bg-black/50 backdrop-blur-xs">
					<div className="p-8 md:w-200 md:mx-auto">
						<p className="text-white font-writing font-thin text-6xl py-10 text-center">
							More Than A Tool
						</p>
						<p className="text-white font-writing font-thin text-2xl py-5 text-center">
							Started with a simple idea: To bridge the gap between traditional
							valuation models and the real-world complexity of business
							listings. Using advanced data analytics, FinAlytics aims to
							provide a more comprehensive valuation model to boost the
							screening process for investors.
						</p>
						<p className="py-4 text-base font-thin text-justify">
							Using a custom-built DCF formula, FinAlytics offers realistic,
							flexible, and data-driven financial analysis. The model is
							directly connected to economic database through APIs to reflect
							market movement and draw real-time insight.
						</p>
					</div>
				</div>
			</section>
			<div className="pt-16 bg-black text-white font-writing px-8 md:w-200 md:mx-auto">
				<section className="text-center py-8 bg-neutral-900 rounded-2xl">
					<p className="pb-4 text-2xl font-light">
						Explore the customized model
					</p>
					<NavButton title="Read Documentation" destination="/documentation" />
				</section>
				<section className="text-center py-8">
					<p className="py-4 text-4xl font-light">Concept and Scope</p>
					<p className="py-4 text-base font-thin text-justify">
						FinAlytics began as a personal portfolio project. I was browsing the
						web for business for sale and noticed a lack of standardization
						between these listings. Key information are conveniently left out,
						or simply unavailable, making it difficult to compare and analyze.
					</p>
					<p className="py-4 text-base font-thin text-justify">
						Some businesses were too good to be true, meaning some factors have
						not been taken into account. Hence the idea to incorporate hidden
						factors into the valuation model, such as owner salary, working
						capital, SAV, etc, was born. This way, the valuation can be more
						accurate and reflect the true value of the business.
					</p>
					<p className="py-4 text-base font-thin text-justify">
						During development, this project has the potential to evolve into a
						full-scale fintech product/service that provides buyers, sellers,
						and analysts with market-adjusted business valuations. It can
						further expand capabilities and create meaningful impact in the
						small business ecosystem.
					</p>
					<br />
					<br />
					<p className="py-4 text-4xl font-light">About Author</p>
					<div className="flex flex-col md:flex-row items-center justify-center gap-8">
						<div className="flex flex-col items-center justify-center md:w-3/4">
							<p className="py-4 text-base font-thin text-justify">
								Ronny is a Business Analytics graduate from Western Sydney
								University, he wants to apply learnt techniques to address real
								problems. With a major in Finance and passion for Data, he aims
								to make a creative solution for fin-tech niche market.
							</p>
							<p className="py-4 text-base font-thin  text-justify">
								Since this is a one-man project, please cut him some slack if
								you find any bugs or issues. It also shows his project
								management skills, as he is the sole developer, UX/UI designer,
								content creator, for this project (of course ChatGPT does all
								the heavy loading). If you are a recruiter reading this, please
								give him a chance to put his skills for good.
							</p>
						</div>
						<div className="text-white font-inter bg-[url('/StakeHolderCardBg3.jpg')] bg-cover bg-center rounded-2xl">
							<div className="flex flex-col items-center justify-center backdrop-blur-xs p-3 rounded-2xl w-50">
								<div className="relative aspect-square overflow-hidden rounded-xl shadow-md">
									<img
										src="/author.jpeg"
										alt="Ronny Nguyen"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="py-2 text-left w-full">
									<p className="text-lg font-semibold">FinAlytic</p>
									<p className="text-sm text-gray-400">Ronny Nguyen</p>
								</div>
								<div className="py-2 w-full">
									<div className="relative w-full h-1 bg-neutral-700 rounded-full overflow-hidden">
										<div className="absolute top-0 left-0 h-1 bg-green-500 w-1/3 rounded-full"></div>
									</div>
								</div>
								<div className="flex items-center justify-center gap-8">
									<button className="text-white hover:opacity-80 transition">
										<FontAwesomeIcon icon={faBackwardStep} size="md" />
									</button>

									<button className="w-10 h-10 border-2 rounded-full flex items-center justify-center bg-white text-black hover:scale-105 transition">
										<FontAwesomeIcon icon={faPlay} size="md" />
									</button>

									<button className="text-white hover:opacity-80 transition">
										<FontAwesomeIcon icon={faForwardStep} size="md" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<br />
					<br />
					<p className="py-4 text-4xl font-light">Disclaimer</p>
					<p className="py-4 text-base font-thin text-justify">
						All the business listings on this site are for demonstration
						purposes only. The valuations are not official and should not be
						used for any financial decisions. The author is not responsible for
						any losses or damages incurred from using this site. Please do your
						own research and consult with a professional before making any
						financial decisions.
					</p>
				</section>
			</div>
		</>
	);
};

export default AboutPage;
