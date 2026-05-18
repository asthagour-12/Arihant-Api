import React, { useState, useEffect, useRef } from "react";
import Header from "../Header.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarHeader from "../components/common/CalendarHeader";

export default function ComplianceCircular() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const fromRef = useRef();
  const toRef = useRef();
  const [showError, setShowError] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // FETCH DATA (Backend Ready)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 👉 replace with your API
      const res = await fetch("http://localhost:5000/api/circulars");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 FILTER APPLY
  const handleApply = () => {
    if (!fromDate || !toDate) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500);
      return;
    }

    let filtered = [...data];

    if (type) {
      filtered = filtered.filter((item) => item.type === type);
    }

    if (fromDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) >= new Date(fromDate)
      );
    }

    if (toDate) {
      filtered = filtered.filter(
        (item) => new Date(item.date) <= new Date(toDate)
      );
    }

    setData(filtered);
  };

  // 🚀 SORT FUNCTION
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="p-6 pt-6">

        {/* FILTER SECTION */}
        <div className="bg-gray-200 p-5 rounded-lg flex flex-wrap gap-6 items-end pt-3 pb-4 ">

          {/* FROM DATE */}
          <div className="mt-0">
            <p className="text-sm mb-1">From Date</p>
            <div className="relative group">
              <DatePicker
                selected={fromDate}
                onChange={(d) => setFromDate(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                maxDate={new Date()}
                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                className="px-4 py-2 rounded border w-52 bg-white outline-none focus:border-[#34b350] transition-all"
                ref={fromRef}
                onFocus={(e) => e.target.blur()}
              />
              <i
                className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                onClick={() => fromRef.current.setOpen(true)}
              />
            </div>
          </div>

          {/* TO DATE */}
          <div className="mt-0">
            <p className="text-sm mb-1">To Date</p>
            <div className="relative group">
              <DatePicker
                selected={toDate}
                onChange={(d) => setToDate(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                maxDate={new Date()}
                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                className="px-4 py-2 rounded border w-52 bg-white outline-none focus:border-[#34b350] transition-all"
                ref={toRef}
                onFocus={(e) => e.target.blur()}
              />
              <i
                className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                onClick={() => toRef.current.setOpen(true)}
              />
            </div>
          </div>

          {/* DROPDOWN */}
          <div className="mt-0">
            <p className="text-sm mb-1">Search By Circular Type</p>
            <div className="relative w-56">
              <select
                className="px-4 py-2 rounded bg-gray-700 text-white w-56 appearance-none pr-10"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
                <option value="Others">Others</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* APPLY BUTTON (ENHANCED) */}
          <button
            onClick={handleApply}
            className="bg-gradient-to-r from-green-500 to-green-700 
            hover:from-green-600 hover:to-green-800 
            text-white px-8 py-3 rounded-full font-semibold 
            shadow-md hover:shadow-xl 
            transition-all duration-300 active:scale-95"
          >
            APPLY →
          </button>
        </div>

        {/* � TABLE */}
        <div className="mt-6 border rounded-md overflow-hidden bg-white">

          {/* HEADER */}
          <div className="grid grid-cols-3 bg-green-600 text-white text-sm font-semibold">

            {/* TYPE */}
            <div
              onClick={() => handleSort("type")}
              className="p-3 border-r flex items-center justify-between cursor-pointer"
            >
              Compliance Type
              <i
                className={`fa ${
                  sortConfig.key === "type"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

            {/* FILE */}
            <div
              onClick={() => handleSort("file")}
              className="p-3 border-r flex items-center justify-between cursor-pointer"
            >
              File
              <i
                className={`fa ${
                  sortConfig.key === "file"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

            {/* DATE */}
            <div
              onClick={() => handleSort("date")}
              className="p-3 flex items-center justify-between cursor-pointer"
            >
              Date
              <i
                className={`fa ${
                  sortConfig.key === "date"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

          </div>

          {/* BODY WITH SCROLL */}
          <div className="max-h-[350px] overflow-y-auto">

            {data.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 text-sm border-t"
              >
                <div className="p-3 border-r">{item.type}</div>

                <div className="p-3 border-r text-blue-600 cursor-pointer hover:underline">
                  {item.file}
                </div>

                <div className="p-3">{item.date}</div>
              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="p-3 text-xs text-gray-500">
            {data.length} total
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2">
          <i className="fa fa-exclamation-circle"></i>
          <span>Please select both From Date and To Date</span>
        </div>
      )}
    </div>
  );
}