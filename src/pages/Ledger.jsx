import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import Table from "../components/common/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";

const Ledger = () => {
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

    const headers = ["Date", "Particulars", "Voucher No", "Debit", "Credit", "Balance"];
    const data = [];

    return (
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
            {/* Modern Filter Card */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 mb-8">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mr-2">
                        <input type="checkbox" id="margin" className="w-4 h-4 accent-[#1EB04C] cursor-pointer" />
                        <label htmlFor="margin" className="text-[13px] font-normal text-gray-600 cursor-pointer">Including Margin</label>
                    </div>

                    {/* Search Input */}
                    <div className="relative group">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] pointer-events-none"></i>
                        <input 
                            type="text" 
                            placeholder="Enter client code" 
                            className="h-[38px] w-[200px] border border-gray-200 rounded-md pl-8 pr-3 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all" 
                        />
                    </div>

                    {/* From Date */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase ml-1">From Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={fromDate}
                                onChange={(d) => setFromDate(d)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                maxDate={new Date()}
                                className={`h-[38px] w-[140px] border rounded-md px-3 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                        <label className="text-[11px] text-gray-400 font-bold uppercase ml-1">To Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={toDate}
                                onChange={(d) => setToDate(d)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="DD/MM/YYYY"
                                maxDate={new Date()}
                                className={`h-[38px] w-[140px] border rounded-md px-3 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                    <button 
                        onClick={handleApply}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[38px] rounded-md font-bold text-[12px] transition-all mt-auto uppercase tracking-wider"
                    >
                        SEARCH
                    </button>
                </div>
            </div>

            <Table
                headers={headers}
                rows={data}
            />
        </div>
    );
};

export default Ledger;
