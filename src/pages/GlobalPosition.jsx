import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { validateDates } from './utils/dateValidation';
import { toast } from 'react-toastify';
import CalendarHeader from '../components/common/CalendarHeader';

export default function GlobalPosition() {
  const [searchInput, setSearchInput] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");

  React.useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const fromRef = React.useRef();
  const toRef = React.useRef();

  const handleApply = () => {
    if (!searchInput.trim()) {
      setCustomErrorMsg("Please enter Client Code");
      setShowCustomError(true);
      return;
    }
    if (!fromDate || !toDate) {
      setCustomErrorMsg("Please select Date range");
      setShowCustomError(true);
      return;
    }
    if (fromDate.toDateString() === toDate.toDateString()) {
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
    toast.error("Data not found", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored"
    });
  };

  return (
    <div className="flex flex-col">
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
      <div className="flex-1 px-0 py-0">
        {/* Search Section */}
        <div className="bg-gray-100 border border-gray-200 px-8 py-6 rounded-lg mb-6 max-w-[1600px] mx-auto">
          <div className="flex gap-4 items-end flex-wrap">
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
                className={`w-full pl-12 pr-4 py-3 h-[48px] border rounded-full focus:outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-green-50/50 text-sm bg-white shadow-sm transition-all ${showCustomError && !searchInput.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                  renderCustomHeader={(props) => <CalendarHeader {...props} />}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] ${showCustomError && !fromDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                  renderCustomHeader={(props) => <CalendarHeader {...props} />}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] ${showCustomError && !toDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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