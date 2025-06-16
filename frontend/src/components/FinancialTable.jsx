import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function FinancialTable({ rows }) {
	return (
		<div style={{ overflowX: "auto", width: "100%" }}>
			<TableContainer component={Paper} sx={{ minWidth: 400 }}>
				<Table
					sx={{
						backgroundColor: "#111111",
					}}
					aria-label="financial table"
				>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									color: "white",
									fontWeight: "bold",
									border: "1px solid #333333",
									whiteSpace: "nowrap",
									fontSize: { xs: "12px", md: "16px" },
									width: "16%",
									padding: "10px",
								}}
							>
								Year
							</TableCell>
							{["0", "1", "2", "3", "4", "5"].map((year) => (
								<TableCell
									key={year}
									sx={{
										color: "white",
										border: "1px solid #333333",
										textAlign: "center",
										whiteSpace: "nowrap",
										fontSize: { xs: "12px", md: "16px" },
										padding: "10px",
									}}
								>
									<strong>{year}</strong>
								</TableCell>
							))}
						</TableRow>
					</TableHead>

					<TableBody>
						{rows.map((row, rowIndex) => {
							const [label, values] = Object.entries(row)[0];
							return (
								<TableRow key={rowIndex}>
									<TableCell
										sx={{
											color: "white",
											border: "1px solid #333333",
											fontWeight: 500,
											whiteSpace: "wrap",
											fontSize: { xs: "10px", md: "14px" },
											padding: "8px",
										}}
									>
										{label}
									</TableCell>
									{values.map((value, colIndex) => (
										<TableCell
											key={colIndex}
											sx={{
												color: "#ccc",
												border: "1px solid #333333",
												textAlign: "right",
												whiteSpace: "wrap",
												fontSize: { xs: "10px", md: "14px" },
												width: "13%",
												padding: "8px",
											}}
										>
											{typeof value === "number"
												? value.toLocaleString("en-AU", {
														style: "currency",
														currency: "AUD",
														maximumFractionDigits: 0,
												  })
												: value}
										</TableCell>
									))}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
