import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "valuate.ai",
	description: "Exam Answer Paper Valuation and Marksheet Generation using AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en">
				{/* <head>
					<link rel="icon" type="image/x-icon" href="/threads.png" sizes="any" />
				</head> */}
				<body className={`${inter.className} bg-black`}>
					<div className="w-full flex justify-center items-center min-h-screen">{children}</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
