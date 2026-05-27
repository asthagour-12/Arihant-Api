import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Download } from "lucide-react";

const DataTable = ({ headers, rows, showMaskIcon = false, resultsCount, onDownload, onMaskToggle, isMasked, isPlain = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (index) => {
    let direction = 'asc';
    if (sortConfig.key === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: index, direction });
  };

  const sortedRows = React.useMemo(() => {
    if (sortConfig.key === null) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const SortIcon = ({ index }) => {
    if (sortConfig.key === index) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }
    return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
  };

  const colWidth = `${100 / (headers.length || 1)}%`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">


      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed border-collapse">
          <thead className="bg-[#1EB04C] text-white">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="px-6 py-4 text-[13px] font-semibold border-r border-white/10 last:border-0 cursor-pointer select-none hover:bg-[#18a045] transition-colors"
                  style={{ width: colWidth }}
                >
                  <div className="flex items-center justify-start gap-2">
                    <span className="truncate">{h}</span>
                    <SortIcon index={i} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedRows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 border-r border-gray-50 last:border-0 text-[13px] text-gray-700 font-medium overflow-hidden"
                    style={{ width: colWidth }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{cell}</span>
                      {showMaskIcon && cell?.toString().includes('xxx') && (
                        <i
                          onClick={onMaskToggle}
                          className="fas fa-eye-slash text-[10px] text-gray-300 cursor-pointer hover:text-[#1EB04C]"
                        ></i>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {sortedRows.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-400 font-bold text-[14px]">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50/50 text-gray-500 font-bold border-t border-gray-100 text-[12px] tracking-wider">
        {sortedRows.length} TOTAL RECORDS
      </div>
    </div>
  );
};

export default DataTable;
