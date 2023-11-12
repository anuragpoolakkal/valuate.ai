"use client";
import { UploadButton } from "@/utils/uploadthing";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { serverUrl } from "@/utils/utils";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiFillCheckCircle, AiOutlineFileDone } from "react-icons/ai";
import { FiCheckCircle, FiUpload } from "react-icons/fi";
import { CiTrophy } from "react-icons/ci";

type Params = {
  params: {
    valuatorId: string
  }
}

export default function Page({ params: { valuatorId } }: Params) {
  const [valuator, setValuator] = useState<any>(null);
  const [answerSheets, setAnswerSheets] = useState<any>([]);

  const [results, setResults] = useState<any>([]);

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
    (document.getElementById("valuation_modal") as any).showModal();
    setValuating(true);
    for (const answerSheet of answerSheets) {
      await valuate(answerSheet.url);
      setCurrentValuatingSheet(currentValuatingSheet + 1);
    }

    toast.success("Valuation completed");
    setValuating(false);
    (document.getElementById("valuation_modal") as any).close();

    setTimeout(() => {
      window.location.href = `/review/${valuatorId}`;
    }, 1000);
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

    setResults([...results, response.data]);

    localStorage.setItem("results", JSON.stringify(results));

    return;
  }

  useEffect(() => {
    getValuator();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-5">
        <div className="flex items-center mb-10 justify-between">
          <h1 className="font-bold text-4xl flex items-center"><AiOutlineFileDone className="mr-2" /> {valuator?.title}</h1>
          <div className="flex">
            <button className="btn btn-primary btn-md mr-2" onClick={() => window.location.href = `/review/${valuatorId}`}><FiCheckCircle /> Review Answer Sheets</button>
            <button className="btn btn-primary btn-md" onClick={() => window.location.href = `/marksheet/${valuatorId}`}><CiTrophy /> View Marksheet</button>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-5 flex items-center"><FiUpload className="mr-2" /> Upload answer sheets</h3>
        <div className="flex flex-col">
          {
            answerSheets.length > 0 ? <div className="flex flex-col">
              <p className="font-semibold mb-5 text-xl">Answer Sheets Uploaded:</p>
              {
                answerSheets.map((answerSheet: any, index: number) => {
                  return <p key={index} className="flex items-center mb-2"><AiFillCheckCircle className="text-2xl mr-2 text-green-500" />{answerSheet?.url}</p>
                })
              }
            </div> : <div className="flex">
              <UploadButton
                endpoint="media"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  setAnswerSheets(res);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          }
        </div>
        {
          answerSheets.length > 0 && <div><button className="btn btn-primary mt-10 btn-lg" onClick={() => {
            valuateAnswerSheets();
          }}><FiCheckCircle className="mr-1" /> Start Valuation</button></div>
        }
        {/* {
          valuating ? <div className="flex"><span className="loading loading-spinner loading-md"></span><p>Validating Answer Sheet {currentValuatingSheet} of {answerSheets?.length}</p></div> : ""
        } */}
        <ToastContainer />
      </div>
      {/* Revaluation modal */}
      <dialog id="valuation_modal" className="modal">
        <div className="modal-box max-w-2xl align-middle">
          <h3 className="flex items-center font-bold text-2xl mb-5">
            <FiCheckCircle className="mr-2" /> Valuating Answer Sheets
          </h3>
          <div className="my-10 flex flex-col items-center justify-center">
            <span className="loading loading-spinner loading-lg mb-10"></span>
            <p className="text-lg mb-5">Valuating Answer Sheet {currentValuatingSheet} of {answerSheets?.length}</p>
            <progress className="progress mb-5 w-[20vw]" value={currentValuatingSheet / answerSheets?.length * 100} max="100"></progress>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};