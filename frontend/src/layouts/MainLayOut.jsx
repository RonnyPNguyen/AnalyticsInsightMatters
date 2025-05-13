import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayOut = () => {
	return (
		<>
			<section className="bg-black">
				<Navbar />
				<Outlet />
				<Footer></Footer>
			</section>
		</>
	);
};

export default MainLayOut;
