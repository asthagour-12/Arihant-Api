import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ChevronDown, Search, Download, Calendar, ChevronUp, ChevronsUpDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHoldingReport } from '../api/korpApiService';

export default function HoldingReport() {
  const getDefaultDate = () => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 1);
    return defaultDate;
  };

  // Helper to get the last working day (Friday) if a weekend is selected
  const getWorkingDate = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    if (day === 0) { // Sunday
      d.setDate(d.getDate() - 2);
    } else if (day === 6) { // Saturday
      d.setDate(d.getDate() - 1);
    }
    return d;
  };

  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [searchInput, setSearchInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(getDefaultDate());
  const dateRef = React.useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [tableData, setTableData] = useState([]);

  const hasMountedRef = React.useRef(false);
  const isFetchingRef = React.useRef(false);

  // ── Auto-fetch free holdings on mount ────────────────────────────────────
  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const fetchTableData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    console.log("API function called");

    try {
      const workingDateForInitial = getWorkingDate(getDefaultDate());
      const params = {
        datefrom: formatDate(workingDateForInitial), // e.g. Friday if Sunday is default
        size: 50,
        pageNumber: 0,
      };

      console.log("Request Params:", params);

      // IMPORTANT:
      // Same API use karo jo live site me chal rahi hai:
      // /reports/KorpHoldingReport
      const response = await getHoldingReport(params);

      console.log("Full Response:", response);
      console.log("Response Data:", response.data);

      // Backend success check
      if (!response?.data?.success) {
        console.log("API returned success:false");
        setTableData([]);
        return;
      }

      // Data extraction with fallback for different possible structures
      const rows =
        response?.data?.result?.result1 ||
        response?.data?.result?.result ||
        response?.data?.result?.userList ||
        response?.data?.result?.rows ||
        [];

      console.log("Rows Count:", rows.length);
      setTableData(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("API Error:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);
      setTableData([]);
    } finally {
      isFetchingRef.current = false;
    }
  };

  React.useEffect(() => {
    if (hasMountedRef.current) return;
    hasMountedRef.current = true;
    fetchTableData();
  }, []);

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const dropdownOptions = [
    'Client Code',
    'Script Name',
  ];

  // Infinite scroll state
  const [visibleCount, setVisibleCount] = useState(10);
  const rowsPerPage = 10; // keep for consistency

  const handleApply = async (
    pageNumber = 0,
    size = 50,
    overrideDate = null
  ) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    const actualPageNumber = typeof pageNumber === 'number' ? pageNumber : 0;
    const actualSize = typeof size === 'number' ? size : 50;

    setIsLoading(true);
    setHasSearched(true);

    try {
      let params = {};

      // ==========================================
      // 1. DATE LOGIC
      // Default to yesterday
      // ==========================================
      let reportDate = overrideDate || selectedDate;

      if (!reportDate) {
        reportDate = new Date();
        reportDate.setDate(reportDate.getDate() - 1);
      }

      // ==========================================
      // 2. BASIC PARAMETERS
      // Use working date for API call if it's weekend
      // ==========================================
      const workingReportDate = getWorkingDate(reportDate);
      params = {
        datefrom: formatDate(workingReportDate), // dd/MM/yyyy
        size: actualSize,
        pageNumber: actualPageNumber,
      };

      // ==========================================
      // 3. SEARCH PARAMETERS (same as Angular)
      // Client Code -> Client_Code
      // Script Name -> SCRIPT_NAME
      // ==========================================
      if (searchInput.trim()) {
        if (!selectedOption || selectedOption === "Select Option") {
          setCustomErrorMsg(
            "Please Enter Client Code or Script Name"
          );
          setShowCustomError(true);
          setIsLoading(false);
          return;
        }

        params.SearchType = selectedOption === "Script Name" ? "SCRIPT_NAME" : "Clientcode";

        params.Search =
          searchInput.trim().toUpperCase();
      }

      // ==========================================
      // 4. DEBUG
      // ==========================================
      console.log("Request Params:", params);

      // ==========================================
      // 5. API CALL
      // ==========================================
      const res = await getHoldingReport(params);

      console.log("FULL API RESPONSE:", res);
      console.log("SUCCESS VALUE:", res?.success);
      console.log("RESULT1:", res?.result?.result1);
      console.log("AXIOS RESPONSE DATA:", res?.data);
      console.log("AXIOS SUCCESS VALUE:", res?.data?.success);
      console.log("AXIOS RESULT1:", res?.data?.result?.result1);

      // ==========================================
      // 6. SUCCESS CHECK
      // ==========================================
      const payload = res?.data || res;
      if (payload?.success) {
        const rows =
          payload?.result?.result1 ||
          payload?.result?.result ||
          payload?.result?.userList ||
          payload?.result?.rows ||
          [];
        setFilteredData(Array.isArray(rows) ? rows : []);

        if (rows.length === 0) {
          setCustomErrorMsg(
            payload.message || "Data not found"
          );
          setShowCustomError(true);
        }
      } else {
        setCustomErrorMsg("Data not found");
        setShowCustomError(true);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("API Error:", error);
      console.error("Status:", error.response?.status);
      console.error("Response:", error.response?.data);

      setCustomErrorMsg("Error fetching data");
      setShowCustomError(true);
      setFilteredData([]);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
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

  const getCellValue = (item, key) => {
    if (!item) return "";
    switch (key) {
      case "clientName":
        return item.CLIENT_NAME || item.clientName || "";
      case "clientCode":
        return item.Client_Code || item.CLIENT_CODE || item.clientCode || "";
      case "scriptCode":
        return item.SCRIPT_CODE || item.scriptCode || "";
      case "scriptName":
        return item.SCRIPT_NAME || item.scriptName || "";
      case "isin":
        return item['ISIN '] || item.ISIN || item.isin || "";
      case "pledgePOA":
        return item.PLEDGE_POA || item.pledgePOA || "";
      case "freePOA":
        return item.FREE_POA || item.freePOA || "";
      case "mtfQty":
        return item.MTF_QTY || item.mtfQty || "";
      case "netQty":
        return item.NETQTY || item.netQty || "";
      case "stockValue":
        return item.STOCK_VALUE || item.stockValue || "";
      case "closeRate":
        return item.MARKET1 || item.closeRate || "";
      default:
        return item[key] || "";
    }
  };

  // Compute visible rows for infinite scroll
  const visibleData = sortedData.slice(0, visibleCount);


  const handleDownload = () => {
    const csv = [
      [
        "CLIENT NAME",
        "CLIENT CODE",
        "SCRIPT CODE",
        "SCRIPT NAME",
        "ISIN",
        "PLEDGE POA",
        "FREE POA",
        "MTF QTY",
        "NET QTY",
        "STOCK VALUE",
        "CLOSE RATE"
      ],
      ...sortedData.map((item) => [
        item.CLIENT_NAME || item.clientName || "",
        item.Client_Code || item.CLIENT_CODE || item.clientCode || "",
        item.SCRIPT_CODE || item.scriptCode || "",
        item.SCRIPT_NAME || item.scriptName || "",
        item['ISIN '] || item.ISIN || item.isin || "",
        item.PLEDGE_POA || item.pledgePOA || "",
        item.FREE_POA || item.freePOA || "",
        item.MTF_QTY || item.mtfQty || "",
        item.NETQTY || item.netQty || "",
        item.STOCK_VALUE || item.stockValue || "",
        item.MARKET1 || item.closeRate || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "holding_report.csv";
    a.click();
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
    <div className="flex flex-col">
      {/* Main Content Section */}
      <div className="flex-1 px-0 py-0">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-6 py-6 rounded-lg mb-6 max-w-[1600px] mx-auto">
          <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Search For
          </div>

          <div className="flex gap-6 items-end flex-wrap">
            {/* Dropdown */}
            <div className="relative w-56">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-between hover:bg-gray-800 transition-colors text-sm font-medium h-[40px]"
              >
                <span>{selectedOption}</span>
                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-[50]">
                  {dropdownOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSelectedOption(option);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-green-50 text-gray-700 text-sm font-medium transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Input */}
            <div className="flex-1 relative group max-w-xs">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#27ae60] transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 h-[40px] border rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm transition-all shadow-sm bg-white ${showCustomError && !searchInput.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
              />
            </div>

            {/* Apply Button */}
            <button
              type="button"
              onClick={() => handleApply()}
              className="bg-[#27ae60] hover:bg-[#219150] text-white px-8 h-[48px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>APPLY</span>
              <span className="text-lg">›</span>
            </button>

            {/* Date Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">
                As On Date
              </label>
              <div className="relative group">
                <DatePicker
                  selected={selectedDate}
                  onChange={(d) => {
                    setSelectedDate(d);
                    handleApply(0, 50, d);
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  renderCustomHeader={CustomHeader}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm h-[40px] w-52 bg-white transition-all shadow-sm font-bold"
                  wrapperClassName="w-full"
                  ref={dateRef}
                  onFocus={(e) => e.target.blur()}
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors pointer-events-auto cursor-pointer"
                  size={16}
                  onClick={() => dateRef.current.setOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto max-w-[1600px] mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-gray-800 font-semibold text-sm">
              Search results({sortedData.length})
            </h2>
            <Download
              size={18}
              className="text-green-600 cursor-pointer"
              onClick={handleDownload}
            />
          </div>

          <style>{`
            .holding-table th, .holding-table td {
              border: 1px solid #e5e7eb;
            }
            .holding-table th {
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
          `}</style>
          <div className="overflow-y-auto no-scrollbar" style={{ maxHeight: "500px" }} onScroll={(e) => {
            const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 5;
            if (bottom) {
              setVisibleCount((prev) => prev + 10);
            }
          }}>
            <table className="w-full holding-table border-collapse" style={{ fontFamily: 'futura, sans-serif' }}>
              <thead>
                <tr style={{ backgroundColor: '#1EB04C' }} className="text-white">
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientName")}>
                    <div className="flex items-center justify-between text-left text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>CLIENT NAME</span>
                      {renderSortIcon("clientName")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("clientCode")}>
                    <div className="flex items-center justify-between text-left text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>CLIENT CODE</span>
                      {renderSortIcon("clientCode")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("scriptCode")}>
                    <div className="flex items-center justify-between text-left text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>SCRIPT CODE</span>
                      {renderSortIcon("scriptCode")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("scriptName")}>
                    <div className="flex items-center justify-between text-left text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>SCRIPT NAME</span>
                      {renderSortIcon("scriptName")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("isin")}>
                    <div className="flex items-center justify-between text-left text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>ISIN</span>
                      {renderSortIcon("isin")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("pledgePOA")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>PLEDGE POA</span>
                      {renderSortIcon("pledgePOA")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("freePOA")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>FREE POA</span>
                      {renderSortIcon("freePOA")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("mtfQty")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>MTF QTY</span>
                      {renderSortIcon("mtfQty")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("netQty")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>NET QTY</span>
                      {renderSortIcon("netQty")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("stockValue")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>STOCK VALUE</span>
                      {renderSortIcon("stockValue")}
                    </div>
                  </th>
                  <th className="px-4 py-3 border-r border-white/10 cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort("closeRate")}>
                    <div className="flex items-center justify-between text-center text-[12px] font-bold tracking-wider whitespace-nowrap">
                      <span>CLOSE RATE</span>
                      {renderSortIcon("closeRate")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={11} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 size={32} className="animate-spin text-[#1EB04C]" />
                        <span className="text-sm text-gray-500 font-medium">Fetching holding data...</span>
                      </div>
                    </td>
                  </tr>
                ) : sortedData.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="py-16 text-center text-gray-400 text-sm font-medium">
                      {hasSearched ? "No records found." : "Enter a search term and click Apply to view holding data."}
                    </td>
                  </tr>
                ) : (
                  visibleData.map((row, idx) => {
                    const clientName = row.CLIENT_NAME || row.clientName || "-";
                    const clientCode = row.Client_Code || row.CLIENT_CODE || row.clientCode || "-";
                    const scriptCode = row.SCRIPT_CODE || row.scriptCode || "-";
                    const scriptName = row.SCRIPT_NAME || row.scriptName || "-";
                    const isin = row['ISIN '] || row.ISIN || row.isin || "-";
                    const pledgePoa = row.PLEDGE_POA || row.pledgePOA || "-";
                    const freePoa = row.FREE_POA || row.freePOA || "-";
                    const mtfQty = row.MTF_QTY || row.mtfQty || "-";
                    const netQty = row.NETQTY || row.netQty || "-";
                    const stockValue = row.STOCK_VALUE || row.stockValue || "-";
                    const closeRate = row.MARKET1 || row.closeRate || "-";

                    return (
                      <tr
                        key={idx}
                        className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}`}
                      >
                        <td className="px-3 py-2 text-xs text-gray-700 font-medium">{clientName}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 font-medium">{clientCode}</td>
                        <td className="px-3 py-2 text-xs text-gray-700">{scriptCode}</td>
                        <td className="px-3 py-2 text-xs text-gray-700">{scriptName}</td>
                        <td className="px-3 py-2 text-xs text-gray-700">{isin}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center">{pledgePoa}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center font-bold">{freePoa}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center">{mtfQty}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center font-bold">{netQty}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center">{stockValue}</td>
                        <td className="px-3 py-2 text-xs text-gray-700 text-center">{closeRate}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
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
      </div>
    </div>
  );
}
