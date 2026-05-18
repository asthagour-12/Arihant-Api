import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import logo from "../logo-arihant-capital.png";
import Header from "../Header.jsx";
import ArihantProductsSection from "../ArihantProducts.jsx";

function ResearchCall() {
  const [activeTopTab, setActiveTopTab] = useState("research");
  const [activeSubTab, setActiveSubTab] = useState("short-term");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const subTabs = [
    { id: "intra-day", label: "Intra Day Call" },
    { id: "fundamental", label: "Fundamental Call" },
    { id: "short-term", label: "Short Term Call" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="mt-20 bg-white p-3 rounded-md shadow-md border">

        {/* Top Tabs */}
        <div className="flex gap-6 border-b pb-3">
          <span
            onClick={() => setActiveTopTab("research")}
            className={
              activeTopTab === "research"
                ? "font-semibold border-b-4 border-green-500 pb-2 cursor-pointer text-base"
                : "text-gray-600 cursor-pointer hover:text-gray-800 text-base"
            }
          >
            Research Call
          </span>

          <span
            onClick={() => navigate("/zoomresearch")}
            className="text-gray-600 cursor-pointer hover:text-gray-800 text-base"
          >
            Zoom Research Call
          </span>

        </div>

        {/* Sub Tabs */}
        <div className="flex gap-8 mt-6 text-gray-600 text-sm">
          {subTabs.map((tab) => (
            <span
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={
                activeSubTab === tab.id
                  ? "border-b-4 border-green-500 pb-1 text-black font-medium cursor-pointer"
                  : "cursor-pointer hover:text-gray-800"
              }
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-black">
            Research Disclaimer:
          </span>{" "}
          Registration granted by SEBI and certification from NISM in no way
          guarantee performance of the intermediary or provide any assurance of
          returns to investors. Investment in securities market are subject to
          market risks. Read all the related documents carefully before investing.{" "}
          <span className="text-green-600 cursor-pointer">LINK</span>
        </p>

        {/* Sample Data Table */}
        <div className="mt-6 bg-white border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-left">Segment</th>
                <th className="p-3 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">2024-04-16 09:30 AM</td>
                <td className="p-3">Equity</td>
                <td className="p-3">Buy RELIANCE INDUSTRIES LTD at ₹2500, Target ₹2600, Stop Loss ₹2450</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">2024-04-16 10:15 AM</td>
                <td className="p-3">Derivatives</td>
                <td className="p-3">Sell NIFTY APR 2024 18500 CALL, Premium ₹120, Target ₹150</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">2024-04-16 11:00 AM</td>
                <td className="p-3">Commodity</td>
                <td className="p-3">Buy GOLD JUNE 2024 at ₹72000, Target ₹73500, Stop Loss ₹71000</td>
              </tr>
              <tr className="border-t hover:bg-gray-50">
                <td className="p-3">2024-04-16 02:30 PM</td>
                <td className="p-3">Equity</td>
                <td className="p-3">Book Profit - TCS at ₹3500, Bought at ₹3400 (Profit: ₹100 per share)</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <ArihantProductsSection />

    </div>
  );
}

export default ResearchCall;