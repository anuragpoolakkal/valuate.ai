"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiEdit, FiEdit2, FiEdit3, FiStar, FiTablet } from "react-icons/fi";
import { AiOutlineTrophy } from "react-icons/ai";
import Navbar from "@/app/(root)/components/Navbar";

type Params = {
	params: {
		valuatorId: string;
	};
};

const ViewAnswerPage = ({ params: { valuatorId } }: Params) => {
	const [valuations, setValuations] = useState([]);

	const getValuations = async () => {
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/valuations`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				valuatorId: valuatorId,
			},
		};

		axios(config)
			.then((response) => {
				setValuations(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	};

	useEffect(() => {
		getValuations();
	}, []);

	const [selectedValuation, setSelectedValuation] = useState<any>(0);

	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex justify-between z-50 p-5 fixed navbar backdrop-filter backdrop-blur-lg bg-opacity-30  bg-base-100">
				<select
					className="select select-bordered w-full max-w-xs"
					value={selectedValuation}
					onChange={(e) => setSelectedValuation(e.target.value)}
				>
					{valuations
						? valuations?.map((valuation: any, index: number) => {
								return (
									<option key={index} value={index}>
										{valuation?.data?.student_name}
									</option>
								);
						  })
						: ""}
				</select>
				<button className="btn btn-primary">
					<FiTablet /> GET MARKLIST
				</button>
			</div>
			<div className="mb-10 p-10 pt-[100px]">
				{(valuations[selectedValuation] as any)?.data?.answers?.map((item: any, index: number) => {
					return (
						<div className="flex my-3 max-w-7xl">
							<div className="collapse shadow-xl border-2">
								<input type="checkbox" />
								<div className="flex items-center justify-between collapse-title">
									<p className="text-md font-semibold">
										{item?.question_no}. {item?.question}
									</p>
									<div className="flex items-center">
										<p className="flex items-center font-semibold">
											<AiOutlineTrophy className="mr-2" />
											{item?.score[0]} / {item?.score[1]}
										</p>
										<div className="flex flex-col ml-10">
											<span className="text-sm text-gray-500">Confidence:</span>
											<progress
												className={
													"progress w-20 " +
													(item?.confidence === 1
														? "progress-success"
														: item?.confidence === 0
														? "progress-error"
														: "progress-warning")
												}
												value={
													item?.confidence === 1 ? "100" : item?.confidence === 0 ? "0" : "50"
												}
												max="100"
											></progress>
											<span
												className={
													"text-sm font-semibold " +
													(item?.confidence === 1
														? "text-green-500"
														: item?.confidence === 0
														? "text-red-500"
														: "text-orange-500")
												}
											>
												{item?.confidence === 1
													? "High"
													: item?.confidence === 0
													? "Low"
													: "Medium"}
											</span>
										</div>
									</div>
								</div>
								<div className="collapse-content">
									<p className="flex items-center text-xl bg-base-200  rounded-lg p-3">
										{" "}
										Ans:{" "}
										{typeof item?.answer === "string" ? item?.answer : JSON.stringify(item?.answer)}
									</p>
									<p className="flex items-center mt-5 text-md font-semibold text-xl">
										<AiOutlineTrophy className="mr-2" /> Score:{" "}
										<input
											className="mx-3 input input-bordered min-w-[auto] w-[100px]"
											type="text"
											value={item?.score[0]}
										/>{" "}
										/ {item?.score[1]}
									</p>
									<p className="bg-base-200 rounded-lg p-2 flex items-center mt-5 text-md font-semibold">
										<FiStar className="mr-2" /> Remarks: {item?.remarks}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<ToastContainer />
		</div>
	);
};

export default ViewAnswerPage;
