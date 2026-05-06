import React, { useState } from "react";

const PayoutDashboard = () => {
  const [activeTab, setActiveTab] = useState("Payout Report");

  const tabs = ["Payout", "Bulk Payout", "Payout Report", "Cancel Request"];

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-[#34b350] selection:text-white">
      {/* 🟢 TOP NAVBAR */}
      <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white text-[13px] font-bold">
        <div className="flex items-center gap-12">
          <div className="font-black text-2xl tracking-tighter cursor-pointer">ArihantCapital</div>
          <nav className="flex items-center gap-6 opacity-95">
             <span>Dashboard</span>
             <span className="border-b-2 border-white pb-1">Reports</span>
             <span>Account Opening</span>
             <span>Download</span>
             <span>Research Call</span>
             <span>Deal Slip</span>
             <span>Third Party</span>
             <span>Contests</span>
             <div className="relative">
                <span>Portfolio</span>
                <span className="absolute -top-3 -right-6 bg-red-500 text-[8px] px-1 rounded-sm flex items-center h-3">BETA</span>
             </div>
             <span>Click To Call</span>
             <span>Payout</span>
          </nav>
        </div>
        <div className="flex items-center gap-5">
           <div className="bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30">
             <i className="fas fa-user text-[16px]"></i>
           </div>
        </div>
      </div>

            {/* 📑 SECONDARY TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
                <div className="flex flex-wrap gap-x-[45px] gap-y-4 mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-[16px] font-bold transition-all relative outline-none tracking-tighter ${activeTab === tab ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🖥 TAB CONTENT */}
            <div className="px-[40px] py-[30px] min-h-[500px] bg-white">
                <div className="space-y-10">
                    {activeTab === "Payout" && <PayoutTab />}
                    {activeTab === "Bulk Payout" && <BulkPayoutTab />}
                    {activeTab === "Payout Report" && <PayoutReportTab />}
                    {activeTab === "Cancel Request" && <CancelRequestTab />}

                    {/* BOTTOM LEGEND */}
                    <div className="pt-20 pb-10 text-center text-[14px] text-gray-600 font-normal border-t border-gray-50">
                        What we mean when we say - <span className="font-bold">(Z)</span>: Zone, <span className="font-bold">(R)</span>: Region, <span className="font-bold">(Br)</span>: Branch, <span className="font-bold">(AP)</span>: Authorized Person/Sub Broker
                    </div>
                </div>
            </div>

            {/* 📦 FOOTER PRODUCT SECTION */}
            <div className="px-[40px] py-16 bg-white border-t border-gray-100">
                <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm">
                    <div className="text-2xl font-black text-gray-800 mb-10 pb-4 border-b border-gray-50 uppercase tracking-tighter">Arihant Product</div>
                    <div className="flex flex-wrap justify-between gap-8 text-[#34b350] font-bold text-[14px]">
                        {[
                            { label: "Official Website", url: "https://www.arihantcapital.com/" },
                            { label: "Demat your MF Units", url: "https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" },
                            { label: "Insta Options", url: "https://instaoptions.arihantplus.com/login" },
                            { label: "Trade Bridge", url: "https://tradebridge.arihantplus.com/signup" },
                            { label: "Value Stocks", url: "https://arihantplus.valuestocks.in/" },
                            { label: "Stock Stack", url: "https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" }
                        ].map(p => (
                            <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">{p.label}</a>
                        ))}
                    </div>
                </div>
            </div>

            {/* 🔗 MAIN FOOTER */}
            <div className="bg-white border-t border-gray-100 px-[40px] py-20 grid grid-cols-1 md:grid-cols-4 gap-16 text-[14px]">
                <div className="space-y-6">
                    <h4 className="font-bold text-gray-800 uppercase tracking-tight">Product</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li className="hover:text-[#34b350] cursor-pointer">Equity</li>
                        <li className="hover:text-[#34b350] cursor-pointer">Mutual Funds & SIP</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-gray-800 uppercase tracking-tight">MEDIA CENTER</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li className="hover:text-[#34b350] cursor-pointer">About Us</li>
                        <li className="hover:text-[#34b350] cursor-pointer">Investor Relations</li>
                        <li className="hover:text-[#34b350] cursor-pointer">Media Center</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-gray-800 uppercase tracking-tight">OTHER LINKS</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li className="hover:text-[#34b350] cursor-pointer">Careers</li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold text-gray-800 uppercase tracking-tight">Connect With Us On</h4>
                    <ul className="space-y-4 text-gray-500 font-medium">
                        <li className="hover:text-[#34b350] cursor-pointer">Contact Us</li>
                        <li className="hover:text-[#34b350] cursor-pointer">Support</li>
                        <li className="hover:text-[#34b350] cursor-pointer">Fund Transfer</li>
                    </ul>
                </div>
            </div>
    </div>
  );
};

// --- TAB COMPONENTS ---

const PayoutTab = () => (
    <div className="space-y-6">
        <div className="bg-[#f8f9fa] p-10 rounded-xl space-y-6">
            <div className="text-gray-500 font-bold text-[14px]">Search By Client</div>
            <div className="flex items-center gap-6">
                <div className="relative w-[340px]">
                    <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="Search client code" 
                        className="w-full h-[52px] border border-gray-200 rounded-full pl-12 pr-6 text-[14px] bg-white outline-none focus:border-[#34b350] transition-all" 
                    />
                </div>
                <button className="bg-[#34b350] text-white px-10 h-[52px] rounded-full font-bold text-[15px] transition-all hover:bg-[#2da047]">
                    SEARCH &gt;
                </button>
            </div>
        </div>
    </div>
);

const BulkPayoutTab = () => (
    <div className="space-y-6">
        <div className="bg-[#f8f9fa] p-10 rounded-xl flex items-center gap-6">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center w-[400px]">
                <input 
                    type="file" 
                    className="text-[13px] text-gray-500 cursor-pointer w-full"
                />
            </div>
            <button className="bg-[#34b350] text-white px-10 h-[52px] rounded-full font-bold text-[15px] transition-all hover:bg-[#2da047]">
                SUBMIT &gt;
            </button>
        </div>
    </div>
);

const PayoutReportTab = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="text-[14px] text-gray-500 font-normal">Search results(0)</div>
            <button className="text-[#34b350] hover:scale-110 transition-transform">
                <i className="fas fa-download text-xl"></i>
            </button>
        </div>

        <div className="space-y-4">
            <div className="text-gray-500 font-bold text-[13px]">Request Date</div>
            <div className="flex items-center gap-6">
                <div className="relative w-[280px]">
                    <input 
                        type="text" 
                        placeholder="DD/MM/YYYY" 
                        className="w-full h-[52px] border border-gray-200 rounded-lg px-6 text-[14px] text-gray-700 bg-white outline-none"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
                </div>
                <button className="bg-red-500 text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all hover:bg-red-600">
                    CLEAR
                </button>
                <button className="bg-[#34b350] text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all hover:bg-[#2da047]">
                    SEARCH
                </button>
            </div>
        </div>

        <div className="flex gap-6">
            {["Total Request", "Total Process", "Total Cancel"].map(l => (
                <div key={l} className="flex-1 bg-white border border-gray-200 rounded-lg p-6 min-w-[200px]">
                    <div className="text-[14px] text-gray-500 font-normal mb-1">{l}</div>
                    <div className="text-[20px] font-bold text-gray-800"></div>
                </div>
            ))}
        </div>

        <div className="bg-white border-y border-gray-100 overflow-hidden">
            <table className="w-full text-left text-[13px] border-collapse">
                <thead className="bg-[#34b350] text-white">
                    <tr>
                        {["Date", "Client Code", "Client Name", "BankAccount", "Request Amount", "Status"].map((header) => (
                            <th key={header} className="px-4 py-4 border-r border-white/10 last:border-0 font-bold whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                    {header} <div className="flex flex-col text-[7px] leading-[3px] opacity-40"><span>▲</span><span>▼</span></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6" className="px-4 py-12 text-gray-400 text-left font-normal text-[15px]">No data to display</td>
                    </tr>
                </tbody>
            </table>
            <div className="px-4 py-4 text-gray-400 font-normal text-[13px]">0 total</div>
        </div>
    </div>
);

const CancelRequestTab = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center">
            <div className="text-[14px] text-gray-500 font-normal">Search results(0)</div>
            <button className="text-[#34b350] hover:scale-110 transition-transform">
                <i className="fas fa-download text-xl"></i>
            </button>
        </div>

        <div className="bg-white border-y border-gray-100 overflow-hidden">
            <table className="w-full text-left text-[13px] border-collapse">
                <thead className="bg-[#34b350] text-white">
                    <tr>
                        {["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"].map((header) => (
                            <th key={header} className="px-4 py-4 border-r border-white/10 last:border-0 font-bold whitespace-nowrap">
                                <div className="flex items-center gap-1.5">{header} <div className="flex flex-col text-[7px] leading-[3px] opacity-40"><span>▲</span><span>▼</span></div></div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6" className="px-4 py-12 text-gray-400 text-left font-normal text-[15px]">No data to display</td>
                    </tr>
                </tbody>
            </table>
            <div className="px-4 py-4 text-gray-400 font-normal text-[13px]">0 total</div>
        </div>
    </div>
);

export default PayoutDashboard;
