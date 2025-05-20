import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const MainLayOut = () => {
	return (
		<>
			<ScrollToTop />
			<section className="relative bg-black min-h-screen">
				<div>
					<Navbar />
					<Outlet />
					<Footer />
				</div>
			</section>
		</>
	);
};

export default MainLayOut;
