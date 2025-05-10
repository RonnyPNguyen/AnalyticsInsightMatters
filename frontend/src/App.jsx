import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Card from "./components/Card";
import About from "./pages/About";

import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Login from "./pages/Login";

function App() {
	let selectedPage = <Listings />;
	return (
		<>
			<Navbar></Navbar>
			<Hero></Hero>
			<h1> This is the Main APP</h1>
			<div>{selectedPage}</div>
			<div>
				<h2 className="text-indigo text-center text-3xl">Feature Business</h2>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card></Card>
					<Card></Card>
					<Card></Card>
					<Card></Card>
				</div>
			</div>
			<Footer></Footer>
		</>
	);
}

export default App;
