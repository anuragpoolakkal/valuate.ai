"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tr from-[#6c63ff] to-[#20bee9]">
      <div className="backdrop-filter backdrop-blur-lg text-white">
        <div className="flex flex-col items-center text-white">
          <h1 className="text-6xl font-extrabold mb-4 text-gradient animate-fade-in">
            valuate.ai
          </h1>
          <p className="text-2xl mb-8 text-opacity-80">
            Exam Answer Paper Valuation and Marksheet Generation using AI
          </p>
          <button
            className="btn btn-primary btn-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:border-primary-dark"
            onClick={() => router.push("/home")}
          >
            Get Started
          </button>
        </div>

        <div className="mt-16 mx-auto max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card backdrop-filter backdrop-blur-lg bg-opacity-80 bg-base-100 border-b border-gray-200">
            <div className="card-body text-black">
              <h2 className="card-title text-3xl font-bold mb-5">
                Valuating answer sheets made easy
              </h2>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  🤖 Create exam valuators by uploading question papers and
                  criteria
                </li>
                <li className="mb-2">
                  📄 Bulk upload answer sheets and let AI value them
                </li>
                <li className="mb-2">⏰ Save time on answer paper valuation</li>
                <li className="mb-2">📝 Review marks assigned by AI</li>
              </ul>
            </div>
          </div>

          <div className="card backdrop-filter backdrop-blur-lg bg-opacity-80 bg-base-100 border-b border-gray-200">
            <div className="card-body text-black">
              <h2 className="card-title text-3xl font-bold mb-5">
                Generate marklists with ease
              </h2>
              <ul className="list-disc pl-6">
                <li className="mb-2">📝 Generate marklists for each exam</li>
                <li className="mb-2">📄 Export marklists as CSV files</li>
                <li className="mb-2">
                  📊 View overall statistics for each exam
                </li>
              </ul>
            </div>
          </div>

          {/* You can uncomment the following section to add an image */}
          {/* <div className="mx-auto">
			  <Image src={"/forms.png"} alt="hero" width={500} height={500} />
			</div> */}
        </div>
      </div>
    </main>
  );
}
