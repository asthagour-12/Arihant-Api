import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header.jsx";
import HoldKRAStatus from "./HoldKRAStatus.jsx";
import PhysicalModification from "./PhysicalModification.jsx";
import PhysicalAccountOpening from "./PhysicalAccountOpening.jsx";
import NomineePending from "./NomineePanding.jsx";
import RekycTAT from "./RekycTAT.jsx";
import ReactivationTAT from "./Reactivation TAT.jsx";
import ContactDetailsPage from "./ContactDetailsPage.jsx";
import EKYCTAT from "./EKYCTAT.jsx";
import ArihantProducts from "../ArihantProducts.jsx";
import { Eye, ChevronDown, ChevronUp, ChevronsUpDown, Search, ChevronRight } from "lucide-react";

export default function KRAStatusPage() {
  const [activeTab, setActiveTab] = useState("KRA & UCC Status");
  const location = useLocation();

  useEffect(() => {
    // When navigating to /account-opening or /kra-status from the header, reset to default tab
    if (location.pathname === "/account-opening" || location.pathname === "/kra-status") {
      setActiveTab("KRA & UCC Status");
    }
  }, [location.key, location.pathname]);

  const [clientCode, setClientCode] = useState("");
  const [uccStatus, setUccStatus] = useState("");
  const [kraStatus, setKraStatus] = useState("");
  const [uccDetails, setUccDetails] = useState({});
  const [kraDetails, setKraDetails] = useState({});
  const [results, setResults] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const tabs = [
    "KRA & UCC Status",
    "Hold KRA Status",
    "Modification Status",
    "Physical Account Opening",
    "Nominee Pending",
    "Contact Details",
    "Rekyc TAT",
    "Reactivation TAT",
    "EKYC TAT",
  ];

  const handleSearch = () => {
    const newData = {
      id: Date.now(),
      clientcode: clientCode || "undefined",
      name: "",
      pan: "N/A",
      kra: "",
      ucc: [],
    };

    setResults([newData]);
  };

  // SORT FUNCTION (Same as ComplianceCircular)
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...results].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setResults(sortedData);
  };

  return (
    <div className="bg-[#f3f3f3]">
      <Header />

      {/* CONTENT WRAPPER - Like Contests Page */}
      <div className="px-6 py-2 bg-[#f3f3f3] min-h-screen mt-[60px]">

        {/* Main Box */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full px-5 pt-4 pb-10">

          {/* Tabs */}
          <div className="flex flex-wrap gap-8 text-[15px] text-black font-semibold border-b border-gray-300 pb-1 mt-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 transition-all ${activeTab === tab
                    ? "border-b-[3px] border-green-500 font-black text-black"
                    : "hover:text-green-600"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Content Based on Active Tab */}
          {activeTab === "Hold KRA Status" ? (
            (() => {
              console.log("Rendering HoldKRAStatus");
              return <HoldKRAStatus />;
            })()
          ) : activeTab === "Modification Status" ? (
            <PhysicalModification />
          ) : activeTab === "Physical Account Opening" ? (
            <PhysicalAccountOpening />
          ) : activeTab === "Nominee Pending" ? (
            <NomineePending />
          ) : activeTab === "Contact Details" ? (
            <ContactDetailsPage />
          ) : activeTab === "Rekyc TAT" ? (
            <RekycTAT />
          ) : activeTab === "Reactivation TAT" ? (
            <ReactivationTAT />
          ) : activeTab === "EKYC TAT" ? (
            <EKYCTAT />
          ) : (
            /* KRA & UCC Status Content */
            <div className="space-y-8">
              <p className="text-[18px] text-[#222] mb-2 pt-4">
                Search results({results.length})
              </p>

              <div className="flex gap-8 items-center mb-4">
                <input
                  type="text"
                  placeholder="Enter your Client Code"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  className="w-[400px] h-[54px] rounded-xl border border-gray-300 px-5 text-[18px] outline-none bg-transparent"
                />

                <button
                  onClick={handleSearch}
                  className="w-[200px] h-[54px] rounded-full 
                  bg-gradient-to-r from-[#34c759] to-[#28a745]
                  hover:from-[#2eb84f] hover:to-[#23963d]
                  text-white text-[22px] font-semibold
                  shadow-lg hover:shadow-xl
                  transition-all duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                  tracking-wide"
                >
                  Search
                </button>
              </div>

              {/* Table */}
              {results.length > 0 && (
                <div className="w-full">
                  {/* Header */}
                  <div className="grid grid-cols-[120px_200px_250px_220px_1fr] bg-[#35b34a] text-white text-[15px] font-semibold border border-gray-300">

                    {/* Clientcode */}
                    <div
                      onClick={() => handleSort("clientcode")}
                      className="px-3 py-2 border-r flex items-center justify-between cursor-pointer select-none"
                    >
                      <span>Clientcode</span>
                      <span className="ml-2">
                        {sortConfig.key === "clientcode" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={15} className="text-white" />
                          ) : (
                            <ChevronDown size={15} className="text-white" />
                          )
                        ) : (
                          <ChevronsUpDown size={15} className="text-white/90" />
                        )}
                      </span>
                    </div>

                    {/* ClientName */}
                    <div
                      onClick={() => handleSort("name")}
                      className="px-3 py-2 border-r flex items-center justify-between cursor-pointer select-none"
                    >
                      <span>ClientName</span>
                      <span className="ml-2">
                        {sortConfig.key === "name" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={15} className="text-white" />
                          ) : (
                            <ChevronDown size={15} className="text-white" />
                          )
                        ) : (
                          <ChevronsUpDown size={15} className="text-white/90" />
                        )}
                      </span>
                    </div>

                    {/* PAN */}
                    <div
                      onClick={() => handleSort("pan")}
                      className="px-3 py-2 border-r flex items-center justify-between cursor-pointer select-none"
                    >
                      <span>PAN</span>
                      <span className="ml-2">
                        {sortConfig.key === "pan" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={15} className="text-white" />
                          ) : (
                            <ChevronDown size={15} className="text-white" />
                          )
                        ) : (
                          <ChevronsUpDown size={15} className="text-white/90" />
                        )}
                      </span>
                    </div>

                    {/* Kra Response */}
                    <div
                      onClick={() => handleSort("kra")}
                      className="px-3 py-2 border-r flex items-center justify-between cursor-pointer select-none"
                    >
                      <span>Kra Response</span>
                      <span className="ml-2">
                        {sortConfig.key === "kra" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={15} className="text-white" />
                          ) : (
                            <ChevronDown size={15} className="text-white" />
                          )
                        ) : (
                          <ChevronsUpDown size={15} className="text-white/90" />
                        )}
                      </span>
                    </div>

                    {/* Ucc Response */}
                    <div
                      onClick={() => handleSort("ucc")}
                      className="px-3 py-2 flex items-center justify-between cursor-pointer select-none"
                    >
                      <span>Ucc Response</span>
                      <span className="ml-2">
                        {sortConfig.key === "ucc" ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={15} className="text-white" />
                          ) : (
                            <ChevronDown size={15} className="text-white" />
                          )
                        ) : (
                          <ChevronsUpDown size={15} className="text-white/90" />
                        )}
                      </span>
                    </div>

                  </div>

                  {/* Row */}
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[120px_200px_250px_220px_1fr] border-l border-r border-b border-gray-300 bg-white min-h-[86px]"
                    >
                      <div className="px-3 py-3 border-r">{item.clientcode}</div>

                      <div className="px-3 py-3 border-r">{item.name}</div>

                      {/* PAN with eye */}
                      <div className="px-3 py-3 border-r flex items-start gap-2">
                        <span>{item.pan}</span>

                        <button className="mt-[2px] text-gray-500 hover:text-green-600">
                          <Eye size={15} />
                        </button>
                      </div>

                      <div className="px-3 py-3 border-r">{item.kra}</div>

                      {/* UCC Response */}
                      <div className="px-3 py-3">
                        <div className="grid grid-cols-4 text-[14px] font-semibold border-b pb-3">
                          <span>Exchange</span>
                          <span>Segment</span>
                          <span>Status</span>
                          <span>Trade</span>
                        </div>
                        {item.ucc && item.ucc.length > 0 && item.ucc.map((row, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-4 text-[14px] py-3 border-b last:border-0"
                          >
                            <span>{row.exchange}</span>
                            <span>{row.segment}</span>
                            <span>{row.status}</span>
                            <span>{row.trade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Footer */}
                  <p className="text-[16px] text-gray-500 mt-8 ml-6">
                    {results.length} total
                  </p>
                </div>
              )}
            </div>
          )}
          
          <ArihantProducts />
        </div>
      </div>
    </div>
  );
}
