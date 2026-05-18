import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Eye, EyeOff } from "lucide-react";

export default function NomineePending() {
  const [filterClient, setFilterClient] = useState("");
  const [filterClientName, setFilterClientName] = useState("");
  const [filterMobile, setFilterMobile] = useState("");
  const [results, setResults] = useState([]);
  const [visibleData, setVisibleData] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // Initialize with sample data
  useEffect(() => {
    handleApply();
  }, []);

  // SEARCH / BACKEND READY
  const handleApply = async () => {
    const data = [
      {
        clientCode: "CL001",
        clientName: "Astha Gour",
        mobile: "9876543210",
        email: "astha.gour@email.com",
        nomineeName: "Rahul Sharma",
        nomineeRelation: "Father",
        nomineePan: "XYZAB1234C",
        status: "Pending",
        submissionDate: "24-04-2026",
      },
      {
        clientCode: "CL002",
        clientName: "Riya Sharma",
        mobile: "9876543211",
        email: "riya.sharma@email.com",
        nomineeName: "Priya Singh",
        nomineeRelation: "Mother",
        nomineePan: "ABCDF5678G",
        status: "Approved",
        submissionDate: "25-04-2026",
      },
      {
        clientCode: "CL003",
        clientName: "Amit Kumar",
        mobile: "8765432109",
        email: "amit.kumar@email.com",
        nomineeName: "Sunita Devi",
        nomineeRelation: "Wife",
        nomineePan: "LMNOP9012H",
        status: "Rejected",
        submissionDate: "26-04-2026",
      },
    ];

    let filtered = data;

    // Apply all filters
    if (filterClient.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.clientCode.toLowerCase().includes(filterClient.toLowerCase())
      );
    }

    if (filterClientName.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.clientName.toLowerCase().includes(filterClientName.toLowerCase())
      );
    }

    if (filterMobile.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.mobile.includes(filterMobile)
      );
    }

    setResults(filtered);
  };

  // VISIBILITY TOGGLE
  const toggleVisibility = (field, index) => {
    setVisibleData(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
    <div className="bg-white">
      <p className="text-[18px] text-[#222] mb-2 pt-2">
        Search results({results.length})
      </p>

      {/* Filter Inputs */}
      <div className="flex gap-6 mb-8 mt-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="1. Filter by Client"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="2. Filter by Client Name"
            value={filterClientName}
            onChange={(e) => setFilterClientName(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>

        <div className="flex-1">
          <input
            type="text"
            placeholder="3. Filter by Mobile"
            value={filterMobile}
            onChange={(e) => setFilterMobile(e.target.value)}
            className="w-full h-[45px] rounded-lg border border-gray-300 px-4 text-[15px] outline-none bg-white focus:border-green-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        {/* Header */}
        <div className="grid grid-cols-4 bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
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
            onClick={() => handleSort("mobile")}
            className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Mobile</span>
            <span className="ml-2">
              {sortConfig.key === "mobile" ? (
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
            onClick={() => handleSort("email")}
            className="px-4 py-2 flex items-center justify-between cursor-pointer select-none"
          >
            <span>Email</span>
            <span className="ml-2">
              {sortConfig.key === "email" ? (
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
            <div className="bg-[#f2f2f2] h-[90px] flex items-center px-6 text-[18px] text-gray-500 border-x border-b border-gray-300">
              No data to display
            </div>

            <div className="bg-[#f2f2f2] px-6 py-5 text-gray-500 border-x border-b border-gray-300">
              0 total
            </div>
          </>
        ) : (
          <>
            {results.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-4 bg-[#f2f2f2] border-x border-b border-gray-300 text-[15px] hover:bg-gray-200 transition-colors"
              >
                <div className="px-4 py-2 border-r border-gray-200">{row.clientCode}</div>
                <div className="px-4 py-2 border-r border-gray-200">{row.clientName}</div>
                <div className="px-4 py-2 border-r border-gray-200">
                  {visibleData[index] ? (
                    <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('mobile', index)}>
                      {row.mobile}
                      <EyeOff size={14} className="ml-2 opacity-50" />
                    </span>
                  ) : (
                    <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('mobile', index)}>
                      {row.mobile.substring(0, 2)}xxxxxx{row.mobile.substring(8)}
                      <Eye size={14} className="ml-2 opacity-50" />
                    </span>
                  )}
                </div>
                <div className="px-4 py-2">
                  {visibleData[index] ? (
                    <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('email', index)}>
                      {row.email}
                      <EyeOff size={14} className="ml-2 opacity-50" />
                    </span>
                  ) : (
                    <span className="cursor-pointer hover:text-blue-600 inline-flex items-center" onClick={() => toggleVisibility('email', index)}>
                      {row.email.substring(0, 2)}xxxxxx@{row.email.split('@')[1]}
                      <Eye size={14} className="ml-2 opacity-50" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-[#f2f2f2] px-6 py-2 text-gray-500 border-x border-b border-gray-300">
              {results.length} total
            </div>
          </>
        )}
      </div>
    </div>
  );
}