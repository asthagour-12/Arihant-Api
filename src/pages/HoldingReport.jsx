import React, { useState } from 'react';
import { ChevronDown, Search, Download, Calendar, ChevronUp, ChevronsUpDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getHoldingReport } from '../api/korpApiService';

export default function HoldingReport() {
  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [searchInput, setSearchInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateRef = React.useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");

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
    'Client Name',
    'Script Code',
  ];

  const tableData = [
    {
      clientName: 'SURAJ SUNIL RAJOLE',
      clientCode: 'AP2190001',
      scriptCode: '839217',
      scriptName: 'SREETHA',
      isin: 'INE664K01049',
      pledgePOA: 0,
      freePOA: 282,
      mtfQty: '',
      netQty: 282,
      stockValue: 73.08,
      closeRate: 0.29
    },
    {
      clientName: 'SURAJ SUNIL RAJOLE',
      clientCode: 'AP2190001',
      scriptCode: '840614',
      scriptName: 'GOENG',
      isin: 'INE694X01030',
      pledgePOA: 0,
      freePOA: 16,
      mtfQty: '',
      netQty: 16,
      stockValue: 9.84,
      closeRate: 0.93
    },
    {
      clientName: 'SURAJ SUNIL RAJOLE',
      clientCode: 'AP2190001',
      scriptCode: 'INB517H01021',
      scriptName: 'BURNPUR CEMENT LTD EG LI',
      isin: 'INB517H01021',
      pledgePOA: 0,
      freePOA: 1,
      mtfQty: '',
      netQty: 1,
      stockValue: 0,
      closeRate: 0
    },
    {
      clientName: 'RINAZ MUSHTAQUE SHAIKH',
      clientCode: '29390016',
      scriptCode: 'SIL0006',
      scriptName: 'SILVERBEES',
      isin: 'INF204KC1402',
      pledgePOA: 0,
      freePOA: 47,
      mtfQty: '',
      netQty: 47,
      stockValue: 10837.4,
      closeRate: 224.2
    },
    {
      clientName: 'RINAZ MUSHTAQUE SHAIKH',
      clientCode: '29390016',
      scriptCode: '831642',
      scriptName: 'MARICO',
      isin: 'INE196A01026',
      pledgePOA: 0,
      freePOA: 2,
      mtfQty: '',
      netQty: 2,
      stockValue: 1688.6,
      closeRate: 779.3
    },
    {
      clientName: 'RINAZ MUSHTAQUE SHAIKH',
      clientCode: '29390016',
      scriptCode: '813399',
      scriptName: 'HINDCOPPER',
      isin: 'INE531E01026',
      pledgePOA: 0,
      freePOA: 9,
      mtfQty: '',
      netQty: 9,
      stockValue: 2776.23,
      closeRate: 583.23
    }
  ];

  const [filteredData, setFilteredData] = useState(tableData);

  const handleApply = () => {
    // FILTER DATA
    const filtered = tableData.filter((item) => {
      return (
        item.clientCode
          .toLowerCase()
          .includes(searchInput.toLowerCase())
        ||
        item.scriptName
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });

    // IF NO DATA FOUND
    if (
      searchInput.trim() !== "" &&
      filtered.length === 0
    ) {
      setCustomErrorMsg("Please Enter Client Code or Script Name");
      setShowCustomError(true);

      // TABLE EMPTY
      setFilteredData([]);
      return;
    }

    // IF INPUT EMPTY
    if (searchInput.trim() === "") {
      setCustomErrorMsg("Please Enter Client Code or Script Name");
      setShowCustomError(true);
      return;
    }

    // DATA FOUND
    setFilteredData(filtered);
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

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

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
        item.clientName,
        item.clientCode,
        item.scriptCode,
        item.scriptName,
        item.isin,
        item.pledgePOA,
        item.freePOA,
        item.mtfQty,
        item.netQty,
        item.stockValue,
        item.closeRate,
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
              onClick={handleApply}
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
                  onChange={(d) => setSelectedDate(d)}
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
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'
                    }`}
                >
                  <td className="px-3 py-2 text-xs text-gray-700 font-medium">
                    {row.clientName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 font-medium">
                    {row.clientCode}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">
                    {row.scriptCode}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">
                    {row.scriptName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">
                    {row.isin}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.pledgePOA}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center font-bold">
                    {row.freePOA}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.mtfQty}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center font-bold">
                    {row.netQty}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.stockValue}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.closeRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
