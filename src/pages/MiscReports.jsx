import React, { useState } from "react";
import Header from "../Header.jsx";
import useFetch from "../hooks/useFetch";
import { 
  getMobileLoginReport, 
  getBranchPerformance, 
  getSamparkReport, 
  getMTFBalance, 
  getDPSlip 
} from "../api/apiService";
import { Search, Download, ChevronRight } from "lucide-react";

const REPORT_CONFIG = {
  "mobile-login": {
    title: "Mobile Login Report",
    api: getMobileLoginReport,
    headers: ["Client Code", "Client Name", "Last Login", "Device", "OS Version"]
  },
  "branch-performance": {
    title: "Branch Performance",
    api: getBranchPerformance,
    headers: ["Branch Code", "Branch Name", "Total Revenue", "Active Clients", "New Clients"]
  },
  "sampark": {
    title: "Sampark Report",
    api: getSamparkReport,
    headers: ["Client Code", "Client Name", "Contact Date", "Outcome", "Next Followup"]
  },
  "mtf-balance": {
    title: "MTF Balance",
    api: getMTFBalance,
    headers: ["Client Code", "Client Name", "MTF Ledger Balance", "Collateral Value", "Required Margin"]
  },
  "dp-slip": {
    title: "DP Slip Report",
    api: getDPSlip,
    headers: ["Slip No", "Client Code", "Client Name", "Date", "Status"]
  }
};

export default function MiscReports({ type = "mobile-login" }) {
  const config = REPORT_CONFIG[type] || REPORT_CONFIG["mobile-login"];
  const [searchValue, setSearchValue] = useState("");
  const [searchParams, setSearchParams] = useState({});

  const { data: resData, loading, error } = useFetch(config.api, searchParams, false);
  const data = resData?.data || [];

  const handleApply = () => {
    setSearchParams(searchValue.trim() ? { search: searchValue.trim() } : {});
  };

  return (
    <div className="download-container">
      <Header />
      
      <div className="p-6 bg-[#f4f6f9] min-h-screen mt-16">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 w-full px-5 pt-6 pb-10">
          <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-8 bg-green-500 mr-3 rounded-full"></span>
            {config.title}
          </h1>

          <div className="flex gap-6 items-end mb-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium mb-2 text-gray-600">Search</p>
              <div className="flex items-center bg-white border rounded-full px-4 h-11 w-full max-w-md shadow-sm">
                <Search className="text-gray-400 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Client Code or Search Term"
                  className="outline-none text-sm w-full bg-transparent"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <button 
              className="bg-[#28a745] hover:bg-[#23923d] text-white font-semibold px-8 h-11 rounded-full flex items-center gap-2 transition-all transform active:scale-95"
              onClick={handleApply}
            >
              APPLY
              <ChevronRight size={18} />
            </button>
            
            <button className="flex items-center justify-center w-11 h-11 border rounded-full text-green-600 hover:bg-green-50 transition-colors">
              <Download size={20} />
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#35b34a] text-white text-sm">
                <tr>
                  {config.headers.map((h, i) => (
                    <th key={i} className="p-4 border-b border-white/10 font-semibold uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm bg-white divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={config.headers.length} className="p-10 text-center text-gray-400 italic">
                      Fetching live data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={config.headers.length} className="p-10 text-center text-red-500 font-medium">
                      {error}
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={config.headers.length} className="p-10 text-center text-gray-400">
                      No records found. Try adjusting your search.
                    </td>
                  </tr>
                ) : (
                  data.map((item, idx) => (
                    <tr key={idx} className="hover:bg-green-50/30 transition-colors">
                      {Object.values(item).slice(0, config.headers.length).map((val, i) => (
                        <td key={i} className="p-4 border-b border-gray-50 text-gray-700">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 px-2 flex justify-between items-center text-gray-500 text-xs">
            <span>Showing {data.length} results</span>
            <span>Arihant Capital Connect &copy; 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
