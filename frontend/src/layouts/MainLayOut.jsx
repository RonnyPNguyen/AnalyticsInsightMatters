import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
const MainLayOut = () => {
	return (
		<>
			<Navbar></Navbar>
			<Outlet />
			<Footer></Footer>
		</>
	);
};

export default MainLayOut;
