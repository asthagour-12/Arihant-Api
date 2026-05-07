import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import LedgerTable from "../components/common/LedgerTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";
import { getBrokerageLedger } from "../api/apiService";

const Ledger = () => {
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [clientCode, setClientCode] = React.useState("");
    const [includeMargin, setIncludeMargin] = React.useState(false);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [ledgerData, setLedgerData] = React.useState([]);

    const fromRef = React.useRef();
    const toRef = React.useRef();

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
        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }
        setError("");
        fetchData();
    };

    return (
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
            {/* Modern Filter Card */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 mb-8">
                <div className="flex flex-wrap items-end gap-6">
                    {/* Checkbox */}
                    <div className="flex items-center gap-2 mr-2 mb-3">
                        <input 
                            type="checkbox" 
                            id="margin" 
                            checked={includeMargin}
                            onChange={(e) => setIncludeMargin(e.target.checked)}
                            className="w-4 h-4 accent-[#1EB04C] cursor-pointer" 
                        />
                        <label htmlFor="margin" className="text-[13px] font-normal text-gray-600 cursor-pointer">Including Margin</label>
                    </div>

                    {/* Search Input */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-gray-400 font-bold uppercase ml-1">Search by client</label>
                        <div className="relative group">
                            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] pointer-events-none"></i>
                            <input
                                type="text"
                                value={clientCode}
                                onChange={(e) => setClientCode(e.target.value)}
                                placeholder="Enter client code"
                                className="h-[44px] w-[280px] border border-gray-200 rounded-full pl-10 pr-3 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all"
                            />
                        </div>
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
                                className={`h-[44px] w-[180px] border rounded-lg px-3 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                                className={`h-[44px] w-[180px] border rounded-lg px-3 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
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
                        disabled={loading}
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-[12px] transition-all uppercase tracking-wider disabled:opacity-50 shadow-sm"
                    >
                        {loading ? "SEARCHING..." : "SEARCH"}
                    </button>
                </div>
            </div>

            <LedgerTable data={ledgerData} />
        </div>
    );
};

export default Ledger;
