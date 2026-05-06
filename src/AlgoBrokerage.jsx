import React, { useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header.jsx";
import { validateDates } from "./utils/dateValidation";
import { toast } from "react-toastify";

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
  const [error, setError] = useState("");

  const fromRef = useRef();
  const toRef = useRef();

  const today = new Date();

  const handleApply = () => {
    const errorMsg = validateDates(fromDate, toDate);
    if (errorMsg) {
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    setError("");
  };

  return (
    <div className="flex gap-6 items-end bg-[#f3f3f3] p-4 rounded-xl mt-4 flex-wrap">

      {/* FROM DATE */}
      <div>
        <label className="text-sm text-gray-600">From Date</label>

        <div className="relative w-[200px]">
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            maxDate={today}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className={`w-full border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
            ref={fromRef}
            onFocus={(e) => e.target.blur()}
            
            /* CUSTOM HEADER */
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="flex items-center justify-between px-2 py-2 border-b">

                {/* LEFT ARROW */}
                <button onClick={decreaseMonth}>
                  <i className="fa fa-chevron-left text-gray-600"></i>
                </button>

                {/* MONTH + YEAR BOX */}
                <div className="flex gap-2">
                  <div className="border px-3 py-1 rounded">
                    {date.toLocaleString("default", { month: "short" })}
                  </div>
                  <div className="border px-3 py-1 rounded">
                    {date.getFullYear()}
                  </div>
                </div>

                {/* RIGHT ARROW */}
                <button
                  onClick={increaseMonth}
                  disabled={date >= today}
                  className="disabled:opacity-30"
                >
                  <i className="fa fa-chevron-right text-gray-600"></i>
                </button>

              </div>
            )}
          />

          {/* ICON CLICK */}
          <i
            className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => fromRef.current.setOpen(true)}
          ></i>
        </div>
      </div>

      {/* TO DATE */}
      <div>
        <label className="text-sm text-gray-600">To Date</label>

        <div className="relative w-[200px]">
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            maxDate={today}
            dateFormat="dd/MM/yyyy"
            placeholderText="DD/MM/YYYY"
            className={`w-full border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
            ref={toRef}
            onFocus={(e) => e.target.blur()}
            
            /* CUSTOM HEADER */
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="flex items-center justify-between px-2 py-2 border-b">

                {/* LEFT ARROW */}
                <button onClick={decreaseMonth}>
                  <i className="fa fa-chevron-left text-gray-600"></i>
                </button>

                {/* MONTH + YEAR BOX */}
                <div className="flex gap-2">
                  <div className="border px-3 py-1 rounded">
                    {date.toLocaleString("default", { month: "short" })}
                  </div>
                  <div className="border px-3 py-1 rounded">
                    {date.getFullYear()}
                  </div>
                </div>

                {/* RIGHT ARROW */}
                <button
                  onClick={increaseMonth}
                  disabled={date >= today}
                  className="disabled:opacity-30"
                >
                  <i className="fa fa-chevron-right text-gray-600"></i>
                </button>

              </div>
            )}
          />

          {/* ICON CLICK */}
          <i
            className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => toRef.current.setOpen(true)}
          ></i>
        </div>
      </div>

      {/* APPLY BUTTON */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleApply}
          className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          APPLY
          <i className="fa fa-angle-right"></i>
        </button>
      </div>

    </div>
  );
}

export default function AlgoBrokerage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <div className="p-4 pt-11">

        {/* -------- TABS -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab) => (
              tab.name === "Mutual Fund" ? (
                <span
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
                    `pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline ${
                      isActive
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

          {/* -------- FILTER -------- */}
          <div>
            <CustomDateFilter />
          </div>
        </div>

        {/* -------- CONTENT AREA -------- */}
        <div className="mt-6">
          <Outlet />
        </div>

      </div>
    </>
  );
}
