import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import contestImage from "./assets/contest.jpg";
// Import 6 contest images
import contestImg1 from "./assets/contests/04122025040438470438.jpg";
import contestImg2 from "./assets/contests/07122025040748626748.jpg";
import contestImg3 from "./assets/contests/501220250450590365059.jpg";
import contestImg4 from "./assets/contests/511220250451379275137.jpg";
import contestImg5 from "./assets/contests/education cost00122025040047067047.jpg";
import contestImg6 from "./assets/contests/require310620250231168943116.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Contests() {
  const [activeTab, setActiveTab] = useState("contest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState([
    { branch: "BRAP05", client: "188003119", name: "ANAND PATEL", email: "*****@yahoo.com", mobile: "******5" },
    { branch: "BRAP05", client: "AP0110283", name: "RADHESHYAM PANCHAL", email: "*****@gmail.com", mobile: "******1" },
    { branch: "BRAP05", client: "188018114", name: "DHARAM JAIN", email: "*****@yahoo.com", mobile: "******5" },
    { branch: "BRAP05", client: "138000287", name: "SHOBHA LALWANI", email: "*****@gmail.com", mobile: "******2" },
  ]);
  const navigate = useNavigate();

  return (
    <div className="download-container">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="p-6 bg-[#f4f6f9] min-h-screen mt-16">

        {/* Tabs */}
        <div className="flex gap-8 bg-white px-6 py-4 rounded-t-md text-[14px] border">
          <span
            onClick={() => setActiveTab("contest")}
            className={`cursor-pointer pb-2 ${activeTab === "contest"
                ? "border-b-2 border-green-500 font-semibold"
                : "text-gray-500"
              }`}
          >
            Contest
          </span>

          <span
            onClick={() => setActiveTab("data")}
            className={`cursor-pointer pb-2 ${activeTab === "data"
                ? "border-b-2 border-green-500 font-semibold"
                : "text-gray-500"
              }`}
          >
            Contest Data
          </span>

          <span
            onClick={() => setActiveTab("minor-drive-creatives")}
            className={`cursor-pointer pb-2 ${activeTab === "minor-drive-creatives"
                ? "border-b-2 border-green-500 font-semibold"
                : "text-gray-500"
              }`}
          >
            Minor Drive Creatives
          </span>

          <Link to="/contests-video" className="text-gray-600 cursor-pointer hover:underline">Contest Video</Link>
        </div>

        {/* Content based on active tab */}
        {activeTab === "contest" && (
          <div className="bg-white border border-gray-200 rounded-b-md p-4">
            {/* Contest Image with Tailwind CSS styles */}
            <div className="max-w-2xl ml-4">
              <img
                src={contestImage}
                alt="Contest"
                className="w-full h-auto border-none outline-none max-w-full align-middle"
              />
            </div>
          </div>
        )}

        {activeTab === "data" && (
          <div className="bg-white border border-gray-200 rounded-b-md py-3">
            {/* Header */}
            <div className="px-6 py-2 text-sm text-gray-700 pb-8px">
              Search results ({data.length})
            </div>

            {/* Table */}
            <table className="w-[95%] mx-auto text-[12px] border border-gray-300 table-fixed">
              <thead>
                <tr className="bg-[#2fb344] text-white">
                  <th className="px-3 py-2 border-r border-gray-200">
                    Branch
                  </th>
                  <th className="px-3 py-2 border-r border-gray-200">
                    Client
                  </th>
                  <th className="px-3 py-2 border-r border-gray-200">
                    Name
                  </th>
                  <th className="px-3 py-2 border-r border-gray-200">
                    Email
                  </th>
                  <th className="px-3 py-2">
                    Mobile
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-3 py-2 border-r border-gray-200">
                      {item.branch}
                    </td>
                    <td className="px-3 py-2 border-r border-gray-200">
                      {item.client}
                    </td>
                    <td className="px-3 py-2 border-r border-gray-200">
                      {item.name}
                    </td>
                    <td className="px-3 py-2 border-r border-gray-200">
                      {item.email}
                    </td>
                    <td className="px-3 py-2">
                      {item.mobile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "minor-drive-creatives" && (
          <div className="bg-white border border-gray-200 rounded-b-md p-4">
            <h2 className="text-xl font-semibold mb-4">Minor Drive Creatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4">
                <img src={contestImg1} alt="Contest Creative 1" className="w-full h-auto rounded" />
              </div>
              <div className="p-4">
                <img src={contestImg2} alt="Contest Creative 2" className="w-full h-auto rounded" />
              </div>
              <div className="p-4">
                <img src={contestImg3} alt="Contest Creative 3" className="w-full h-auto rounded" />
              </div>
              <div className="p-4">
                <img src={contestImg4} alt="Contest Creative 4" className="w-full h-auto rounded" />
              </div>
              <div className="p-4">
                <img src={contestImg5} alt="Contest Creative 5" className="w-full h-auto rounded" />
              </div>
              <div className="p-4">
                <img src={contestImg6} alt="Contest Creative 6" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contests;
