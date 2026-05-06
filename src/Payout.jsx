import React, { useState } from "react";
import PayoutLayout from "./PayoutLayout.jsx";

export default function Payout() {
  const [clientCode, setClientCode] = useState("");
  const [results, setResults] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSearch = () => {
    if (!clientCode.trim()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setResults(null);
      return;
    }

    setResults([
      { date: "2026-04-29", code: clientCode, name: "Sample Client", bank: "HDFC Bank", amount: "50,000", status: "Processed" }
    ]);
  };

  const handleDownload = () => {
    const dataToDownload = results || [
      { date: "2026-04-29", code: clientCode || "N/A", name: "Sample Client", bank: "HDFC Bank", amount: "50,000", status: "Processed" }
    ];
    
    const headers = ["Date", "Client Code", "Client Name", "Bank", "Amount", "Status"];
    const csvContent = [
      headers.join(","),
      ...dataToDownload.map(item => [
        item.date,
        item.code,
        item.name,
        item.bank,
        item.amount.replace(/,/g, ''),
        item.status
      ].join(","))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Payout_Report_${clientCode || "All"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PayoutLayout>
      {/* 🚨 CUSTOM ERROR POPUP */}
      {showError && (
        <div className="fixed top-5 right-5 z-[1000] animate-in slide-in-from-top-10 fade-in duration-300">
          <div className="bg-[#e11d48] text-white p-6 rounded-2xl shadow-2xl flex items-center gap-10 min-w-[320px] relative overflow-hidden">
            <div className="space-y-1">
              <h4 className="text-[18px] font-bold tracking-tight">Error</h4>
              <p className="text-[14px] font-medium opacity-95">Please Enter Client Code or Script Name</p>
            </div>
            <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center relative bg-white/10">
              <div className="w-6 h-[2px] bg-white rotate-45 absolute"></div>
              <div className="w-6 h-[2px] bg-white -rotate-45 absolute"></div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {/* Header & Download */}
        <div className="flex justify-between items-center px-1">
          <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
            {results ? `Search results (${results.length})` : "Enter client code to search"}
          </div>
          <button
            onClick={handleDownload}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#27ae60] bg-green-50 hover:bg-[#27ae60] hover:text-white transition-all shadow-sm border border-green-100 active:scale-95"
          >
            <i className="fas fa-download text-[16px]"></i>
          </button>
        </div>

        <div className="bg-gray-50/50 py-2 px-10 rounded-3xl border border-gray-100 shadow-sm ">
          <div className="text-black font-bold text-[12px] uppercase tracking-[0.1em] mb-2">Search Filter</div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-full sm:w-[320px]">
              <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]"></i>
              <input
                type="text"
                placeholder="Enter client code..."
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                className="w-full h-[56px] border border-gray-200 rounded-xl pl-12 pr-6 text-[15px] text-gray-700 bg-white outline-none focus:ring-4 focus:ring-[#27ae60]/10 focus:border-[#27ae60] transition-all shadow-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#27ae60] hover:bg-[#219150] text-white px-10 h-[56px] rounded-xl font-bold text-[15px] transition-all shadow-lg shadow-[#27ae60]/20 flex items-center justify-center gap-3 active:scale-[0.98] w-full sm:w-auto"
            >
              <span>SEARCH</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#27ae60] text-white">
                  <tr>
                    {["Date", "Client Code", "Client Name", "Bank", "Amount", "Status"].map((h) => (
                      <th key={h} className="px-8 py-3 text-[13px] font-bold tracking-wider uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50/80 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-8 py-3 text-[14px] text-gray-600 font-medium whitespace-nowrap">{row.date}</td>
                      <td className="px-8 py-3 text-[14px] text-gray-900 font-bold whitespace-nowrap">{row.code}</td>
                      <td className="px-8 py-3 text-[14px] text-gray-700 font-medium whitespace-nowrap">{row.name}</td>
                      <td className="px-8 py-3 text-[14px] text-gray-600 whitespace-nowrap">{row.bank}</td>
                      <td className="px-8 py-3 text-[15px] text-gray-900 font-black whitespace-nowrap">₹{row.amount}</td>
                      <td className="px-8 py-3">
                        <span className="bg-green-50 text-[#27ae60] border border-[#27ae60]/20 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm whitespace-nowrap">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-4 bg-gray-50/50 text-gray-400 font-bold border-t border-gray-100 text-[11px] uppercase tracking-widest">{results.length} record found</div>
          </div>
        )}
      </div>
    </PayoutLayout>
  );
}
