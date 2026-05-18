import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Download } from 'lucide-react';

export default function OpenPosition() {
  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [searchInput, setSearchInput] = useState('');
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
    key: '',
    direction: 'asc',
  });

  const dropdownOptions = [
    'Client Name',
    'Script Code'
  ];

  const tableData = [
    {
      clientName: 'DHRUVIK BHAVESHKUMAR',
      clientCode: '26640002S',
      scriptName: 'SENSEX',
      optionType: 'PE',
      mtm: '38092.00',
      strikePrice: '76000.0',
      expDate: '30-04-2026',
      openBuy: '600.0',
      openSell: '2660.0'
    },
    {
      clientName: 'VIVEK SHAH',
      clientCode: '26640002G',
      scriptName: 'WIPRO',
      optionType: 'FF',
      mtm: '-1169040.00',
      strikePrice: '0.0',
      expDate: '26-03-2026',
      openBuy: '0.0',
      openSell: '0.0'
    },
    {
      clientName: 'VIVEK SHAH',
      clientCode: '26640002G',
      scriptName: 'SENSEX',
      optionType: 'PE',
      mtm: '12487.00',
      strikePrice: '75800.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '2000.0'
    },
    {
      clientName: 'VIVEK SHAH',
      clientCode: '26640002G',
      scriptName: 'SENSEX',
      optionType: 'CE',
      mtm: '3089.00',
      strikePrice: '75800.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '1000.0'
    },
    {
      clientName: 'VIVEK SHAH',
      clientCode: '26640002G',
      scriptName: 'SENSEX',
      optionType: 'CE',
      mtm: '1400.00',
      strikePrice: '80000.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '1000.0'
    },
    {
      clientName: 'VINAY SHAH',
      clientCode: '26640004G',
      scriptName: 'SENSEX',
      optionType: 'PE',
      mtm: '6000.00',
      strikePrice: '75800.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '1000.0'
    },
    {
      clientName: 'VINAY SHAH',
      clientCode: '26640004G',
      scriptName: 'SENSEX',
      optionType: 'CE',
      mtm: '2440.00',
      strikePrice: '75800.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '800.0'
    },
    {
      clientName: 'VINAY SHAH',
      clientCode: '26640004G',
      scriptName: 'SENSEX',
      optionType: 'CE',
      mtm: '870.00',
      strikePrice: '80000.0',
      expDate: '30-04-2026',
      openBuy: '0.0',
      openSell: '600.0'
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
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (column) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === 'asc' ? (
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
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleDownload = () => {
    const csv = [
      [
        'CLIENT NAME',
        'CLIENT CODE',
        'SCRIPT NAME',
        'OPTION TYPE',
        'MTM',
        'STRIKE PRICE',
        'EXP. DATE',
        'OPEN BUY',
        'OPEN SELL',
      ],
      ...sortedData.map((item) => [
        item.clientName,
        item.clientCode,
        item.scriptName,
        item.optionType,
        item.mtm,
        item.strikePrice,
        item.expDate,
        item.openBuy,
        item.openSell,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'open_position_report.csv';
    a.click();
  };

  return (
    <div className="flex flex-col">
      {/* Main Content Section */}
      <div className="flex-1 px-0 py-0">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-8 py-6 rounded-lg mb-6 max-w-[1600px] mx-auto">
          <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
            Search For
          </div>

          <div className="flex gap-6 items-end flex-wrap">
            {/* Dropdown */}
            <div className="relative w-56">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg flex items-center justify-between hover:bg-gray-800 transition-colors text-sm font-medium h-[48px]"
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
                className={`w-full pl-12 pr-4 py-3 h-[48px] border rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm transition-all shadow-sm bg-white ${showCustomError && !searchInput.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
            .open-position-table th, .open-position-table td {
              border: 1px solid #e5e7eb;
            }
            .open-position-table th {
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
          `}</style>
          <table className="w-full open-position-table border-collapse" style={{ fontFamily: 'futura, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#1EB04C' }} className="text-white">
                <th className="px-4 py-3 border-r border-white/10 text-left text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('clientName')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>CLIENT NAME</span>
                    {renderSortIcon('clientName')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-left text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('clientCode')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>CLIENT CODE</span>
                    {renderSortIcon('clientCode')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-left text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('scriptName')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>SCRIPT NAME</span>
                    {renderSortIcon('scriptName')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('optionType')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>OPTION TYPE</span>
                    {renderSortIcon('optionType')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('mtm')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>MTM</span>
                    {renderSortIcon('mtm')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('strikePrice')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>STRIKE PRICE</span>
                    {renderSortIcon('strikePrice')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('expDate')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>EXP. DATE</span>
                    {renderSortIcon('expDate')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('openBuy')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>OPEN BUY</span>
                    {renderSortIcon('openBuy')}
                  </div>
                </th>
                <th className="px-4 py-3 border-r border-white/10 text-center text-[12px] font-bold tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#18a045] transition-colors" onClick={() => handleSort('openSell')}>
                  <div className="flex items-center justify-between gap-1">
                    <span>OPEN SELL</span>
                    {renderSortIcon('openSell')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'
                  }`}
                >
                  <td className="px-3 py-2 text-xs text-gray-700 font-medium">
                    {row.clientName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 font-medium">
                    {row.clientCode}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">
                    {row.scriptName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center font-bold">
                    {row.optionType}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.mtm}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.strikePrice}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.expDate}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.openBuy}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700 text-center">
                    {row.openSell}
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
