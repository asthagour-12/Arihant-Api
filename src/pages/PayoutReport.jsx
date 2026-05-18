import React, { useState, useMemo } from "react";
import PayoutLayout from "./PayoutLayout";
import { getPayoutReport } from "../api/apiService";
import useFetch from "../hooks/useFetch";
import { ChevronUp, ChevronDown, ChevronsUpDown, XCircle, Search, AlertCircle, FileText, CheckCircle } from "lucide-react";

const PayoutReport = () => {
  const [date, setDate] = useState("");
  const [showError, setShowError] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const staticData = [
    { date: "2026-04-29", clientCode: "C12345", clientName: "John Doe", bankAccount: "XXXX1234", amount: "5,000", status: "Pending" },
    { date: "2026-04-28", clientCode: "C67890", clientName: "Jane Smith", bankAccount: "XXXX5678", amount: "12,000", status: "Processed" },
    { date: "2026-04-27", clientCode: "C11223", clientName: "Alice Walker", bankAccount: "XXXX9988", amount: "8,500", status: "Cancelled" },
  ];

  const { data: apiData, loading, fetchData } = useFetch(getPayoutReport, { datefrom: date, dateto: date }, false);

  const handleSearch = () => {
    if (!date) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    fetchData({ datefrom: date, dateto: date });
  };

  const handleClear = () => {
    setDate("");
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="ml-1 text-white" />
      ) : (
        <ChevronDown size={14} className="ml-1 text-white" />
      );
    }
    return <ChevronsUpDown size={14} className="ml-1 opacity-30" />;
  };

  const tableData = (apiData && apiData.length > 0) ? apiData : staticData;

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return tableData;
    return [...tableData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tableData, sortConfig]);

  const handleDownload = () => {
    if (sortedData.length === 0) return;
    const csv = [
      ["Date", "Client Code", "Client Name", "Bank Account", "Amount", "Status"],
      ...sortedData.map((item) => [
        item.date || "",
        item.clientCode || "",
        `"${item.clientName || ""}"`, // Wrap in quotes to handle commas in names
        item.bankAccount || "",
        (item.amount || "").toString().replace(/,/g, ''),
        item.status || ""
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Payout_Report_${date || "All"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PayoutLayout>
      {/* 🚨 COMPACT ERROR POPUP */}
      {showError && (
        <div className="fixed top-5 right-5 z-[1000] animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-[#e11d48] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10 max-w-[280px]">
            <AlertCircle size={20} />
            <p className="text-[13px] font-bold">Please Select a Date First</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Header & Download */}
        <div className="flex justify-between items-center px-1">
          <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">Search results ({sortedData.length})</div>
          <button
            onClick={handleDownload}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#27ae60] bg-green-50 hover:bg-[#27ae60] hover:text-white transition-all shadow-sm border border-green-100 active:scale-95"
          >
            <i className="fas fa-download text-[16px]"></i>
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="text-gray-400 font-bold text-[11px] uppercase tracking-[0.2em]">Filter by Request Date</div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-[280px]">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-[48px] border border-gray-200 rounded-xl px-4 text-[14px] text-gray-700 bg-white focus:ring-4 focus:ring-[#27ae60]/10 focus:border-[#27ae60] outline-none transition-all shadow-sm"
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto h-[48px]">
              <button
                onClick={handleClear}
                className="flex-1 sm:w-[130px] h-full bg-rose-50 text-rose-600 border border-rose-100 rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
              >
                <XCircle size={15} />
                CLEAR
              </button>
              <button
                onClick={handleSearch}
                className="flex-1 sm:w-[130px] h-full bg-[#27ae60] text-white rounded-xl font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#219150] shadow-lg shadow-[#27ae60]/20 transition-all active:scale-95"
              >
                <Search size={15} />
                SEARCH
              </button>
            </div>
          </div>
        </div>

        {/* Compact Summary Cards */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Total Request", value: sortedData.length, icon: FileText, color: "blue", bg: "bg-blue-50", text: "text-blue-500" },
            { label: "Processed", value: sortedData.filter(d => d.status === "Processed").length, icon: CheckCircle, color: "green", bg: "bg-green-50", text: "text-green-500" },
            { label: "Cancelled", value: sortedData.filter(d => d.status === "Cancelled").length, icon: XCircle, color: "rose", bg: "bg-rose-50", text: "text-rose-500" }
          ].map(card => (
            <div key={card.label} className="bg-white border border-gray-100 rounded-xl py-3 px-5 shadow-sm flex items-center gap-3 min-w-[180px] flex-1 sm:flex-none">
              <div className={`w-9 h-9 rounded-lg ${card.bg} ${card.text} flex items-center justify-center`}>
                <card.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">{card.label}</p>
                <h3 className="text-xl font-black text-gray-900 mt-0.5">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Results Table with Column Dividers */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#27ae60] text-white">
                <tr>
                  {[
                    { label: "Date", key: "date" },
                    { label: "Client Code", key: "clientCode" },
                    { label: "Client Name", key: "clientName" },
                    { label: "Bank Account", key: "bankAccount" },
                    { label: "Amount", key: "amount" },
                    { label: "Status", key: "status" }
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="px-5 py-3 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#219150] transition-colors border-r border-white/20 last:border-0"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center justify-between">
                        {col.label}
                        {renderSortIcon(col.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedData.length > 0 ? (
                  sortedData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-2 text-[13px] text-gray-600 font-medium whitespace-nowrap border-r border-gray-50">{row.date}</td>
                      <td className="px-5 py-2 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">{row.clientCode}</td>
                      <td className="px-5 py-2 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50 uppercase">{row.clientName}</td>
                      <td className="px-5 py-2 text-[13px] text-gray-500 font-mono whitespace-nowrap border-r border-gray-50">{row.bankAccount}</td>
                      <td className="px-5 py-2 text-[14px] text-[#27ae60] font-black whitespace-nowrap border-r border-gray-50">₹{row.amount}</td>
                      <td className="px-5 py-2 whitespace-nowrap">
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${row.status === "Processed" ? "bg-green-50 text-green-600 border-green-100" :
                          row.status === "Cancelled" ? "bg-rose-50 text-rose-600 border-rose-100" :
                            "bg-orange-50 text-orange-600 border-orange-100"
                          }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-10 text-center text-gray-300 font-black tracking-[0.3em]">NO DATA FOUND</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PayoutLayout>
  );
};

export default PayoutReport;