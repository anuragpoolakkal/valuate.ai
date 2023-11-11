"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
	const router = useRouter();

	return (
		<main className="flex items-center w-[100vw] h-[100vh] overflow-hidden bg-gradient-to-tr from-[#dcd4ff] to-[#bdaeff]">
			<div className="backdrop-filter backdrop-blur-lg">
				<div className="flex">
					<h1 className="ml-20 relative text-black text-9xl font-bold">Valuate.AI</h1>
				</div>
				<p className="text-black mt-5 text-3xl ml-20">
					Exam Answer Paper Valuation and Marksheet Generation using AI
				</p>
				<button className="btn btn-primary btn-lg ml-20 mt-10" onClick={() => router.push("/home")}>
					Get Started
				</button>
			</div>
			<div className="mt-20 flex ml-20">
				<div className="card w-110 backdrop-filter backdrop-blur-lg bg-opacity-30  bg-base-100 border-b border-gray-200 mr-2">
					<div className="card-body">
						<h2 className="card-title mb-5">Valuating answer sheets made easy</h2>
						<p className="font-semibold">
							🤖 Create exam valuators by uploading question papers and criteria
						</p>
						<p className="font-semibold">📄 Bulk upload answer sheets and let AI value them</p>
						<p className="font-semibold">⏰ Save time on answer paper valuation</p>
						<p className="font-semibold">📝 Review marks assigned by AI </p>
					</div>
				</div>
			</div>
			{/* <div className="mx-auto">
				<Image src={"/forms.png"} alt="hero" width={500} height={500} />
			</div> */}
		</main>
	);
}
