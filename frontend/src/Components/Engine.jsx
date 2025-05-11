import React from "react";
import { useState } from "react";

let calculation = {};

const Engine = () => {
	const [showFullCalculation, setShowFullCalculation] = useState(false);

	return (
		<div>
			<button onClick={() => setShowFullCalculation((prevState) => !prevState)}>
				Show Calculation
			</button>
			{showFullCalculation && calculation}
		</div>
	);
};

export default Engine;
