import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "./assets/position-call-banner.jpg";
import '@fortawesome/fontawesome-free/css/all.css';
import logo from "./logo-arihant-capital.png";
import Header from "./Header.jsx";

function ResearchSection() {
  const [activeTab, setActiveTab] = useState("zoom");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <div className="mt-20 px-6">

        {/* WHITE CARD */}
        <div className="bg-white rounded-md shadow border p-3">

          {/* 🔥 TOP TABS */}
          <div className="flex gap-8 border-b pb-2 text-base">

          <span
            onClick={() => navigate("/researchcall")}
            className="cursor-pointer pb-2 text-gray-500 hover:text-gray-800 text-base"
          >
            Research Call
          </span>

          <span
            onClick={() => setActiveTab("zoom")}
            className={`cursor-pointer pb-2 ${
              activeTab === "zoom"
                ? "font-semibold border-b-4 border-green-500 text-base"
                : "text-gray-500 text-base"
            }`}
          >
            Zoom Research Call
          </span>

        </div>

        {/* IMAGE (ACTUAL UI INSIDE THIS) */}
        <div className="mt-4">
          <img
            src={banner}
            alt="zoom research"
            className="w-full h-150"
          />
        </div>

        </div>

      </div>

    </div>
  );
}

export default ResearchSection;