import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const MTFSetoffTable = ({ data = [] }) => {
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
        <ChevronUp size={15} className="text-white ml-2" />
      ) : (
        <ChevronDown size={15} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown size={15} className="text-white/90 ml-2" />
    );
  };

  const headers = [
    { label: "Date", key: "date" },
    { label: "Client Code", key: "code" },
    { label: "Script", key: "script" },
    { label: "Quantity", key: "quantity" },
    { label: "Price", key: "price" },
    { label: "Amount", key: "amount" },
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
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
      <div className="grid gap-0 bg-[#1EB04C] text-white text-[13px] font-semibold" 
           style={{
             gridTemplateColumns: "repeat(6, minmax(120px, 1fr))"
           }}>
        {headers.map((header, index) => (
          <div
            key={index}
            onClick={() => handleSort(header.key)}
            className="px-4 py-3 border-r border-white/20 flex items-center justify-between cursor-pointer select-none hover:bg-[#18a045] transition-colors"
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
                gridTemplateColumns: "repeat(6, minmax(120px, 1fr))"
              }}
            >
              <div className="px-4 py-3 border-r border-gray-200">{row.date}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.code}</div>
              <div className="px-4 py-3 border-r border-gray-200">{row.script}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.quantity}</div>
              <div className="px-4 py-3 border-r border-gray-200 text-right">{row.price}</div>
              <div className="px-4 py-3 text-right font-medium text-green-600">{row.amount}</div>
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

export default MTFSetoffTable;
