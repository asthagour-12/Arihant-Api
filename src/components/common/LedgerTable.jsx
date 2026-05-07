import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const LedgerTable = ({ data = [] }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

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
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown size={14} className="text-white/70 ml-2" />
    );
  };

  const headers = [
    { label: "Date", key: "date" },
    { label: "Particulars", key: "particulars" },
    { label: "Voucher No", key: "voucherNo" },
    { label: "Debit", key: "debit" },
    { label: "Credit", key: "credit" },
    { label: "Balance", key: "balance" },
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

  return (
    <div className="w-full overflow-x-auto border border-gray-200 shadow-sm bg-white mt-4">
      <div className="min-w-[1000px]">
        {/* Table Header */}
        <div className="grid gap-0 bg-[#1EB04C] text-white text-[12px] font-bold uppercase tracking-wider" 
             style={{
               gridTemplateColumns: "repeat(6, 1fr)"
             }}>
          {headers.map((header, index) => (
            <div
              key={index}
              onClick={() => handleSort(header.key)}
              className="px-4 py-3 border-r border-white/10 flex items-center justify-between cursor-pointer select-none hover:bg-[#18a045] transition-colors last:border-0"
            >
              <span>{header.label}</span>
              <SortIcon column={header.key} />
            </div>
          ))}
        </div>

        {/* Table Body */}
        {sortedData.length === 0 ? (
          <div className="px-6 py-16 text-center text-gray-400 text-[13px] font-medium border-b border-gray-200">
            No data to display
          </div>
        ) : (
          <>
            {sortedData.map((row, index) => (
              <div
                key={index}
                className="grid gap-0 border-b border-gray-100 text-[12px] hover:bg-gray-50 transition-colors group"
                style={{
                  gridTemplateColumns: "repeat(6, 1fr)"
                }}
              >
                <div className="px-4 py-2.5 border-r border-gray-100 text-gray-600">{row.date}</div>
                <div className="px-4 py-2.5 border-r border-gray-100 text-gray-800 font-medium">{row.particulars}</div>
                <div className="px-4 py-2.5 border-r border-gray-100 text-gray-600">{row.voucherNo}</div>
                <div className="px-4 py-2.5 border-r border-gray-100 text-right text-red-600 font-medium">{row.debit}</div>
                <div className="px-4 py-2.5 border-r border-gray-100 text-right text-green-600 font-medium">{row.credit}</div>
                <div className="px-4 py-2.5 text-right font-bold text-gray-900">{row.balance}</div>
              </div>
            ))}
            <div className="bg-[#fcfcfc] px-4 py-2.5 text-[11px] text-gray-500 font-semibold border-b border-gray-200">
              {sortedData.length} RECORDS FOUND
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LedgerTable;
