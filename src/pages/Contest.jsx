import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header.jsx";
import logo from "../logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Contests() {
  const [activeTab, setActiveTab] = useState("data");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="download-container">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="p-6 bg-[#f4f6f9] min-h-screen mt-16">

      {/* Tabs */}
      <div className="flex gap-8 bg-white px-6 py-4 rounded-t-md text-[14px] border">
        <Link to="/contests" className="text-gray-600">Contest</Link>

        <span
          onClick={() => setActiveTab("data")}
          className={`cursor-pointer pb-2 ${
            activeTab === "data"
              ? "border-b-2 border-green-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Contest Data
        </span>

        <Link to="/minor-drive-creatives" className="text-gray-600 cursor-pointer hover:underline">Minor Drive Creatives</Link>
        <Link to="/contests-video" className="text-gray-600 cursor-pointer hover:underline">Contest Video</Link>
      </div>

      {/* Content based on active tab */}
      {activeTab === "data" && (
        <div className="bg-white border border-gray-200 rounded-b-md p-4">
          <h2 className="text-xl font-semibold mb-4">Contest Data</h2>
          <p className="text-gray-600">Contest Data content will be displayed here.</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Contests;