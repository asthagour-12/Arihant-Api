import React, { useState } from "react";
import Header from "./Header.jsx";
import HoldingReport from "./HoldingReport.jsx";
import OpenPosition from "./Openposition.jsx";
import FOGlobalPosition from "./FoglobalPosition.jsx";
import GlobalPosition from "./GlobalPosition.jsx";

// Import other reports from src/pages/
import ReactivationReport from "./pages/ReactivationReport.jsx";
import SamparkReport from "./pages/SamparkReport.jsx";
import Brokerage from "./pages/Brokerage.jsx";
import TrialBalance from "./pages/TrialBalance.jsx";
import Ledger from "./pages/Ledger.jsx";
import ClientMIS from "./pages/ClientMIS.jsx";
import ContractNote from "./pages/ContractNote.jsx";
import AuditorPortal from "./pages/AuditorPortal.jsx";
import RMS from "./pages/RMS.jsx";
import MobileLogin from "./pages/MobileLogin.jsx";
import MTFSetoff from "./pages/MTFSetoff.jsx";
import IPOReport from "./pages/IPOReport.jsx";
import PerformanceReport from "./pages/PerformanceReport.jsx";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("Transaction");
  const [activeSubTab, setActiveSubTab] = useState("Holding");

  const tabs = [
    "Transaction",
    "Brokerage",
    "Trial Balance",
    "Ledger",
    "Client MIS",
    "Contract Note",
    "Auditor Portal",
    "RMS",
    "Mobile Login",
    "MTF SetOff",
    "IPO Report",
    "Performance Report",
    "Reactivation Report",
    "Sampark Report",
  ];

  const transactionTabs = [
    "Holding",
    "Open Position",
    "Global Position",
    "FO Global Position",
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Transaction":
        if (activeSubTab === "Holding") return <HoldingReport />;
        if (activeSubTab === "Open Position") return <OpenPosition />;
        if (activeSubTab === "Global Position") return <GlobalPosition />;
        if (activeSubTab === "FO Global Position") return <FOGlobalPosition />;
        return null;
      case "Reactivation Report":
        return <ReactivationReport />;
      case "Sampark Report":
        return <SamparkReport />;
      case "Brokerage":
        return <Brokerage />;
      case "Trial Balance":
        return <TrialBalance />;
      case "Ledger":
        return <Ledger />;
      case "Client MIS":
        return <ClientMIS />;
      case "Contract Note":
        return <ContractNote />;
      case "Auditor Portal":
        return <AuditorPortal />;
      case "RMS":
        return <RMS />;
      case "Mobile Login":
        return <MobileLogin />;
      case "MTF SetOff":
        return <MTFSetoff />;
      case "IPO Report":
        return <IPOReport />;
      case "Performance Report":
        return <PerformanceReport />;
      default:
        return <div className="p-10 text-center text-gray-500">Select a report to view content</div>;
    }
  };

  // Always show header for unified layout across all reports
  const needsHeader = true;

  return (
    <div className="reports-wrapper w-full">
      <div className="bg-[#f3f3f3]">
        {needsHeader && <Header />}

        <div className={`bg-gray-100 p-2 md:p-6 ${needsHeader ? "mt-6" : ""}`}>

          <div className="tabs-wrapper w-full bg-white px-4 md:px-8 pt-2 shadow-md border border-gray-200 rounded-lg max-w-[1700px] mx-auto mt-8">
            {/* 🧭 LEVEL 1 TABS */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pt-3 text-[14px]">
              {tabs.map((tab) => (
                <span
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer pb-[10px] transition-all ${activeTab === tab
                    ? "border-b-[3px] border-[#34b350] font-bold text-black"
                    : "text-gray-500 font-medium hover:text-black"
                    }`}
                >
                  {tab}
                </span>
              ))}
            </div>

            {/* 🧭 LEVEL 2 TABS (Only for Transaction) */}
            {activeTab === "Transaction" && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pt-4 text-[14px]">
                {transactionTabs.map((inner) => (
                  <span
                    key={inner}
                    onClick={() => setActiveSubTab(inner)}
                    className={`cursor-pointer pb-[10px] transition-all ${activeSubTab === inner
                      ? "border-b-[3px] border-[#34b350] font-bold text-black"
                      : "text-gray-600 font-medium hover:text-black"
                      }`}
                  >
                    {inner} {inner === "Holding" ? "Report" : ""}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 📦 CONTENT */}
          <div className={`max-w-[1700px] mx-auto ${activeTab === "Transaction" ? "mt-5" : ""}`}>
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
}
