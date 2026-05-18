import React, { useState, useEffect } from "react";
import Header from "../Header.jsx";
import ArihantProducts from "../ArihantProducts.jsx";
import { L } from "../styles/legacyStyles.jsx";
import { Search, Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../components/common/Table";
import ResultsHeader from "../components/common/ResultsHeader";
import CalendarHeader from "../components/common/CalendarHeader";

const Payout = () => {
    const [activeTab, setActiveTab] = useState("Payout");

    const tabs = ["Payout", "Bulk Payout", "Payout Report", "Cancel Request"];

    const renderContent = () => {
        switch (activeTab) {
            case "Payout":
                return <PayoutTab />;
            case "Bulk Payout":
                return <BulkPayoutTab />;
            case "Payout Report":
                return <PayoutReportTab />;
            case "Cancel Request":
                return <CancelRequestTab />;
            default:
                return null;
        }
    };

    return (
        <div className="reports-wrapper w-full">
            <div className="bg-[#f3f3f3] min-h-screen">
                <Header />

                <div className="bg-gray-100 p-1 md:p-2 mt-[60px]">
                    <div className="tabs-wrapper w-full bg-white px-4 md:px-8 pt-1 pb-0 shadow-md border border-gray-200 rounded-lg max-w-[1700px] mx-auto">
                        
                        {/* 🧭 NAVIGATION TABS */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pt-4 text-[14px]">
                            {tabs.map((tab) => (
                                <span
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`cursor-pointer pb-[10px] transition-all ${activeTab === tab
                                        ? "border-b-[3px] border-[#34b350] font-bold text-black"
                                        : "text-gray-500 font-medium hover:text-black"
                                        }`}
                                >
                                    {tab}
                                </span>
                            ))}
                        </div>

                        {/* 📦 CONTENT AREA */}
                        <div className="pb-6">
                            {renderContent()}
                        </div>

                        {/* 🔗 ARIHANT PRODUCTS SECTION */}
                        <ArihantProducts />
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- TAB COMPONENTS ---

const PayoutTab = () => {
    const [clientCode, setClientCode] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please Enter Client Code");
            setShowCustomError(true);
            return;
        }
        // Proceed with search logic
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <div className="flex gap-6 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Search By Client</label>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                placeholder="Enter client code"
                                className={`pl-11 pr-4 py-3 border rounded-full focus:outline-none focus:border-[#34b350] text-sm w-[320px] bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto active:scale-95"
                    >
                        <span>APPLY</span>
                        <span className="text-lg">›</span>
                    </button>
                </div>
            </div>

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BulkPayoutTab = () => {
    const [file, setFile] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleSubmit = () => {
        if (!file) {
            setCustomErrorMsg("Please Select File First");
            setShowCustomError(true);
            return;
        }
        // Handle submission logic here
        console.log("File submitted:", file);
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <label className="block text-sm font-medium mb-2">
                    Upload File
                </label>
                <div className="flex items-center gap-6">
                    <div className={`bg-gray-50 border rounded-md px-4 py-3 flex items-center gap-3 transition-all ${showCustomError && !file ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="cursor-pointer"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-500 to-green-700 
                        hover:from-green-600 hover:to-green-800 
                        text-white px-8 py-3 rounded-full font-semibold 
                        shadow-md hover:shadow-xl 
                        transition-all duration-300 
                        flex items-center gap-2 active:scale-95"
                    >
                        SUBMIT
                        <span className="text-lg">→</span>
                    </button>
                </div>
            </div>

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PayoutReportTab = () => {
    const [requestDate, setRequestDate] = useState(null);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    const staticData = [
        { date: "2026-04-29", clientCode: "C12345", clientName: "John Doe", bankAccount: "XXXX1234", amount: "5,000", status: "Pending" },
        { date: "2026-04-28", clientCode: "C67890", clientName: "Jane Smith", bankAccount: "XXXX5678", amount: "12,000", status: "Processed" },
    ];

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleSearch = () => {
        if (!requestDate) {
            setCustomErrorMsg("Please Select Date");
            setShowCustomError(true);
            return;
        }
        // Search logic
    };

    const handleDownload = () => {
        const csv = [
            ["Date", "Client Code", "Client Name", "Bank Account", "Request Amount", "Status"],
            ...staticData.map((item) => [
                item.date || "",
                item.clientCode || "",
                `"${item.clientName || ""}"`,
                item.bankAccount || "",
                (item.amount || "").toString().replace(/,/g, ''),
                item.status || ""
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Payout_Report_${requestDate ? requestDate.toLocaleDateString('en-GB') : "All"}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }}>
                <div className="flex gap-4 items-end flex-wrap">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-1">Request Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={requestDate}
                                onChange={(d) => setRequestDate(d)}
                                placeholderText="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !requestDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                            <i className="fas fa-calendar-alt absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"></i>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setRequestDate(null)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center active:scale-95"
                        >
                            CLEAR
                        </button>
                        <button
                            onClick={handleSearch}
                            className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                        >
                            <span>SEARCH</span>
                            <span className="text-lg">›</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                {["Total Request", "Total Process", "Total Cancel"].map(l => (
                    <div key={l} className="bg-white border border-gray-200 rounded-md px-4 py-2.5 min-w-[140px] shadow-sm">
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{l}</div>
                        <div className="text-[16px] font-black text-gray-800">0</div>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <ResultsHeader count={staticData.length} onDownload={handleDownload} />
                <Table
                    headers={["Date", "Client Code", "Client Name", "Bank Account", "Request Amount", "Status"]}
                    rows={staticData.map(d => [d.date, d.clientCode, d.clientName, d.bankAccount, `₹${d.amount}`, d.status])}
                />
            </div>

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[60000]
                        transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
            >
                <div>
                    <h2 className="text-2xl font-bold -mb-1 text-white">Error</h2>
                    <p className="text-base font-semibold text-white">{customErrorMsg}</p>
                </div>
                <div className="ml-6 flex items-center">
                    <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
                        <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[45deg] rounded"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CancelRequestTab = () => {
    const handleDownload = () => {
        const csv = [
            ["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"],
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Cancel_Request_Report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }} className="mt-2">
                <ResultsHeader count={0} onDownload={handleDownload} />
                <Table
                    headers={["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"]}
                    rows={[]}
                />
            </div>
        </div>
    );
};

export default Payout;
