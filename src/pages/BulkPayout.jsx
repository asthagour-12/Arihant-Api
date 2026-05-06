import React from "react";

const BulkPayout = () => {
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
                <span className="text-[#34b350]">Bulk Payout</span>
            </div>

            {/* 📑 SECONDARY TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
                <div className="flex flex-wrap gap-x-[100px] gap-y-4 mb-4">
                    {["Payout", "Bulk Payout", "Payout Report", "Cancel Request"].map((tab) => (
                        <div
                            key={tab}
                            className={`pb-3 text-[15px] font-bold transition-all relative cursor-pointer tracking-tighter ${tab === "Bulk Payout" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] pb-16 min-h-[600px]">
                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12 transition-all">
                    <div className="space-y-16">
                        <div className="bg-gray-50/50 border border-dashed border-gray-200 p-16 rounded-3xl flex flex-col items-center gap-8 shadow-inner max-w-6xl mx-auto">
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center w-full max-w-lg shadow-sm group hover:border-[#34b350] transition-all">
                                <input
                                    type="file"
                                    className="text-[13px] text-gray-500 file:mr-8 file:py-3 file:px-10 file:rounded-xl file:border-0 file:text-[12px] file:font-black file:bg-[#34b350] file:text-white hover:file:bg-[#2e7d32] file:cursor-pointer file:shadow-md cursor-pointer w-full"
                                />
                            </div>
                            <button className="bg-[#34b350] text-white px-16 h-16 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_10px_25px_-5px_rgba(52,179,80,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(52,179,80,0.5)] active:scale-[0.98] transition-all">
                                SUBMIT &gt;
                            </button>
                            <div className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] opacity-60 mt-4">Accepted Formats: .xlsx, .csv (Max 10MB)</div>
                        </div>
                        <div className="text-center text-[13px] font-medium text-gray-400 mt-28 italic opacity-80">
                            What we mean when we say - <span className="font-bold text-gray-600 tracking-tight">(Z): Zone, (R): Region, (Br): Branch, (AP): Authorized Person/Sub Broker</span>
                        </div>
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

export default BulkPayout;
