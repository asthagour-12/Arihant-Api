import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { getSipRejections } from "../api/korpApiService";

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

export default function Rejection() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [error, setError] = useState("");

  const fromRef = useRef();
  const toRef = useRef();
  const [clientCode, setClientCode] = useState("BRAP09");
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const navigate = useNavigate();
  const today = new Date();

  // API CALL ON MOUNT
  useEffect(() => {
    fetchRejectionData(true);
  }, []);

  const fetchRejectionData = async (isInitial = false) => {
    if (!clientCode.trim()) {
      setCustomErrorMsg("Please Enter Client Code");
      setShowCustomError(true);
      return;
    }

    if (!isInitial && (fromDate || toDate)) {
      const errorMsg = validateDates(fromDate, toDate);
      if (errorMsg) {
        setCustomErrorMsg(errorMsg);
        setShowCustomError(true);
        return;
      }
    }

    setLoading(true);
    setError("");
    try {
      const queryParams = {
        size: 50,
        pageNumber: 0,
      };

      const body = {
        apcode: clientCode.trim(),
      };
      if (fromDate) body.fromDate = fromDate.toLocaleDateString('en-GB'); // dd/MM/yyyy
      if (toDate) body.toDate = toDate.toLocaleDateString('en-GB');

      const response = await getSipRejections(queryParams, body);
      console.log("SipRejections API Response:", response.data);
      const items = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data || [];

      if (Array.isArray(items)) {
        setData(items);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to fetch SIP rejections:", err);
      toast.error("Failed to fetch Rejection report from UAT");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    fetchRejectionData(false);
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
    const headers = [
      "Client Code", "Client Name", "Amount", "Buy Sell", "Dp Transfer", 
      "Dp Folio No", "Eun", "Order No", "Order Remark", "Order Type", 
      "Schema Name", "Set Type", "Sip Date", "Sip Regn Date", "Units"
    ];
    const csvContent = [
      headers.join(","),
      ...data.map(item => {
        const code = item.clientCode || item.clientcode || item.ClientCode || item.ucc || "-";
        const name = item.clientName || item.clientname || item.ClientName || "-";
        const amount = item.amount || item.amountPaid || "-";
        const buySell = item.buySell || "-";
        const dpTransfer = item.dpTransfer || "-";
        const dpFolioNo = item.dpFolioNo || item.folioNo || "-";
        const eun = item.eun || item.euin || "-";
        const orderNo = item.orderNo || "-";
        const orderRemark = item.orderRemark || "-";
        const orderType = item.orderType || "-";
        const schemeName = item.schemeName || item.scheme || "-";
        const setType = item.setType || "-";
        const sipDate = item.sipDate || "-";
        const sipRegnDate = item.sipRegnDate || "-";
        const units = item.units || "-";

        return [code, name, amount, buySell, dpTransfer, dpFolioNo, eun, orderNo, orderRemark, orderType, schemeName, setType, sipDate, sipRegnDate, units].join(",");
      })
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `rejection_report_${new Date().toLocaleDateString().replace(/\//g, "_")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }
    return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
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
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"} focus:border-[#34b350] outline-none transition-all font-bold`}
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
                  maxDate={today}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  renderCustomHeader={CustomHeader}
                  className={`w-[200px] bg-white border rounded-lg px-3 pr-10 py-2 text-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"} focus:border-[#34b350] outline-none transition-all font-bold`}
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                  onClick={() => toRef.current.setOpen(true)}
                />
              </div>
            </div>

            <div className="relative pt-4">
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                placeholder="Search by Commision Account"
                className="w-[320px] bg-white border rounded-full px-10 py-2 text-sm outline-none focus:border-green-500 shadow-sm"
              />
              <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 pt-4 text-gray-500" />
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleApply}
                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 py-2 rounded-full font-semibold flex items-center gap-2 transition-all shadow-md active:scale-95 uppercase text-xs tracking-wider"
              >
                APPLY
                <i className="fa fa-angle-right"></i>
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700 pb-3 font-semibold">
              Search results({data.length})
            </div>
            <i className="fa fa-download text-green-600 text-lg cursor-pointer hover:scale-110 transition-transform" onClick={handleDownload}></i>
          </div>

          <style>{`
            .holding-table th, .holding-table td {
              border: 1px solid #e5e7eb;
            }
            .holding-table th {
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
          `}</style>
          <div className="mt-2 bg-white rounded-lg overflow-hidden border">
            <table className="w-full holding-table border-collapse table-fixed" style={{ fontFamily: 'futura, sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#1EB04C' }} className="text-white">
                  {[
                    { label: "CLIENT CODE", key: "clientCode" },
                    { label: "CLIENT NAME", key: "clientName" },
                    { label: "AMOUNT", key: "amount" },
                    { label: "BUY SELL", key: "buySell" },
                    { label: "DP TRANSFER", key: "dpTransfer" },
                    { label: "DP FOLIO NO", key: "dpFolioNo" },
                    { label: "EUN", key: "eun" },
                    { label: "ORDER NO", key: "orderNo" },
                    { label: "ORDER REMARK", key: "orderRemark" },
                    { label: "ORDER TYPE", key: "orderType" },
                    { label: "SCHEMA NAME", key: "schemeName" },
                    { label: "SET TYPE", key: "setType" },
                    { label: "SIP DATE", key: "sipDate" },
                    { label: "SIP REGN DATE", key: "sipRegnDate" },
                    { label: "UNITS", key: "units" }
                  ].map((col) => (
                    <th key={col.key} className="px-1 py-2 cursor-pointer hover:bg-[#18a045] transition-colors w-[6.66%]" onClick={() => handleSort(col.key)} title={col.label}>
                      <div className="flex items-center justify-between text-left text-[10px] font-bold tracking-tighter">
                        <span className="truncate">{col.label}</span>
                        {renderSortIcon(col.key)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="15" className="p-4 text-center text-gray-500 font-medium">
                      Loading Rejection report from UAT...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => {
                    const code = item.clientCode || item.clientcode || item.ClientCode || item.ucc || "-";
                    const name = item.clientName || item.clientname || item.ClientName || "-";
                    const amount = item.amount || item.amountPaid || "-";
                    const buySell = item.buySell || "-";
                    const dpTransfer = item.dpTransfer || "-";
                    const dpFolioNo = item.dpFolioNo || item.folioNo || "-";
                    const eun = item.eun || item.euin || "-";
                    const orderNo = item.orderNo || "-";
                    const orderRemark = item.orderRemark || "-";
                    const orderType = item.orderType || "-";
                    const schemeName = item.schemeName || item.scheme || "-";
                    const setType = item.setType || "-";
                    const sipDate = item.sipDate || "-";
                    const sipRegnDate = item.sipRegnDate || "-";
                    const units = item.units || "-";

                    return (
                      <tr key={index} className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'} h-[28px] hover:bg-gray-50`}>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 font-medium truncate" title={code}>{code}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 font-medium truncate" title={name}>{name}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 font-bold truncate" title={amount}>{amount}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={buySell}>{buySell}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={dpTransfer}>{dpTransfer}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={dpFolioNo}>{dpFolioNo}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={eun}>{eun}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={orderNo}>{orderNo}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={orderRemark}>{orderRemark}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={orderType}>{orderType}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={schemeName}>{schemeName}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={setType}>{setType}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={sipDate}>{sipDate}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={sipRegnDate}>{sipRegnDate}</td>
                        <td className="px-1 py-[4px] text-[9px] text-gray-700 truncate" title={units}>{units}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="15" className="p-4 text-left text-gray-500 text-base font-medium">
                      No data to display
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 text-left text-gray-500 text-base font-bold">
            Total: {data.length}
          </div>
        </div>
        <ArihantProductsSection />
      </div>

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[6000]
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