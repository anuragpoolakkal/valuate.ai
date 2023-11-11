"use client";
import React, { useState } from "react";
import Navbar from "@/app/(root)/components/Navbar";
import ExportPDFButton from "@/app/(root)/components/MarksLIst";

export interface Mark {
	id: number;
	name: string;
	rollNo: string;
	marks: string;
	isChecked: boolean;
}

const MarkList: React.FC = () => {
	const [data, setData] = useState<Mark[]>([
		{
			id: 1,
			name: "Cy Ganderton",
			rollNo: "23",
			marks: "234",
			isChecked: true,
		},
		{
			id: 2,
			name: "Hart Hagerty",
			rollNo: "23",
			marks: "123",
			isChecked: false,
		},
		{ id: 3, name: "Brice Swyre", rollNo: "23", marks: "432", isChecked: true },
		{
			id: 4,
			name: "Cy Ganderton",
			rollNo: "23",
			marks: "234",
			isChecked: true,
		},
		{
			id: 5,
			name: "Hart Hagerty",
			rollNo: "23",
			marks: "123",
			isChecked: false,
		},
		{ id: 6, name: "Brice Swyre", rollNo: "23", marks: "432", isChecked: true },
		{
			id: 7,
			name: "Cy Ganderton",
			rollNo: "23",
			marks: "234",
			isChecked: true,
		},
		{
			id: 8,
			name: "Hart Hagerty",
			rollNo: "23",
			marks: "123",
			isChecked: false,
		},
		{ id: 9, name: "Brice Swyre", rollNo: "23", marks: "432", isChecked: true },
		// Add more rows as needed
	]);

	const handleCheckboxToggle = (id: number) => {
		setData((prevData) =>
			prevData.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
		);
	};

	return (
		<>
			<Navbar />
			<main className="p-10 w-full">
				<div className="mb-10">
					<ExportPDFButton data={data} />
				</div>
				<div className="overflow-x-auto">
					<h3 className="font-bold text-2xl ml-10 mb-5">Midterm Exam 2023-24</h3>

					<table className="table table-zebra">
						{/* head */}
						<thead>
							<tr className="text-center">
								<th>Serial number</th>
								<th>Name</th>
								<th>Roll number</th>
								<th>Marks</th>
							</tr>
						</thead>
						<tbody>
							{/* rows */}
							{data.map((row) => (
								<tr className="text-center" key={row.id}>
									<th>{row.id}</th>
									<td>{row.name}</td>
									<td>{row.rollNo}</td>
									<td>{row.marks}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
};

export default MarkList;
