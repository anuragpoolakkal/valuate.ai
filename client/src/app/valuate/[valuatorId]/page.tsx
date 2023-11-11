"use client";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
		<>
			<Navbar />
			<h1 className="font-bold text-4xl ml-8 mt-5">{valuator?.title}</h1>
			<div className="flex w-full justify-center ">
				<div className="border-black border-2 rounded-lg p-10 mt-5 mx-15 my-10">
					<h3 className="text-xl font-bold mx-3 mb-3 justify-center">Upload answer sheets</h3>
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
			<ToastContainer/>
		</>
	);
};
