"use client";
import React from "react";
import Image from "next/image";

const ViewAnswerPage = () => {
  return (
    <div className="w-full h-screen p-8 flex flex-row">
      <div className="w-1/2 p-4">
        <div className="collapse bg-white shadow-2xl rounded-none">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium flex justify-between">
            <h2 className="text-xl font-bold mb-2">
              Q. What is the capital of France?
            </h2>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input type="checkbox" className="checkbox checkbox-accent" />
              </label>
            </div>
          </div>
          <div className="collapse-content">
            <p className="text-gray-700">
              Ans: The capital of France is Paris.
            </p>

            {/* Confidence Indicator */}
            <div className="flex items-center space-x-2 mt-4">
              <span className="text-sm text-gray-500">Confidence:</span>
              <div className="bg-green-500 w-6 h-6 rounded-full"></div>
              <span className="text-sm font-semibold text-green-500">High</span>
            </div>

            {/* Approve Button */}
            <div className="flex items-center mt-4">
              <button className="bg-blue-500 text-white rounded-md mr-2 btn-sm">
                Approve
              </button> 

              {/* AI Remarks */}
              <p className="text-sm text-gray-500">
                AI Remarks: This answer is well-formed and accurate.
              </p>
            </div>

            {/* Editable Input for Marks */}
            <div className="flex items-center mt-4">
              <label className="text-sm text-gray-600 mr-2">Marks:</label>
              <input
                type="text"
                className="p-2 rounded-md w-10 input text-center input-sm border-none mr-2"
                value={`8`}
                readOnly
              />
              <p className="text-black font-bold">/ 10</p>
            </div>
          </div>
        </div>
        <div className="collapse bg-white rounded-none shadow-2xl">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium flex justify-between">
            <h2 className="text-xl font-bold mb-2">
              Q. What is the capital of France?
            </h2>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input type="checkbox" className="checkbox checkbox-accent" />
              </label>
            </div>
          </div>
          <div className="collapse-content">
            <p className="text-gray-700">
              Ans: The capital of France is Paris.
            </p>
          </div>
        </div>
        <div className="collapse bg-white shadow-2xl rounded-none">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium flex justify-between">
            <h2 className="text-xl font-bold mb-2">
              Q. What is the capital of France?
            </h2>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input type="checkbox" className="checkbox checkbox-accent" />
              </label>
            </div>
          </div>
          <div className="collapse-content">
            <p className="text-gray-700">
              Ans: The capital of France is Paris.
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-auto justify-center flex ">
        <div className="carousel carousel-center p-4 space-x-4 bg-white">
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1699462514411-b5948b89299f?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1699462514411-b5948b89299f?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1699462514411-b5948b89299f?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1699462514411-b5948b89299f?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="rounded-box"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnswerPage;
