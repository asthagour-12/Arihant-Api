import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from './logo-arihant-capital.png';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#34b350] px-6 h-[60px] flex items-center justify-between fixed top-0 z-[1000] shadow-md w-full">
      <div className="flex items-center gap-10 h-full">
        <div className="flex items-center h-full">
          <img src={logo} alt="logo" className="h-12 object-contain cursor-pointer" onClick={() => navigate("/dashboard")} />
        </div>

        <nav className="hidden lg:flex items-center gap-6 h-full text-white/90 text-[14px] font-semibold">
          <span 
            onClick={() => navigate("/dashboard")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/dashboard") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Dashboard
          </span>
          <span 
            onClick={() => navigate("/reports")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/reports") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Reports
          </span>
          <span 
            onClick={() => navigate("/account-opening")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/account-opening") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Account Opening
          </span>
          <span 
            onClick={() => navigate("/download")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/download") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Download
          </span>
          <span 
            onClick={() => navigate("/researchcall")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/researchcall") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Research Call
          </span>
          <span 
            onClick={() => navigate("/dealslip")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/dealslip") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Deal Slip
          </span>
          <span 
            onClick={() => navigate("/third-party")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/third-party") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Third Party
          </span>
          <span 
            onClick={() => navigate("/contests")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/contests") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Contests
          </span>
          <span 
            onClick={() => navigate("/profile")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/profile") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Portfolio <sup className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1 font-bold">BETA</sup>
          </span>
          <Link 
            to="/clicktocall" 
            className={`no-underline transition-all hover:text-white py-5 ${isActive("/clicktocall") ? "border-b-4 border-white text-white font-bold" : "text-white/90"}`}
          >
            Click To Call
          </Link>
          <span 
            onClick={() => navigate("/payout")} 
            className={`cursor-pointer transition-all hover:text-white py-5 ${isActive("/payout") ? "border-b-4 border-white text-white font-bold" : ""}`}
          >
            Payout
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        <div
          className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-white/10 transition-all text-white"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user text-[14px]"></i>
          </div>
          <i className="fa fa-chevron-down text-[10px] opacity-70"></i>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-[1100] animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            <div className="py-2">
              <a href="https://connectuat.arihantcapital.com/contact" target="_blank" rel="noopener noreferrer" className="px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center no-underline transition-colors">
                <i className="fa fa-user-circle mr-3 text-gray-400"></i>
                Contact details
              </a>
              <a href="https://support.arihantcapital.com/support/home" target="_blank" rel="noopener noreferrer" className="px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center no-underline transition-colors">
                <i className="fa fa-headset mr-3 text-gray-400"></i>
                Customer Support
              </a>
              <div className="px-5 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center border-t border-gray-50 transition-colors">
                <i className="fa fa-sign-out-alt mr-3"></i>
                <span className="font-bold">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
