import React from "react";

const ContactDetails = () => {
  const contacts = [
    { name: "Mr. Prem Sachdev", designation: "Executive", desk: "E-KYC - Digital account opening help desk", phone: "07314217-272", email: "ekyc@arihantcapital.com" },
    { name: "Mr. Prem Sachdev", designation: "Executive", desk: "Digital Modification (re-KYC) Help desk", phone: "07314217-272", email: "ekyc@arihantcapital.com" },
    { name: "Mr. Prem Sachdev", designation: "Executive", desk: "E-kyc & re-kyc WHATS APP (Only chat service)", phone: "7869955852", email: "chat" },
    { name: "Rahul Pal / Rakesh Thakur", designation: "Executive", desk: "Physical Account Opening Help desk", phone: "07314217-126", email: "accountopening@arihantcc" },
    { name: "Heena Solanki / Tejbali / Chandresh", designation: "Executive", desk: "Physical Modification Help Desk", phone: "07314217-274", email: "modification@arihantcapit" },
    { name: "Rohit Diwan / Ankit", designation: "Executive", desk: "KRA services / CKYC", phone: "07314217-110", email: "rohit.diwan@arihantcapita" },
    { name: "Pramila Sharma", designation: "Executive", desk: "Exchange / Compliance related", phone: "07314217-268", email: "pramila.sharma@arihanta" }
  ];

  const tabs = [
    "KRA & UCC Status", "Hold KRA Status", "Modification Status", 
    "Physical Account Opening", "Nominee Pending", "Contact Details", 
    "Rekyc TAT", "EKYC TAT", "Reactivation TAT"
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f6] font-sans">
      {/* 🟢 TOP NAVBAR */}
      <div className="bg-[#34b350] px-8 h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md">
        <div className="flex items-center gap-12 text-white text-[13px] font-bold">
          <div className="font-black text-2xl tracking-tighter">ArihantCapital</div>
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
                        <div key={tab} className={`text-[15px] font-bold cursor-pointer relative pb-3 tracking-tighter ${tab === "Contact Details" ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]" : "text-gray-400"}`}>
                            {tab}
                        </div>
                    ))}
                </div>
            </div>

            {/* 🖥 CONTENT AREA */}
            <div className="px-[40px] py-[40px] min-h-[500px]">
                <div className="overflow-hidden bg-white border border-gray-200">
                    <table className="w-full text-[13px] border-collapse">
                        <thead className="bg-[#d1f0d9] text-gray-800 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 border-r border-gray-200 font-bold text-center">Name</th>
                                <th className="px-6 py-4 border-r border-gray-200 font-bold text-center">Designation</th>
                                <th className="px-6 py-4 border-r border-gray-200 font-bold text-center">Desk</th>
                                <th className="px-6 py-4 border-r border-gray-200 font-bold text-center">Call</th>
                                <th className="px-6 py-4 font-bold text-center">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c, i) => (
                                <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 border-r border-gray-200 text-center text-gray-700">{c.name}</td>
                                    <td className="px-6 py-4 border-r border-gray-200 text-center text-gray-700">{c.designation}</td>
                                    <td className="px-6 py-4 border-r border-gray-200 text-center text-gray-700">{c.desk}</td>
                                    <td className="px-6 py-4 border-r border-gray-200 text-center text-gray-700">{c.phone}</td>
                                    <td className="px-6 py-4 text-center">
                                        {c.email !== 'chat' ? (
                                            <a href={`mailto:${c.email}`} className="text-[#34b350] hover:text-[#2da047] hover:underline transition-colors">
                                                {c.email}
                                            </a>
                                        ) : (
                                            <span className="text-gray-700">{c.email}</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default ContactDetails;
