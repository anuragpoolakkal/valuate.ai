"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/(root)/components/Navbar";
import ExportPDFButton from "@/app/(root)/components/MarksLIst";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export interface Mark {
	id: number;
	name: string;
	rollNo: string;
	marks: string;
	isChecked: boolean;
}

type Params = {
	params: {
		valuatorId: string
	}
}

export default function MarkList({ params: { valuatorId } }: Params) {
	const [valuator, setValuator] = useState<any>(null);
	const [marksheet, setMarksheet] = useState<any>([]);

	const getValuator = async () => {
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/byId`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				id: valuatorId,
			}
		};

		axios(config)
			.then((response) => {
				setValuator(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	}

	const getMarksheet = async () => {
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/marksheet`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				valuatorId: valuatorId,
			}
		};

		axios(config)
			.then((response) => {
				setMarksheet(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	}


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

	useEffect(()=>{
		getValuator();
		getMarksheet();
	},[])

	return (
		<>
			<Navbar />
			<main className="p-10 w-full">
				<div className="mb-10">	
					<ExportPDFButton data={marksheet} />
				</div>
				<div className="overflow-x-auto">
					<h3 className="font-bold text-2xl ml-10 mb-5">{valuator?.title} - Marksheet</h3>

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
							{marksheet?.map((row:any, index: number) => (
								<tr className="text-center" key={row.id}>
									<th>{index + 1}</th>
									<td>{row.name}</td>
									<td>{row.rollNo}</td>
									<td>{row.marks}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main>
			<ToastContainer />
		</>
	);
};
