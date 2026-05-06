import React from "react";

const PhysicalAccountOpening = () => {
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

            {/* 📑 SECONDARY NAVIGATION (TABS) */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px] sticky top-[64px] z-[90]">
                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4 overflow-x-auto no-scrollbar">
                    {topTabs.map((tab) => (
                        <div
                            key={tab}
                            className={`pb-3 text-[14px] font-bold transition-all relative cursor-pointer tracking-tighter whitespace-nowrap ${tab === "Physical Account Opening" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[30px] min-h-[600px] bg-white">
                <div className="space-y-8">
                    <div className="text-[14px] text-gray-500 font-normal">Search results(0)</div>

                    <div className="flex items-center gap-6">
                        <div className="relative w-[340px]">
                            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                            <input
                                type="text"
                                placeholder="Search code/name..."
                                className="w-full h-[52px] border border-gray-200 rounded-full pl-12 pr-6 text-[14px] bg-white outline-none focus:border-[#34b350] transition-all"
                            />
                        </div>
                        <button className="bg-[#34b350] text-white px-10 h-[52px] rounded-full font-bold text-[14px] transition-all hover:bg-[#2da047]">
                            APPLY &gt;
                        </button>
                    </div>

                    <div className="bg-white border-y border-gray-100 overflow-hidden mt-2">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead className="bg-[#34b350] text-white">
                                <tr>
                                    {["Inward Number", "Client Code", "Client Name", "PAN", "Date", "Current Status", "Remark"].map((h) => (
                                        <th key={h} className="px-4 py-4 border-r border-white/10 font-bold whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">
                                                {h} <div className="flex flex-col text-[7px] leading-[3px] opacity-40"><span>▲</span><span>▼</span></div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="7" className="px-4 py-12 text-gray-400 text-left font-normal text-[15px]">
                                        No recording found for selected criteria
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="px-4 py-5 text-gray-400 font-normal text-[13px]">
                            0 total
                        </div>
                    </div>

                    {/* BOTTOM LEGEND */}
                    <div className="pt-20 pb-10 text-center text-[14px] text-gray-600 font-normal">
                        What we mean when we say - <span className="font-bold">(Z)</span>: Zone, <span className="font-bold">(R)</span>: Region, <span className="font-bold">(Br)</span>: Branch, <span className="font-bold">(AP)</span>: Authorized Person/Sub Broker
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

export default PhysicalAccountOpening;
