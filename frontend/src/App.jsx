import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from "./Pages/About";
import Home from "./Pages/Home";
import Listings from "./Pages/Listings";
import Login from "./Pages/Login";

function App() {
	let selectedPage = <Listings />;
	return (
		<>
			<Navbar></Navbar>
			<h1> This is the Main APP</h1>
			<div>{selectedPage}</div>
			<Footer></Footer>
		</>
	);
}

export default App;
