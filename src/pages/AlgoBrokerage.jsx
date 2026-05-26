import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";
import { toast } from "react-toastify";
import { getAlgoBrokerage } from "../api/korpApiService";

const tabs = [
  { name: "Algo Brokerage", path: "/algo-brokerage" },
  { name: "Mutual Fund", path: "/mutual-fund" },
  { name: "Rejection", path: "/rejection" },
  { name: "Mandate", path: "/mandate" },
  { name: "Product Deck", path: "/product-deck" },
  { name: "MF Structure & Brokerage", path: "/mf-structure" },
  { name: "Wealth Basket", path: "/wealth-basket" },
  { name: "SIP Revenue Calculator", path: "/sip-calculator" },
  { name: "Bonds", path: "/bonds" }
];

export default function AlgoBrokerage() {
  const getFirstDayOfMonth = () => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  };

  const [fromDate, setFromDate] = useState(getFirstDayOfMonth());
  const [toDate, setToDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [error, setError] = useState("");
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  useEffect(() => {
    handleApply();
  }, []);

  const formatDateForApi = (date) => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleApply = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {
        size: 50,
        pageNumber: 0,
      };

      if (fromDate) params.datefrom = formatDateForApi(fromDate);
      if (toDate) params.dateto = formatDateForApi(toDate);

      const response = await getAlgoBrokerage(params);
      console.log("AlgoBrokerage API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

      if (Array.isArray(items)) {
        setData(items);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to fetch algo brokerage:", err);
      toast.error("Failed to fetch Algo Brokerage report from UAT");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "";
    }
    let sorted = [...data];
    if (direction !== "") {
      sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setSortConfig({ key, direction });
    setData(sorted);
  };

  const handleDownload = () => {
    const headers = ["DATE", "CLIENT CODE", "CLIENT NAME", "ALGO NAME", "BROKERAGE AMOUNT"];
    const csvContent = [
      headers.join(","),
      ...data.map(item => {
        const dateStr = item.date || item.tradeDate || item.TradeDate || item.datetime || "-";
        const code = item.clientCode || item.clientcode || item.ClientCode || item.ucc || "-";
        const name = item.clientName || item.clientname || item.ClientName || "-";
        const algo = item.algoName || item.strategy || item.algo || "-";
        const amount = item.brokerage || item.Brokerage || item.amount || item.brokerageAmount || "-";
        return [dateStr, code, name, algo, amount].join(",");
      })
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `algo_brokerage_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    const isAsc = isActive && sortConfig.direction === "asc";
    const isDesc = isActive && sortConfig.direction === "desc";
    return (
      <span className="ml-1 flex flex-col">
        <svg width="8" height="5" viewBox="0 0 10 6" className={isAsc ? "fill-black" : "fill-green-200"}>
          <path d="M5 0 L10 6 H0 Z" />
        </svg>
        <svg width="8" height="5" viewBox="0 0 10 6" className={isDesc ? "fill-black" : "fill-green-200 mt-[1px]"}>
          <path d="M0 0 L10 0 L5 6 Z" />
        </svg>
      </span>
    );
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
            {months.map((month) => (
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
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i).map((year) => (
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
    <>
      <Header />
      <div className="p-4 pt-11">
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab) => (
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
            ))}
          </div>

          <div className="bg-[#eaeaea] p-4 rounded-lg mt-4 flex items-center gap-4 flex-wrap">
            <div>
              <label className="text-xs text-gray-600">From Date</label>
              <div className="relative group">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className="w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm border-gray-300 focus:border-[#34b350] outline-none transition-all"
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                  onClick={() => fromRef.current.setOpen(true)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600">To Date</label>
              <div className="relative group">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className="w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm border-gray-300 focus:border-[#34b350] outline-none transition-all"
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                  onClick={() => toRef.current.setOpen(true)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleApply}
                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                APPLY
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>

          {loading && (
            <div className="mt-4 text-center text-gray-500 font-medium p-8 bg-gray-50 border rounded-lg animate-pulse">
              Loading Algo Brokerage report from UAT...
            </div>
          )}
        </div>
        <ArihantProductsSection />
      </div>

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
    </>
  );
}
