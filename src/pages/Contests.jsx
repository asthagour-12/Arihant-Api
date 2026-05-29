import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import Header from "./Header";
import contestImage from "../assets/contest.jpg";
// Import 6 contest images
import contestImg1 from "../assets/contests/04122025040438470438.jpg";
import contestImg2 from "../assets/contests/07122025040748626748.jpg";
import contestImg3 from "../assets/contests/501220250450590365059.jpg";
import contestImg4 from "../assets/contests/511220250451379275137.jpg";
import contestImg5 from "../assets/contests/education cost00122025040047067047.jpg";
import contestImg6 from "../assets/contests/require310620250231168943116.jpg";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getUserProfile, getClientContactDetails } from "../api/korpApiService";

function Contests() {
  const [activeTab, setActiveTab] = useState("contest");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const triggerProfileCall = async () => {
      try {
        await getUserProfile();
      } catch (err) {
        console.error("Failed to call getprofile from Contests:", err);
      }
    };
    triggerProfileCall();
  }, []);

  useEffect(() => {
    if (activeTab === "data") {
      const fetchContactDetails = async () => {
        setLoading(true);
        try {
          const response = await getClientContactDetails({ pageNumber: 0, size: 50 });
          console.log("korpClientContactDetails API Response:", response.data);
          
          const responseData = response?.data?.data || response?.data?.result || response?.data?.Data || response?.data || [];
          if (Array.isArray(responseData)) {
            setData(responseData);
          } else if (responseData && Array.isArray(responseData.list)) {
            setData(responseData.list);
          } else if (responseData && Array.isArray(responseData.results)) {
            setData(responseData.results);
          } else {
            setData([]);
          }
        } catch (err) {
          console.error("Failed to fetch client contact details:", err);
          setData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchContactDetails();
    }
  }, [activeTab]);

  // SORT
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "";
    }

    let sorted = [...data];
    if (direction !== "") {
      sorted.sort((a, b) => {
        let aVal = "";
        let bVal = "";

        if (key === "branch") {
          aVal = a.BranchCode || a.branchcode || a.branchCode || a.branch || "";
          bVal = b.BranchCode || b.branchcode || b.branchCode || b.branch || "";
        } else if (key === "client") {
          aVal = a.AccountId || a.clientcode || a.clientCode || a.client || "";
          bVal = b.AccountId || b.clientcode || b.clientCode || b.client || "";
        } else if (key === "name") {
          aVal = a.Name || a.clientname || a.clientName || a.name || "";
          bVal = b.Name || b.clientname || b.clientName || b.name || "";
        } else if (key === "email") {
          aVal = a.ContactEmail || a.email || a.Email || "";
          bVal = b.ContactEmail || b.email || b.Email || "";
        } else if (key === "mobile") {
          aVal = a.Contactno || a.mobile || a.Mobile || "";
          bVal = b.Contactno || b.mobile || b.Mobile || "";
        } else {
          aVal = a[key] || "";
          bVal = b[key] || "";
        }

        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setSortConfig({ key, direction });
    setData(sorted);
  };

  // SORT ICON (MATCHING HOLDING REPORT)
  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }
    return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
  };

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
          <div className="bg-white border border-gray-200 rounded-b-md py-3 shadow-sm">
            {/* Header */}
            <div className="px-6 py-2 text-sm text-gray-700 pb-8px font-semibold">
              Search results ({data.length})
            </div>

            {/* Table */}
            <table className="w-[95%] mx-auto text-[12px] border border-gray-300 table-fixed">
              <thead>
                <tr className="bg-[#1EB04C] text-white">
                  <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("branch")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Branch Code</span>
                      {renderSortIcon("branch")}
                    </div>
                  </th>
                  <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("client")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Client Code</span>
                      {renderSortIcon("client")}
                    </div>
                  </th>
                  <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("name")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Name</span>
                      {renderSortIcon("name")}
                    </div>
                  </th>
                  <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("email")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Email</span>
                      {renderSortIcon("email")}
                    </div>
                  </th>
                  <th className="px-3 py-3 border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("mobile")}>
                    <div className="flex items-center justify-between">
                      <span className="uppercase font-bold tracking-wider">Mobile Number</span>
                      {renderSortIcon("mobile")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 font-semibold">
                      Loading client contact details from UAT...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">
                      No records found
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => {
                    const branch = item.BranchCode || item.branchcode || item.branchCode || item.branch || item.Branch || "-";
                    const client = item.AccountId || item.clientcode || item.clientCode || item.client || item.ClientCode || "-";
                    const name = item.Name || item.clientname || item.clientName || item.name || item.contactperson || "-";
                    const email = item.ContactEmail || item.email || item.Email || item.emailId || "-";
                    const mobile = item.Contactno || item.mobile || item.Mobile || item.mobileNumber || "-";

                    return (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-2 border-r border-gray-200">
                          {branch}
                        </td>
                        <td className="px-3 py-2 border-r border-gray-200 font-semibold">
                          {client}
                        </td>
                        <td className="px-3 py-2 border-r border-gray-200">
                          {name}
                        </td>
                        <td className="px-3 py-2 border-r border-gray-200">
                          {email}
                        </td>
                        <td className="px-3 py-2">
                          {mobile}
                        </td>
                      </tr>
                    );
                  })
                )}
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
