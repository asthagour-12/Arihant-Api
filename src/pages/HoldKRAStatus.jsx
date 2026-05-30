import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";
import { getKRAHold } from "../api/korpApiService";

export default function HoldKRAStatus() {
  const [filter, setFilter] = useState("");
  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [loading, setLoading] = useState(false);
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  useEffect(() => {
    const fetchHoldKRAStatus = async () => {
      setLoading(true);
      try {
        const response = await getKRAHold();
        const apiData = response?.data || {};

        console.log("FULL HOLD KRA RESPONSE:", response);
        console.log("HOLD KRA API DATA:", apiData);

        const items =
          apiData?.result?.userList ||
          apiData?.result?.data ||
          apiData?.data?.userList ||
          response?.data?.data ||
          apiData?.data ||
          apiData?.userList ||
          apiData?.result ||
          [];

        console.log("FINAL HOLD KRA ITEMS:", items);

        const list = Array.isArray(items)
          ? items
          : items
            ? [items]
            : [];
        setAllResults(list);
        setResults(list);
        setCurrentPage(1);
      } catch (error) {
        console.error("Hold KRA API Error:", error);
        setResults([]);
        setAllResults([]);
        setCustomErrorMsg("Failed to load Hold KRA data.");
        setShowCustomError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldKRAStatus();
  }, []);

  const handleSearch = async () => {
    const trimmed = filter.trim().toLowerCase();

    if (!trimmed) {
      setResults(allResults);
      return;
    }

    const filtered = allResults.filter((row) => {
      const code = String(
        row.clientCode ||
        row.clientcode ||
        row.ClientCode ||
        ""
      ).toLowerCase();
      return code.includes(trimmed);
    });

    setResults(filtered);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...results].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setResults(sorted);
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={12} className="text-white ml-1.5" />
      ) : (
        <ChevronDown size={12} className="text-white ml-1.5" />
      );
    }

    return (
      <ChevronsUpDown
        size={12}
        className="text-white/90 ml-1.5"
      />
    );
  };

  const headers = [
    { label: "Client Code", key: "clientCode" },
    { label: "PAN", key: "pan" },
    { label: "Client Name", key: "clientName" },
    { label: "Branch Code", key: "branchCode" },
    { label: "KRA NAME", key: "kraName" },
    { label: "KRA STATUS", key: "kraStatus" },
    { label: "KRAHOLD REJECTEDREASON", key: "reason" },
  ];

  const totalPages = Math.ceil(results.length / rowsPerPage);
  const visibleData = results.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="bg-white px-2">
      <p className="text-[14px] text-gray-500 my-2 py-2 font-medium uppercase tracking-wider">
        Search results({results.length})
      </p>

      <div className="flex gap-8 items-center mb-4">
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by Client Code"
            className="w-[400px] h-[40px] pl-10 pr-5 rounded-full border border-gray-300 bg-white text-[15px] outline-none focus:border-[#34b44a] transition-all duration-200"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Clear Button */}
          {filter && (
            <button
              onClick={() => {
                setFilter("");
                setResults(allResults);
              }}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto no-scrollbar border-t border-gray-200 mt-6">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="min-w-[1100px]">
          {/* Header */}
          <div className="grid grid-cols-7 bg-[#34b44a] text-white text-[13px] font-semibold">
            {headers.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSort(item.key)}
                className="px-2 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none whitespace-nowrap"
              >
                <span>{item.label}</span>
                <SortIcon column={item.key} />
              </div>
            ))}
          </div>

          {/* Body */}
          {loading ? (
            <>
              <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-x border-b border-gray-200">
                Loading Hold KRA data...
              </div>
            </>
          ) : results.length === 0 ? (
            <>
              <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-x border-b border-gray-200">
                No data to display
              </div>

              <div className="bg-white px-6 py-2 text-gray-400 border-x border-b border-gray-200 text-[13px]">
                0 total
              </div>
            </>
          ) : (
            <>
              {visibleData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-7 bg-[#f2f2f2] border-b border-gray-200 text-[14px] hover:bg-gray-100 transition-colors"
                >
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={row.clientCode || row.clientcode || row.ClientCode || "-"}>
                    {row.clientCode || row.clientcode || row.ClientCode || "-"}
                  </div>
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={row.pan || row.Pan || row.PAN || "-"}>
                    {row.pan || row.Pan || row.PAN || "-"}
                  </div>
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={row.clientName || row.clientname || row.ClientName || "-"}>
                    {row.clientName || row.clientname || row.ClientName || "-"}
                  </div>
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={row.branchCode || row.branchcode || row.BranchCode || "-"}>
                    {row.branchCode || row.branchcode || row.BranchCode || "-"}
                  </div>
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={row.kraName || row.kraname || row.KRAName || "-"}>
                    {row.kraName || row.kraname || row.KRAName || "-"}
                  </div>
                  <div className="px-2 py-3 border-r border-gray-300 text-green-600 font-bold truncate" title={row.kraStatus || row.krastatus || row.KRAStatus || "-"}>
                    {row.kraStatus || row.krastatus || row.KRAStatus || "-"}
                  </div>
                  <div className="px-2 py-3 truncate" title={row.reason || row.Reason || row.rejectedReason || "-"}>
                    {row.reason || row.Reason || row.rejectedReason || "-"}
                  </div>
                </div>
              ))}

              <div className="bg-white px-6 py-3 text-black font-bold border-b border-gray-200 text-[14px] flex items-center justify-between">
                <span>Showing {results.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, results.length)} of {results.length} total</span>
                {results.length > rowsPerPage && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                    >
                      <i className="fa fa-chevron-left text-[10px]"></i>
                    </button>
                    <span className="w-7 h-7 flex items-center justify-center bg-[#1EB04C] text-white rounded text-xs font-bold shadow-sm">{currentPage}</span>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                    >
                      <i className="fa fa-chevron-right text-[10px]"></i>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[6000]
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