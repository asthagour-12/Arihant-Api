import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton, DateInput } from "../components/common/FilterSection";
import StatsCard from "../components/common/StatsCard";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import ResultsHeader from "../components/common/ResultsHeader";

const MobileLogin = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    // Clear error toast after 3 seconds
    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleDownload = () => {
        const headers = ["Client Name", "Client Code", "Status", "Trade Status", "Last Traded Date", "Last Login Date"];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + data.map(row => row.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Mobile_Login_Report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleApply = () => {
        if (!fromDate && !toDate) {
            setCustomErrorMsg("Please select Date range");
            setShowCustomError(true);
            return;
        }
        if (fromDate && !toDate) {
            setCustomErrorMsg("Please select To Date");
            setShowCustomError(true);
            return;
        }
        if (!fromDate && toDate) {
            setCustomErrorMsg("Please select From Date");
            setShowCustomError(true);
            return;
        }
        if (fromDate && toDate && fromDate.toDateString() === toDate.toDateString()) {
            setCustomErrorMsg("From and To dates cannot be same");
            setShowCustomError(true);
            return;
        }

        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }
        
        toast.success("Filters applied successfully");
    };

    const headers = ["Client Name", "Client Code", "Status", "Trade Status", "Last Traded Date", "Last Login Date"];
    const data = [
        ["SURAJ SUNIL RAJOLE", "AP2100001", "Active", "NO", "19-12-2025", "16-04-2026"],
        ["ANAND SUNIL RAJOLE", "28640A085", "Active", "NO", "13-04-2026", "16-04-2026"]
    ];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto relative">
            <FilterSection>
                <FilterItem label="From Date">
                    <DateInput 
                        selected={fromDate} 
                        onChange={(d) => setFromDate(d)} 
                        error={showCustomError && !fromDate}
                        width="160px"
                    />
                </FilterItem>
                <FilterItem label="To Date">
                    <DateInput 
                        selected={toDate} 
                        onChange={(d) => setToDate(d)} 
                        error={showCustomError && (!toDate || fromDate?.toDateString() === toDate?.toDateString())}
                        width="160px"
                    />
                </FilterItem>
                <div className="pb-0.5">
                    <ApplyButton onClick={handleApply} />
                </div>
            </FilterSection>

            <div className="flex flex-wrap gap-4 mb-8">
                <StatsCard title="Total Active Client" value="10" />
                <StatsCard title="Total Login Clients" value="7" />
                <StatsCard title="Total Traded Clients" value="4" />
                <StatsCard title="Total NonTraded Clients" value="3" />
            </div>

            <ResultsHeader count={data.length} onDownload={handleDownload} />
            <DataTable
                headers={headers}
                rows={data}
            />

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[10000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1">Error</h2>
                    <p className="text-base font-semibold">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileLogin;
