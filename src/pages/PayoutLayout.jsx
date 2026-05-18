import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header.jsx";

const PayoutLayout = ({ children }) => {
  const location = useLocation();
  const tabs = [
    { name: "Payout", path: "/payout" },
    { name: "Bulk Payout", path: "/bulk-payout" },
    { name: "Payout Report", path: "/payout-report" },
    { name: "Cancel Request", path: "/cancel-request" },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-[#27ae60] selection:text-white flex flex-col">
      {/* 🟢 STANDARD HEADER (UNTOUCHED) */}
      <Header />

      {/* 📑 PREMIUM SUB-NAVIGATION (TABS) */}
      <div className="bg-white border-b border-gray-100 px-6 sm:px-12 pt-6 sm:pt-8 shadow-sm mt-[60px]">
        <div className="max-w-[1600px] mx-auto flex flex-wrap gap-x-12 sm:gap-x-20 gap-y-4 mb-0 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.path}
              className={`pb-4 text-[14px] sm:text-[15px] font-bold transition-all relative outline-none tracking-tight flex items-center gap-3 group whitespace-nowrap ${location.pathname === tab.path
                ? "text-[#27ae60] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#27ae60] after:rounded-t-full"
                : "text-gray-400 hover:text-gray-600"
                }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${location.pathname === tab.path ? "bg-[#27ae60] scale-125 shadow-[0_0_8px_rgba(39,174,96,0.5)]" : "bg-transparent group-hover:bg-gray-200"}`}></div>
              {tab.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 🖥 PAGE CONTENT AREA */}
      <main className="flex-grow px-6 sm:px-12 py-8 sm:py-12 bg-[#f1f1f1]">
        <div className="max-w-[1600px] mx-auto">
          {/* CONTENT WRAPPER WITH FADE-IN */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>

          {/* INFO */}
          <div className="flex items-center gap-4 my-10 justify-center">
            <div className="w-32 border-t border-gray-200"></div>
            <p className="text-base text-gray-600 text-center flex-1">
              What we mean when we say -{" "}
              <b>(Z)</b>: Zone, <b>(R)</b>: Region, <b>(Br)</b>: Branch,{" "}
              <b>(AP)</b>: Authorized Person/Sub Broker
            </p>
            <div className="w-32 border-t border-gray-200"></div>
          </div>

          {/* PRODUCT CARD */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Arihant Product
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
              <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Official Website
              </a>
              <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Demat your MF Units
              </a>
              <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Insta Options
              </a>
              <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Trade Bridge
              </a>
              <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Value Stocks
              </a>
              <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Stock Stack
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayoutLayout;