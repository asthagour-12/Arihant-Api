import React, { useState } from "react";
import PayoutLayout from "./PayoutLayout.jsx";
import { AlertCircle } from "lucide-react";

const BulkPayout = () => {
  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!file) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }
    // Handle submission logic here
    console.log("File submitted:", file);
  };

  return (
    <PayoutLayout>
      {/* 🚨 ERROR POPUP */}
      {showError && (
        <div className="fixed top-5 right-5 z-[1000] animate-in slide-in-from-right-10 fade-in duration-300">
          <div className="bg-[#e11d48] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-4 border border-white/10 max-w-[280px]">
            <AlertCircle size={20} />
            <p className="text-[13px] font-bold">Please Select a File First</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center px-1">
          <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
            Bulk Payout Upload
          </div>
        </div>

        <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-3xl flex flex-col sm:flex-row items-end gap-6 shadow-sm">
          <div className="flex flex-col gap-2 flex-grow max-w-sm w-full">
            <label className="text-[12px] font-bold text-black uppercase tracking-[0.1em] px-1">Upload Bulk Payout File</label>
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center shadow-inner group hover:border-[#27ae60] transition-all">
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setShowError(false);
                }}
                className="text-[13px] text-gray-500 cursor-pointer w-full outline-none file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[11px] file:font-bold file:bg-green-50 file:text-[#27ae60] hover:file:bg-green-100"
              />
            </div>
          </div>
          <button 
            onClick={handleSubmit}
            className="bg-[#27ae60] hover:bg-[#219150] text-white px-8 h-[48px] rounded-lg font-bold text-[13px] transition-all shadow-lg shadow-[#27ae60]/20 flex items-center justify-center gap-2 w-full sm:w-auto active:scale-[0.98]"
          >
            <span>SUBMIT FILE</span>
            <i className="fas fa-upload text-xs opacity-70"></i>
          </button>
        </div>
      </div>
    </PayoutLayout>
  );
};

export default BulkPayout;