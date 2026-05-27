import React, { useState, useMemo, useEffect } from "react";
import Header from "./Header";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";
import korpInstance from "../api/korpApiService";

export default function TotalClient() {
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom Error Toast State
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  // Sorting State
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Eye Icon Reveal State
  const [revealState, setRevealState] = useState({}); // stores `${index}-${field}` as true/false

  // Clear error toast after 3 seconds
  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  useEffect(() => {
    fetchTotalClients("");
  }, []);

  const fetchTotalClients = async (query) => {
    try {
      setLoading(true);
      setError(null);
      // Fetch total clients dynamically from UAT API with clientCode search filter
      const res = await korpInstance.get("/dashboard/korpgetclientDetail", {
        params: { pageNumber: 0, size: 500, Type: "TC", clientCode: query || undefined }
      });

      if (res.data && res.data.success && res.data.result) {
        const list = res.data.result.AClist || res.data.result.clientlist || [];
        const normalized = list.map(item => ({
          clientCode: item.clientCode || item.ClientCode || "",
          clientName: item.clientName || item.ClientName || "",
          pan: item.Panno || item.panno || item.clientPan || item.ClientPan || "",
          mobile: item.clientMobile || item.ClientMobile || item.Mobile || item.mobile || "",
          email: item.Email || item.email || item.clientEmail || item.ClientEmail || ""
        }));
        setTableData(normalized);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error("Error fetching total clients:", err);
      setError("Failed to fetch total clients");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!search.trim()) {
      setCustomErrorMsg("Please enter client code");
      setShowCustomError(true);
      return;
    }
    setAppliedSearch(search);
    fetchTotalClients(search);
    toast.success("Filters applied successfully");
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (sortConfig.key === field && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: field, direction });
  };

  const toggleReveal = (index, field) => {
    setRevealState((prev) => ({
      ...prev,
      [`${index}-${field}`]: !prev[`${index}-${field}`],
    }));
  };

  const getMaskedValue = (value, isRevealed, maskType) => {
    if (isRevealed) return value;
    if (maskType === "pan") return "XXXXXXXX";
    if (maskType === "mobile") return "XXXXXXXXXX";
    if (maskType === "email") return "XXXXXXXXXXXX";
    return "XXXXXXXX";
  };

  const filtered = useMemo(() => {
    return tableData.filter(
      (item) =>
        item.clientCode.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        item.clientName.toLowerCase().includes(appliedSearch.toLowerCase())
    );
  }, [tableData, appliedSearch]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortConfig]);

  const headers = [
    { label: "Client Code", field: "clientCode" },
    { label: "Client Name", field: "clientName" },
    { label: "PAN", field: "pan" },
    { label: "MOBILE", field: "mobile" },
    { label: "EMAIL", field: "email" },
  ];

  const SortIcon = ({ field }) => {
    if (sortConfig.key === field) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={11} className="text-white ml-1.5" />
      ) : (
        <ChevronDown size={11} className="text-white ml-1.5" />
      );
    }
    return <ChevronsUpDown size={11} className="text-white/40 group-hover:text-white transition-colors ml-1.5" />;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      <div className="pt-[80px]"></div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10 min-h-[200px]">
              <span className="text-[#34b350] text-sm font-bold animate-pulse">Loading...</span>
            </div>
          )}

          {/* Heading */}
          <h2 className="text-[28px] font-semibold text-[#1f1f1f] mb-6">
            Total Client
          </h2>

          {/* Search Section */}
          <div className="bg-[#f2f2f2] rounded-md p-6 mb-8">
            <div className="flex items-center gap-4 flex-wrap">

              {/* Search Input */}
              <div className="relative w-full max-w-[380px]">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base"></i>
                <input
                  type="text"
                  placeholder="Search client code"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                  className="w-full h-[46px] rounded-full border border-gray-300 bg-white pl-12 pr-4 text-[15px] outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="h-[46px] px-8 rounded-full bg-[#35b34a] hover:bg-[#2da043] text-white text-[16px] font-semibold flex items-center gap-2 shadow-md transition-all cursor-pointer border-none"
              >
                APPLY
                <i className="fa-solid fa-angle-right text-[15px]"></i>
              </button>
            </div>
          </div>

          {/* Search Result count */}
          <p className="text-[20px] font-semibold text-[#2b2b2b] mb-5 tracking-tight">
            Search results({sortedData.length})
          </p>

          {/* Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-none shadow-none mb-4">
            <table className="w-full border-collapse text-left text-[11px] font-medium tracking-tight">
              <thead>
                <tr className="bg-[#37b34a] text-white uppercase">
                  {headers.map((h) => (
                    <th
                      key={h.field}
                      onClick={() => handleSort(h.field)}
                      className="px-3 py-2.5 text-left font-bold select-none cursor-pointer hover:bg-[#2da043] transition-colors border-r border-white/10 last:border-0 group"
                    >
                      <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                        <span>{h.label}</span>
                        <SortIcon field={h.field} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white">
                {!loading && sortedData.map((item, index) => {
                  const isPanRevealed = !!revealState[`${index}-pan`];
                  const isMobileRevealed = !!revealState[`${index}-mobile`];
                  const isEmailRevealed = !!revealState[`${index}-email`];

                  return (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                        }`}
                    >
                      <td className="px-3 py-2 text-gray-700 text-[11px] border-r border-gray-100">{item.clientCode}</td>
                      <td className="px-3 py-2 text-gray-700 text-[11px] border-r border-gray-100">{item.clientName}</td>

                      {/* PAN Cell */}
                      <td className="px-3 py-2 text-gray-700 text-[11px] border-r border-gray-100">
                        <div className="flex items-center justify-between">
                          <span>{getMaskedValue(item.pan, isPanRevealed, "pan")}</span>
                          <button
                            onClick={() => toggleReveal(index, "pan")}
                            className="bg-transparent border-none cursor-pointer p-0.5 text-gray-400 hover:text-[#35b34a] flex items-center justify-center ml-2"
                          >
                            <i className={`fa-regular ${isPanRevealed ? "fa-eye" : "fa-eye-slash"} text-[11px]`}></i>
                          </button>
                        </div>
                      </td>

                      {/* MOBILE Cell */}
                      <td className="px-3 py-2 text-gray-700 text-[11px] border-r border-gray-100">
                        <div className="flex items-center justify-between">
                          <span>{getMaskedValue(item.mobile, isMobileRevealed, "mobile")}</span>
                          <button
                            onClick={() => toggleReveal(index, "mobile")}
                            className="bg-transparent border-none cursor-pointer p-0.5 text-gray-400 hover:text-[#35b34a] flex items-center justify-center ml-2"
                          >
                            <i className={`fa-regular ${isMobileRevealed ? "fa-eye" : "fa-eye-slash"} text-[11px]`}></i>
                          </button>
                        </div>
                      </td>

                      {/* EMAIL Cell */}
                      <td className="px-3 py-2 text-gray-700 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span>{getMaskedValue(item.email, isEmailRevealed, "email")}</span>
                          <button
                            onClick={() => toggleReveal(index, "email")}
                            className="bg-transparent border-none cursor-pointer p-0.5 text-gray-400 hover:text-[#35b34a] flex items-center justify-center ml-2"
                          >
                            <i className={`fa-regular ${isEmailRevealed ? "fa-eye" : "fa-eye-slash"} text-[11px]`}></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!loading && sortedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400 text-[11px] font-medium bg-white">
                      {error ? error : "No data found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <p className="text-[15px] font-semibold text-gray-600 mt-4">
            {sortedData.length} total
          </p>

        </div>
      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[5000]
                transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold -mb-1">Error</h2>
          <p className="text-base font-semibold">{customErrorMsg}</p>
        </div>
        <div className="ml-6 flex items-center">
          <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
          </div>
        </div>
      </div>

    </div>
  );
}
