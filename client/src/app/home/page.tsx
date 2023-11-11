"use client";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FiFileText, FiPlusCircle } from "react-icons/fi";
import { UploadButton } from "@/utils/uploadthing";
import axios from "axios";
import { serverUrl } from "@/utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillSetting } from "react-icons/ai";

export default function Home() {
	const [valuators, setValuators] = useState([]);
	const [valuation, setValuation] = useState([]);
	const [title, setTitle] = useState("");
	const [questionPaperUrl, setQuestionPaperUrl] = useState("");
	const [answerKeyUrl, setAnswerKeyUrl] = useState("");

	const router = useRouter();

	const [creatingValuator, setCreatingValuator] = useState(false);

	const getValuators = async () => {
		const config = {
			method: "GET",
			url: `${serverUrl}/valuators`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		};

		axios(config)
			.then((response) => {
				setValuators(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	};

	const createValuator = async () => {
		setCreatingValuator(true);
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				title: title,
				questionPaper: questionPaperUrl,
				answerKey: answerKeyUrl,
			},
		};

		axios(config)
			.then((response) => {
				setCreatingValuator(false);
				toast.success("Valuator created successfully!");
				(document.getElementById("new_valuation_modal") as any).close();
			})
			.catch((error) => {
				setCreatingValuator(false);
				toast.error("Error creating valuator!");
				(document.getElementById("new_valuation_modal") as any).close();
			});
	};

	useEffect(() => {
		getValuators();
	}, []);

	return (
		<>
			<Navbar />
			<main className="flex flex-col items-center w-full h-full">
				<div className="w-full h-full p-5 px-10">
					<p className="text-2xl my-4 mb-7 font-semibold">My exam valuations</p>
					<div className="flex flex-wrap w-full">
						<div
							onClick={() => (document.getElementById("new_valuation_modal") as any).showModal()}
							className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col min-h-[400px] min-w-[350px] mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden"
						>
							<div className="flex flex-col items-center justify-center w-full h-full">
								<CiCirclePlus className="h-40 w-40 mb-2" />
								<p className="font-semibold text-xl">New valuator</p>
							</div>
						</div>
						{valuators?.map((item: any, index: number) => {
							return (
								<div
									onClick={() => (document.getElementById("new_valuation_modal") as any).showModal()}
									className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col min-h-[400px] min-w-[350px] mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden"
								>
									<div className="flex flex-col items-center justify-center w-full h-full">
										<AiFillSetting className="h-40 w-40 mb-2" />
										<p className="font-semibold text-xl">{item?.title}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</main>
			{/* Modals */}
			{/* New valuation modal */}
			<dialog id="new_valuation_modal" className="modal">
				<div className="modal-box max-w-2xl align-middle">
					<h3 className="flex items-center font-bold text-2xl mb-5">
						<FiPlusCircle className="mr-2" /> Create new valuator
					</h3>
					<p className="mb-5 font-semibold">Exam title</p>
					<input
						type="text"
						placeholder="Exam Title"
						className="input input-bordered w-full"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className="w-full flex flex-col">
						<p className="mb-2 mt-7 font-semibold">Upload question paper</p>
						<div className="flex">
							{questionPaperUrl ? (
								questionPaperUrl
							) : (
								<UploadButton
									endpoint="media"
									onClientUploadComplete={(res) => {
										// Do something with the response
										console.log("Files: ", res![0].url);
										setQuestionPaperUrl(res![0].url);
									}}
									onUploadError={(error: Error) => {
										// Do something with the error.
										alert(`ERROR! ${error.message}`);
									}}
								/>
							)}
						</div>
					</div>
					<div className="w-full flex flex-col">
						<p className="mb-2 mt-7 font-semibold">Upload answer key / criteria</p>
						<div className="flex">
							{answerKeyUrl ? (
								answerKeyUrl
							) : (
								<UploadButton
									endpoint="media"
									onClientUploadComplete={(res) => {
										// Do something with the response
										console.log("Files: ", res![0].url);
										setAnswerKeyUrl(res![0].url);
									}}
									onUploadError={(error: Error) => {
										// Do something with the error.
										alert(`ERROR! ${error.message}`);
									}}
								/>
							)}
						</div>
					</div>
					<button
						className={
							"mt-10 btn w-full btn-primary " +
							(!title || !questionPaperUrl || !answerKeyUrl ? "opacity-50" : "")
						}
						onClick={() => {
							if (!title || !questionPaperUrl || !answerKeyUrl) return;
							createValuator();
						}}
					>
						{creatingValuator ? (
							<span className="loading loading-spinner loading-sm"></span>
						) : (
							"Create Valuator"
						)}
					</button>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			{/* New valuation modal end */}
			<ToastContainer />
		</>
	);
}
