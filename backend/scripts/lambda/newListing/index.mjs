import {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client();

export const handler = async (event) => {
	try {
		const body =
			typeof event.body === "string" ? JSON.parse(event.body) : event;

		// Get object
		const getObjectCommand = new GetObjectCommand({
			Bucket: "aim-project-server",
			Key: "data/pendingListing.json",
		});
		const s3Data = await s3.send(getObjectCommand);
		// s3Data.Body is a stream, convert to string
		const streamToString = (stream) =>
			new Promise((resolve, reject) => {
				const chunks = [];
				stream.on("data", (chunk) => chunks.push(chunk));
				stream.on("error", reject);
				stream.on("end", () =>
					resolve(Buffer.concat(chunks).toString("utf-8"))
				);
			});
		const jsonString = await streamToString(s3Data.Body);
		const currentList = JSON.parse(jsonString);

		// Add new listing
		currentList.push({
			id: Date.now(),
			...body,
		});

		// Put object
		const putObjectCommand = new PutObjectCommand({
			Bucket: "aim-project-server",
			Key: "data/pendingListing.json",
			Body: JSON.stringify(currentList, null, 2),
			ContentType: "application/json",
		});
		await s3.send(putObjectCommand);

		return {
			statusCode: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({ message: "Listing submitted." }),
		};
	} catch (error) {
		console.error(error);
		return {
			statusCode: 500,
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			},
			body: JSON.stringify({ error: "Failed to process submission" }),
		};
	}
};

// # zip -r lambda-newListing.zip . && aws s3 cp lambda-newListing.zip s3://aim-project-server/scripts/lambda-newListing.zip
