import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterSection";
import StatsCard from "../components/common/StatsCard";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Brokerage = () => {
    const [activeSubTab, setActiveSubTab] = useState("Capital Brokerage");
    const [isMasked, setIsMasked] = useState(true);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [timer, setTimer] = useState(115); // 1:55
    const [otp, setOtp] = useState("");

    // Capital Brokerage States
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [clientCode, setClientCode] = useState("");
    const [error, setError] = useState("");

    // Error Toast States
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    // Third Party Brokerage States
    const [tpFromDate, setTpFromDate] = useState(null);
    const [tpToDate, setTpToDate] = useState(null);

    // Research Brokerage States
    const [tradeDate, setTradeDate] = useState(null);

    const subTabs = ["Capital Brokerage", "Third Party Brokerage", "Research Brokerage"];

    // Timer logic for OTP
    useEffect(() => {
        let interval;
        if (showOtpModal && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOtpModal, timer]);

    // Clear error toast after 3 seconds
    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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

        setError("");
        toast.success("Filters applied successfully");
    };

    const handleSearchClient = () => {
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }
        toast.success("Searching client...");
    };

    const handleEyeClick = () => {
        if (isMasked) {
            setShowOtpModal(true);
            setTimer(115);
            toast.success("Otp sent successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                style: { backgroundColor: "#2ecc71" }
            });
        } else {
            setIsMasked(true);
        }
    };

    const handleOtpSubmit = () => {
        if (otp === "123456") {
            setIsMasked(false);
            setShowOtpModal(false);
            setOtp("");
            toast.success("Verified successfully");
        } else {
            toast.error("Invalid OTP");
        }
    };

    const headers = ["CLIENT NAME", "Brokerage", "Turnover", "Segment"];
    const data = [
        ["DHRUVIK BHAVESHKUMAR SHAH 286400023", isMasked ? "xxxxxx" : "₹ 12,450", isMasked ? "xxxxxxxx" : "₹ 4,50,000", "FNO"],
        ["DHRUVIK BHAVESHKUMAR SHAH 286400023", isMasked ? "xxxxxx" : "₹ 8,920", isMasked ? "xxxxxxxx" : "₹ 2,10,000", "FNO"]
    ];

    const statsData = [
        { title: "Total Brokerage", value: "₹ 21,370" },
        { title: "Total Cap Brok", value: "₹ 4,200" },
        { title: "Total Comm Brok", value: "₹ 0" },
        { title: "Total FNO Brok", value: "₹ 17,170" },
        { title: "Total Cap Turnover", value: "₹ 1,20,000" },
        { title: "Total FNO Turnover", value: "₹ 6,60,000" },
        { title: "Total Turnover", value: "₹ 7,80,000" },
        { title: "Total Comm Turnover", value: "₹ 0" },
    ];

    const handleDownload = () => {
        const downloadData = [
            ["DHRUVIK BHAVESHKUMAR SHAH 286400023", "₹ 12,450", "₹ 4,50,000", "FNO"],
            ["DHRUVIK BHAVESHKUMAR SHAH 286400023", "₹ 8,920", "₹ 2,10,000", "FNO"]
        ];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + downloadData.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Brokerage_Report_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Report downloaded successfully");
    };

    const [hasTpSearched, setHasTpSearched] = useState(false);

    const handleTpApply = () => {
        if (!tpFromDate && !tpToDate) {
            setCustomErrorMsg("Please select Date range");
            setShowCustomError(true);
            return;
        }
        if (tpFromDate && !tpToDate) {
            setCustomErrorMsg("Please select To Date");
            setShowCustomError(true);
            return;
        }
        if (!tpFromDate && tpToDate) {
            setCustomErrorMsg("Please select From Date");
            setShowCustomError(true);
            return;
        }
        if (tpFromDate && tpToDate && tpFromDate.toDateString() === tpToDate.toDateString()) {
            setCustomErrorMsg("From and To dates cannot be same");
            setShowCustomError(true);
            return;
        }

        const errorMsg = validateDates(tpFromDate, tpToDate);
        if (errorMsg) {
            setCustomErrorMsg(errorMsg);
            setShowCustomError(true);
            return;
        }

        setHasTpSearched(true);
        toast.success("Third Party filters applied successfully");
    };

    const [hasResearchSearched, setHasResearchSearched] = useState(false);

    const handleResearchApply = () => {
        if (!tradeDate) {
            setCustomErrorMsg("Please select Trade Date");
            setShowCustomError(true);
            return;
        }

        setHasResearchSearched(true);
        toast.error("Data not found", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored"
        });
    };

    const tpHeaders = ["BranchCode", "Branch Name", "MF Brokerage", "Unlisted Brokerage", "Insurance Brokerage", "Bonds Brokerage", "Wealth Basket Brokerage", "Value Stock", "PMS Brokerage"];
    const tpData = [
        ["BRAP05", "ACML- PALASIA INDOR", "0.00", "0.00", "0", "0.00", "0", "0.00", "0"]
    ];

    return (
        <div className="px-2 pt-6 pb-0 max-w-[1600px] mx-auto relative">
            {/* 🧭 SUB TABS */}
            <div className="flex gap-10 border-b border-gray-200 mb-1 pt-0">
                {subTabs.map((tab) => (
                    <span
                        key={tab}
                        onClick={() => setActiveSubTab(tab)}
                        className={`cursor-pointer pb-3 text-sm transition-all ${activeSubTab === tab
                            ? "border-b-[3px] border-[#34b350] font-bold text-black"
                            : "text-gray-500 font-medium hover:text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* 📦 CONTENT BASED ON SUB TAB */}
            {activeSubTab === "Capital Brokerage" && (
                <>
                    <FilterSection>
                        <FilterItem label="From Date">
                            <DateInput
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                error={showCustomError && !fromDate && activeSubTab === "Capital Brokerage"}
                            />
                        </FilterItem>
                        <FilterItem label="To Date">
                            <DateInput
                                selected={toDate}
                                onChange={(d) => setToDate(d)}
                                error={showCustomError && !toDate && activeSubTab === "Capital Brokerage"}
                            />
                        </FilterItem>
                        <ApplyButton onClick={handleApply} />

                        <div className="ml-12 flex items-end gap-6">
                            <FilterItem label="Search By Client">
                                <SearchInput
                                    placeholder="Search client code"
                                    width="320px"
                                    value={clientCode}
                                    onChange={(e) => setClientCode(e.target.value)}
                                    error={showCustomError && !clientCode.trim() && activeSubTab === "Capital Brokerage"}
                                />
                            </FilterItem>
                            <ApplyButton label="SEARCH" onClick={handleSearchClient} />
                        </div>
                    </FilterSection>

                    {/* 📊 Cards Section */}
                    <div className="grid grid-cols-4 gap-10 mb-4 mt-1 max-w-[1200px]">
                        {statsData.map((s, i) => (
                            <div key={i} className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm transition-all hover:border-[#34b350]/30 hover:shadow-md group">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">{s.title}</h3>
                                    <div
                                        onClick={handleEyeClick}
                                        className="cursor-pointer p-0.5 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        {isMasked ? (
                                            <EyeOff size={14} className="text-gray-400 group-hover:text-red-500" />
                                        ) : (
                                            <Eye size={14} className="text-[#34b350]" />
                                        )}
                                    </div>
                                </div>
                                <div className={`${isMasked ? "text-[14px] font-bold text-gray-400" : "text-[16px] font-black text-gray-900"} tracking-tight tabular-nums transition-all`}>
                                    {isMasked ? "xxxx" : s.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DataTable
                        headers={headers}
                        rows={data}
                        resultsCount={5}
                        showMaskIcon={true}
                        onMaskToggle={handleEyeClick}
                        isMasked={isMasked}
                        onDownload={handleDownload}
                        isPlain={true}
                    />
                </>
            )}

            {activeSubTab === "Third Party Brokerage" && (
                <>
                    <FilterSection>
                        {/* From Date */}
                        <FilterItem label="From Date">
                            <DateInput
                                selected={tpFromDate}
                                onChange={(d) => setTpFromDate(d)}
                                width="220px"
                                error={showCustomError && !tpFromDate && activeSubTab === "Third Party Brokerage"}
                            />
                        </FilterItem>

                        {/* To Date */}
                        <FilterItem label="To Date">
                            <DateInput
                                selected={tpToDate}
                                onChange={(d) => setTpToDate(d)}
                                width="220px"
                                error={showCustomError && !tpToDate && activeSubTab === "Third Party Brokerage"}
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <div className="mb-0.5">
                            <ApplyButton
                                onClick={handleTpApply}
                            />
                        </div>
                    </FilterSection>

                    {hasTpSearched && (
                        <DataTable
                            headers={tpHeaders}
                            rows={tpData}
                            resultsCount={1}
                        />
                    )}
                </>
            )}

            {activeSubTab === "Research Brokerage" && (
                <>
                    <FilterSection>
                        {/* Trade Date */}
                        <FilterItem label="Trade Date">
                            <DateInput
                                selected={tradeDate}
                                onChange={(d) => setTradeDate(d)}
                                width="220px"
                                error={showCustomError && !tradeDate && activeSubTab === "Research Brokerage"}
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <div className="mb-0.5">
                            <ApplyButton
                                onClick={handleResearchApply}
                            />
                        </div>
                    </FilterSection>

                    {hasResearchSearched && (
                        <DataTable
                            headers={["Trade Date", "Client Code", "Client Name", "Brokerage", "Turnover"]}
                            rows={[]}
                            resultsCount={0}
                        />
                    )}
                </>
            )}

            {/* 🔐 OTP MODAL */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black/40 z-[2000] flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-10 w-[550px] shadow-lg relative">
                        <button
                            onClick={() => setShowOtpModal(false)}
                            className="absolute right-8 top-8 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-left px-4">
                            <h2 className="text-[26px] font-medium text-gray-800 mb-8">Please enter OTP</h2>

                            <div className="mb-6">
                                <label className="block text-[15px] text-gray-600 mb-2 font-medium">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter your 6-digit OTP"
                                    className="w-full h-[52px] border border-gray-200 rounded-lg px-4 text-[15px] focus:border-[#34b350] outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <div className="text-center mb-10">
                                <p className="text-[14px] text-gray-500 mb-1">Resend OTP in {formatTime(timer)}</p>
                                <button
                                    onClick={() => timer === 0 && setTimer(115)}
                                    className={`text-[14px] font-medium transition-colors ${timer === 0 ? "text-[#34b350] cursor-pointer" : "text-gray-300 cursor-default"}`}
                                >
                                    Resend OTP
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleOtpSubmit}
                                    className="bg-[#34b350] text-white font-medium rounded-full px-16 h-[52px] text-[16px] hover:bg-[#2e9e47] transition-all shadow-sm"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                        flex items-center justify-between z-[5000]
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

export default Brokerage;
