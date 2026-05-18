import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const RekycTAT = () => {
    const [data, setData] = useState([
        { type: "BANK (if client Name is matched on bank ac", timing: "if request received up to 6 PM", esign: "E-signature Not required", activation: "Same day", kra: "Monday to Friday" },
        { type: "BANK (if client Name is Mismatched on bank", timing: "if request received up to 6 PM", esign: "up to 15 minutes", activation: "Same day", kra: "Monday to Friday" },
        { type: "Default Bank", timing: "if request received up to 6 PM", esign: "E-signature Not required", activation: "Same day", kra: "Monday to Friday" },
        { type: "Mobile", timing: "if request received up to 6 PM", esign: "E-signature Not required", activation: "Same day", kra: "Monday to Friday" },
        { type: "Email", timing: "if request received up to 6 PM", esign: "E-signature Not required", activation: "Same day", kra: "Monday to Friday" },
        { type: "DDPI", timing: "if request received up to 2 PM", esign: "instant e-signature facility is availabe", activation: "Same day", kra: "Monday to Friday" },
        { type: "DDPI", timing: "if request received after 2 PM", esign: "instant e-signature facility is availabe", activation: "Next day", kra: "Monday to Friday" },
        { type: "Nominee Opt-Out", timing: "if request received up to 6 PM", esign: "instant e-signature facility is availabe", activation: "Same day", kra: "Monday to Friday" },
        { type: "Nominee Opt-Out", timing: "if request received up to 6 PM", esign: "up to 15 minutes", activation: "Same day", kra: "Monday to Friday" }
    ]);

    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sorted = [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
        setData(sorted);
    };

    const SortIcon = ({ colKey }) => {
        if (sortConfig.key === colKey) {
            return sortConfig.direction === "asc" ? <ChevronUp size={14} className="ml-1" /> : <ChevronDown size={14} className="ml-1" />;
        }
        return <ChevronsUpDown size={14} className="ml-1 opacity-50" />;
    };

    const headers = [
        { label: "Request Type", key: "type" },
        { label: "Timing", key: "timing" },
        { label: "E-Signature Approval TAT", key: "esign" },
        { label: "Update/Activation TAT", key: "activation" },
        { label: "KRA Validation TAT", key: "kra" }
    ];

    return (
        <div className="w-full bg-white">
            <div className="overflow-x-auto border-t border-gray-200 mt-6">
                <div className="min-w-full">
                    {/* Header */}
                    <div className="grid grid-cols-5 bg-[#34b44a] text-white text-[12px] font-semibold">
                        {headers.map((h) => (
                            <div 
                                key={h.key}
                                onClick={() => handleSort(h.key)}
                                className="px-2 py-2 border-r border-white/20 flex items-center justify-center cursor-pointer select-none text-center"
                            >
                                <span>{h.label}</span>
                                <SortIcon colKey={h.key} />
                            </div>
                        ))}
                    </div>

                    {/* Body */}
                    {data.map((row, i) => (
                        <div 
                            key={i} 
                            className={`grid grid-cols-5 border-b border-gray-200 text-[12px] hover:bg-gray-100 transition-colors ${
                                i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                            }`}
                        >
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center leading-tight">{row.type}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center">{row.timing}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center text-center justify-center">{row.esign}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center text-center justify-center">{row.activation}</div>
                            <div className="px-2 py-2 flex items-center text-center justify-center">{row.kra}</div>
                        </div>
                    ))}
                    
                    <div className="bg-white px-6 py-4 text-black font-bold border-b border-gray-200 text-[14px]">
                        {data.length} total
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RekycTAT;
