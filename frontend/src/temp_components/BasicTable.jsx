import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ rows }) {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{
					minWidth: 200,
					background: "#111111",
					border: "1px solid #333333",
				}}
				aria-label="simple table"
			>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{ color: "white", border: "1px solid #333333", width: "20%" }}
						>
							<strong>Dimensions</strong>
						</TableCell>
						<TableCell sx={{ color: "white", border: "1px solid #333333" }}>
							<strong>Accepted Input</strong>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row, index) => {
						const key = Object.keys(row)[0];
						const value = row[key];
						return (
							<TableRow key={index}>
								<TableCell
									component="th"
									scope="row"
									sx={{ color: "white", border: "1px solid #333333" }}
								>
									{key}
								</TableCell>
								<TableCell sx={{ color: "white", border: "1px solid #333333" }}>
									{Array.isArray(value) ? value.join(", ") : value}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
