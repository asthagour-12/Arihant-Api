import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import Header from "./Header";
import { getClientContactDetails } from "../api/korpApiService";
import { toast } from "react-toastify";

export default function ContestsData() {
  const [activeTab, setActiveTab] = useState("data");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [visibleRows, setVisibleRows] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("connect_token");
      console.log("🔐 Token exists:", !!token);
      
      const params = {
        pageNumber: 0,
        size: 50
      };
      console.log("📤 Calling API with params:", params);
      
      const response = await getClientContactDetails(params);
      console.log("✅ ClientContactDetails API Response:", response.data);
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
      console.error("❌ Failed to fetch client contact details:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error message:", err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

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

        if (key === "branchCode") {
          aVal = a.BranchCode || a.branchCode || a.branchcode || a.branch || "";
          bVal = b.BranchCode || b.branchCode || b.branchcode || b.branch || "";
        } else if (key === "clientCode") {
          aVal = a.AccountId || a.clientCode || a.clientcode || a.client || "";
          bVal = b.AccountId || b.clientCode || b.clientcode || b.client || "";
        } else if (key === "clientName") {
          aVal = a.Name || a.clientName || a.clientname || a.name || "";
          bVal = b.Name || b.clientName || b.clientname || b.name || "";
        } else if (key === "email") {
          aVal = a.ContactEmail || a.email || a.emailId || "";
          bVal = b.ContactEmail || b.email || b.emailId || "";
        } else if (key === "mobile") {
          aVal = a.Contactno || a.mobile || a.mobileNo || "";
          bVal = b.Contactno || b.mobile || b.mobileNo || "";
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

  // EYE TOGGLE
  const toggleVisibility = (i) => {
    setVisibleRows((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // SORT ICON
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

  // MASKING HELPERS
  const maskEmail = (email) => {
    if (!email || email === "-") return "-";
    const [local, domain] = email.split("@");
    if (!domain) return "*****";
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local.substring(0, 2)}******@${domain}`;
  };

  const maskMobile = (mobile) => {
    if (!mobile || mobile === "-") return "-";
    const str = mobile.toString();
    if (str.length < 4) return "****";
    return `******${str.substring(str.length - 4)}`;
  };

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

        {/* TABLE */}
        {activeTab === "data" && (
          <div className="bg-white border border-gray-200 rounded-b-md py-3 shadow-sm">

            {/* Header */}
            <div className="px-6 py-2 text-sm text-gray-700 pb-8px font-semibold">
              Search results ({data.length})
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-[95%] mx-auto text-[12px] border border-gray-300 table-fixed min-w-[800px]">

                <thead>
                  <tr className="bg-[#1EB04C] text-white">

                    <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("branchCode")}>
                      <div className="flex items-center justify-between">
                        <span className="uppercase font-bold tracking-wider">Branch Code</span>
                        {renderSortIcon("branchCode")}
                      </div>
                    </th>

                    <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientCode")}>
                      <div className="flex items-center justify-between">
                        <span className="uppercase font-bold tracking-wider">Client Code</span>
                        {renderSortIcon("clientCode")}
                      </div>
                    </th>

                    <th className="px-3 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientName")}>
                      <div className="flex items-center justify-between">
                        <span className="uppercase font-bold tracking-wider">Name</span>
                        {renderSortIcon("clientName")}
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
                      <td colSpan="5" className="p-4 text-center text-gray-500 font-medium">
                        Loading Contest Data from UAT...
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item, i) => {
                      const branch = item.BranchCode || item.branchCode || item.branchcode || item.branch || item.Branch || "-";
                      const client = item.AccountId || item.clientCode || item.clientcode || item.client || item.ClientCode || item.Client || "-";
                      const name = item.Name || item.clientName || item.clientname || item.name || item.contactperson || "-";
                      const emailVal = item.ContactEmail || item.email || item.emailId || item.emailaddress || item.Email || item.EmailId || "-";
                      const mobileVal = item.Contactno || item.mobile || item.mobileNo || item.mobileNumber || item.phone || item.Mobile || item.MobileNo || "-";

                      return (
                        <tr key={i} className="border-b border-gray-200 h-[28px] hover:bg-gray-50 transition-colors">

                          <td className="px-3 py-[4px] border-r border-gray-200">
                            {branch}
                          </td>

                          <td className="px-3 py-[4px] border-r border-gray-200 font-semibold">
                            {client}
                          </td>

                          <td className="px-3 py-[4px] border-r border-gray-200">
                            {name}
                          </td>

                          <td className="px-3 py-[4px] border-r border-gray-200">
                            <div className="flex items-center justify-between gap-1 pr-2">
                              <span>{visibleRows[i] ? emailVal : maskEmail(emailVal)}</span>
                              {emailVal !== "-" && (
                                <i
                                  onClick={() => toggleVisibility(i)}
                                  className={`fa ${visibleRows[i] ? "fa-eye" : "fa-eye-slash"} cursor-pointer text-gray-500 hover:text-green-600 transition-colors`}
                                ></i>
                              )}
                            </div>
                          </td>

                          <td className="px-3 py-[4px]">
                            <div className="flex items-center justify-between gap-1 pr-2">
                              <span>{visibleRows[i] ? mobileVal : maskMobile(mobileVal)}</span>
                              {mobileVal !== "-" && (
                                <i
                                  onClick={() => toggleVisibility(i)}
                                  className={`fa ${visibleRows[i] ? "fa-eye" : "fa-eye-slash"} cursor-pointer text-gray-500 hover:text-green-600 transition-colors`}
                                ></i>
                              )}
                            </div>
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-4 text-center text-gray-500 font-medium">
                        No contact data found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-2 text-xs text-gray-500 border-t mt-4">
              {data.length} total
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
