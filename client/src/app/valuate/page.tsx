"use client";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "../components/Navbar";

const page = () => {
	return (
		<>
			<Navbar />
			<h1 className="font-bold text-4xl ml-8 mt-5">Midterm Exam 2023-24</h1>
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
		</>
	);
};
export default page;
