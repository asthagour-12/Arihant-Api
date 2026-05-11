import React, { useState, useEffect, useRef } from "react";
import ProductBox from "../components/common/ProductBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar } from "lucide-react";

const IPOReport = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [clientSearch, setClientSearch] = useState("");
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    
    const fromRef = useRef();
    const toRef = useRef();

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleApply = () => {
        if (!clientSearch.trim()) {
            setCustomErrorMsg("Please enter Client Code");
            setShowCustomError(true);
            return;
        }

        const dateError = validateDates(fromDate, toDate);
        if (dateError) {
            setCustomErrorMsg(dateError);
            setShowCustomError(true);
            return;
        }

        toast.success("Searching IPO data...");
    };

    return (
        <div className="p-6 bg-white pt-2">
            <div className="max-w-[1600px] mx-auto">
                <div className="bg-gray-100 border border-gray-100 px-8 py-8 rounded-2xl mb-12 shadow-sm">
                    <div className="flex gap-8 items-end flex-wrap justify-start">
                        
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Search Client</label>
                            <div className="relative group">
                                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#34b350] transition-colors pointer-events-none"></i>
                                <input 
                                    type="text" 
                                    placeholder="Enter Client Code" 
                                    value={clientSearch}
                                    onChange={(e) => setClientSearch(e.target.value)}
                                    className={`pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-64 bg-white shadow-sm transition-all h-[48px] font-medium ${showCustomError && !clientSearch.trim() ? "border-red-500" : "border-gray-200"}`}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">From Date</label>
                            <div className="relative group">
                                <DatePicker
                                    selected={fromDate}
                                    onChange={(d) => setFromDate(d)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    maxDate={new Date()}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-56 bg-white shadow-sm transition-all h-[48px] font-bold"
                                    ref={fromRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <Calendar
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                                    size={16}
                                    onClick={() => fromRef.current.setOpen(true)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">To Date</label>
                            <div className="relative group">
                                <DatePicker
                                    selected={toDate}
                                    onChange={(d) => setToDate(d)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    maxDate={new Date()}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-56 bg-white shadow-sm transition-all h-[48px] font-bold"
                                    ref={toRef}
                                    onFocus={(e) => e.target.blur()}
                                />
                                <Calendar
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
                                    size={16}
                                    onClick={() => toRef.current.setOpen(true)}
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleApply}
                            className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[48px] rounded-full font-bold text-[14px] transition-all shadow-md flex items-center justify-center gap-2 mt-auto"
                        >
                            <span>SEARCH</span>
                            <span className="text-[18px]">›</span>
                        </button>
                    </div>
                </div>
                
                <div className="mb-4 text-[12px] text-gray-600">
                    What we mean when we say — <strong>(Z):</strong> Zone, <strong>(R):</strong> Region, <strong>(Br):</strong> Branch, <strong>(AP):</strong> Authorized Person/Sub Broker
                </div>
                
                <ProductBox />
            </div>

            {/* 🚨 CUSTOM ERROR TOAST */}
            <div
                className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[300px]
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
export default IPOReport;
