import React, { useState, useMemo, useEffect } from "react";
import Header from "./Header";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import korpInstance from "../api/korpApiService";

export default function ClientCodeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ direction: "asc", active: false });
  const [clientCodesList, setClientCodesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using the same API that provides Total App Login count
        const res = await korpInstance.get("/reports/getMobileAppLogin");
        if (res.data && res.data.success && Array.isArray(res.data.result)) {
          // Extract ClientCode from the array of objects
          const codes = res.data.result.map(item => item.ClientCode || item.clientCode);
          setClientCodesList(codes);
        } else {
          setClientCodesList([]);
        }
      } catch (err) {
        console.error("Error fetching App Login client codes:", err);
        setError("Failed to fetch client list");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSort = () => {
    setSortConfig((prev) => ({
      active: true,
      direction: prev.active && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredClients = clientCodesList.filter((code) =>
    code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = useMemo(() => {
    if (!sortConfig.active) return filteredClients;
    return [...filteredClients].sort((a, b) =>
      sortConfig.direction === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [filteredClients, sortConfig]);

  const SortIcon = () => {
    if (!sortConfig.active) {
      return <ChevronsUpDown size={12} className="text-white/40 group-hover:text-white transition-colors" />;
    }
    return sortConfig.direction === "asc"
      ? <ChevronUp size={12} className="text-white" />
      : <ChevronDown size={12} className="text-white" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="pt-[80px]"></div>

      <div className="flex-1 p-6 md:p-10 w-full">
        {/* Full-width white card */}
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 rounded-none border border-gray-100 w-full">

          <h1 className="text-[20px] font-semibold text-gray-800 mb-5">Total App Login Clients</h1>

          {/* Search grey box — full width */}
          <div className="bg-[#f2f2f2] p-4 rounded-none mb-5 w-full">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"></i>
              <input
                type="text"
                placeholder="Search client code"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-gray-200 outline-none text-sm placeholder-gray-400 focus:border-[#34b350] transition-colors"
              />
            </div>
          </div>

          {/* Result count */}
          <div className="text-[13px] font-bold text-gray-500 mb-3">
            Search results({sortedClients.length})
          </div>

          {/* Table — compact square box */}
          <div className="overflow-y-auto w-[280px] border border-gray-200 rounded-none shadow-sm relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                <span className="text-[#34b350] text-sm font-bold animate-pulse">Loading...</span>
              </div>
            )}
            <table className="w-full border-collapse text-left text-[11px] font-medium">
              <thead className="bg-[#1EB04C] text-white uppercase">
                <tr>
                  <th
                    onClick={handleSort}
                    className="px-3 py-3 group cursor-pointer font-bold select-none hover:bg-[#18a045] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                      <span>Client Code</span>
                      <SortIcon />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {!loading && sortedClients.map((code, idx) => (
                  <tr
                    key={code}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#f0fdf4]"
                      }`}
                  >
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{code}</td>
                  </tr>
                ))}
                {!loading && sortedClients.length === 0 && (
                  <tr>
                    <td className="px-3 py-12 text-center text-gray-400 text-[13px] font-medium">
                      {error ? error : "No results found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer inside box */}
            <div className="px-3 py-2 bg-[#f9f9f9] text-gray-500 font-medium border-t border-gray-200 text-[11px]">
              {sortedClients.length} total
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
