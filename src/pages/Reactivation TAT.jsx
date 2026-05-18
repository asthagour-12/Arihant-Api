import React, { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const ReactivationTAT = () => {
    const [data, setData] = useState([
        { type: "Active client KYC", timing: "If request received up to 6 PM", esign: "up to 15 minutes", activation: "Not applicable", kra: "up to 2 day subject to KRA", day: "Monday to Friday" },
        { type: "Active client KYC", timing: "If request received after to 6 PM", esign: "Next day before 10AM", activation: "Not applicable", kra: "up to 2 day subject to KRA", day: "Monday to Friday" },
        { type: "Suspend client KYC", timing: "If request received up to 6 PM", esign: "up to 15 minutes", activation: "1st condition:- If your e-signature is 2nd condition:- If your e-signature is", kra: "up to 2 day subject to KRA", day: "Monday to Friday" },
        { type: "Suspend client KYC", timing: "If request received after to 6 PM", esign: "Next day before 10AM", activation: "1st condition:- If your e-signature is 2nd condition:- If your e-signature is", kra: "up to 2 day subject to KRA", day: "Monday to Friday" },
        { type: "Segment activation", timing: "If request received up to 6 PM", esign: "up to 15 minutes", activation: "1st condition:- If your e-signature is 2nd condition:- If your e-signature is", kra: "NA", day: "Monday to Friday" },
        { type: "Segment activation", timing: "If request received after to 2 PM", esign: "up to 15 minutes", activation: "If your e-signature is proceeded be", kra: "NA", day: "Monday to Friday" },
        { type: "Re-Activate", timing: "If request received up 2 PM", esign: "up to 15 minutes", activation: "1st condition:- If your e-signature is 2nd condition:- If your e-signature is", kra: "NA", day: "Monday to Friday" },
        { type: "Re-Activate", timing: "If request received after to 6 PM", esign: "Next day before 10AM", activation: "1st condition:- If your e-signature is 2nd condition:- If your e-signature is", kra: "NA", day: "Monday to Friday" }
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
        { label: "KRA Validation TAT", key: "kra" },
        { label: "Day", key: "day" }
    ];

    return (
        <div className="w-full bg-white">
            <div className="overflow-x-auto border-t border-gray-200 mt-6">
                <div className="min-w-full">
                    {/* Header */}
                    <div className="grid grid-cols-6 bg-[#34b44a] text-white text-[12px] font-semibold">
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
                            className={`grid grid-cols-6 border-b border-gray-200 text-[12px] hover:bg-gray-100 transition-colors ${
                                i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"
                            }`}
                        >
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center">{row.type}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center">{row.timing}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center text-center justify-center">{row.esign}</div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center leading-tight">
                                {row.activation.includes("1st condition") ? (
                                    <div className="flex flex-col gap-0.5 text-[11px]">
                                        <span>1st condition:- If your e-signature is</span>
                                        <span>2nd condition:- If your e-signature is</span>
                                    </div>
                                ) : row.activation}
                            </div>
                            <div className="px-2 py-2 border-r border-gray-200 flex items-center text-center justify-center">{row.kra}</div>
                            <div className="px-2 py-2 flex items-center text-center justify-center">{row.day}</div>
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

export default ReactivationTAT;