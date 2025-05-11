const BizListing = ({ offer }) => {
	return (
		<div className="bg-pink-500 p-4 rounded-lg shadow-md">
			<div>
				<h1 className="text-black-100">{offer.Region}</h1>
			</div>
		</div>
	);
};

export default BizListing;
