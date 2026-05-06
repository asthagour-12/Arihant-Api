import React from "react";

const CancelRequest = () => {
    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-arihant-primary selection:text-white">
            {/* 🟢 TOP NAVBAR */}
            <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md">
                <div className="flex items-center gap-12">
                    <div className="flex items-baseline gap-1">
                        <span className="text-white font-black text-2xl tracking-tighter">ArihantCapital</span>
                        <span className="text-white/70 text-[10px] font-medium uppercase tracking-widest hidden lg:block">Generating Wealth</span>
                    </div>
                    <nav className="flex items-center gap-6 text-white text-[13px] font-bold opacity-95">
                        <span>Dashboard</span>
                        <span className="border-b-2 border-white pb-1">Reports</span>
                        <span>Account Opening</span>
                        <span>Download</span>
                        <span>Research Call</span>
                        <span>Deal Slip</span>
                        <span>Third Party</span>
                        <span>Contests</span>
                        <div className="relative">
                            <span>Portfolio <span className="absolute -top-3 -right-6 bg-red-500 text-[8px] px-1 rounded-sm flex items-center h-3">BETA</span></span>
                        </div>
                        <span>Click To Call</span>
                        <span>Payout</span>
                    </nav>
                </div>
            </div>

            {/* 🔵 BREADCRUMB */}
            <div className="bg-[#e6f7ff] px-[40px] py-[14px] flex items-center gap-3 text-[12px] text-gray-800 font-bold uppercase tracking-widest">
                <div className="w-[8px] h-[8px] bg-[#34b350] rounded-full shadow-[0_0_10px_rgba(52,179,80,0.4)]"></div>
                <span>Report</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#34b350]">Cancel Request</span>
            </div>

            {/* 📑 SECONDARY TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
                <div className="flex flex-wrap gap-x-[100px] gap-y-4 mb-4">
                    {["Payout", "Bulk Payout", "Payout Report", "Cancel Request"].map((tab) => (
                        <div
                            key={tab}
                            className={`pb-3 text-[15px] font-bold transition-all relative cursor-pointer tracking-tighter ${tab === "Cancel Request" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] pb-16 min-h-[600px]">
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12 transition-all space-y-10">
                    <div className="flex justify-between items-center px-1">
                        <div className="text-gray-900 font-black text-[17px] tracking-tighter uppercase whitespace-nowrap">Search results(1)</div>
                        <button className="w-12 h-12 rounded-full flex items-center justify-center text-[#34b350] bg-green-50 hover:bg-[#34b350] hover:text-white transition-all shadow-sm">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
                        <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                            <thead className="bg-[#34b350] text-white">
                                <tr className="leading-none">
                                    {["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"].map((header) => (
                                        <th key={header} className="px-6 py-[22px] border-r border-white/10 last:border-0 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">{header} <div className="flex flex-col text-[7px] leading-[4px] opacity-40"><span>▲</span><span>▼</span></div></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                <tr className="border-b border-gray-50 hover:bg-[#34b350]/[0.03] transition-colors group">
                                    <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-500">22/04/2026</td>
                                    <td className="px-6 py-6 border-r border-[#f9fafb] text-[13px] font-black text-gray-900">ARI3394</td>
                                    <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-900 uppercase">Demo Arihant User</td>
                                    <td className="px-6 py-6 border-r border-[#f9fafb] text-[14px] font-black text-[#34b350] tabular-nums tracking-tighter">₹ 25,000.00</td>
                                    <td className="px-6 py-6 border-r border-[#f9fafb]">
                                        <span className="bg-orange-50 text-orange-600 border border-orange-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">In Process</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <button className="bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest shadow-sm active:scale-[0.95]">CANCEL</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">1 total</div>
                    </div>
                </div>
            </div>

            {/* 📦 FOOTER PRODUCT SECTION */}
            <div className="px-[40px] pb-16">
                <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-sm">
                    <div className="text-2xl font-black text-gray-800 mb-10 pb-4 border-b border-gray-50 uppercase tracking-tighter">Arihant Product</div>
                    <div className="flex flex-wrap justify-between gap-8 text-[#34b350] font-black text-[14px]">
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
        </div>
    );
};

export default CancelRequest;
