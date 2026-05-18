import React, { useState, useRef } from "react";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ArihantProducts from "./ArihantProducts";
import Footer from "./Footer";

function DealSlip() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [clientCode, setClientCode] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const fromRef = useRef();
  const toRef = useRef();

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const handleApply = () => {
    if (!clientCode.trim()) {
      setCustomErrorMsg("Please enter Client Code");
      setShowCustomError(true);
      return;
    }
    if (fromDate && !toDate) {
      setCustomErrorMsg("Please select To Date");
      setShowCustomError(true);
      return;
    }
    if (!fromDate && toDate) {
      setCustomErrorMsg("Please select From Date");
      setShowCustomError(true);
      return;
    }
    if (!fromDate && !toDate) {
      setCustomErrorMsg("Please select Date range");
      setShowCustomError(true);
      return;
    }
    if (fromDate && toDate && fromDate.toDateString() === toDate.toDateString()) {
      setCustomErrorMsg("From and To dates cannot be same");
      setShowCustomError(true);
      return;
    }
    // Proceed with download logic if valid
    console.log("Downloading slip for:", clientCode);
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
      <button
        onClick={(e) => { e.preventDefault(); decreaseMonth(); }}
        disabled={prevMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-left text-[10px] text-gray-500"></i>
      </button>
      
      <div className="flex gap-2">
        <div className="relative">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {months.filter((_, index) => {
              if (date.getFullYear() === currentYear) {
                return index <= currentMonth;
              }
              return true;
            }).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {Array.from({ length: currentYear - 1947 + 1 }, (_, i) => 1947 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>
      </div>

      <button
        onClick={(e) => { e.preventDefault(); increaseMonth(); }}
        disabled={nextMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-right text-[10px] text-gray-500"></i>
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <div className="p-2 md:p-4 flex-grow">
        {/* WHITE CARD */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5 mt-12 mb-0">

          {/* INNER GRAY BOX */}
          <div className="bg-gray-200 rounded-md px-5 py-4 flex flex-wrap items-end gap-0">

            {/* CLIENT CODE */}
            <div className="flex flex-col flex-1 min-w-[180px] mr-3">
              <label className="text-sm mb-1 text-gray-600 font-medium">
                Enter Client Code
              </label>
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                placeholder="Enter Client Code"
                className="h-10 rounded-full border px-4 bg-gray-100 outline-none focus:border-green-500"
              />
            </div>

            {/* FROM DATE */}
            <div className="flex-1 flex-col flex-1 min-w-[180px]">
              <label className="text-sm mb-1 text-gray-600 font-medium ml-1">
                From Date
              </label>

              <div className="relative group w-72">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  renderCustomHeader={CustomHeader}
                  className="h-10 w-full border-2 rounded-md pl-3 pr-10 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all"
                  wrapperClassName="w-full"
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                  onClick={() => fromRef.current.setOpen(true)}
                ></i>
              </div>
            </div>

            {/* TO DATE */}
            <div className="flex-1 flex-col flex-1 min-w-[180px]">
              <label className="text-sm mb-1 text-gray-600 font-medium ml-1">
                To Date
              </label>

              <div className="relative group w-72">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  renderCustomHeader={CustomHeader}
                  className="h-10 w-full border-2 rounded-md pl-3 pr-10 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all"
                  wrapperClassName="w-full"
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                  onClick={() => toRef.current.setOpen(true)}
                ></i>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold whitespace-nowrap"
              >
                DOWNLOAD SLIP <span className="ml-1">›</span>
              </button>
            </div>

          </div>
        </div>

        {/* ARIHANT PRODUCTS */}
        <div className="mt-4">
          <ArihantProducts />
        </div>
      </div>

      <Footer />

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[10000]
                transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold -mb-1">Error</h2>
          <p className="text-base font-semibold">{customErrorMsg}</p>
        </div>
        <div className="ml-6 flex items-center">
          <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealSlip;