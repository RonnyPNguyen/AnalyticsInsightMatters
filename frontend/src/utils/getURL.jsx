export const getDataUrl = (filename) => {
	const base = import.meta.env.DEV
		? "/api/data/"
		: "https://busy-analytics-server.s3.us-east-1.amazonaws.com/data/";
	return `${base}${filename}`;
};

// usage
fetch(getDataUrl("marketData.json"));
