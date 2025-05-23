import ClipLoader from "react-spinners/ClipLoader";

const override = {
	display: "block",
	margin: "100px auto",
};

const Spinner = ({ loading }) => {
	return (
		<ClipLoader
			color="#ffffff"
			loading={true}
			cssOverride={override}
			size={150}
		/>
	);
};

export default Spinner;
