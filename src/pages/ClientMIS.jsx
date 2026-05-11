import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput } from "../components/common/FilterBar";
import ResultsHeader from "../components/common/ResultsHeader";
import ClientTable from "../components/common/ClientTable";

const ClientMIS = () => {
    const [clientCode, setClientCode] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    React.useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        toast.error("Data not found", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored"
        });
    };

    const handleDownload = () => {
        toast.info("Downloading report...");
    };
    const dummyData = [
        { 
            name: "SURAJ SUNIL RAJOLE", 
            code: "AP2100001", 
            pan: "ABCDE1234F", 
            mobile: "9876543210", 
            email: "suraj@gmail.com", 
            bank: "KOTAK Ac: 4146029056", 
            city: "AHMEDABAD GJ", 
            date: "30 Dec 2023", 
            dp: "20164299" 
        },
        { 
            name: "RINAZ MUSHTAQUE SHAIKH", 
            code: "295900016", 
            pan: "FGHIJ5678K", 
            mobile: "9123456789", 
            email: "rinaz@outlook.com", 
            bank: "HDFC Ac: 50100204124010", 
            city: "PUNE MH", 
            date: "22 Sep 2023", 
            dp: "00175048" 
        }
    ];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput 
                        placeholder="Search By Client" 
                        width="300px" 
                        value={clientCode}
                        onChange={(e) => setClientCode(e.target.value)}
                        error={showCustomError && !clientCode.trim()}
                    />
                </FilterItem>
                <ApplyButton label="Apply" onClick={handleApply} />
            </FilterBar>

            <ResultsHeader count={dummyData.length} onDownload={handleDownload} />

            <ClientTable data={dummyData} />

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[6000]
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

export default ClientMIS;
