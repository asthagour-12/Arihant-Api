import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "./logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-icon') && !event.target.closest('.dropdown-menu')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="topbar bg-[#34b350] text-white flex justify-between items-center px-6 py-3 shadow-md">
        
        {/* LEFT - LOGO & MENU */}
        <div className="left flex items-center gap-6">
          <img src={logo} alt="Arihant Capital" className="logo h-10 object-contain" />

          <div className="menu flex gap-5 text-sm font-semibold">
            <span 
              onClick={() => navigate("/dashboard")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Dashboard
            </span>

            <span 
              onClick={() => navigate("/reports")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Reports
            </span>

            <Link 
              to="/account-opening" 
              className="hover:text-gray-200 transition-colors text-white cursor-pointer"
            >
              Account Opening
            </Link>

            <span 
              onClick={() => navigate("/download")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Download
            </span>

            <span className="active border-b-2 border-white pb-1">
              Research call
            </span>

            <span 
              onClick={() => navigate("/dealslip")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Deal Slip
            </span>

            <span 
              onClick={() => navigate("/third-party")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Third Party
            </span>

            <span 
              onClick={() => navigate("/contests")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Contests
            </span>

            <span 
              onClick={() => navigate("/profile")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Profile <sup className="beta-badge">BETA</sup>
            </span>

            <Link 
              to="/clicktocall" 
              className="text-white cursor-pointer hover:text-gray-200 transition-colors outline-none border-none"
            >
              Click To Call
            </Link>

            <span 
              onClick={() => navigate("/payout")} 
              className="cursor-pointer hover:text-gray-200 transition-colors"
            >
              Payout
            </span>
          </div>
        </div>

        {/* RIGHT - USER DROPDOWN */}
        <div className="right relative">
          <div 
            className="user-icon cursor-pointer flex items-center gap-1 hover:text-gray-200 transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <i className="fa-solid fa-user"></i>
            <i className="fa fa-chevron-down text-xs"></i>
          </div>
          
          {dropdownOpen && (
            <div className="dropdown-menu absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]">
              <div className="py-1">
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => navigate("/profile")}
                >
                  <i className="fa fa-user-circle mr-2 text-gray-500"></i>
                  Customer Details
                </div>
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => navigate("/kra-status")}
                >
                  <i className="fa fa-search mr-2 text-gray-500"></i>
                  KRA Status
                </div>
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {}}
                >
                  <i className="fa fa-headset mr-2 text-gray-500"></i>
                  Customer Support
                </div>
                <div 
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center border-t border-gray-200"
                  onClick={handleLogout}
                >
                  <i className="fa fa-sign-out-alt mr-2 text-red-500"></i>
                  <span className="text-red-500">Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SPACING BELOW HEADER */}
      <div className="p-4 pt-11"></div>
    </>
  );
}