import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";

export default function PhysicalAccountOpening() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  // SEARCH / BACKEND READY
  const handleApply = async () => {
    if (search.trim() === "") {
      setCustomErrorMsg("Please enter client code to search");
      setShowCustomError(true);
      return;
    }
    const data = [
      {
        clientCode: "CL001",
        clientName: "Astha Gour",
        pan: "ABCDE1234F",
        date: "24-04-2026",
        searchCode: "SC001",
        requestType: "Account Opening",
        status: "Pending",
        remark: "-",
        remark2: "-",
        remark3: "-",
      },
      {
        clientCode: "CL002",
        clientName: "Riya Sharma",
        pan: "PQRSX4567K",
        date: "25-04-2026",
        searchCode: "SC002",
        requestType: "Account Opening",
        status: "Approved",
        remark: "Completed",
        remark2: "-",
        remark3: "-",
      },
    ];

    let filtered = data;

    if (search.trim() !== "") {
      filtered = data.filter((item) =>
        item.clientCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    setResults(filtered);
  };

  // SORT
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

  return (
    <div className="bg-white px-2">
      <p className="text-[14px] text-gray-500 my-2 py-2 font-medium uppercase tracking-wider">
        Search results({results.length})
      </p>

      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-[380px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search client code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[40px] rounded-full border border-gray-300 pl-12 pr-4 text-[15px] outline-none bg-white focus:border-[#34b44a] transition-all"
          />
        </div>
        <button 
          onClick={handleApply}
          className="bg-[#34b44a] text-white font-bold text-[14px] px-8 h-[40px] rounded-full flex items-center gap-2 shadow-md hover:bg-[#2e9d41] transition-all active:scale-95"
        >
          APPLY
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Table */}
      <div className="w-full border-t border-gray-200 mt-6">
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-10 bg-[#34b44a] text-white text-[12px] font-semibold">
          <div
            onClick={() => handleSort("clientCode")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Code</span>
            <span className="ml-2">
              {sortConfig.key === "clientCode" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>
          
          <div
            onClick={() => handleSort("clientName")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Client Name</span>
            <span className="ml-2">
              {sortConfig.key === "clientName" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("pan")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>PAN</span>
            <span className="ml-2">
              {sortConfig.key === "pan" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("date")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Date</span>
            <span className="ml-2">
              {sortConfig.key === "date" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("searchCode")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>SearchCode</span>
            <span className="ml-2">
              {sortConfig.key === "searchCode" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("requestType")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Request Type</span>
            <span className="ml-2">
              {sortConfig.key === "requestType" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("status")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Status</span>
            <span className="ml-2">
              {sortConfig.key === "status" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark</span>
            <span className="ml-2">
              {sortConfig.key === "remark" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark2")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark2</span>
            <span className="ml-2">
              {sortConfig.key === "remark2" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>

          <div
            onClick={() => handleSort("remark3")}
            className="px-4 py-2 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Remark3</span>
            <span className="ml-2">
              {sortConfig.key === "remark3" ? (
                sortConfig.direction === "asc" ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )
              ) : (
                <svg className="w-4 h-4 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10l4-4 4 4M16 14l-4 4-4-4" />
                </svg>
              )}
            </span>
          </div>
        </div>

        {/* Body */}
        {results.length === 0 ? (
          <>
            <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-b border-gray-200">
              No data to display
            </div>

            <div className="bg-white px-6 py-2 text-black font-bold border-b border-gray-200 text-[14px]">
              0 total
            </div>
          </>
        ) : (
          <>
            {results.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-10 bg-[#f2f2f2] border-b border-gray-200 text-[12px] hover:bg-gray-100 transition-colors"
              >
                <div className="px-3 py-2 border-r border-gray-300 break-all">{row.clientCode}</div>
                <div className="px-3 py-2 border-r border-gray-300 truncate">{row.clientName}</div>
                <div className="px-3 py-2 border-r border-gray-300">{row.pan}</div>
                <div className="px-3 py-2 border-r border-gray-300">{row.date}</div>
                <div className="px-3 py-2 border-r border-gray-300">{row.searchCode}</div>
                <div className="px-3 py-2 border-r border-gray-300">{row.requestType}</div>
                <div className="px-3 py-2 border-r border-gray-300 text-green-600 font-bold truncate">{row.status}</div>
                <div className="px-3 py-2 border-r border-gray-300 truncate">{row.remark}</div>
                <div className="px-3 py-2 border-r border-gray-300 truncate">{row.remark2}</div>
                <div className="px-3 py-2 truncate">{row.remark3}</div>
              </div>
            ))}

            <div className="bg-white px-6 py-2 text-black font-bold border-b border-gray-200 text-[14px]">
              {results.length} total
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
