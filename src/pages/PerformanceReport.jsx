import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LDateInput, LApplyBtn } from "../styles/legacyStyles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { Calendar } from "lucide-react";

const PerformanceReport = () => {
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
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
        <div style={L.wrapper}>
            <div style={L.card}>
                <div className="flex gap-6 items-end">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">From Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                maxDate={new Date()}
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] font-bold ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                                className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-52 bg-white shadow-sm transition-all h-[44px] font-bold ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                ref={toRef}
                                onFocus={(e) => e.target.blur()}
                            />
                            <i 
                                className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer text-[16px]"
                                onClick={() => toRef.current.setOpen(true)}
                            ></i>
                        </div>
                    </div>
                    <button 
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto"
                    >
                        <span>SEARCH</span>
                        <span className="text-lg">›</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default PerformanceReport;
