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
    { label: "VOUCHER", key: "voucher" },
    { label: "VOUCHER DATE", key: "voucherDate" },
    { label: "NARRATION", key: "narration" },
    { label: "EXCHANGE", key: "exchange" },
    { label: "BOOK TYPE", key: "bookType" },
    { label: "TRANSACTION DATE", key: "transactionDate" },
    { label: "DEBIT", key: "debit" },
    { label: "CREDIT", key: "credit" },
    { label: "BALANCE", key: "balance" },
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
    <div className="w-full overflow-x-auto border border-gray-200 shadow-sm bg-white mt-4 rounded-lg">
      <div className="min-w-[1400px]">
        {/* Table Header */}
        <div className="grid gap-0 bg-[#1EB04C] text-white text-[11px] font-bold uppercase tracking-wider"
          style={{
            gridTemplateColumns: "repeat(9, 1fr)"
          }}>
          {headers.map((header, index) => (
            <div
              key={index}
              onClick={() => handleSort(header.key)}
              className="px-4 py-4 border-r border-white/10 flex items-center justify-between cursor-pointer select-none hover:bg-[#18a045] transition-colors last:border-0"
            >
              <span className="truncate">{header.label}</span>
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
                  gridTemplateColumns: "repeat(9, 1fr)"
                }}
              >
                <div className="px-4 py-3 border-r border-gray-100 text-gray-600 truncate">{row.voucher || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-gray-600 truncate">{row.voucherDate || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-gray-800 font-medium">{row.narration || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-gray-600 text-center">{row.exchange || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-gray-600 text-center">{row.bookType || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-gray-600 truncate">{row.transactionDate || "-"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-right text-red-600 font-bold">{row.debit || "0.00"}</div>
                <div className="px-4 py-3 border-r border-gray-100 text-right text-green-600 font-bold">{row.credit || "0.00"}</div>
                <div className="px-4 py-3 text-right font-black text-gray-900">{row.balance || "0.00"}</div>
              </div>
            ))}
            <div className="bg-[#fcfcfc] px-4 py-3 text-[11px] text-gray-500 font-bold border-b border-gray-200 tracking-wider">
              {sortedData.length} RECORDS FOUND
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LedgerTable;
