import React, { useState } from "react";

const CircularsDashboard = () => {
  const [activeTab, setActiveTab] = useState("Contact Details");

  const tabs = [
    "KRA & UCC Status", 
    "Hold KRA Status", 
    "Modification Status", 
    "Physical Account Opening", 
    "Nominee Pending", 
    "Contact Details", 
    "Rekyc TAT", 
    "EKYC TAT", 
    "Reactivation TAT"
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-arihant-primary selection:text-white">
      {/* 🟢 TOP NAVBAR */}
      <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md">
        <div className="flex items-center gap-12 text-white text-[13px] font-bold">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-black text-2xl tracking-tighter cursor-pointer">ArihantCapital</span>
            <span className="text-white/70 text-[10px] font-medium uppercase tracking-widest hidden lg:block">Generating Wealth</span>
          </div>
          <nav className="flex items-center gap-6 opacity-95">
            <span className="cursor-pointer">Dashboard</span>
            <span className="border-b-2 border-white pb-1 font-bold cursor-pointer">Reports</span>
            <span className="cursor-pointer">Account Opening</span>
            <span className="cursor-pointer">Download</span>
            <span className="cursor-pointer">Research Call</span>
            <span className="cursor-pointer">Deal Slip</span>
            <span className="cursor-pointer">Third Party</span>
            <span className="cursor-pointer">Contests</span>
            <div className="relative cursor-pointer">
              <span>Portfolio</span>
              <span className="absolute -top-3 -right-6 bg-red-500 text-[8px] px-1 rounded-sm flex items-center h-3">BETA</span>
            </div>
            <span className="cursor-pointer">Click To Call</span>
            <span className="cursor-pointer">Payout</span>
          </nav>
        </div>
      </div>

            {/* ⚪️ BREADCRUMB */}
            <div className="bg-[#e6f7ff] px-[40px] py-[14px] flex items-center gap-3 text-[12px] text-gray-800 font-bold uppercase tracking-widest">
                <div className="w-[8px] h-[8px] bg-[#34b350] rounded-full shadow-[0_0_10px_rgba(52,179,80,0.4)]"></div>
                <span>Circulars</span>
                <span className="text-gray-300">/</span>
                <span className="text-[#34b350]">{activeTab}</span>
            </div>

            {/* 📑 SECONDARY NAVIGATION (TABS) */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px] sticky top-[64px] z-[90]">
                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-[14px] font-bold transition-all relative outline-none tracking-tighter whitespace-nowrap ${
                                activeTab === tab ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] min-h-[600px]">
                {activeTab === "Contact Details" && <ContactDetailsTab />}
                {activeTab === "Hold KRA Status" && <HoldKRAStatusTab />}
                {activeTab === "Modification Status" && <ModificationStatusTab />}
                {!["Contact Details", "Hold KRA Status", "Modification Status"].includes(activeTab) && (
                    <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-24 text-center">
                        <div className="text-gray-300 font-black text-[22px] italic tracking-tight uppercase opacity-50 bg-gray-50/5 py-12 rounded-xl">
                            Report module for {activeTab} 
                        </div>
                        <div className="text-gray-400 text-xs font-bold mt-4 uppercase tracking-widest opacity-60">Redirecting to specialized report view...</div>
                    </div>
                )}
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

// --- SUB-COMPONENTS ---

const ContactDetailsTab = () => {
    const contacts = [
        { name: "Mr. Prem Sachdev", designation: "Executive", desk: "E-KYC - Digital account opening help desk", phone: "07314217-272", email: "ekyc@arihantcapital.com" },
        { name: "Mr. Prem Sachdev", designation: "Executive", desk: "Digital Modification (re-KYC) Help desk", phone: "07314217-272", email: "ekyc@arihantcapital.com" },
        { name: "Mr. Prem Sachdev", designation: "Executive", desk: "E-kyc & re-kyc WHATS APP (Only chat service)", phone: "7869955852", email: "chat" },
        { name: "Rahul Pal / Rakesh Thakur", designation: "Executive", desk: "Physical Account Opening Help desk", phone: "07314217-126", email: "accountopening@arihantcc" },
        { name: "Heena Solanki / Tejbali / Chandresh", designation: "Executive", desk: "Physical Modification Help Desk", phone: "07314217-274", email: "modification@arihantcapit" },
        { name: "Rohit Diwan / Ankit", designation: "Executive", desk: "KRA services / CKYC", phone: "07314217-110", email: "rohit.diwan@arihantcapita" },
        { name: "Pramila Sharma", designation: "Executive", desk: "Exchange / Compliance related", phone: "07314217-268", email: "pramila.sharma@arihanta" }
    ];

    return (
        <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
            <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                <thead className="bg-[#34b350] text-white">
                    <tr className="leading-none">
                        {["Name", "Designation", "Desk", "Call", "Email"].map(h => (
                            <th key={h} className="px-6 py-[22px] border-r border-white/10 last:border-0 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((c, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-[#34b350]/[0.03] transition-colors group">
                            <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-900 group-hover:text-[#34b350] transition-colors">{c.name}</td>
                            <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-medium text-gray-500 opacity-80">{c.designation}</td>
                            <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-600">{c.desk}</td>
                            <td className="px-6 py-6 border-r border-[#f9fafb] font-mono text-[13px] text-gray-900 font-black">{c.phone}</td>
                            <td className="px-6 py-6 text-[12px] font-black text-blue-500 underline decoration-blue-200 underline-offset-4 cursor-pointer hover:text-blue-700 transition-colors uppercase tracking-tight">{c.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">{contacts.length} total</div>
        </div>
    );
};

const HoldKRAStatusTab = () => (
    <div className="space-y-8">
        <div className="flex justify-between items-center px-1">
            <div className="text-gray-900 font-black text-[17px] tracking-tighter">Search results(0)</div>
        </div>

        <div className="max-w-sm bg-white rounded-2xl p-0 shadow-[0_10px_30px_rgb(0,0,0,0.02)]">
            <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group-focus-within:text-[#34b350] transition-colors">🔍</span>
                <input 
                    type="text" 
                    placeholder="Filter by Client Code" 
                    className="w-full h-[52px] border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-[#34b350] transition-all"
                />
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
            <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                <thead className="bg-[#34b350] text-white">
                    <tr className="leading-none">
                        {["Client Code", "PAN", "Client Name", "Branch Code", "KRA NAME", "KRA STATUS", "REASON"].map((h) => (
                            <th key={h} className="px-5 py-[22px] border-r border-white/10 last:border-0">
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                    {h} <div className="flex flex-col text-[7px] leading-[4px] opacity-40"><span>▲</span><span>▼</span></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="7" className="py-24 text-center">
                            <div className="text-gray-300 font-black text-[22px] italic tracking-tight uppercase opacity-50 bg-gray-50/5">No data to display</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">0 total</div>
        </div>
    </div>
);

const ModificationStatusTab = () => {
    const [subTab, setSubTab] = useState("Rekyc Modification");

    return (
        <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-10 space-y-12">
            {/* SUB-TABS */}
            <div className="flex gap-x-12 border-b border-gray-50 pb-3">
                {["Physical Modification", "Rekyc Modification"].map(t => (
                    <button 
                        key={t}
                        onClick={() => setSubTab(t)}
                        className={`text-[17px] font-black relative pb-3 transition-colors tracking-tighter ${subTab === t ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {subTab === "Physical Modification" ? <PhysicalModification /> : <RekycModification />}
        </div>
    );
};

const PhysicalModification = () => (
    <div className="space-y-8">
        <div className="text-gray-900 font-black text-[17px] tracking-tighter px-1">Search results(0)</div>
        <div className="flex items-center gap-8 max-w-xl group">
           <div className="relative flex-1">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#34b350] transition-colors">🔍</span>
              <input type="text" placeholder="Search client code" className="w-full h-[52px] border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-[#34b350] transition-all" />
           </div>
           <button className="bg-[#34b350] text-white px-12 h-[52px] rounded-full font-black text-sm uppercase tracking-widest shadow-[0_8px_20px_-5px_rgba(52,179,80,0.5)] hover:shadow-[0_12px_25px_-5px_rgba(52,179,80,0.6)] active:scale-[0.98] transition-all">APPLY &gt;</button>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
            <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                <thead className="bg-[#34b350] text-white">
                     <tr className="leading-none">
                        {["Client Code", "Client Name", "PAN", "Date", "Branch Code", "Type", "Status", "Remark"].map(h => (
                            <th key={h} className="px-5 py-[22px] border-r border-white/10 last:border-0">
                                <div className="flex items-center gap-1.5 whitespace-nowrap">
                                    {h} <div className="flex flex-col text-[7px] leading-[4px] opacity-40"><span>▲</span><span>▼</span></div>
                                </div>
                            </th>
                        ))}
                     </tr>
                </thead>
                <tbody className="bg-white">
                    <tr><td colSpan="8" className="py-24 text-center"><div className="text-gray-300 font-black text-[22px] italic tracking-tight uppercase opacity-50 bg-gray-50/5">No data to display</div></td></tr>
                </tbody>
            </table>
            <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">0 total</div>
        </div>
    </div>
);

const RekycModification = () => {
    const data = [
        { code: "206400028", pan: "XXXXXXXXX", name: "VIVEK SHAH", type: "Segment", date: "17/Feb/2026", status: "Updated" },
        { code: "206400023", pan: "XXXXXXXXX", name: "DHRUVIK BHAVESHKUMAR SHAH", type: "Segment", date: "23/Nov/2023", status: "Updated" }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center px-1">
                <div className="text-gray-900 font-black text-[17px] tracking-tighter">Search results(2)</div>
            </div>

            <div className="flex items-center gap-8 max-w-xl group">
               <div className="relative flex-1">
                   <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#34b350] transition-colors">🔍</span>
                   <input type="text" placeholder="Search client code" className="w-full h-[52px] border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-[#34b350] transition-all" />
               </div>
               <button className="bg-[#34b350] text-white px-12 h-[52px] rounded-full font-black text-sm uppercase tracking-widest shadow-[0_8px_20px_-5px_rgba(52,179,80,0.5)] hover:shadow-[0_12px_25px_-5px_rgba(52,179,80,0.6)] active:scale-[0.98] transition-all">APPLY &gt;</button>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">
                <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                    <thead className="bg-[#34b350] text-white">
                         <tr className="leading-none">
                            {["Clientcode", "PAN", "Client Name", "Type", "Date", "Status", "Admin Date"].map(h => (
                                <th key={h} className="px-5 py-[22px] border-r border-white/10 last:border-0 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">{h} <div className="flex flex-col text-[7px] leading-[4px] opacity-40"><span>▲</span><span>▼</span></div></div>
                                </th>
                            ))}
                         </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((d, i) => (
                            <tr key={i} className="border-b border-gray-50 hover:bg-[#34b350]/[0.03] transition-colors group italic">
                                <td className="px-5 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-900 group-hover:text-[#34b350] transition-colors">{d.code}</td>
                                <td className="px-5 py-6 border-r border-[#f9fafb] text-[12px] font-black text-gray-400">XXXXXXXXX <span className="cursor-pointer opacity-30 hover:opacity-100 grayscale hover:grayscale-0 ml-1">👁️</span></td>
                                <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] font-bold text-gray-900 uppercase">{d.name}</td>
                                <td className="px-6 py-6 border-r border-[#f9fafb]">
                                    <div className="flex flex-col items-start gap-1.5">
                                        <span className="text-[12px] text-gray-600 font-bold">{d.type}</span>
                                        <span className="bg-green-50 text-green-700 text-[9px] px-2 py-0.5 rounded-full border border-green-100 font-black">✓ Segment</span>
                                    </div>
                                </td>
                                <td className="px-6 py-6 border-r border-[#f9fafb] text-[12px] text-gray-500 font-bold">{d.date}</td>
                                <td className="px-6 py-6 border-r border-[#f9fafb]">
                                     <span className="bg-[#34b350] text-white text-[10px] px-3 py-1.5 rounded font-black shadow-sm group-hover:scale-110 transition-transform block w-fit">✓ UPDATED</span>
                                </td>
                                <td className="px-6 py-6 text-center text-gray-300 font-bold">—</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px]">2 total</div>
            </div>
        </div>
    );
};

export default CircularsDashboard;
