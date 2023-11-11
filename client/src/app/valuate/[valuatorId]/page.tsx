"use client";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineFileDone } from "react-icons/ai";
import { FiCheckCircle, FiUpload } from "react-icons/fi";

type Params = {
	params: {
		valuatorId: string
	}
}

export default function Page({ params: { valuatorId } }: Params) {
	const [valuator, setValuator] = useState<any>(null);
	const [answerSheets, setAnswerSheets] = useState<any>([]);

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

	const [currentValuatingSheet, setCurrentValuatingSheet] = useState<any>(1);
	const [valuating, setValuating] = useState<any>(false);

	const valuateAnswerSheets = async () => {
		setValuating(true);
		for (const answerSheet of answerSheets) {
			await valuate(answerSheet.url);
			setCurrentValuatingSheet(currentValuatingSheet + 1);
		}

		toast.success("Valuation completed");
		setValuating(false);
	};

	const valuate = async (answerSheet: string) => {
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators/valuate`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`,
				"Content-Type": `application/json`,
			},
			data: {
				valuatorId: valuatorId,
				answerSheet: answerSheet,
			}
		};

		var response = await axios(config);
		console.log(response.data)
		return;
	}

	useEffect(() => {
		getValuator();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="flex flex-col p-5">
				<h1 className="font-bold text-4xl mb-10 flex items-center"><AiOutlineFileDone className="mr-2" /> {valuator?.title}</h1>
				<h3 className="text-xl font-bold mb-5 flex items-center"><FiUpload className="mr-2" /> Upload answer sheets</h3>
				<div className="flex flex-col">
					{
						answerSheets.length > 0 ? <div className="flex flex-col">
							<p className="font-semibold mb-5 text-xl">Answer Sheets:</p>
							{
								answerSheets.map((answerSheet: any) => {
									return <p>{answerSheet?.url}</p>
								})
							}
						</div> : <UploadButton
							endpoint="media"
							onClientUploadComplete={(res) => {
								// Do something with the response
								console.log("Files: ", res);
								setAnswerSheets(res);
								alert("Upload Completed");
							}}
							onUploadError={(error: Error) => {
								// Do something with the error.
								alert(`ERROR! ${error.message}`);
							}}
						/>
					}
				</div>
				{
					answerSheets.length > 0 && <div><button className="btn btn-primary mt-10" onClick={valuateAnswerSheets}><FiCheckCircle className="mr-1" /> Valuate</button></div>
				}
				{
					valuating ? <div className="flex"><span className="loading loading-spinner loading-md"></span><p>Validating Answer Sheet {currentValuatingSheet} of {answerSheets?.length}</p></div> : ""
				}
				<ToastContainer />
			</div>
		</div>
	);
};
