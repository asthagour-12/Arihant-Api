import React from "react";
import PayoutLayout from "./PayoutLayout.jsx";
import { Search, Download, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const CancelRequest = () => {
    const data = [
        { date: "22/04/2026", clientCode: "ARI3394", clientName: "Demo Arihant User", amount: "25,000.00", status: "In Process" }
    ];

    const handleDownload = () => {
        if (data.length === 0) return;
        const headers = ["Date", "Client Code", "Client Name", "Request Amount", "Status"];
        const csvContent = [
            headers.join(","),
            ...data.map(item => [
                item.date,
                item.clientCode,
                item.clientName,
                item.amount.replace(/,/g, ''),
                item.status
            ].join(","))
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `Cancel_Request_Report.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PayoutLayout>
            <div className="space-y-8">
                {/* Header & Actions */}
                <div className="flex justify-between items-center px-1">
                    <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
                        Search results ({data.length})
                    </div>
                    <button 
                        onClick={handleDownload}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[#27ae60] bg-green-50 hover:bg-[#27ae60] hover:text-white transition-all shadow-sm border border-green-100 active:scale-95"
                    >
                        <Download size={18} />
                    </button>
                </div>

                {/* Main Table Card */}
                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#27ae60] text-white">
                                <tr>
                                    {["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"].map((header) => (
                                        <th key={header} className="px-6 py-3 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-r border-white/10 last:border-0">
                                            <div className="flex items-center justify-between group cursor-pointer">
                                                {header}
                                                <ChevronsUpDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.length > 0 ? (
                                    data.map((row, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-3 text-[13px] text-gray-600 font-medium whitespace-nowrap border-r border-gray-50">{row.date}</td>
                                            <td className="px-6 py-3 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">{row.clientCode}</td>
                                            <td className="px-6 py-3 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50 uppercase">{row.clientName}</td>
                                            <td className="px-6 py-3 text-[14px] text-[#27ae60] font-black whitespace-nowrap border-r border-gray-50">₹{row.amount}</td>
                                            <td className="px-6 py-3 border-r border-gray-50">
                                                <span className="bg-orange-50 text-orange-600 border border-orange-100 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <button className="bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white px-6 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-widest shadow-sm active:scale-95 flex items-center gap-2 mx-auto">
                                                    <Trash2 size={12} />
                                                    CANCEL
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-300 font-black tracking-[0.3em] uppercase">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-8 py-4 bg-gray-50/50 text-gray-400 font-bold border-t border-gray-100 text-[11px] uppercase tracking-widest">
                        {data.length} total record found
                    </div>
                </div>
            </div>
        </PayoutLayout>
    );
};

export default CancelRequest;

