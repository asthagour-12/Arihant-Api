import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import logo from "./logo-arihant-capital.png";

export default function FollowUpReport() {
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div>
      {/* HEADER */}
      <div className="download-container">
        <div className="topbar">
          <div className="left">
            <img src={logo} alt="logo" className="logo" />
            <div className="menu">
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <span className="text-white">Reports</span>
              <span className="text-white">Account Opening</span>
              <span className="text-white">Download</span>
              <Link to="/researchcall" className="text-white">Research call</Link>
              <Link to="/dealslip" className="text-white">Deal Slip</Link>
              <span onClick={() => navigate("/third-party")} className="text-white cursor-pointer hover:underline">Third Party</span>
              <Link to="/contests" className="text-white">contests</Link>
              <span className="text-white">Profile<sup className="beta-badge">BETA</sup></span>
              <Link to="/clicktocall" className="text-white">Click To Call</Link>
              <Link to="/payout" className="text-white">Payout</Link>
            </div>
          </div>

          <div className="right relative">
            <div
              className="user-icon cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <i className="fa-solid fa-user text-white"></i>
              <i className="fa fa-chevron-down fa-2xs text-white"></i>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm hover:bg-gray-100">Customer Details</div>
                  <div className="px-4 py-2 text-sm hover:bg-gray-100">Customer Support</div>
                  <div className="px-4 py-2 text-sm hover:bg-gray-100 border-t text-red-500">
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 min-h-screen mt-[75px] px-6 pb-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex gap-8 border-b pb-3">
            <button 
              onClick={() => navigate("/clicktocall")}
              className="text-gray-500 font-medium"
            >
              Click to Call Inactive
            </button>
            <button className="text-black font-semibold border-b-2 border-green-500 pb-2">
              Follow Up Report
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-100 rounded-lg p-6 mt-6 flex items-end gap-6 flex-wrap">
            {/* Search */}
            <div>
              <p className="text-sm text-black mb-2">Search By Client</p>
              <div className="flex items-center bg-white border rounded-full px-4 py-2 w-72 h-[44px]">
                <Search className="text-gray-400 w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search client code"
                  className="outline-none text-sm w-full"
                />
              </div>
            </div>

            {/* Date */}
            <div ref={calendarRef}>
              <p className="text-sm text-black mb-2">As On (Date)</p>
              <div className="relative">
                <div className="flex items-center bg-white border rounded-lg px-4 py-2 w-72 h-[44px]">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate}
                    readOnly
                    className="outline-none text-sm w-full"
                  />
                  <Calendar 
                    className="text-black cursor-pointer" 
                    onClick={() => setShowCalendar(!showCalendar)}
                  />
                </div>
                
                {/* Calendar Popup */}
                {showCalendar && (
                  <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50 w-48">
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-2">
                      <button 
                        onClick={() => changeMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <h3 className="font-semibold text-xs">
                        {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </h3>
                      <button 
                        onClick={() => changeMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium mb-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="p-1 text-gray-600">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="h-[44px] flex items-end">
              <button className="bg-[#28a745] hover:bg-[#23923d] text-white font-semibold px-8 h-full rounded-full flex items-center gap-2">
                APPLY
                <span className="text-lg">{'>'}</span>
              </button>
            </div>
          </div>
        </div>

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
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600">Official Website</a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600">Demat your MF Units</a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600">Insta Options</a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600">Trade Bridge</a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600">Value Stocks</a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600">Stock Stack</a>
          </div>
        </div>
      </div>
    </div>
  );
}