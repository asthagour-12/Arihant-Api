import React, { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import ReKYCModification from "./Rekyc Modification.jsx";
import { toast } from "react-toastify";

export default function PhysicalModification() {
  const [activeSubTab, setActiveSubTab] = useState("Physical Modification");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
  const [error, setError] = useState("");
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
    setError(""); // Reset error

    if (search.trim() === "") {
      const msg = "Please enter client code to search";
      setCustomErrorMsg(msg);
      setShowCustomError(true);
      return;
    }
    
    // API Example:
    // const res = await fetch("/api/physical-modification");
    // const data = await res.json();

    const data = [
      {
        clientCode: "CL001",
        clientName: "Astha Gour",
        pan: "ABCDE1234F",
        requestDate: "24-04-2026",
        branchCode: "BR001",
        requestType: "Address Change",
        status: "Approved",
        remark: "-",
      },
      {
        clientCode: "CL002",
        clientName: "Riya Sharma",
        pan: "PQRSX4567K",
        requestDate: "25-04-2026",
        branchCode: "BR002",
        requestType: "Mobile Update",
        status: "Pending",
        remark: "Under Review",
      },
    ];

    let filtered = data;

    if (search.trim() !== "") {
      filtered = data.filter((item) =>
        item.clientCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filtered.length === 0) {
      const msg = "No data found for the selected criteria";
      setError(msg);
      toast.error(msg);
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

  const Head = ({ title, field }) => (
    <div
      onClick={() => handleSort(field)}
      className="px-4 py-2 border-r border-white/30 flex items-center justify-center gap-2 cursor-pointer text-[13px] font-semibold text-center leading-tight"
    >
      <span>{title}</span>

      <span>
        {sortConfig.key === field ? (
          sortConfig.direction === "asc" ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )
        ) : (
          <svg
            className="w-4 h-4 opacity-80"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10l4-4 4 4M16 14l-4 4-4-4"
            />
          </svg>
        )}
      </span>
    </div>
  );

  return (
    <div className="bg-white px-2">
      {/* SUB TABS */}
      <div className="flex gap-10 text-[15px] border-b border-gray-300 mt-6 pb-2">

        <button
          onClick={() => setActiveSubTab("Physical Modification")}
          className={`pb-2 -mb-[9px] ${
            activeSubTab === "Physical Modification"
              ? "font-semibold border-b-[4px] border-[#33b34a]"
              : "font-normal"
          }`}
        >
          Physical Modification
        </button>

        <button 
          onClick={() => setActiveSubTab("Rekyc Modification")}
          className={`pb-2 ${
            activeSubTab === "Rekyc Modification"
              ? "font-semibold border-b-[4px] border-[#33b34a]"
              : "font-normal"
          }`}
        >
          Rekyc Modification
        </button>

      </div>

      <p className="text-[14px] text-gray-500 my-2 py-2 font-medium uppercase tracking-wider">
        Search results({activeSubTab === "Physical Modification" ? results.length : 2})
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



      {/* Conditional Content Based on Active Sub Tab */}
      {activeSubTab === "Physical Modification" ? (
        <>
          {/* Table */}
          <div className="w-full border-t border-gray-200 mt-6">
            <div className="w-full">
              {/* Header */}
              <div className="grid grid-cols-8 bg-[#34b44a] text-white text-[13px] font-semibold">
                <Head title="Client Code" field="clientCode" />
                <Head title="Client Name" field="clientName" />
                <Head title="PAN" field="pan" />
                <Head title="Date" field="requestDate" />
                <Head title="Branch" field="branchCode" />
                <Head title="Type" field="requestType" />
                <Head title="Status" field="status" />
                <Head title="Remark" field="remark" />
              </div>

            {/* Body */}
            {results.length === 0 ? (
              <>
                <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-b border-gray-200">
                  No data to display
                </div>

                <div className="bg-white px-6 py-2 text-gray-400 border-b border-gray-200 text-[13px]">
                  0 total
                </div>
              </>
            ) : (
              <>
                {results.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 bg-[#f2f2f2] border-b border-gray-200 text-[14px] hover:bg-gray-100 transition-colors"
                  >
                    <div className="px-4 py-2 border-r border-gray-300">{row.clientCode}</div>
                    <div className="px-4 py-2 border-r border-gray-300">{row.clientName}</div>
                    <div className="px-4 py-2 border-r border-gray-300">{row.pan}</div>
                    <div className="px-4 py-2 border-r border-gray-300">{row.requestDate}</div>
                    <div className="px-4 py-2 border-r border-gray-300">{row.branchCode}</div>
                    <div className="px-4 py-2 border-r border-gray-300">{row.requestType}</div>
                    <div className="px-4 py-2 border-r border-gray-300 text-green-600 font-bold">
                      {row.status}
                    </div>
                    <div className="px-4 py-2">{row.remark}</div>
                  </div>
                ))}

                <div className="bg-white px-6 py-2 text-black font-bold border-b border-gray-200 text-[14px]">
                  {results.length} total
                </div>
              </>
            )}
            </div>
          </div>
        </>
      ) : activeSubTab === "Rekyc Modification" ? (
        <ReKYCModification search={search} />
      ) : null}

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