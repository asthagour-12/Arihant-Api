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
    const [error, setError] = useState("");

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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleApply = () => {
        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }
        setError("");
        toast.success("Filters applied successfully");
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

    return (
        <div className="px-10 py-6 max-w-[1600px] mx-auto relative">
            {/* 🧭 SUB TABS */}
            <div className="flex gap-10 border-b border-gray-200 mb-8 pt-2">
                {subTabs.map((tab) => (
                    <span
                        key={tab}
                        onClick={() => setActiveSubTab(tab)}
                        className={`cursor-pointer pb-3 text-sm transition-all ${
                            activeSubTab === tab
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
                    <FilterSection title="Search criteria">
                        <FilterItem label="From Date">
                            <DateInput 
                                selected={fromDate} 
                                onChange={(d) => setFromDate(d)} 
                                error={error}
                            />
                        </FilterItem>
                        <FilterItem label="To Date">
                            <DateInput 
                                selected={toDate} 
                                onChange={(d) => setToDate(d)} 
                                error={error}
                            />
                        </FilterItem>
                        <ApplyButton onClick={handleApply} />

                        <div className="ml-12 flex items-end gap-6">
                            <FilterItem label="Search By Client">
                                <SearchInput placeholder="Search client code" width="320px" />
                            </FilterItem>
                            <ApplyButton label="SEARCH" onClick={() => toast.info("Searching client...")} />
                        </div>
                    </FilterSection>

                    {/* 📊 Cards Section */}
                    <div className="grid grid-cols-4 gap-6 mb-12 mt-8">
                        {statsData.map((s, i) => (
                            <div key={i} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm transition-all hover:border-[#34b350]/30 hover:shadow-md group">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-gray-700 text-xs font-medium uppercase tracking-wider">{s.title}</h3>
                                    <div 
                                        onClick={handleEyeClick}
                                        className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        {isMasked ? (
                                            <EyeOff size={18} className="text-gray-400 group-hover:text-red-500" />
                                        ) : (
                                            <Eye size={18} className="text-[#34b350]" />
                                        )}
                                    </div>
                                </div>
                                <div className={`${isMasked ? "text-[16px] font-medium text-gray-400" : "text-2xl font-black text-gray-900"} tracking-tight tabular-nums transition-all`}>
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
                    />
                </>
            )}

            {activeSubTab === "Third Party Brokerage" && (
                <div className="bg-white px-8 py-6 rounded-lg max-w-[1600px] mx-auto border border-gray-100 shadow-sm mb-10">
                    <div className="flex gap-8 items-end flex-wrap">
                        {/* From Date */}
                        <FilterItem label="From Date">
                            <DateInput 
                                selected={tpFromDate} 
                                onChange={(d) => setTpFromDate(d)} 
                                width="220px"
                            />
                        </FilterItem>

                        {/* To Date */}
                        <FilterItem label="To Date">
                            <DateInput 
                                selected={tpToDate} 
                                onChange={(d) => setTpToDate(d)} 
                                width="220px"
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <button 
                            onClick={() => toast.info("Applying Third Party filters...")}
                            className="bg-[#27ae60] hover:bg-[#219150] text-white px-10 h-[44px] rounded-full font-bold text-[14px] flex items-center gap-2 transition-all shadow-md"
                        >
                            <span>APPLY</span>
                            <span className="text-[18px]">›</span>
                        </button>
                    </div>
                </div>
            )}

            {activeSubTab === "Research Brokerage" && (
                <div className="bg-white px-8 py-6 rounded-lg max-w-[1600px] mx-auto border border-gray-100 shadow-sm mb-10">
                    <div className="flex gap-8 items-end flex-wrap">
                        {/* Trade Date */}
                        <FilterItem label="Trade Date">
                            <DateInput 
                                selected={tradeDate} 
                                onChange={(d) => setTradeDate(d)} 
                                width="220px"
                            />
                        </FilterItem>

                        {/* Apply Button */}
                        <button 
                            onClick={() => toast.info("Applying Research Trade Date filter...")}
                            className="bg-[#27ae60] hover:bg-[#219150] text-white px-10 h-[44px] rounded-full font-bold text-[14px] flex items-center gap-2 transition-all shadow-md"
                        >
                            <span>APPLY</span>
                            <span className="text-[18px]">›</span>
                        </button>
                    </div>
                </div>
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
        </div>
    );
};

export default Brokerage;
