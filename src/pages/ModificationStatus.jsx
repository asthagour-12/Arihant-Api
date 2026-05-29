import React, { useState } from "react";

const ModificationStatus = () => {
    const [subTab, setSubTab] = useState("Rekyc Modification");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const tabs = [
        "KRA & UCC Status", "Hold KRA Status", "Modification Status",
        "Physical Account Opening", "Nominee Pending", "Contact Details",
        "Rekyc TAT", "EKYC TAT", "Reactivation TAT"
    ];

    const rekycData = [
        { code: "206400028", pan: "XXXXXXXXX", name: "VIVEK SHAH", type: "Segment", date: "17/Feb/2026", status: "Updated" },
        { code: "206400023", pan: "XXXXXXXXX", name: "DHRUVIK BHAVESHKUMAR SHAH", type: "Segment", date: "23/Nov/2023", status: "Updated" }
    ];

    const activeData = subTab === "Rekyc Modification" ? rekycData : [];
    const totalPages = Math.ceil(activeData.length / rowsPerPage);
    const visibleData = activeData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); };
    const handlePrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1); };

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans">
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
                        <span>Portfolio</span>
                        <span>Click To Call</span>
                        <span>Payout</span>
                    </nav>
                </div>
            </div>

            {/* 📑 SECONDARY TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4">
                    {tabs.map((tab) => (
                        <div key={tab} className={`text-[15px] font-bold cursor-pointer relative pb-3 tracking-tighter ${tab === "Modification Status" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"}`}>
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[30px] min-h-[600px] bg-white">
                <div className="space-y-8">
                    {/* SUB-TABS */}
                    <div className="flex gap-x-12 border-b border-gray-200">
                        {["Physical Modification", "Rekyc Modification"].map(t => (
                            <button
                                key={t}
                                onClick={() => setSubTab(t)}
                                className={`text-[16px] font-bold relative pb-2 transition-colors tracking-tighter ${subTab === t ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#34b350]" : "text-gray-400 hover:text-gray-600"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    {/* CONTENT AREA INNER */}
                    <div className="space-y-6">
                        <div className="text-[14px] text-gray-500 font-normal">Search results({subTab === "Rekyc Modification" ? rekycData.length : "0"})</div>

                        <div className="flex items-center gap-6">
                            <div className="relative w-[340px]">
                                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                <input
                                    type="text"
                                    placeholder="Search client code"
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
                                        {(subTab === "Rekyc Modification"
                                            ? ["Clientcode", "PAN", "Client Name", "Type", "Date", "Status", "Admin Date"]
                                            : ["Client Code", "Client Name", "PAN", "Date", "Branch Code", "Request Type", "Status", "Remark"]
                                        ).map(h => (
                                            <th key={h} className="px-4 py-4 border-r border-white/10 font-bold whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    {h} <div className="flex flex-col text-[7px] leading-[3px] opacity-40"><span>▲</span><span>▼</span></div>
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {subTab === "Rekyc Modification" ? (
                                        visibleData.map((d, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-4 border-r border-gray-100 text-gray-700">{d.code}</td>
                                                <td className="px-4 py-4 border-r border-gray-100 text-gray-700">XXXXXXXXX</td>
                                                <td className="px-4 py-4 border-r border-gray-100 text-gray-700">{d.name}</td>
                                                <td className="px-4 py-4 border-r border-gray-100 text-gray-700">{d.type}</td>
                                                <td className="px-4 py-4 border-r border-gray-100 text-gray-700">{d.date}</td>
                                                <td className="px-4 py-4 border-r border-gray-100 text-[#34b350] font-bold">{d.status}</td>
                                                <td className="px-4 py-4 text-gray-400">—</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-4 py-12 text-gray-400 text-left font-normal text-[15px]">No data to display</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="px-4 py-4 text-gray-500 font-normal text-[13px] flex items-center justify-between">
                                <span>{subTab === "Rekyc Modification" ? rekycData.length : "0"} total</span>
                                {activeData.length > rowsPerPage && (
                                    <div className="flex items-center gap-2">
                                        <button onClick={handlePrev} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold">Prev</button>
                                        <span className="px-3 py-1.5 bg-[#1EB04C] text-white rounded font-bold">{currentPage}</span>
                                        <button onClick={handleNext} disabled={currentPage === totalPages} className="px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold">Next</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BOTTOM LEGEND */}
                        <div className="pt-20 pb-10 text-center text-[14px] text-gray-600 font-normal">
                            What we mean when we say - <span className="font-bold">(Z)</span>: Zone, <span className="font-bold">(R)</span>: Region, <span className="font-bold">(Br)</span>: Branch, <span className="font-bold">(AP)</span>: Authorized Person/Sub Broker
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

export default ModificationStatus;
