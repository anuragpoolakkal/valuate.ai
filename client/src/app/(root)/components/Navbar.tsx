"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
	const router = useRouter();

	const handleLogout = () => {
		localStorage.clear();
		router.push("/");
	};
	return (
		<div className="pb-[70px]">
			<div className="z-50 fixed navbar backdrop-filter backdrop-blur-lg bg-opacity-30  bg-base-100 flex justify-between top-30 z-54">
				<Link href={"/home"} className="btn btn-ghost normal-case font-black text-3xl">
					valuate.ai
				</Link>
				<div className="flex">
				<div className="m-2">
					<button
						className="btn btn-primary mr-5"
						onClick={() => (document.getElementById("premium_modal") as any).showModal()}
					>
						🚀 Premium
					</button>
				</div>
				<div className="m-4">
					<UserButton afterSignOutUrl="/" />
				</div>
				</div>
			</div>
			{/* Premium Modal */}
			<dialog id="premium_modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-2xl">🚀 Go Premium!</h3>
					<p className="py-4 font-semibold text-xl">Enjoy premium features for just $49/month!</p>
					<div className="flex items-center text-xl my-7">
						<AiFillCheckCircle className="mr-2 text-green-500" /> Premium feature 1
					</div>
					<div className="flex items-center text-xl my-7">
						<AiFillCheckCircle className="mr-2 text-green-500" /> Premium feature 2
					</div>
					<div className="flex items-center text-xl my-7">
						<AiFillCheckCircle className="mr-2 text-green-500" /> Premium feature 3
					</div>
					<div className="flex items-center text-xl my-7">
						<AiFillCheckCircle className="mr-2 text-green-500" /> Premium feature 4
					</div>
					<div className="modal-action mt-10 flex justify-center ">
						<button
							className={"btn btn-lg btn-primary w-full"}
							onClick={() => (document.getElementById("premium_modal") as any).close()}
						>
							Upgrade now 🚀
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}

export default Navbar;
