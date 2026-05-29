import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const Table = ({ headers, rows }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  const handleSort = (index) => {
    let direction = 'asc';
    if (sortConfig.key === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: index, direction });
  };

  const sortedRows = useMemo(() => {
    if (sortConfig.key === null) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const visibleRows = sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const SortIcon = ({ index }) => {
    if (sortConfig.key === index) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUp size={12} className="text-white" />
      ) : (
        <ChevronDown size={12} className="text-white" />
      );
    }
    return <ChevronsUpDown size={12} className="text-white/40 group-hover:text-white transition-colors" />;
  };

  const formatCell = (content, header) => {
    if (content === null || content === undefined) return "";
    if (React.isValidElement(content)) return content;
    const h = header.toLowerCase();
    const s = content.toString();

    if (h.includes('name') || h === 'client') return s.toUpperCase();
    if (h.includes('status')) {
      if (h.includes('trade')) return s.toUpperCase();
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    return s;
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden shadow-none rounded-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px] font-medium tracking-tight">
          <thead className="bg-[#1EB04C] text-white uppercase">
            <tr>
              {headers.map((h, i) => (
                <th 
                  key={i} 
                  onClick={() => handleSort(i)}
                  className="px-3 py-3 border-r border-white/10 last:border-0 group cursor-pointer font-bold select-none hover:bg-[#18a045] transition-colors"
                >
                  <div className="flex items-center justify-between gap-1.5 whitespace-nowrap">
                    {h}
                    <SortIcon index={i} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {visibleRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 border-r border-gray-100 last:border-0 text-gray-700 text-[11px]">
                    {formatCell(cell, headers[cellIndex])}
                  </td>
                ))}
              </tr>
            ))}
            {sortedRows.length === 0 && (
              <tr className="bg-white">
                <td colSpan={headers.length} className="px-3 py-12 text-center text-gray-400 text-[13px] font-medium">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-[#f9f9f9] text-gray-500 font-medium border-t border-gray-200 text-[11px] flex items-center justify-between">
        <div>
          Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedRows.length)} of {sortedRows.length} records
        </div>

        {sortedRows.length > rowsPerPage && (
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
    </div>
  );
};

export default Table;
