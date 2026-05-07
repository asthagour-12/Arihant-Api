import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from './logo-arihant-capital.png';
import Header from "./Header.jsx";
import { validateDates } from "./utils/dateValidation";
import { toast } from "react-toastify";

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

export default function MutualFund() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [error, setError] = useState("");
  const [visibleRows, setVisibleRows] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fromRef = useRef();
  const toRef = useRef();
  const navigate = useNavigate();

  const today = new Date();

  // API CALL
  useEffect(() => {
    fetch("YOUR_API_URL_HERE")
      .then((res) => res.json())
      .then((resData) => {
        setData(resData); // data set
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // SORT
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

  // EYE TOGGLE
  const toggleVisibility = (i) => {
    setVisibleRows((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };

  // DOWNLOAD FUNCTION
  const handleDownload = () => {
    // Create CSV content
    const headers = ["COMMISSION ACCOUNT", "SUBBROKER NAME", "BROKERAGE AMOUNT", "PASS ON %"];
    const csvContent = [
      headers.join(","),
      ...data.map(item => [
        item.account || "",
        item.name || "",
        item.amount || "",
        item.pass || ""
      ].join(","))
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `mutual_fund_report_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // SORT ICON (EXACT LOOK)
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

  const handleApply = () => {
    const errorMsg = validateDates(fromDate, toDate);
    if (errorMsg) {
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    setError("");
    // Further logic for data fetching can go here
  };

  return (
    <>
      <Header />

      <div className="p-4 pt-11">

        {/* -------- TABS -------- */}
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

          {/* -------- FILTER BOX -------- */}
          <div className="bg-[#eaeaea] p-4 rounded-lg mt-4 flex items-center gap-4 flex-wrap">

            {/* FROM DATE */}
            <div>
              <label className="text-xs text-gray-600">From Date</label>
              <div className="relative">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => fromRef.current.setOpen(true)}
                />
              </div>
            </div>

            {/* TO DATE */}
            <div>
              <label className="text-xs text-gray-600">To Date</label>
              <div className="relative">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => toRef.current.setOpen(true)}
                />
              </div>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative pt-4">
              <input
                type="text"
                placeholder="Search by Commision Account"
                className="w-[320px] bg-white border rounded-full px-10 py-2 text-sm outline-none"
              />
              <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 pt-4 text-gray-500" />
            </div>

            {/* APPLY BUTTON */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleApply}
                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                APPLY
                <i className="fa fa-angle-right"></i>
              </button>
            </div>

          </div>

          {/* -------- SEARCH RESULT TEXT -------- */}
          <div className="mt-4 flex items-center justify-between">

            {/* LEFT TEXT */}
            <div className="text-sm text-gray-700 pb-3">
              Search results({data.length})
            </div>

            {/* RIGHT DOWNLOAD ICON */}
            <i className="fa fa-download text-green-600 text-lg cursor-pointer" onClick={handleDownload}></i>

          </div>

          {/* -------- TABLE -------- */}
          <div className="mt-2 bg-white rounded-lg overflow-hidden border">

            {/* Table */}
            <table className="w-full text-[12px] border border-gray-300 table-fixed">

              <thead>
                <tr className="bg-[#2fb344] text-white">

                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("account")} className="flex items-center cursor-pointer">
                      COMMISSION ACCOUNT
                      <SortIcon column="account" />
                    </div>
                  </th>

                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("name")} className="flex items-center cursor-pointer">
                      SUBBROKER NAME
                      <SortIcon column="name" />
                    </div>
                  </th>

                  <th className="px-3 py-2 border-r border-gray-200">
                    <div onClick={() => handleSort("amount")} className="flex items-center cursor-pointer">
                      BROKERAGE AMOUNT
                      <SortIcon column="amount" />
                    </div>
                  </th>

                  <th className="px-3 py-2">
                    <div onClick={() => handleSort("pass")} className="flex items-center cursor-pointer">
                      PASS ON %
                      <SortIcon column="pass" />
                    </div>
                  </th>

                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 h-[28px]">

                      <td className="px-3 py-[4px] border-r border-gray-200">
                        {item.account}
                      </td>

                      <td className="px-3 py-[4px] border-r border-gray-200">
                        {item.name}
                      </td>

                      <td className="px-3 py-[4px] border-r border-gray-200">
                        {item.amount}
                      </td>

                      <td className="px-3 py-[4px]">
                        {item.pass}%
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-left text-gray-500 text-base">
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

          {/* TOTAL DISPLAY */}
          <div className="mt-4 p-4 text-left text-gray-500 text-base">
            Total: {data.length}
          </div>

        </div>
      </div>
    </>
  );
}