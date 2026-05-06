import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validateDates } from './utils/dateValidation';
import { toast } from 'react-toastify';

export default function GlobalPosition() {
  const [searchInput, setSearchInput] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [error, setError] = useState("");
  const fromRef = React.useRef();
  const toRef = React.useRef();

  const handleApply = () => {
    const errorMsg = validateDates(fromDate, toDate);
    if (errorMsg) {
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }
    setError("");
    toast.success("Filters applied");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <style>{`
        .no-native-calendar::-webkit-calendar-picker-indicator {
          opacity: 0;
          pointer-events: none;
        }
        .no-native-calendar::-ms-clear,
        .no-native-calendar::-ms-expand {
          display: none;
        }
      `}</style>
      {/* Main Content Section */}
      <div className="flex-1 px-8 py-6">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-8 py-6 rounded-lg mb-8 max-w-[1600px] mx-auto">
          <div className="flex gap-6 items-end flex-wrap">
            {/* Search Input */}
            <div className="relative group flex-1 max-w-sm">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#27ae60] transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search client code"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 h-[48px] border border-gray-200 rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm bg-white shadow-sm transition-all"
              />
            </div>

            {/* From Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">
                From Date
              </label>
              <div className="relative group">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                  size={16}
                  onClick={() => fromRef.current.setOpen(true)}
                />
              </div>
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">
                To Date
              </label>
              <div className="relative group">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <Calendar
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                  size={16}
                  onClick={() => toRef.current.setOpen(true)}
                />
              </div>
            </div>

            {/* Apply Button */}
            <button 
              onClick={handleApply}
              className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto"
            >
              <span>APPLY</span>
              <span className="text-lg">›</span>
            </button>
          </div>
        </div>

        {/* Legend/Info Text */}
        <div className="mt-8 px-6 py-6 text-center max-w-[1600px] mx-auto">
          <p className="text-gray-600 text-sm font-light">
            What we mean when we say -{' '}
            <span className="font-semibold text-gray-800">
              (Z): Zone, (R): Region, (Br): Branch, (AP): Authorized Person/Sub Broker
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}