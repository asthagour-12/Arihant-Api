import React from "react";

const EKYCTAT = () => {
    const tabs = [
        "KRA & UCC Status", "Hold KRA Status", "Modification Status", 
        "Physical Account Opening", "Nominee Pending", "Contact Details", 
        "Rekyc TAT", "EKYC TAT", "Reactivation TAT"
    ];

    const data = [
        { c1: "E-KYC e-signature approval TAT", c2: "If request received up to 7 PM", c3: "up to 15 minutes", c4: "Monday to Friday" },
        { c1: "E-KYC e-signature approval TAT", c2: "If request received after to 7 PM", c3: "Next day before 10AM", c4: "Monday to Friday" },
        { c1: "E-KYC account activation TAT", c2: "If request received up to 7 PM", c3: "With in 1 hour after E-sign", c4: "Monday to Friday" },
        { c1: "E-KYC account activation TAT", c2: "If request received after to 7 PM", c3: "Next day before 11AM", c4: "Monday to Friday" },
        { c1: "E-KYC account eligible for the trade", c2: "If request received up to 7 PM", c3: "Next day will be eligible for the trade subject to exchange approval.", c4: "Monday to Friday" },
        { c1: "E-KYC account eligible for the trade", c2: "If request received after to 7 PM", c3: "will be eligible for the trading day after tommorow subject to exchange approval", c4: "Monday to Friday" }
    ];

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans">
            {/* 🟢 TOP NAVBAR */}
            <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white text-[13px] font-bold">
                <div className="flex items-center gap-12 font-black text-2xl tracking-tighter cursor-pointer">ArihantCapital</div>
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

            {/* 📑 SECONDARY TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px]">
                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4">
                    {tabs.map((tab) => (
                        <div key={tab} className={`text-[15px] font-bold cursor-pointer relative pb-3 tracking-tighter ${tab === "EKYC TAT" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"}`}>
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] min-h-[500px]">
                <div className="flex flex-col items-center">
                    <h2 className="text-[18px] text-gray-700 font-normal mb-6">Online account open via e-KYC</h2>
                    
                    <div className="w-full bg-white border border-gray-200">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} className={`border-b border-gray-200 ${i % 2 === 1 ? "bg-[#eeeeee]" : "bg-white"}`}>
                                        <td className="px-6 py-4 border-r border-gray-200 text-gray-700">{row.c1}</td>
                                        <td className="px-6 py-4 border-r border-gray-200 text-gray-700">
                                            {row.c2.includes("up") ? (
                                                <>If request received <span className="font-bold text-gray-900">up</span> to 7 PM</>
                                            ) : (
                                                <>If request received <span className="font-bold text-gray-900">after</span> to 7 PM</>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 border-r border-gray-200 text-gray-700">
                                            {row.c3.includes("eligible") ? (
                                                <>
                                                    {row.c3.split("eligible")[0]}
                                                    <span className="font-bold text-gray-900">eligible</span>
                                                    {row.c3.split("eligible")[1]}
                                                </>
                                            ) : (
                                                row.c3
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{row.c4}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default EKYCTAT;
