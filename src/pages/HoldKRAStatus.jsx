import React, { useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

export default function HoldKRAStatus() {
  const [filter, setFilter] = useState("");
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

  const handleSearch = async () => {
    if (filter.trim() === "") {
      setCustomErrorMsg("Please enter client code to search");
      setShowCustomError(true);
      return;
    }

    try {
      // API call example - replace with your actual API endpoint
      const response = await fetch(`/api/hold-kra-status?clientCode=${filter}`);
      const data = await response.json();
      
      // If API is not ready, fallback to mock data
      if (!response.ok || data.length === 0) {
        const mockData = [
          {
            clientCode: filter,
            pan: "ABCDE1234F",
            clientName: "Astha Gour",
            branchCode: "BR001",
            kraName: "CVL KRA",
            kraStatus: "Approved",
            reason: "-",
          },
        ];
        setResults(mockData);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("API Error:", error);
      // Fallback to mock data on error
      const mockData = [
        {
          clientCode: filter,
          pan: "ABCDE1234F",
          clientName: "Astha Gour",
          branchCode: "BR001",
          kraName: "CVL KRA",
          kraStatus: "Approved",
          reason: "-",
        },
      ];
      setResults(mockData);
    }
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
        <ChevronUp size={15} className="text-white ml-2" />
      ) : (
        <ChevronDown size={15} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown
        size={15}
        className="text-white/90 ml-2"
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
              onClick={() => setFilter("")}
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
      <div className="w-full overflow-x-auto border-t border-gray-200 mt-6">
        <div className="min-w-[1200px]">
          {/* Header */}
          <div className="grid grid-cols-[150px_150px_250px_150px_180px_180px_1fr] bg-[#34b44a] text-white text-[13px] font-semibold">
          {headers.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSort(item.key)}
              className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
            >
              <span>{item.label}</span>
              <SortIcon column={item.key} />
            </div>
          ))}
        </div>

        {/* Body */}
        {results.length === 0 ? (
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
            {results.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-[150px_150px_250px_150px_180px_180px_1fr] bg-[#f2f2f2] border-b border-gray-200 text-[14px] hover:bg-gray-100 transition-colors"
              >
                <div className="px-4 py-4 border-r border-gray-300">{row.clientCode}</div>
                <div className="px-4 py-4 border-r border-gray-300">{row.pan}</div>
                <div className="px-4 py-4 border-r border-gray-300">{row.clientName}</div>
                <div className="px-4 py-4 border-r border-gray-300">{row.branchCode}</div>
                <div className="px-4 py-4 border-r border-gray-300">{row.kraName}</div>
                <div className="px-4 py-4 border-r border-gray-300 text-green-600 font-bold">
                  {row.kraStatus}
                </div>
                <div className="px-4 py-4">{row.reason}</div>
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