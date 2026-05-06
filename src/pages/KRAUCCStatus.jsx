import React from "react";

const KRAUCCStatus = () => {
    const topTabs = ["KRA & UCC Status", "Hold KRA Status", "Modification Status", "Physical Account Opening", "Nominee Pending", "Contact Details", "Rekyc TAT", "EKYC TAT", "Reactivation TAT"];

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-[#34b350] selection:text-white">
            {/* 🟢 TOP DASHBOARD HEADER */}
            <div className="bg-[#34b350] px-[32px] h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white font-bold">
                <div className="flex items-center gap-10">
                    <div className="text-2xl font-black tracking-tighter">ArihantCapital</div>
                    <nav className="flex gap-6 text-[13px] opacity-90">
                        <span>Dashboard</span>
                        <span className="border-b-2 border-white pb-0.5">Reports</span>
                        <span>Account Opening</span>
                        <span>Contests</span>
                        <span>Click To Call</span>
                    </nav>
                </div>
            </div>

            {/* 🔵 BREADCRUMB */}
            <div className="bg-[#e6f7ff] px-[40px] py-[14px] flex items-center gap-3 text-[12px] text-gray-800 font-bold uppercase tracking-widest">
                <div className="w-[8px] h-[8px] bg-[#34b350] rounded-full shadow-[0_0_10px_rgba(52,179,80,0.4)]"></div>
                <span>Circulars</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#34b350]">KRA & UCC Status</span>
            </div>

            {/* 📑 SECONDARY NAVIGATION (TABS) */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px] sticky top-[64px] z-[90]">
                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4 overflow-x-auto no-scrollbar">
                    {topTabs.map((tab) => (
                        <div
                            key={tab}
                            className={`pb-3 text-[14px] font-bold transition-all relative cursor-pointer tracking-tighter whitespace-nowrap ${tab === "KRA & UCC Status" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] min-h-[600px]">
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12 space-y-10">
                    <div className="flex justify-between items-center px-1">
                        <div className="text-2xl font-black text-gray-900 tracking-tighter uppercase">KRA & UCC Status</div>
                        <div className="flex gap-4">
                            <button className="bg-white text-[#34b350] border-2 border-[#34b350] px-8 h-12 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-[#34b350] hover:text-white transition-all">CHECK UCC STATUS</button>
                            <button className="bg-[#34b350] text-white px-10 h-12 rounded-full font-black text-[12px] uppercase tracking-widest shadow-lg">DOWNLOAD XLS ↓</button>
                        </div>
                    </div>

                    <div className="flex items-end gap-8 max-w-xl group">
                        <div className="space-y-4 flex-1">
                            <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest ml-1 opacity-60">Search by PAN or Client Code</div>
                            <div className="relative">
                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#34b350] transition-colors font-bold text-lg">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Enter details..."
                                    className="w-full h-14 border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-[#34b350] transition-all"
                                />
                            </div>
                        </div>
                        <button className="bg-[#34b350] text-white px-12 h-14 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_8px_20px_-5px_rgba(52,179,80,0.5)] hover:shadow-[0_12px_25px_-5px_rgba(52,179,80,0.6)] active:scale-[0.98] transition-all">SEARCH &gt;</button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
                        <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                            <thead className="bg-[#34b350] text-white">
                                <tr className="leading-none">
                                    {["Client Code", "PAN", "Client Name", "KRA Agency", "KRA Status", "UCC Status", "Last Updated"].map((h) => (
                                        <th key={h} className="px-5 py-[22px] border-r border-white/10 last:border-0 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">{h} <div className="flex flex-col text-[7px] leading-[4px] opacity-40"><span>▲</span><span>▼</span></div></div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="7" className="py-32 text-center text-gray-300 font-black text-[22px] italic uppercase opacity-50 bg-gray-50/5">
                                        Enter details to view status
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">0 total records</div>
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

export default KRAUCCStatus;
