import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const MTFSetoffTable = ({ data = [] }) => {
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
          {sortedData.map((row, index) => (
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
          <div className="bg-gray-50 px-4 py-3 text-[13px] text-gray-600 font-medium">
            {sortedData.length} total
          </div>
        </>
      )}
    </div>
  );
};

export default MTFSetoffTable;
