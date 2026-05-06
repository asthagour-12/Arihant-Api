import React, { useState } from 'react';
import { ChevronDown, Search, Download, Calendar, ChevronUp, ChevronsUpDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function HoldingReport() {
  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [searchInput, setSearchInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateRef = React.useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const sortedData = [...tableData].sort((a, b) => {
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

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content Section */}
      <div className="flex-1 px-8 py-2 mt-1">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-6 pt-3 pb-3 rounded-lg mb-4 max-w-[1600px] mx-auto">
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
                className="w-full pl-10 pr-4 py-2 h-[40px] border border-gray-200 rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm transition-all shadow-sm bg-white"
              />
            </div>

            {/* Apply Button */}
            <button className="bg-[#27ae60] hover:bg-[#219150] text-white px-8 h-[48px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2">
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
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm h-[40px] w-52 bg-white transition-all shadow-sm font-bold"
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
      </div>
    </div>
  );
}
