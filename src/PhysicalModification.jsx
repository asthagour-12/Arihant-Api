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

  // SEARCH / BACKEND READY
  const handleApply = async () => {
    setError(""); // Reset error
    
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
      className="px-4 h-[58px] border-r border-white/30 flex items-center justify-between cursor-pointer text-[14px] font-semibold"
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
    <>
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

        <button 
          onClick={() => setActiveSubTab("Reactivation TAT")}
          className={`pb-2 ${
            activeSubTab === "Reactivation TAT"
              ? "font-semibold border-b-[4px] border-[#33b34a]"
              : "font-normal"
          }`}
        >
          Reactivation TAT
        </button>

      </div>

      <p className="text-[18px] text-[#222] mb-2 pt-2">
        Search results({results.length})
      </p>

      <div className="flex items-center gap-8 mb-8">
        <div className="relative w-[430px]">
          <Search
            size={22}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search client code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[54px] rounded-full border border-gray-300 pl-14 pr-4 text-[18px] outline-none bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleApply}
            className="bg-gradient-to-r from-[#35b34a] to-[#2f9f42] hover:from-[#2f9f42] hover:to-[#28a845] text-white font-bold text-[18px] px-8 h-[44px] rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            APPLY
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Conditional Content Based on Active Sub Tab */}
      {activeSubTab === "Physical Modification" ? (
        <>
          {/* Table */}
          <div className="w-full">
            {/* Header */}
            <div className="grid grid-cols-10 bg-[#34b44a] text-white text-[14px] font-semibold border border-gray-300">
              <div
                onClick={() => handleSort("clientCode")}
                className="px-4 py-2 border-r border-white/20 flex items-center justify-between cursor-pointer select-none"
              >
                <span>Client Code</span>
                <span className="ml-2">
                  {sortConfig.key === "clientCode" ? (
                    sortConfig.direction === "asc" ? (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
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
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )
                  ) : (
                    <svg
                      className="w-4 h-4 text-white opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10l4-4 4 4M16 14l-4 4-4-4"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            {/* Body */}
            {results.length === 0 ? (
              <>
                <div className="bg-white h-[90px] flex items-center px-6 text-[18px] text-gray-500 border-b">
                  No data to display
                </div>

                <div className="bg-white px-6 py-5 text-gray-500">
                  0 total
                </div>
              </>
            ) : (
              <>
                {results.map((row, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[180px_220px_220px_180px_180px_220px_180px_1fr] bg-white border-b border-gray-200 text-[15px]"
                  >
                    <div className="px-4 py-4">{row.clientCode}</div>
                    <div className="px-4 py-4">{row.clientName}</div>
                    <div className="px-4 py-4">{row.pan}</div>
                    <div className="px-4 py-4">{row.requestDate}</div>
                    <div className="px-4 py-4">{row.branchCode}</div>
                    <div className="px-4 py-4">{row.requestType}</div>
                    <div className="px-4 py-4 text-green-600">
                      {row.status}
                    </div>
                    <div className="px-4 py-4">{row.remark}</div>
                  </div>
                ))}

                <div className="bg-white px-6 py-5 text-gray-500">
                  {results.length} total
                </div>
              </>
            )}
          </div>
        </>
      ) : activeSubTab === "Rekyc Modification" ? (
        <ReKYCModification />
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-gray-500 text-[18px]">Reactivation TAT content coming soon...</p>
        </div>
      )}
    </>
  );
}