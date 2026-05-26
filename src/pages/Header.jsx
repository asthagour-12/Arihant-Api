import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from '../logo-arihant-capital.png';
import { getUserProfile } from '../api/korpApiService';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [animateFlip, setAnimateFlip] = useState(false);

  useEffect(() => {
    if (animateFlip) {
      const timer = setTimeout(() => setAnimateFlip(false), 600);
      return () => clearTimeout(timer);
    }
  }, [animateFlip]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('branchCode');
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('connect_token');
    localStorage.removeItem('connect_manager');
    navigate('/');
  };

  return (
    <>
      <style>{`
        @keyframes customFlip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg) scale(1.25);
            color: #d1fae5;
          }
          100% {
            transform: rotateY(360deg);
          }
        }

        .animate-flip-active {
          animation: customFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block !important;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
      <div className="bg-[#34b350] px-6 h-[60px] flex items-center justify-between fixed top-0 z-[1000] shadow-md w-full">
      <div className="flex items-center gap-10 h-full">
        <div className="flex items-center h-full">
          <img src={logo} alt="logo" className="h-12 object-contain cursor-pointer" onClick={() => navigate("/dashboard")} />
        </div>

        <nav className="hidden lg:flex items-center gap-6 h-full text-white/90 text-[14px] font-semibold">
          <span
            onClick={() => navigate("/dashboard")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/dashboard") ? "text-white font-black" : ""}`}
          >
            Dashboard
          </span>
          <span
            onClick={() => navigate("/reports")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/reports") ? "text-white font-black" : ""}`}
          >
            Reports
          </span>
          <span
            onClick={() => navigate("/account-opening")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/account-opening") || location.pathname.startsWith("/kra-status") ? "text-white font-black" : ""}`}
          >
            Account Opening
          </span>
          <span
            onClick={() => {
              getUserProfile()
                .then((res) => console.log("Header -> getprofile success:", res.data))
                .catch((err) => console.error("Header -> getprofile error:", err));
              navigate("/download");
            }}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/download") || location.pathname.startsWith("/marketing-material") ? "text-white font-black" : ""}`}
          >
            Download
          </span>
          <span
            onClick={() => {
              getUserProfile()
                .then((res) => console.log("Header -> getprofile success on Research Call click:", res.data))
                .catch((err) => console.error("Header -> getprofile error on Research Call click:", err));
              navigate("/researchcall");
            }}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/researchcall") ? "text-white font-black" : ""}`}
          >
            Research Call
          </span>
          <span
            onClick={() => navigate("/dealslip")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/dealslip") ? "text-white font-black" : ""}`}
          >
            Deal Slip
          </span>
          <span
            onClick={() => navigate("/third-party")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/third-party") || location.pathname.startsWith("/mutual-fund") || location.pathname.startsWith("/sip-calculator") ? "text-white font-black" : ""}`}
          >
            Third Party
          </span>
          <span
            onClick={() => navigate("/contests")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/contests") ? "text-white font-black" : ""}`}
          >
            Contests
          </span>
          <span
            onClick={() => navigate("/profile")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/profile") ? "text-white font-black" : ""}`}
          >
            Profile <sup className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-1 font-bold">BETA</sup>
          </span>
          <Link
            to="/clicktocall"
            className={`outline-none border-none no-underline transition-all hover:text-white py-5 ${location.pathname.startsWith("/clicktocall") || location.pathname.startsWith("/followupreport") ? "text-white font-black" : "text-white/90"}`}
          >
            Click To Call
          </Link>
          <span
            onClick={() => navigate("/payout")}
            className={`cursor-pointer transition-all hover:text-white py-5 ${location.pathname.startsWith("/payout") ? "text-white font-black" : ""}`}
          >
            Payout
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        <div
          className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-white/10 transition-all text-white"
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setAnimateFlip(true);
          }}
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <i className={`fa-solid fa-user text-[14px] ${animateFlip ? "animate-flip-active" : ""}`}></i>
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
              <div 
                onClick={handleLogout}
                className="px-5 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer flex items-center border-t border-gray-50 transition-colors"
              >
                <i className="fa fa-sign-out-alt mr-3"></i>
                <span className="font-bold">Logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Header;
