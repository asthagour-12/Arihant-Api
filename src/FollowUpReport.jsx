import { Search, ChevronLeft, ChevronRight, Calendar, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header.jsx";

export default function FollowUpReport() {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate calendar days
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateString = (day, month, year) => {
    return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
  };

  const handleDateSelect = (day) => {
    const formattedDate = formatDateString(day, currentMonth.getMonth(), currentMonth.getFullYear());
    setSelectedDate(formattedDate);
    setShowCalendar(false);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          onClick={() => handleDateSelect(day)}
          className="p-1 text-center cursor-pointer hover:bg-green-100 rounded text-xs"
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  // 🔹 Apply validation
  const handleApply = () => {
    if (!search.trim() || !selectedDate) {
      setErrorMessage("please enter a valid client code");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="download-container">
        <Header />
      </div>

      {/* BODY */}
      <div className="bg-[#f3f3f3] h-50 px-5 pt-[82px] pb-6">
        {/* TABS CONTAINER */}
        <div className="bg-white rounded-[18px] shadow-sm px-7 pt-6 pb-0">
          <div className="flex gap-8 text-sm border-b border-gray-300 pb-3">
            <button 
              onClick={() => navigate("/clicktocall")}
              className="pb-2 text-gray-500 hover:text-black transition-colors"
            >
              Click to Call Inactive
            </button>
            <button className="pb-2 text-black font-semibold border-b-2 border-green-600">
              Follow Up Report
            </button>
          </div>

          {/* Filters - Matching Click to Call Inactive styling */}
          <div className="bg-[#efefef] px-7 pt-3 pb-4 -mx-7">
            <div className="flex items-end gap-8 flex-wrap">
              {/* Search */}
              <div>
                <p className="text-sm text-black mb-0 pb-2">Search client code</p>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search client code"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 h-[44px] rounded-full border border-gray-300 w-[250px] bg-white outline-none focus:border-green-600 transition-all"
                  />
                  <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* Date Picker */}
              <div ref={calendarRef}>
                <p className="text-sm text-black mb-0 pb-2">As On (Date)</p>
                <div className="relative group">
                  <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 h-[44px] w-[250px] focus-within:border-green-600 transition-all">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate}
                      readOnly
                      className="outline-none text-sm w-full font-medium cursor-pointer"
                      onClick={() => setShowCalendar(!showCalendar)}
                    />
                    <Calendar 
                      className="text-gray-400 cursor-pointer hover:text-green-600 transition-colors" 
                      size={18}
                      onClick={() => setShowCalendar(!showCalendar)}
                    />
                  </div>
                  
                  {/* Calendar Popup */}
                  {showCalendar && (
                    <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-xl p-3 z-50 w-64 animate-in fade-in zoom-in duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={16}/></button>
                        <h3 className="font-bold text-sm text-gray-800">{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={16}/></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 uppercase mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Apply Button */}
              <button 
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 text-white px-10 h-[44px] rounded-full font-bold text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                APPLY
                <span className="text-lg">›</span>
              </button>
            </div>
          </div>
        </div>

        {/* ERROR POPUP (RIGHT SIDE) */}
        {showError && (
          <div className="fixed top-4 right-4 bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-[350px] transition-all duration-300 ease-in-out mt-12">
            <div>
              <p className="font-semibold text-lg">Error</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
            <div
              onClick={() => setShowError(false)}
              className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center cursor-pointer"
            >
              <span className="text-xs">×</span>
            </div>
          </div>
        )}

        {/* Meaning Text */}
        <div className="flex items-center justify-center gap-8 my-16">
          <div className="w-[190px] h-[1px] bg-gray-300"></div>
          <p className="text-[14px] text-gray-700">
            What we mean when we say -
            <span className="font-semibold"> (Z)</span>: Zone,
            <span className="font-semibold"> (R)</span>: Region,
            <span className="font-semibold"> (Br)</span>: Branch,
            <span className="font-semibold"> (AP)</span>: Authorized Person/Sub Broker
          </p>
          <div className="w-[190px] h-[1px] bg-gray-300"></div>
        </div>

        {/* Product Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-lg font-semibold mb-6">Arihant Product</h2>
          <div className="flex flex-wrap gap-32 font-medium">
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Official Website</a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Demat your MF Units</a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Insta Options</a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Trade Bridge</a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Value Stocks</a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">Stock Stack</a>
          </div>
        </div>
      </div>
    </div>
  );
}