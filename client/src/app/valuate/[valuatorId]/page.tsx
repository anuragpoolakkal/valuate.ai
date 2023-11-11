"use client";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineFileDone } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

type Params = {
	params: {
		valuatorId: string
	}
}

export default function Page({ params: { valuatorId } }: Params) {
	const [valuator, setValuator] = useState<any>(null);

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

	useEffect(() => {
		getValuator();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="flex flex-col p-5">
				<h1 className="font-bold text-4xl mb-10 flex items-center"><AiOutlineFileDone className="mr-2" /> {valuator?.title}</h1>
				<h3 className="text-xl font-bold mb-5 flex items-center"><FiUpload className="mr-2" /> Upload answer sheets</h3>
				<div className="flex">
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
				<ToastContainer />
			</div>
		</div>
	);
};
