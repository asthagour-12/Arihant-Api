import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const ClientTable = ({ data = [] }) => {
  const [visibleRows, setVisibleRows] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={12} className="text-white" />
      ) : (
        <ChevronDown size={12} className="text-white" />
      );
    }
    return <ChevronsUpDown size={12} className="text-white/40 group-hover:text-white transition-colors" />;
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key] || "";
      const bVal = b[sortConfig.key] || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const visibleData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const toggleVisibility = (index) => {
    setVisibleRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const maskValue = (value, isVisible, type) => {
    if (isVisible) return value;
    if (!value) return "";
    
    const s = value.toString();
    if (type === 'pan') return s.slice(0, 5).replace(/./g, 'X') + s.slice(-4);
    if (type === 'mobile') return s.slice(0, 6).replace(/./g, 'X') + s.slice(-4);
    if (type === 'email') {
        const [user, domain] = s.split('@');
        return user.slice(0, 1) + "XXXX@" + domain;
    }
    return s;
  };

  const headers = [
    { label: "CLIENT NAME", key: "name" },
    { label: "PAN", key: "pan" },
    { label: "MOBILE", key: "mobile" },
    { label: "EMAIL", key: "email" },
    { label: "DEFAULT BANK & AC NO.", key: "bank" },
    { label: "CITY & STATE", key: "city" },
    { label: "MTF AC. OPENING DATE", key: "date" },
    { label: "DP CODE", key: "dp" }
  ];

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-none rounded-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-medium tracking-tight">
          <thead className="bg-[#1EB04C] text-white uppercase">
            <tr>
              {headers.map((h, i) => (
                <th 
                  key={i} 
                  onClick={() => handleSort(h.key)}
                  className="px-3 py-3 border-r border-white/10 last:border-0 group cursor-pointer font-bold select-none hover:bg-[#18a045] transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                    {h.label}
                    <SortIcon column={h.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {visibleData.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                {/* Client Name & Code */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px]">
                  <div className="font-bold text-gray-800 uppercase">{row.name}</div>
                  <div className="text-[10px] text-gray-400 font-normal">{row.code}</div>
                </td>
                
                {/* PAN */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    {maskValue(row.pan, visibleRows[i], 'pan')}
                    <i 
                      className={`fas ${visibleRows[i] ? 'fa-eye' : 'fa-eye-slash'} text-gray-300 cursor-pointer hover:text-[#1EB04C] text-[10px]`}
                      onClick={() => toggleVisibility(i)}
                    ></i>
                  </div>
                </td>

                {/* MOBILE */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    {maskValue(row.mobile, visibleRows[i], 'mobile')}
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">
                  <div className="flex items-center justify-between gap-2">
                    {maskValue(row.email, visibleRows[i], 'email')}
                  </div>
                </td>

                {/* BANK */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">{row.bank}</td>
                
                {/* CITY */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">{row.city}</td>
                
                {/* DATE */}
                <td className="px-3 py-2 border-r border-gray-100 text-[11px] text-gray-700">{row.date}</td>
                
                {/* DP CODE */}
                <td className="px-3 py-2 border-r border-gray-100 last:border-0 text-[11px] text-gray-700">{row.dp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-[#f9f9f9] text-gray-500 font-medium border-t border-gray-200 text-[11px] flex items-center justify-between">
        <div>
          Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} records
        </div>

        {sortedData.length > rowsPerPage && (
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handlePrev} 
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
            >
              <i className="fa fa-chevron-left text-[10px]"></i>
            </button>
            
            <span className="w-7 h-7 flex items-center justify-center bg-[#1EB04C] text-white rounded text-xs font-bold shadow-sm">
              {currentPage}
            </span>

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
    </div>
  );
};

export default ClientTable;
