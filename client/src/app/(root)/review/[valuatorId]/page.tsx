"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiArrowLeft, FiCpu, FiEdit, FiEdit2, FiEdit3, FiPlusCircle, FiRefreshCcw, FiStar, FiTablet, FiUser } from "react-icons/fi";
import { AiOutlineTrophy } from "react-icons/ai";
import Navbar from "../../components/Navbar";

type Params = {
	params: {
		valuatorId: string
	}
}

const ViewAnswerPage = ({ params: { valuatorId } }: Params) => {
	const [valuations, setValuations] = useState([]);
	const [totalMarks, setTotalMarks] = useState<any>(null);

	const getTotalMarks = async () => {
		if(!((valuations[selectedValuation] as any)?._id)) return;

		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/total-marks`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				valuationId: (valuations[selectedValuation] as any)?._id
			}
		};

		axios(config)
			.then((response) => {
				setTotalMarks(response.data);
			})
	}

	const getValuations = async () => {
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/valuations`,
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
				setValuations(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	}

	useEffect(() => {
		getValuations();
	}, [])

	const [selectedValuation, setSelectedValuation] = useState<any>(0);

	const [view, setView] = useState<number>(0);
	const [revaluationRemarks, setRevaluationRemarks] = useState<string>("");

	const [revaluating, setRevaluating] = useState<boolean>(false);

	const revaluate = async () => {
		setRevaluating(true);
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/revaluate`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				valuationId: (valuations[selectedValuation] as any)?._id,
				remarks: revaluationRemarks
			}
		};

		axios(config)
			.then((response) => {
				setRevaluationRemarks("");
				(document.getElementById("revaluation_modal") as any).close()
				setRevaluating(false);
				getValuations();
				toast.success("Revaluation successful");
			})
			.catch((error) => {
				setRevaluationRemarks("");
				(document.getElementById("revaluation_modal") as any).close()
				setRevaluating(false);
				toast.error("Failed to revaluate");
			});
	}

	useEffect(()=>{
		getTotalMarks();
	},[valuations, selectedValuation])

	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex justify-between z-50 p-5 fixed navbar backdrop-filter backdrop-blur-lg bg-opacity-30  bg-base-100">
				<div className="flex items-center">
					<button className="btn btn-square mr-5" onClick={() => window.location.href = `/valuate/${valuatorId}`}><FiArrowLeft className="text-2xl" /></button>
					<div className="flex items-center">
						<p className="font-semibold text-2xl min-w-fit mr-10">{totalMarks?.examName}</p><p className="mr-5 flex items-center font-semibold text-lg"><FiUser className="mr-2" /> Student: </p>
						<select className="text-xl select select-bordered w-full max-w-xs" value={selectedValuation} onChange={(e) => setSelectedValuation(e.target.value)}>
							{valuations ? valuations?.map((valuation: any, index: number) => {
								return <option key={index} value={index}>{index + 1}. {valuation?.data?.student_name}</option>
							}) : ""}
						</select>
						<button className="btn btn-primary ml-3" onClick={() => (document.getElementById("revaluation_modal") as any).showModal()}><FiRefreshCcw /> Revaluate</button>
					</div>
				</div>
				<div className="join">
					<button onClick={() => setView(0)} className={"btn join-item " + (view === 0 ? "btn-primary" : "")}>Answer Sheet</button>
					<button onClick={() => setView(1)} className={"btn join-item " + (view === 1 ? "btn-primary" : "")}>Question Paper</button>
					<button onClick={() => setView(2)} className={"btn join-item " + (view === 2 ? "btn-primary" : "")}>Answer Key</button>
				</div>
			</div>
			<div className="flex w-full h-full">
				<div className="mb-10 p-10 pt-[100px] w-full">
				<p className="font-semibold text-xl mb-5 flex items-center"><AiOutlineTrophy className="mr-2"/> Total marks scored: {totalMarks?.totalScore} / {totalMarks?.maxScore}</p>
					{
						(valuations[selectedValuation] as any)?.data?.answers?.map((item: any, index: number) => {
							return <div className="flex my-3 max-w-7xl" key={index}>
								<div className="collapse shadow-xl border-2">
									<input type="checkbox" />
									<div className="flex items-center justify-between collapse-title">
										<p className="text-md font-semibold max-w-2xl">{item?.question_no}. {item?.question}</p>
										<div className="flex items-center">
											<p className="mx-10 w-[90px] flex items-center font-semibold"><AiOutlineTrophy className="mr-2" />{item?.score[0]} / {item?.score[1]}</p>
											<div className="w-[100px] flex flex-col ml-5">
												<span className="flex items-center text-sm text-gray-500 mb-3"><FiCpu className="mr-1" /> Confidence:</span>
												<div className="flex flex-col">
													<progress className={"mb-1 progress w-20 " + (item?.confidence === 1 ? "progress-success" : item?.confidence === 0 ? "progress-error" : "progress-warning")} value={item?.confidence === 1 ? "100" : item?.confidence === 0 ? "0" : "50"} max="100"></progress>
													<span className={"text-sm font-semibold " + (item?.confidence === 1 ? "text-green-500" : item?.confidence === 0 ? "text-red-500" : "text-orange-500")}>{(item?.confidence === 1 ? "High" : item?.confidence === 0 ? "Low" : "Medium")}</span>
												</div>
											</div>
										</div>
									</div>
									<div className="collapse-content">
										<p className="flex items-center text-xl bg-base-200  rounded-lg p-3"> Ans: {typeof item?.answer === "string" ? item?.answer : JSON.stringify(item?.answer)}</p>
										<p className="flex items-center mt-5 text-md font-semibold text-xl"><AiOutlineTrophy className="mr-2" /> Score: <input className="mx-3 input input-bordered min-w-[auto] w-[100px]" type="text" value={item?.score[0]} /> / {item?.score[1]}</p>
										<p className="bg-base-200 rounded-lg p-2 flex items-center mt-5 text-md font-semibold"><FiStar className="mr-2" /> Remarks: {item?.remarks}</p>
									</div>
								</div>
							</div>
						})
					}
				</div>
				<div className="pt-20 w-[60vw] h-screen mr-5">
					<img
						src={[(valuations[selectedValuation] as any)?.answerSheet, (valuations[selectedValuation] as any)?.questionPaper, (valuations[selectedValuation] as any)?.answerKey][view]}
						className="fixed h-full"
					/>
				</div>
			</div>
			<ToastContainer />
			{/* Revaluation modal */}
			<dialog id="revaluation_modal" className="modal">
				<div className="modal-box max-w-2xl align-middle">
					<h3 className="flex items-center font-bold text-2xl mb-5">
						<FiRefreshCcw className="mr-2" /> Revaluate {(valuations[selectedValuation] as any)?.data?.student_name}&apos;s answer sheet
					</h3>
					<p className="mb-5 font-semibold">Remarks</p>
					<textarea className="textarea textarea-bordered w-full" placeholder="Remarks" value={revaluationRemarks} onChange={(e) => setRevaluationRemarks(e.target.value)}></textarea>
					<button className={"mt-10 btn w-full btn-primary " + (revaluating ? "opacity-60" : "")} onClick={() => {
						if (revaluating) return;
						revaluate();
					}}>
						{revaluating ? <span className="loading loading-spinner loading-sm"></span> : "Revaluate"}
					</button>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
};

export default ViewAnswerPage;