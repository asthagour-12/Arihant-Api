import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.css';
import logo from "../logo-arihant-capital.png";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";
import { getResearchCalls, getUserProfile } from "../api/korpApiService";

function ResearchCall() {
  const [activeTopTab, setActiveTopTab] = useState("research");
  const [activeSubTab, setActiveSubTab] = useState("short-term");
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subTabs = [
    { id: "intra-day", label: "Intra Day Call" },
    { id: "fundamental", label: "Fundamental Call" },
    { id: "short-term", label: "Short Term Call" }
  ];

  const getSearchType = (tabId) => {
    switch (tabId) {
      case "intra-day":
        return "Intraday";
      case "fundamental":
        return "FundaMental";
      case "short-term":
        return "Shortterm";
      default:
        return "Shortterm";
    }
  };

  const fetchCalls = async (tabId) => {
    setLoading(true);
    try {
      const type = getSearchType(tabId);
      const response = await getResearchCalls(type);
      console.log(`Research Call Response for ${type}:`, response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];
      if (Array.isArray(items)) {
        setCalls(items);
      } else {
        setCalls([]);
      }
    } catch (err) {
      console.error("Failed to fetch research calls:", err);
      setCalls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("UserProfile fetched on ResearchCall:", response.data);
      } catch (err) {
        console.error("Failed to check profile on ResearchCall:", err);
      }
    };
    checkUserProfile();
  }, []);

  useEffect(() => {
    fetchCalls(activeSubTab);
  }, [activeSubTab]);

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

        {/* Research Calls Table */}
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
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500 font-semibold">
                    Loading research calls from UAT...
                  </td>
                </tr>
              ) : calls.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-gray-500 font-medium">
                    No active research calls for this category
                  </td>
                </tr>
              ) : (
                calls.map((row, index) => {
                  const dateTime = row.dateTime || row.datetime || row.Date || row.date || row.DateTime || row.updatedDate || "-";
                  const segment = row.segment || row.Segment || row.type || row.Type || "-";
                  const message = row.message || row.Message || row.callMessage || row.description || row.Description || "-";

                  return (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap">{dateTime}</td>
                      <td className="p-3">{segment}</td>
                      <td className="p-3">{message}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      <ArihantProductsSection />

    </div>
  );
}

export default ResearchCall;