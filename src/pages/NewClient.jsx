import React, { useState, useMemo, useEffect } from "react";
import Header from "../Header.jsx";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import korpInstance from "../api/korpApiService";

export default function NewClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc", active: false });
  const [clientsList, setClientsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await korpInstance.get("/dashboard/korpgetclientDetail", {
        params: { pageNumber: 0, size: 500, Type: "NC" }
      });
      
      if (res.data && res.data.success && res.data.result) {
        const list = res.data.result.AClist || [];
        const normalized = list.map(item => ({
          code: item.clientCode || item.ClientCode || "",
          name: item.clientName || item.ClientName || "",
          pan: item.clientPan || item.ClientPan || "",
          mobile: item.clientMobile || item.ClientMobile || "",
          email: item.clientEmail || item.ClientEmail || ""
        }));
        setClientsList(normalized);
      } else {
        setClientsList([]);
      }
    } catch (err) {
      console.error("Error fetching new clients:", err);
      setError("Failed to fetch new clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewClients();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      active: true,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredClients = clientsList.filter((client) =>
    (client.code || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.pan || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.mobile || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedClients = useMemo(() => {
    if (!sortConfig.active || !sortConfig.key) return filteredClients;
    
    return [...filteredClients].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [filteredClients, sortConfig]);

  const SortIcon = ({ columnKey }) => {
    if (!sortConfig.active || sortConfig.key !== columnKey) {
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

          <h1 className="text-[20px] font-semibold text-gray-800 mb-5">New Client</h1>

          {/* Search grey box — full width with Apply button */}
          <div className="bg-[#f2f2f2] p-4 rounded-none mb-5 w-full flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"></i>
              <input
                type="text"
                placeholder="Search client code, name, PAN, mobile or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-gray-200 outline-none text-sm placeholder-gray-400 focus:border-[#34b350] transition-colors"
              />
            </div>
            <button
              onClick={fetchNewClients}
              className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 border-none cursor-pointer w-full sm:w-auto justify-center whitespace-nowrap"
            >
              Apply <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>

          {/* Result count */}
          <div className="text-[13px] font-bold text-gray-500 mb-3">
            Search results({sortedClients.length})
          </div>

          {/* Table — full width responsive table box */}
          <div className="overflow-x-auto w-full border border-gray-200 rounded-none shadow-sm relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10 min-h-[150px]">
                <span className="text-[#34b350] text-sm font-bold animate-pulse">Loading...</span>
              </div>
            )}
            <table className="w-full border-collapse text-left text-[11px] font-medium min-w-[700px]">
              <thead className="bg-[#1EB04C] text-white uppercase font-bold">
                <tr>
                  {[
                    { key: "code", label: "Client Code" },
                    { key: "name", label: "Client Name" },
                    { key: "pan", label: "PAN" },
                    { key: "mobile", label: "Mobile" },
                    { key: "email", label: "Email" }
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-3 py-3 group cursor-pointer select-none hover:bg-[#18a045] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                        <span>{col.label}</span>
                        <SortIcon columnKey={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {!loading && sortedClients.map((client, idx) => (
                  <tr
                    key={client.code}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#f0fdf4]"
                    }`}
                  >
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{client.code}</td>
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{client.name}</td>
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{client.pan}</td>
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{client.mobile}</td>
                    <td className="px-3 py-2 text-gray-700 text-[11px]">{client.email}</td>
                  </tr>
                ))}
                {!loading && sortedClients.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-12 text-center text-gray-400 text-[13px] font-medium">
                      {error ? error : "No data to display"}
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
