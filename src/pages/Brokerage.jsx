import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import FilterSection, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterSection";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getBrokerageClientWise, getBrokerageDateWise, getThirdPartyReport, getResearchCallReportAP } from "../api/korpApiService";

const DataTable = ({ headers, rows, showMaskIcon = false, resultsCount, onDownload, onMaskToggle, isMasked, isPlain = false }) => {
  const [sortConfig, setSortConfig] = useState({ key: 0, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  const handleSort = (index) => {
    let direction = 'asc';
    if (sortConfig.key === index && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: index, direction });
  };

  const sortedRows = React.useMemo(() => {
    if (sortConfig.key === null) return rows;
    return [...rows].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      const parseNum = (val) => {
        if (val === null || val === undefined || val === "-") return 0;
        const clean = String(val).replace(/[₹,\s]/g, "");
        const num = parseFloat(clean);
        return isNaN(num) ? 0 : num;
      };

      const isNumA = typeof aVal === 'number' || (typeof aVal === 'string' && /^[₹\s]*\d+/.test(aVal));
      const isNumB = typeof bVal === 'number' || (typeof bVal === 'string' && /^[₹\s]*\d+/.test(bVal));

      if (isNumA && isNumB) {
        aVal = parseNum(aVal);
        bVal = parseNum(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig]);

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const visibleRows = sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const SortIcon = ({ index }) => {
    if (sortConfig.key === index) {
      return sortConfig.direction === 'asc' ? (
        <ChevronUp size={14} className="text-white ml-2" />
      ) : (
        <ChevronDown size={14} className="text-white ml-2" />
      );
    }
    return <ChevronsUpDown size={14} className="text-white/60 ml-2" />;
  };

  const colWidth = `${100 / (headers.length || 1)}%`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed border-collapse">
          <thead className="bg-[#1EB04C] text-white">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(i)}
                  className="px-6 py-3 text-[13px] font-semibold border-r border-white/10 last:border-0 cursor-pointer select-none hover:bg-[#18a045] transition-colors"
                  style={{ width: colWidth }}
                >
                  <div className="flex items-center justify-start gap-2">
                    <span className="truncate">{h}</span>
                    <SortIcon index={i} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {visibleRows.map((row, rowIndex) => (
              <tr key={rowIndex} className={`border-b border-gray-200 hover:bg-gray-100/50 transition-colors ${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-2.5 border-r border-gray-200 last:border-0 text-[13px] text-gray-700 font-medium overflow-hidden"
                    style={{ width: colWidth }}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="truncate">{cell}</span>
                      {showMaskIcon && cell?.toString().includes('xxx') && (
                        <i
                          onClick={onMaskToggle}
                          className="fas fa-eye-slash text-[10px] text-gray-300 cursor-pointer hover:text-[#1EB04C]"
                        ></i>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {sortedRows.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-400 font-bold text-[14px]">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 bg-gray-50/50 text-gray-500 font-medium border-t border-gray-100 text-[12px] flex items-center justify-between">
        <div>
          Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedRows.length)} of {sortedRows.length} records
        </div>

        {sortedRows.length > rowsPerPage && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
            >
              <i className="fa fa-chevron-left text-[10px]"></i>
            </button>

            <span className="w-7 h-7 flex items-center justify-center bg-[#1EB04C] text-white rounded text-xs font-bold shadow-sm">
              {currentPage}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
            >
              <i className="fa fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Brokerage = () => {
    const [activeSubTab, setActiveSubTab] = useState("Capital Brokerage");
    const [isMasked, setIsMasked] = useState(() => {
        return sessionStorage.getItem("revenue_verified") !== "true";
    });
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [timer, setTimer] = useState(115); // 1:55
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    // Capital Brokerage States
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [clientCode, setClientCode] = useState("");
    const [error, setError] = useState("");

    // Error Toast States
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    // Third Party Brokerage States
    const [tpFromDate, setTpFromDate] = useState(null);
    const [tpToDate, setTpToDate] = useState(null);

    // Research Brokerage States
    const [tradeDate, setTradeDate] = useState(null);

    const subTabs = ["Capital Brokerage", "Third Party Brokerage", "Research Brokerage"];

    const formatDateForApi = (date) => {
        if (!date) return "";
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
    };

    // Fetch data from API
    const fetchBrokerageData = async () => {
        setLoading(true);
        try {
            if (activeSubTab === "Capital Brokerage") {
                const params = {
                    pageNumber: 0,
                    size: 50,
                    clientCode: clientCode.trim()
                };
                if (fromDate) params.fromDate = formatDateForApi(fromDate);
                if (toDate) params.toDate = formatDateForApi(toDate);

                const response = await getBrokerageClientWise(params);
                const rows = response?.data?.result?.userList || response?.data?.result?.result1 || response?.data?.data || response?.data?.Data || [];
                setTableData(Array.isArray(rows) ? rows : []);
            }
            else if (activeSubTab === "Third Party Brokerage") {
                const params = {
                    pageNumber: 0,
                    size: 50
                };
                if (tpFromDate) params.fromDate = formatDateForApi(tpFromDate);
                if (tpToDate) params.ToDate = formatDateForApi(tpToDate);

                const response = await getThirdPartyReport(params);
                const rows = response?.data?.result?.resultlist || response?.data?.result?.list || response?.data?.result?.userList || response?.data?.result?.result1 || response?.data?.data || response?.data?.Data || [];
                console.log('Third Party rows fetched:', rows?.length);
                setTableData(Array.isArray(rows) ? rows : []);
            }
            else if (activeSubTab === "Research Brokerage") {
                const params = {
                    pageNumber: 0,
                    size: 50
                };
                if (tradeDate) params.TradeDate = formatDateForApi(tradeDate);

                const response = await getResearchCallReportAP(params);
                const rows = response?.data?.result?.resultlist || response?.data?.result?.list || response?.data?.result?.userList || response?.data?.result?.result1 || response?.data?.data || response?.data?.Data || [];
                setTableData(Array.isArray(rows) ? rows : []);
            }
        } catch (err) {
            console.error("Brokerage API Error:", err);
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    // Load initial data on mount and active sub tab change
    useEffect(() => {
        fetchBrokerageData();
    }, [activeSubTab]);

    // Timer logic for OTP
    useEffect(() => {
        let interval;
        if (showOtpModal && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtpModal, timer]);

    // Clear error toast after 3 seconds
    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleApply = () => {
        if (!fromDate && !toDate) {
            setCustomErrorMsg("Please select Date range");
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
        if (fromDate && toDate && fromDate.toDateString() === toDate.toDateString()) {
            setCustomErrorMsg("From and To dates cannot be same");
            setShowCustomError(true);
            return;
        }

        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }

        setError("");
        fetchBrokerageData();
        toast.success("Filters applied successfully");
    };

    const handleSearchClient = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        fetchBrokerageData();
        toast.success("Searching client...");
    };

    const handleEyeClick = () => {
        if (isMasked) {
            setShowOtpModal(true);
            setTimer(115);
            toast.success("Otp sent successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "#2ecc71" }
            });
        } else {
            setIsMasked(true);
        }
    };

    const handleOtpSubmit = () => {
        if (otp === "986764") {
            setIsMasked(false);
            setShowOtpModal(false);
            sessionStorage.setItem("revenue_verified", "true");
            setOtp("");
            toast.success("Verified successfully");
        } else {
            toast.error("Invalid OTP");
        }
    };

    // Dynamic stats computation from live UAT tableData
    const calculateStats = () => {
        let totalBrok = 0;
        let capBrok = 0;
        let commBrok = 0;
        let fnoBrok = 0;
        let capTurnover = 0;
        let fnoTurnover = 0;
        let commTurnover = 0;

        tableData.forEach(item => {
            const bAmt = parseFloat(item.brokerage || item.Brokerage || 0);
            const tAmt = parseFloat(item.turnover || item.Turnover || item.amount || 0);
            const segment = (item.segment || item.Segment || "").toUpperCase();

            totalBrok += bAmt;
            if (segment.includes("CAP") || segment.includes("CASH") || segment.includes("EQ")) {
                capBrok += bAmt;
                capTurnover += tAmt;
            } else if (segment.includes("COMM") || segment.includes("MCX")) {
                commBrok += bAmt;
                commTurnover += tAmt;
            } else {
                fnoBrok += bAmt;
                fnoTurnover += tAmt;
            }
        });

        const totalTurnover = capTurnover + fnoTurnover + commTurnover;

        return [
            { title: "Total Brokerage", value: `₹ ${totalBrok.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total Cap Brok", value: `₹ ${capBrok.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total Comm Brok", value: `₹ ${commBrok.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total FNO Brok", value: `₹ ${fnoBrok.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total Cap Turnover", value: `₹ ${capTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total FNO Turnover", value: `₹ ${fnoTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total Turnover", value: `₹ ${totalTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
            { title: "Total Comm Turnover", value: `₹ ${commTurnover.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
        ];
    };

    const statsData = calculateStats();

    // Robust helper to find keys ignoring case and special characters
    const getVal = (item, keys) => {
        if (!item) return null;
        const lowerKeys = keys.map(k => k.toLowerCase().replace(/[^a-z0-9]/g, ''));
        for (let key in item) {
            const cleanKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (lowerKeys.includes(cleanKey)) {
                return item[key];
            }
        }
        return null;
    };

    // Map live UAT response rows dynamically to headers
    const getTableHeadersAndRows = () => {
        if (activeSubTab === "Capital Brokerage") {
            const headers = ["CLIENT NAME", "BROKERAGE", "TURNOVER", "SEGMENT"];
            const rows = tableData.map(item => {
                const clientName = getVal(item, ["clientname", "name"]) || "-";
                const brokerage = getVal(item, ["brokerage"]) || 0;
                const turnover = getVal(item, ["turnover", "amount", "turnovr"]) || "-";
                const segment = getVal(item, ["segment", "seg"]) || "-";

                return [
                    clientName,
                    isMasked ? "xxxxxx" : `₹ ${parseFloat(brokerage).toFixed(2)}`,
                    turnover,
                    segment
                ];
            });
            return { headers, rows };
        }
        else if (activeSubTab === "Third Party Brokerage") {
            const headers = ["BranchCode", "MF Brokerage", "Unlisted Brokerage", "Insurance Brokerage", "Bonds Brokerage", "Wealth Basket Brokerage", "Value Stock", "PMS Brokerage"];
            const rows = tableData.map(item => {
                const branchCode = getVal(item, ["BranchCode", "branchCode", "branch", "Branch"]);
                const mfBrokerage = getVal(item, ["MFBrokerage", "mfBrokerage", "MF Brokerage", "MFbrokerage", "mfBrokerageAmt"]) || 0;
                const unlistedBrokerage = getVal(item, ["UnlistedBrokerage", "unlistedBrokerage", "Unlisted Brokerage"]) || 0;
                const insuranceBrokerage = getVal(item, ["InsuranceBrokerage", "insuranceBrokerage", "Insurance Brokerage"]) || 0;
                const bondsBrokerage = getVal(item, ["BondBrokerage", "bondsBrokerage", "Bond Brokerage", "BondsBrokerage"]) || 0;
                const wealthBasketBrokerage = getVal(item, ["WealthBasketBrokerage", "wealthBasketBrokerage", "Wealth Basket Brokerage"]) || 0;
                const valueStock = getVal(item, ["ValueStock", "valueStock", "Value Stock"]) || 0;
                const pmsBrokerage = getVal(item, ["PMSBrokerage", "pmsBrokerage", "PMS Brokerage"]) || 0;
                return [
                    branchCode || "-",
                    `₹ ${parseFloat(mfBrokerage).toFixed(2)}`,
                    `₹ ${parseFloat(unlistedBrokerage).toFixed(2)}`,
                    `₹ ${parseFloat(insuranceBrokerage).toFixed(2)}`,
                    `₹ ${parseFloat(bondsBrokerage).toFixed(2)}`,
                    `₹ ${parseFloat(wealthBasketBrokerage).toFixed(2)}`,
                    `₹ ${parseFloat(valueStock).toFixed(2)}`,
                    `₹ ${parseFloat(pmsBrokerage).toFixed(2)}`
                ];
            });
            return { headers, rows };
        }
        else if (activeSubTab === "Research Brokerage") {
            const headers = ["Symbol", "Instrument", "Option Type", "Strike Price", "Expire Date", "Buy/Sell", "Mkt Lot", "Quantity", "Trade Value", "Brokerage", "No Of Trade"];
            const rows = tableData.map(item => {
                const symbol = getVal(item, ["Symbol", "symbol", "Symbal", "symbal"]) || "-";
                const instrument = getVal(item, ["Instrument", "instrument"]) || "-";
                const optionType = getVal(item, ["OptionType", "optionType", "Option Type", "option_type"]) || "-";
                const strikePrice = getVal(item, ["StrikePrice", "strikePrice", "Strike Price", "strike_price"]) || "-";
                const expireDate = getVal(item, ["ExpireDate", "expireDate", "Expire Date", "expire_date"]) || "-";
                const buySell = getVal(item, ["BuySell", "buySell", "Buy/Sell", "buy_sell"]) || "-";
                const mktLot = getVal(item, ["MktLot", "mktLot", "Mkt Lot", "mkt_lot"]) || "-";
                const quantity = getVal(item, ["Quantity", "quantity"]) || "-";
                const tradeValue = getVal(item, ["TradeValue", "tradeValue", "Trade Value", "trade_value"]) || "-";
                const brokerage = getVal(item, ["Brokerage", "brokerage"]) || "-";
                const noOfTrade = getVal(item, ["NoOfTrade", "noOfTrade", "No Of Trade", "no_of_trade"]) || "-";
                return [symbol, instrument, optionType, strikePrice, expireDate, buySell, mktLot, quantity, tradeValue, brokerage, noOfTrade];
            });
            return { headers, rows };
        }
        else {
            const headers = ["TRADE DATE", "CLIENT CODE", "CLIENT NAME", "BROKERAGE", "TURNOVER"];
            const rows = tableData.map(item => [
                item.tradeDate || item.date || "-",
                item.clientCode || "-",
                item.clientName || "-",
                `₹ ${parseFloat(item.brokerage || 0).toFixed(2)}`,
                item.turnover || "-"
            ]);
            return { headers, rows };
        }
    };

    const { headers, rows } = getTableHeadersAndRows();

    const handleDownload = () => {
        const { headers: dlHeaders, rows: dlRows } = getTableHeadersAndRows();
        const csvContent = "data:text/csv;charset=utf-8,"
            + dlHeaders.join(",") + "\n"
            + dlRows.map(row => row.map(cell => `"${cell.replace("₹", "").trim()}"`).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Brokerage_Report_${activeSubTab.replace(/\s+/g, "_")}_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Report downloaded successfully");
    };

    const [hasTpSearched, setHasTpSearched] = useState(false);

    const handleTpApply = () => {
        if (!tpFromDate && !tpToDate) {
            setCustomErrorMsg("Please select Date range");
            setShowCustomError(true);
            return;
        }
        if (tpFromDate && !tpToDate) {
            setCustomErrorMsg("Please select To Date");
            setShowCustomError(true);
            return;
        }
        if (!tpFromDate && tpToDate) {
            setCustomErrorMsg("Please select From Date");
            setShowCustomError(true);
            return;
        }
        if (tpFromDate && tpToDate && tpFromDate.toDateString() === tpToDate.toDateString()) {
            setCustomErrorMsg("From and To dates cannot be same");
            setShowCustomError(true);
            return;
        }

        const errorMsg = validateDates(tpFromDate, tpToDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }

        setHasTpSearched(true);
        fetchBrokerageData();
        toast.success("Third Party filters applied successfully");
    };

    const [hasResearchSearched, setHasResearchSearched] = useState(false);

    const handleResearchApply = () => {
        if (!tradeDate) {
            setCustomErrorMsg("Please select Trade Date");
            setShowCustomError(true);
            return;
        }

        setHasResearchSearched(true);
        fetchBrokerageData();
        toast.success("Research filters applied successfully");
    };

    return (
        <div className="px-2 pt-6 pb-0 max-w-[1600px] mx-auto relative">
            {/* 🧭 SUB TABS */}
            <div className="flex gap-10 border-b border-gray-200 mb-1 pt-0">
                {subTabs.map((tab) => (
                    <span
                        key={tab}
                        onClick={() => setActiveSubTab(tab)}
                        className={`cursor-pointer pb-3 text-sm transition-all ${activeSubTab === tab
                            ? "border-b-[3px] border-[#34b350] font-bold text-black"
                            : "text-gray-500 font-medium hover:text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* 📦 CONTENT BASED ON SUB TAB */}
            {activeSubTab === "Capital Brokerage" && (
                <>
                    <FilterSection>
                        <FilterItem label="From Date">
                            <DateInput
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                error={showCustomError && !fromDate && activeSubTab === "Capital Brokerage"}
                            />
                        </FilterItem>
                        <FilterItem label="To Date">
                            <DateInput
                                selected={toDate}
                                onChange={(d) => setToDate(d)}
                                error={showCustomError && !toDate && activeSubTab === "Capital Brokerage"}
                            />
                        </FilterItem>
                        <ApplyButton onClick={handleApply} />

                        <div className="ml-12 flex items-end gap-6">
                            <FilterItem label="Search By Client">
                                <SearchInput
                                    placeholder="Search client code"
                                    width="320px"
                                    value={clientCode}
                                    onChange={(e) => setClientCode(e.target.value)}
                                    error={showCustomError && !clientCode.trim() && activeSubTab === "Capital Brokerage"}
                                />
                            </FilterItem>
                            <ApplyButton label="SEARCH" onClick={handleSearchClient} />
                        </div>
                    </FilterSection>

                    {/* 📊 Dynamic Cards Section */}
                    <div className="grid grid-cols-4 gap-10 mb-4 mt-1 max-w-[1200px]">
                        {statsData.map((s, i) => (
                            <div key={i} className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm transition-all hover:border-[#34b350]/30 hover:shadow-md group">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{s.title}</h3>
                                    {isMasked && (
                                        <div
                                            onClick={handleEyeClick}
                                            className="cursor-pointer p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <EyeOff size={14} className="text-gray-400 group-hover:text-red-500" />
                                        </div>
                                    )}
                                </div>
                                <div className={`${isMasked ? "text-[14px] font-bold text-gray-400" : "text-[16px] font-black text-gray-900"} tracking-tight tabular-nums transition-all`}>
                                    {isMasked ? "xxxx" : s.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DataTable
                        headers={headers}
                        rows={rows}
                        resultsCount={5}
                        showMaskIcon={isMasked}
                        onMaskToggle={handleEyeClick}
                        isMasked={isMasked}
                        onDownload={handleDownload}
                        isPlain={true}
                    />
                </>
            )}

            {activeSubTab === "Third Party Brokerage" && (
                <>
                    <FilterSection>
                        {/* From Date */}
                        <FilterItem label="From Date">
                            <DateInput
                                selected={tpFromDate}
                                onChange={(d) => setTpFromDate(d)}
                                width="220px"
                                error={showCustomError && !tpFromDate && activeSubTab === "Third Party Brokerage"}
                            />
                        </FilterItem>

                        {/* To Date */}
                        <FilterItem label="To Date">
                            <DateInput
                                selected={tpToDate}
                                onChange={(d) => setTpToDate(d)}
                                width="220px"
                                error={showCustomError && !tpToDate && activeSubTab === "Third Party Brokerage"}
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <div className="mb-0.5">
                            <ApplyButton
                                onClick={handleTpApply}
                            />
                        </div>
                    </FilterSection>

                    <DataTable
                        headers={headers}
                        rows={rows}
                        resultsCount={rows.length}
                        onDownload={handleDownload}
                        isPlain={true}
                    />
                </>
            )}

            {activeSubTab === "Research Brokerage" && (
                <>
                    <FilterSection>
                        {/* Trade Date */}
                        <FilterItem label="Trade Date">
                            <DateInput
                                selected={tradeDate}
                                onChange={(d) => setTradeDate(d)}
                                width="220px"
                                error={showCustomError && !tradeDate && activeSubTab === "Research Brokerage"}
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <div className="mb-0.5">
                            <ApplyButton
                                onClick={handleResearchApply}
                            />
                        </div>
                    </FilterSection>

                    <DataTable
                        headers={headers}
                        rows={rows}
                        resultsCount={rows.length}
                        onDownload={handleDownload}
                        isPlain={true}
                    />
                </>
            )}

            {/* 🔐 OTP MODAL */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/40 z-[2000] flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg relative">
                        <button
                            onClick={() => setShowOtpModal(false)}
                            className="absolute right-5 top-5 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="text-left px-2">
                            <h2 className="text-[20px] font-semibold text-gray-800 mb-5">Please enter OTP</h2>

                            <div className="mb-4">
                                <label className="block text-[14px] text-gray-600 mb-1.5 font-medium">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter your 6-digit OTP"
                                    className="w-full h-[44px] border border-gray-200 rounded-lg px-4 text-[14px] focus:border-[#34b350] outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="text-center mb-6">
                                <p className="text-[13px] text-gray-500 mb-1">Resend OTP in {formatTime(timer)}</p>
                                <button
                                    onClick={() => timer === 0 && setTimer(115)}
                                    className={`text-[13px] font-medium transition-colors ${timer === 0 ? "text-[#34b350] cursor-pointer" : "text-gray-300 cursor-default"}`}
                                >
                                    Resend OTP
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleOtpSubmit}
                                    className="bg-[#34b350] text-white font-medium rounded-full px-12 h-[44px] text-[15px] hover:bg-[#2e9e47] transition-all shadow-sm"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[5000]
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
};

export default Brokerage;
