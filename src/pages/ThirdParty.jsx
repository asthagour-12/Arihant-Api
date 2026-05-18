import React, { useRef, useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";

const tabs = [
  { name: "Algo Brokerage", path: "algo-brokerage" },
  { name: "Mutual Fund", path: "mutual-fund" },
  { name: "Rejection", path: "rejection" },
  { name: "Mandate", path: "mandate" },
  { name: "Product Deck", path: "product-deck" },
  { name: "MF Structure & Brokerage", path: "mf-structure" },
  { name: "Wealth Basket", path: "wealth-basket" },
  { name: "SIP Revenue Calculator", path: "sip-calculator" },
  { name: "Bonds", path: "bonds" }
];

function CustomDateFilter() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();

  const today = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const handleApply = () => {
    const errorMsg = validateDates(fromDate, toDate);
    if (errorMsg) {
      setCustomErrorMsg(errorMsg);
      setShowCustomError(true);
      return;
    }
    // Filter logic would go here
  };

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
    <div className="flex gap-6 items-end bg-[#f3f3f3] p-4 rounded-xl mt-4">

      {/* FROM DATE */}
      <div>
        <label className="text-sm text-gray-600">From Date</label>
        <div className="relative w-[200px] group">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            maxDate={today}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className="w-full border rounded-lg px-3 pr-10 py-2 text-sm outline-none focus:border-[#34b350] transition-all font-bold"
            renderCustomHeader={CustomHeader}
            ref={fromRef}
            onFocus={(e) => e.target.blur()}
          />
          <i
            className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
            onClick={() => fromRef.current.setOpen(true)}
          ></i>
        </div>
      </div>

      {/* TO DATE */}
      <div>
        <label className="text-sm text-gray-600">To Date</label>
        <div className="relative w-[200px] group">
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            maxDate={today}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className="w-full border rounded-lg px-3 pr-10 py-2 text-sm outline-none focus:border-[#34b350] transition-all font-bold"
            renderCustomHeader={CustomHeader}
            ref={toRef}
            onFocus={(e) => e.target.blur()}
          />
          <i
            className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
            onClick={() => toRef.current.setOpen(true)}
          ></i>
        </div>
      </div>

      {/* APPLY BUTTON */}
      <button 
        onClick={handleApply}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 h-[38px] rounded-full font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-md"
      >
        APPLY
        <i className="fa fa-angle-right"></i>
      </button>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[60000]
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

export default function ThirdParty() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f1f1f1] min-h-screen">
      <Header />
      <div className="p-4 pt-[60px]">
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab) => (
              tab.name === "Mutual Fund" ? (
                <span
                  key={tab.name}
                  onClick={() => navigate("/mutual-fund")}
                  className="pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline text-gray-600 font-medium cursor-pointer hover:text-black"
                >
                  {tab.name}
                </span>
              ) : (
                <NavLink
                  key={tab.name}
                  to={tab.path}
                  className={({ isActive }) =>
                    `pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline ${isActive
                      ? "border-b-2 border-green-600 text-black font-medium"
                      : "text-gray-600 font-medium"
                    }`
                  }
                >
                  {tab.name}
                </NavLink>
              )
            ))}
          </div>
          <div>
            <CustomDateFilter />
          </div>
        </div>
        <div className="mt-6">
          <Outlet />
        </div>
        <ArihantProductsSection />
      </div>
    </div>
  );
}