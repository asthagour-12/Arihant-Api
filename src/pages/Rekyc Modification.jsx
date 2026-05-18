import React, { useState } from "react";
import {
  Search,
  EyeOff,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ReKYCModification({ search = "" }) {
  const [visiblePans, setVisiblePans] = useState({});

  const tableData = [
    {
      clientCode: "286400026",
      pan: "ABCDE1234F",
      maskedPan: "XXXXXXXXX",
      clientName: "VIVEK SHAH",
      requestType: "Segment",
      requestDate: "17/Feb/2026",
      requestStatus: "Updated",
      adminUpdatedDate: "",
    },
    {
      clientCode: "286400023",
      pan: "PQRSX4567K",
      maskedPan: "XXXXXXXXX",
      clientName: "DHRUVIK BHAVESHKUMAR SHAH",
      requestType: "Segment",
      requestDate: "25/Nov/2025",
      requestStatus: "Updated",
      adminUpdatedDate: "",
    },
  ];

  const filteredData = tableData.filter((item) =>
    item.clientCode.toLowerCase().includes(search.toLowerCase())
  );

  // PAN VISIBILITY TOGGLE
  const togglePanVisibility = (clientCode) => {
    setVisiblePans(prev => ({
      ...prev,
      [clientCode]: !prev[clientCode]
    }));
  };

  return (
    <div className="bg-white px-2">
      {/* Table */}
      <div className="w-full border-t border-gray-200 mt-6">
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-7 bg-[#35b34a] text-white text-[12px] font-semibold">
            {[
              "Clientcode",
              "PAN",
              "Client Name",
              "Request Type",
              "Request Date",
              "Request Status",
              "Admin Updated Date",
            ].map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 border-r border-white/30 flex items-center justify-center gap-1 cursor-pointer"
              >
                {item}
                <div className="flex flex-col leading-none opacity-60">
                  <ChevronUp size={10} />
                  <ChevronDown size={10} className="-mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {filteredData.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-7 text-[13px] bg-[#f2f2f2] border-b border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="px-4 py-2 border-r border-gray-300">{row.clientCode}</div>

              <div className="px-4 py-2 border-r border-gray-300 flex items-center justify-center gap-2 font-semibold">
                {visiblePans[row.clientCode] ? row.pan : row.maskedPan}
                <EyeOff 
                  size={12} 
                  className="cursor-pointer text-gray-400 hover:text-[#34b44a]" 
                  onClick={() => togglePanVisibility(row.clientCode)}
                />
              </div>

              <div className="px-4 py-2 border-r border-gray-300 truncate">{row.clientName}</div>

              <div className="px-4 py-2 border-r border-gray-300 text-center">
                <div className="font-semibold">{row.requestType}</div>
                <span className="inline-flex items-center gap-1 bg-[#35b34a] text-white text-[10px] px-2 py-[1px] rounded-md mt-1">
                  <Check size={10} />
                  Accepted
                </span>
              </div>

              <div className="px-4 py-2 border-r border-gray-300 text-center">{row.requestDate}</div>

              <div className="px-4 py-2 border-r border-gray-300 text-center">
                <span className="bg-[#35b34a] text-white px-3 py-[2px] rounded-md text-[11px] font-bold">
                  {row.requestStatus}
                </span>
              </div>

              <div className="px-4 py-2 text-center">{row.adminUpdatedDate || "-"}</div>
            </div>
          ))}

          <div className="bg-white px-6 py-2 text-black font-bold border-b border-gray-200 text-[14px]">
            {filteredData.length} total
          </div>
        </div>
      </div>
    </div>
  );
}