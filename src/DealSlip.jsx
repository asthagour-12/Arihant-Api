import React, { useState } from "react";
import Header from "./Header.jsx";
import '@fortawesome/fontawesome-free/css/all.css';



function DealSlip() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);


  return (
    <div className="bg-gray-100 p-5 md:p-8">
      <Header />

      {/* WHITE CARD */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-5 mt-12">

        {/* INNER GRAY BOX */}
        <div className="bg-gray-200 rounded-md px-5 py-4 flex flex-wrap items-end gap-0">

          {/* CLIENT CODE */}
          <div className="flex flex-col flex-1 min-w-[180px] mr-3">
            <label className="text-sm mb-1 text-gray-600 font-medium">
              Enter Client Code
            </label>
            <input
              type="text"
              placeholder="Enter Client Code"
              className="h-10 rounded-full border px-4 bg-gray-100 outline-none focus:border-green-500"
            />
          </div>

          {/* FROM DATE */}
          <div className="flex-1 flex-col flex-1 min-w-[180px]">
            <label className="text-sm mb-1 text-gray-600 font-medium">
              From Date
            </label>

            <div className="relative w-72">
              <input
                type="date"
                className="w-full h-10 rounded-md border-2 px-3 pr-10 shadow-sm focus:border-green-500 outline-none"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
          </div>

          {/* TO DATE */}
          <div className="flex-1 flex-col flex-1 min-w-[180px]">
            <label className="text-sm mb-1 text-gray-600 font-medium">
              To Date
            </label>

            <div className="relative w-72">
              <input
                type="date"
                className="w-full h-10 rounded-md border-2 px-3 pr-10 shadow-sm focus:border-green-500 outline-none"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex items-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold whitespace-nowrap">
              DOWNLOAD SLIP <span className="ml-1">›</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DealSlip;
// export default DealSlip;