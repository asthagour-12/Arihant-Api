import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, Download } from 'lucide-react';

export default function OpenPosition() {
  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const sortedData = [...tableData].sort((a, b) => {
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
    <div className="bg-white min-h-screen flex flex-col">
      {/* Main Content Section */}
      <div className="flex-1 px-8 py-6">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-8 py-6 rounded-lg mb-8 max-w-[1600px] mx-auto">
          <div className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-6">
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
                className="w-full pl-12 pr-4 py-3 h-[48px] border border-gray-200 rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm transition-all shadow-sm bg-white"
              />
            </div>

            {/* Apply Button */}
            <button className="bg-[#27ae60] hover:bg-[#219150] text-white px-8 h-[48px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2">
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
      </div>
    </div>
  );
}
