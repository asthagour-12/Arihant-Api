import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ProductBox from "../components/common/ProductBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar } from "lucide-react";

const IPOReport = () => {
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [clientSearch, setClientSearch] = React.useState("");
    const [error, setError] = React.useState("");
    const fromRef = React.useRef();
    const toRef = React.useRef();

    const handleApply = () => {
        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }
        setError("");
        toast.success("Applied");
    };

    return (
        <div className="p-6 bg-white">
            <div className="max-w-[1600px] mx-auto">
                <div className="bg-[#f8f9fa] border border-gray-100 px-8 py-8 rounded-2xl mb-12 shadow-sm">
                    <div className="flex gap-8 items-end flex-wrap justify-start">
                        
                        {/* Search Client Input */}
                        <div className="flex flex-col gap-2">
                            <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Search Client</label>
                            <div className="relative group">
                                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#34b350] transition-colors pointer-events-none"></i>
                                <input 
                                    type="text" 
                                    placeholder="Enter Client Code" 
                                    value={clientSearch}
                                    onChange={(e) => setClientSearch(e.target.value)}
                                    className="pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-64 bg-white shadow-sm transition-all h-[48px] font-medium"
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
                                    className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-56 bg-white shadow-sm transition-all h-[48px] font-bold ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                                    className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-56 bg-white shadow-sm transition-all h-[48px] font-bold ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
        </div>
    );
};
export default IPOReport;
