import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Search, Calendar, Download, ChevronDown } from "lucide-react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import LedgerTable from "../components/common/LedgerTable";
import ResultsHeader from "../components/common/ResultsHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { getBrokerageLedger } from "../api/apiService";

const clientCodesList = [
    "23CGST - 23CGSTMadhya Pradesh",
    "23SGST - 23SGSTMadhya Pradesh",
    "BCA - BRANCH CONTROL A/C",
    "CBSE - BSE STOCK EXCHANGE CONTRA CODE",
    "E3026 - PENALTY ON SHORT MARGIN",
    "E3899 - SUNDRY BALANCE W/OFF",
    "ESTTCHARGE - Security Transaction Tax",
    "I2204 - INTEREST ON FUNDING",
    "S4902 - ACML DP A/C",
    "SYS1 - BROKERAGE",
    "SYS24 - TURNOVER CHARGES",
    "SYS25 - STAMP CHARGES",
    "SYS26 - OTHER CHARGES",
    "SYSIPFT - IPFT CHGS",
];

const Ledger = () => {
    const [activeSubTab, setActiveSubTab] = useState("Normal Ledger");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [clientCode, setClientCode] = useState("");
    const [includeMargin, setIncludeMargin] = useState(false);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [ledgerData, setLedgerData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // General Ledger Specific States
    const [selectedClient, setSelectedClient] = useState("");
    const [openDropdown, setOpenDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fromRef = useRef();
    const toRef = useRef();

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const fetchData = async () => {
        if (!fromDate || !toDate) {
            toast.error("Please select both dates");
            return;
        }
        setLoading(true);
        try {
            const params = {
                datefrom: fromDate.toISOString().split('T')[0],
                dateto: toDate.toISOString().split('T')[0],
                clientCode: clientCode,
                includeMargin: includeMargin
            };
            const response = await getBrokerageLedger(params);
            if (response.data && response.data.success) {
                setLedgerData(response.data.data || []);
            } else {
                toast.error("Failed to fetch ledger data");
            }
        } catch (err) {
            console.error("Error fetching ledger:", err);
            toast.error("Error connecting to server");
        } finally {
            setLoading(false);
        }
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
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }
        setHasSearched(true);
        fetchData();
    };

    const handleGeneralSearch = () => {
        if (!selectedClient) {
            setCustomErrorMsg("Please select client code");
            setShowCustomError(true);
            return;
        }
        setLedgerData([
            { voucher: "JV/2024/001", voucherDate: "01/05/2024", narration: "TEST DATA FOR " + selectedClient, exchange: "NSE", bookType: "JOURNAL", transactionDate: "01/05/2024", debit: "0.00", credit: "1,000.00", balance: "1,000.00 Cr" }
        ]);
        setHasSearched(true);
        toast.success("Data loaded for: " + selectedClient);
    };

    const handleDownload = () => {
        const headers = ["VOUCHER", "VOUCHER DATE", "NARRATION", "EXCHANGE", "BOOK TYPE", "TRANSACTION DATE", "DEBIT", "CREDIT", "BALANCE"];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + ledgerData.map(row => [
                row.voucher || "",
                row.voucherDate || "",
                row.narration || "",
                row.exchange || "",
                row.bookType || "",
                row.transactionDate || "",
                row.debit || "0.00",
                row.credit || "0.00",
                row.balance || "0.00"
            ].join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Ledger_Report_${activeSubTab}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredClients = clientCodesList.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="px-0 pt-4 pb-10 max-w-[1600px] mx-auto">
            {/* 🧭 SUB TABS */}
            <div className="flex gap-10 border-b border-gray-200 mb-6 px-2">
                {["Normal Ledger", "General Ledger"].map((tab) => (
                    <span
                        key={tab}
                        onClick={() => {
                            setActiveSubTab(tab);
                            setHasSearched(false);
                            setOpenDropdown(false);
                            setLedgerData([]);
                        }}
                        className={`cursor-pointer pb-3 text-sm transition-all ${activeSubTab === tab
                            ? "border-b-[3px] border-[#34b350] font-bold text-black"
                            : "text-gray-500 font-medium hover:text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Filter Sections */}
            {activeSubTab === "Normal Ledger" ? (
                <div className="bg-gray-100 p-6 mb-8 rounded-xl border border-gray-200">
                    <div className="flex flex-wrap items-center gap-6">
                        {/* Custom Checkbox */}
                        <div className="flex items-center gap-3 mr-4 group cursor-pointer" onClick={() => setIncludeMargin(!includeMargin)}>
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${includeMargin ? "bg-[#1EB04C] border-[#1EB04C]" : "bg-white border-gray-300"}`}>
                                {includeMargin && (
                                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white stroke-[4px] stroke-current">
                                        <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <label className="text-[13px] font-bold text-black cursor-pointer select-none">Including Margin</label>
                        </div>

                        {/* Search Input */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-600 ml-1">Search Client Code</label>
                            <div className="relative">
                                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] pointer-events-none"></i>
                                <input
                                    type="text"
                                    value={clientCode}
                                    onChange={(e) => setClientCode(e.target.value)}
                                    placeholder="Enter client code"
                                    className={`h-[44px] w-[240px] border rounded-full pl-10 pr-3 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                />
                            </div>
                        </div>

                        {/* From Date */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-600 ml-1">From Date</label>
                            <div className="relative group">
                                <DatePicker
                                    selected={fromDate}
                                    onChange={(d) => setFromDate(d)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    maxDate={new Date()}
                                    className={`h-[44px] w-[150px] border rounded-lg px-3 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all ${showCustomError && !fromDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    ref={fromRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <i
                                    className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                                    onClick={() => fromRef.current.setOpen(true)}
                                ></i>
                            </div>
                        </div>

                        {/* To Date */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-gray-600 ml-1">To Date</label>
                            <div className="relative group">
                                <DatePicker
                                    selected={toDate}
                                    onChange={(d) => setToDate(d)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    maxDate={new Date()}
                                    className={`h-[44px] w-[160px] border rounded-lg px-3 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all ${showCustomError && !toDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    ref={toRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <i
                                    className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                                    onClick={() => toRef.current.setOpen(true)}
                                ></i>
                            </div>
                        </div>

                        {/* Search Button */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[12px] font-bold text-transparent select-none">Action</label>
                            <button
                                onClick={handleApply}
                                className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-[12px] transition-all uppercase tracking-wider"
                            >
                                {loading ? "SEARCHING..." : "SEARCH"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`mb-0 px-2 relative transition-all duration-300 ${openDropdown ? 'pt-[140px]' : 'pt-6'}`}>
                    <div className="flex items-center gap-4">
                        <div className="relative w-[400px]">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdown(!openDropdown);
                                }}
                                className="border border-blue-500 rounded-xl h-[44px] px-4 flex items-center justify-between bg-white cursor-pointer shadow-sm hover:border-blue-600 transition-all"
                            >
                                <span className="text-gray-900 text-[14px] truncate font-medium">
                                    {selectedClient || "Select Clientcode"}
                                </span>
                                <ChevronDown size={18} className={`text-blue-500 transition-transform ${openDropdown ? "rotate-180" : ""}`} />
                            </div>

                            {openDropdown && (
                                <div className="absolute bottom-full mb-2 left-0 w-full bg-white border border-gray-300 rounded-xl max-h-[300px] overflow-y-auto z-[9999] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                    <div className="p-3 sticky top-0 bg-gray-50 border-b border-gray-100">
                                        <input
                                            type="text"
                                            placeholder="Search client code..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full h-[38px] px-4 border border-gray-200 outline-none rounded-lg text-[13px] focus:border-blue-400"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="py-1">
                                        {filteredClients.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setSelectedClient(item);
                                                    setOpenDropdown(false);
                                                    setSearchTerm("");
                                                }}
                                                className={`px-4 py-2.5 text-[13px] cursor-pointer transition-all ${selectedClient === item
                                                    ? "bg-blue-600 text-white font-bold border-l-4 border-blue-800"
                                                    : "text-gray-700 hover:bg-blue-600 hover:text-white"
                                                    }`}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleGeneralSearch}
                            className="bg-[#31b44b] hover:bg-[#26963c] text-white font-bold text-[14px] px-10 h-[44px] rounded-full shadow-md active:scale-95 transition-all"
                        >
                            SEARCH
                        </button>
                    </div>
                </div>
            )}

            {hasSearched && (
                <div className="mt-1">
                    {activeSubTab === "General Ledger" && selectedClient && (
                        <div className="mb-6 px-2">
                            {/* Client Info Bar */}
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 flex gap-12 items-center shadow-sm">
                                <div className="flex gap-2">
                                    <span className="text-gray-500 font-bold text-[15px]">Client Code :</span>
                                    <span className="text-black font-bold text-[15px]">{selectedClient.split(" - ")[0]}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gray-500 font-bold text-[15px]">Client Name :</span>
                                    <span className="text-black font-bold text-[15px]">{selectedClient.split(" - ")[1] || "N/A"}</span>
                                </div>
                            </div>

                            {/* Summary Cards */}
                            <div className="flex gap-4 mb-6">
                                {[
                                    { title: "Total Debit", value: ledgerData.reduce((acc, curr) => acc + parseFloat(curr.debit || 0), 0).toFixed(2) },
                                    { title: "Total Credit", value: ledgerData.reduce((acc, curr) => acc + parseFloat(curr.credit || 0), 0).toFixed(2) },
                                    { title: "Total Balance", value: "0.42" }
                                ].map((card, idx) => (
                                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 w-[200px] shadow-sm">
                                        <p className="text-gray-500 font-bold text-[13px] mb-1">{card.title}</p>
                                        <p className="text-black font-extrabold text-[18px]">{card.value}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                    <ResultsHeader count={ledgerData.length} onDownload={handleDownload} />
                    <LedgerTable data={ledgerData} />
                </div>
            )}

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

export default Ledger;
