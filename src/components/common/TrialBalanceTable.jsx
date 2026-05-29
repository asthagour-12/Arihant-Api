import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const TrialBalanceTable = ({ data = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });
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
        <ChevronUp size={13} className="text-white" />
      ) : (
        <ChevronDown size={13} className="text-white" />
      );
    }

    return (
      <ChevronsUpDown size={13} className="text-white/90" />
    );
  };

  const headers = [
    { label: "Name", key: "name", align: "left" },
    { label: "Client Code", key: "code", align: "left" },
    { label: "Branch", key: "branch", align: "left" },
    { label: "Region", key: "region", align: "left" },
    { label: "Zone", key: "zone", align: "left" },
    { label: "Open Debit", key: "openDebit", align: "right" },
    { label: "Open Credit", key: "openCredit", align: "right" },
    { label: "Net Debit", key: "netDebit", align: "right" },
    { label: "Net Credit", key: "netCredit", align: "right" },
  ];

  const getSortedData = () => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const sortedData = getSortedData();

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const visibleData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="w-full overflow-x-auto no-scrollbar border border-gray-200 rounded-lg">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="grid gap-0 bg-[#1EB04C] text-white text-[13px] font-bold" 
           style={{
             gridTemplateColumns: "repeat(9, minmax(120px, 1fr))"
           }}>
        {headers.map((header, index) => (
          <div
            key={index}
            onClick={() => handleSort(header.key)}
            className={`px-3 py-3.5 border-r border-white/20 flex items-center gap-1.5 cursor-pointer select-none hover:bg-[#18a045] transition-colors ${
              header.align === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <span>{header.label}</span>
            <SortIcon column={header.key} />
          </div>
        ))}
      </div>

      {sortedData.length === 0 ? (
        <div className="bg-white px-6 py-8 text-center text-gray-500">
          No data to display
        </div>
      ) : (
        <>
          {visibleData.map((row, index) => (
            <div
              key={index}
              className="grid gap-0 bg-white border-b border-gray-200 text-[13px] hover:bg-gray-50 transition-colors"
              style={{
                gridTemplateColumns: "repeat(9, minmax(120px, 1fr))"
              }}
            >
              <div className="px-4 py-3 border-r border-gray-200">{row.name}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.code}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.branch}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.region}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.zone}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.openDebit}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.openCredit}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right font-medium text-blue-600">{row.netDebit}</div>
              <div className="px-4 py-3 text-right font-medium text-green-600">{row.netCredit}</div>
            </div>
          ))}
          <div className="bg-gray-50 px-4 py-3 text-[13px] text-gray-600 font-medium flex items-center justify-between">
            <div>
              Showing {sortedData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} records
            </div>
            
            {sortedData.length > rowsPerPage && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                >
                  Prev
                </button>
                <span className="px-3 py-1.5 bg-[#1EB04C] text-white rounded font-bold">{currentPage}</span>
                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TrialBalanceTable;
