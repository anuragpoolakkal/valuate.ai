"use client";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
	const [valuation, setValuation] = useState([]);
	const [title, setTitle] = useState("");

	const router = useRouter();

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
								<p className="font-semibold text-xl">New valuation</p>
							</div>
						</div>
					</div>
					{/* {classes?.map((class, index) => {
						return 
							<section
								key={index}
								translate="translateY(10px)"
								duration={(index * 0.075 + 0.5).toString() + "s"}
							>
								<div
									onClick={() => (window.location.href = "/editor/" + class?.data?.id)}
									className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col h-full w-full mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden"
								>
									<div
										style={{
											background: `linear-gradient(45deg, ${
												bgColors[class?.data?.title.toString().toLowerCase()[0]][0]
											}, ${bgColors[class?.data?.title.toString().toLowerCase()[0]][1]})`,
										}}
										className={"flex items-center justify-center w-full h-full opacity-50"}
									>
										<FiFileText
											style={{
												color: bgColors[class?.data?.title.toString().toLowerCase()[0]][1],
											}}
											className={"h-40 w-40 mb-2"}
										/>
									</div>
									<div className="p-5 h-auto">
										<p className="font-semibold text-lg">{class?.data?.title}</p>
										<p className="text-gray-500">No responses</p>
									</div>
								</div>
							</section>
						
					})} */}
				</div>
			</main>
			{/* Modals */}
			{/* New valuation modal */}
			<dialog id="new_valuation_modal" className="modal">
				<div className="modal-box max-w-2xl align-middle">
					<h3 className="flex items-center font-bold text-2xl mb-3">
						<FiPlusCircle className="mr-2" /> New exam valuation
					</h3>
					<input type="text" placeholder="Title of the exam" className="input input-bordered w-full " />
					<div className="flex justify-between m-3">
						<div className="flex flex-col border-2 p-5 w-full mr-4 rounded-lg border-black">
							<h3 className="my-7 font-bold">Upload question paper</h3>
							<UploadButton
								endpoint="media"
								onClientUploadComplete={(res) => {
									// Do something with the response
									console.log("Files: ", res![0].url);
									alert("Upload Completed");
								}}
								onUploadError={(error: Error) => {
									// Do something with the error.
									alert(`ERROR! ${error.message}`);
								}}
							/>
						</div>
						<div className="flex flex-col border-2 p-5 w-full rounded-lg border-black">
							<h3 className="my-7 font-bold">Upload answer key</h3>
							<UploadButton
								endpoint="media"
								onClientUploadComplete={(res) => {
									// Do something with the response
									console.log("Files: ", res);
									alert("Upload Completed");
								}}
								onUploadError={(error: Error) => {
									// Do something with the error.
									alert(`ERROR! ${error.message}`);
								}}
							/>
						</div>
					</div>
					{/* <div className="row" style={{ marginBottom: "50px" }}>
						<input
							type="range"
							value={proLevel}
							min={0}
							max="4"
							className="range"
							step="0"
							onChange={(e) => setProLevel(parseInt(e.target.value))}
						/>
						<div className="w-full flex justify-between text-xs px-2">
							<span>{proficiencyLevels[0]}</span>
							<span>|</span>
							<span>|</span>
							<span>|</span>
							<span>{proficiencyLevels[4]}</span>
						</div>
					</div> */}
					<button className="btn w-full btn-primary mt-3" onClick={() => router.push("/valuate")}>
						Create valuator
					</button>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
			{/* New valuation modal end */}
		</>
	);
}
