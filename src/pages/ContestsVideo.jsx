import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../logo-arihant-capital.png";
import Header from "./Header";

function ContestsVideo() {
  const [activeTab, setActiveTab] = useState("video");
  const [dropdownOpen, setDropdownOpen] = useState(false);
const navigate = useNavigate();
  return (
    <div className="download-container">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="bg-yellow-50 p-6 mt-16 rounded-md shadow-md border">

        {/* Tabs */}
        <div className="flex gap-8 bg-white px-6 py-4 rounded-t-md text-[14px] border mt-1">
          <Link to="/contests" className="text-gray-600 cursor-pointer">
            Contest
          </Link>

          <Link to="/contests-data" className="text-gray-600 cursor-pointer">
            Contest Data
          </Link>

          <Link to="/minor-drive-creatives" className="text-gray-600 cursor-pointer">
            Minor Drive Creatives
          </Link>

          <span
            onClick={() => setActiveTab("video")}
            className={`cursor-pointer pb-2 ${
              activeTab === "video"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            Contest Video
          </span>
        </div>

        {/* Content */}
        {activeTab === "video" && (
          <div className="bg-white border border-gray-200 rounded-b-md p-4">

            <div className="flex justify-between items-center text-sm py-3">

              <p className="text-blue-600 cursor-pointer">
                Gifting My Daughter 1 Crore on Her 1st Birthday
              </p>

              <p className="text-gray-700">
                Parents, want to build 1 CRORE for your child with  
                <br />
                <span className="text-blue-600 ml-1 cursor-pointer">
                  4,000/month? Basic step.
                </span>
              </p>

              <p className="text-blue-600 cursor-pointer pr-20">
                Child Event
              </p>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ContestsVideo;