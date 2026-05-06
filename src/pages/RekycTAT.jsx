import React from "react";

const RekycTAT = () => {
    const tabs = [
        "KRA & UCC Status", "Hold KRA Status", "Modification Status", 
        "Physical Account Opening", "Nominee Pending", "Contact Details", 
        "Rekyc TAT", "EKYC TAT", "Reactivation TAT"
      ];

    const data = [
        ["BANK (if client Name is matched on bank ac", "if request received up to 6 PM", "E-signature Not required", "Same day", "Monday to Friday"],
        ["BANK (if client Name is Mismatched on bank", "if request received up to 6 PM", "up to 15 minutes", "Same day", "Monday to Friday"],
        ["Default Bank", "if request received up to 6 PM", "E-signature Not required", "Same day", "Monday to Friday"],
        ["Mobile", "if request received up to 6 PM", "E-signature Not required", "Same day", "Monday to Friday"],
        ["Email", "if request received up to 6 PM", "E-signature Not required", "Same day", "Monday to Friday"],
        ["DDPI", "if request received up to 2 PM", "instant e-signature facility is availabe", "Same day", "Monday to Friday"],
        ["DDPI", "if request received after 2 PM", "instant e-signature facility is availabe", "Next day", "Monday to Friday"],
        ["Nominee Opt-Out", "if request received up to 6 PM", "instant e-signature facility is availabe", "Same day", "Monday to Friday"],
        ["Nominee Opt-Out", "if request received up to 6 PM", "up to 15 minutes", "Same day", "Monday to Friday"]
    ];

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans">
            {/* 🟢 TOP NAVBAR */}
            <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white text-[13px] font-bold">
                <div className="flex items-center gap-12 font-black text-2xl tracking-tighter cursor-pointer">
                    ArihantCapital
                    <nav className="flex items-center gap-6 opacity-95 text-[13px] font-bold ml-12">
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
                        <div key={tab} className={`text-[15px] font-bold cursor-pointer relative pb-3 tracking-tighter ${tab === "Rekyc TAT" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"}`}>
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] min-h-[500px]">
                <div className="overflow-hidden bg-white border border-gray-200">
                    <table className="w-full text-[13px] border-collapse">
                        <thead className="bg-[#34b350] text-white">
                            <tr>
                                {["Request Type", "Timing", "E-Signature Approval TAT", "Update/Activation TAT", "KRA Validation TAT"].map(h => (
                                    <th key={h} className="px-4 py-3 border-r border-white/20 font-bold text-left">
                                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                                            {h} <div className="flex flex-col text-[7px] leading-[4px] opacity-60"><span>▲</span><span>▼</span></div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                    {row.map((cell, j) => (
                                        <td key={j} className="px-4 py-2 border-r border-gray-200 text-left text-gray-700 font-normal">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="px-4 py-4 text-gray-500 font-normal text-[14px]">
                        {data.length} total
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

export default RekycTAT;
