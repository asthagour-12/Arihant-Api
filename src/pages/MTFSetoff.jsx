import React, { useState, useEffect, useRef } from "react";
import ResultsHeader from "../components/common/ResultsHeader";
import MTFSetoffTable from "../components/common/MTFSetoffTable";
import DataTable from "../components/common/DataTable";
import { Search, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ============================================================
// SOURCE LOGIC DATA (MTF Setoff & MTF Report)
// ============================================================
const tableData = [
    {
      date: "08/05/2026",
      client: "ARH12345",
      name: "Ujjwal Jain",
      segment: "NSE",
      stock: "RELIANCE",
      qty: 25,
      amount: "₹72,500",
      status: "Active",
    },
    {
      date: "08/05/2026",
      client: "ARH12345",
      name: "Ujjwal Jain",
      segment: "BSE",
      stock: "TCS",
      qty: 10,
      amount: "₹38,200",
      status: "Pending",
    },
    {
      date: "07/05/2026",
      client: "ARH56789",
      name: "Rahul Sharma",
      segment: "NSE",
      stock: "HDFC",
      qty: 15,
      amount: "₹41,500",
      status: "Active",
    },
    {
      date: "07/05/2026",
      client: "ARH56789",
      name: "Rahul Sharma",
      segment: "BSE",
      stock: "ITC",
      qty: 40,
      amount: "₹18,000",
      status: "Pending",
    },
    {
      date: "06/05/2026",
      client: "ARH99999",
      name: "Amit Verma",
      segment: "NSE",
      stock: "SBIN",
      qty: 30,
      amount: "₹24,000",
      status: "Completed",
    },
    {
      date: "06/05/2026",
      client: "ARH99999",
      name: "Amit Verma",
      segment: "BSE",
      stock: "WIPRO",
      qty: 20,
      amount: "₹11,400",
      status: "Active",
    },
];

const checkMarketStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const isWeekend = day === 0 || day === 6;
    const isMarketHours = hour >= 9 && hour < 17;
    return {
      isWeekend,
      isMarketHours,
      canShowData: !isWeekend && isMarketHours,
    };
};

const formatDateForMatch = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

const filterByClient = (searchTerm) => {
    if (!searchTerm || searchTerm.trim() === "") return [];
    const term = searchTerm.toLowerCase();
    return tableData.filter((item) =>
      item.client.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term)
    );
};

const filterByDate = (date) => {
    if (!date) return [];
    const formattedDate = formatDateForMatch(date);
    return tableData.filter((item) => item.date === formattedDate);
};

const exportAsCSV = (data) => {
    const headers = ["Date", "Client Code", "Name", "Segment", "Stock", "Quantity", "Amount", "Status"];
    const rows = data.map((item) => [
      item.date,
      item.client,
      item.name,
      item.segment,
      item.stock,
      item.qty,
      item.amount,
      item.status,
    ]);
    return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
};

const MTFSetoff = () => {
    const [activeSubTab, setActiveSubTab] = useState("MTF Setoff");
    const [search, setSearch] = useState("");
    const [requestDate, setRequestDate] = useState(null);
    const [clientCode, setClientCode] = useState("");
    const [searched, setSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");
    
    const dateRef = useRef();

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    const handleSearch = () => {
        // 1. Validation First
        if (activeSubTab === "MTF Setoff") {
            if (!search.trim()) {
                setCustomErrorMsg("Please enter full client code");
                setShowCustomError(true);
                return;
            }
        } else {
            if (!requestDate) {
                setCustomErrorMsg("Please select a date to search");
                setShowCustomError(true);
                return;
            }
        }

        // 2. Market Hours Check
        const { canShowData } = checkMarketStatus();
        if (!canShowData) {
            setCustomErrorMsg("Search is allowed only Monday to Friday between 9:00 AM and 5:00 PM");
            setShowCustomError(true);
            return;
        }

        // 3. Execution
        if (activeSubTab === "MTF Setoff") {
            const results = filterByClient(search);
            setFilteredData(results);
        } else {
            const results = filterByDate(requestDate);
            setFilteredData(results);
        }
        setSearched(true);
        toast.success(`Search completed`);
    };

    const handleApply = () => {
        // 1. Validation First
        if (!clientCode.trim()) {
            setCustomErrorMsg("Please enter full client code");
            setShowCustomError(true);
            return;
        }

        // 2. Market Hours Check
        const { canShowData } = checkMarketStatus();
        if (!canShowData) {
            setCustomErrorMsg("Search is allowed only Monday to Friday between 9:00 AM and 5:00 PM");
            setShowCustomError(true);
            return;
        }

        // 3. Execution
        const results = filterByClient(clientCode);
        setFilteredData(results);
        setSearched(true);
        toast.success(`Filter applied`);
    };

    const handleDownload = () => {
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(exportAsCSV(filteredData));
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `MTF_${activeSubTab.replace(" ", "_")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const displayData = filteredData.map(item => ({
        date: item.date,
        code: item.client,
        script: item.stock,
        quantity: item.qty,
        price: item.amount.replace("₹", "").replace(",", ""),
        amount: item.amount
    }));

    return (
        <div className="px-6 pt-2 pb-10 max-w-[1600px] mx-auto">
            {/* 🧭 SUB TABS (LEVEL 2) */}
            <div className="flex gap-10 border-b border-gray-200 mb-5 px-2">
                {["MTF Setoff", "MTF Report"].map((tab) => (
                    <span
                        key={tab}
                        onClick={() => {
                            setActiveSubTab(tab);
                            setSearched(false);
                            setSearch("");
                            setClientCode("");
                            setRequestDate(null);
                            setFilteredData([]);
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

            {/* Filter Section Card (Compact - Trial Balance Style) */}
            <div className="bg-gray-100 p-5 mb-6 rounded-xl border border-gray-200 relative">
                <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
                    {activeSubTab === "MTF Setoff" ? (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Search by client</label>
                                <div className="relative">
                                    <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search client code"
                                        className={`h-[46px] w-[340px] border rounded-full pl-11 pr-4 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all shadow-sm ${showCustomError && !search.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleSearch}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-12 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                SEARCH &gt;
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Request Date</label>
                                <div className="relative group">
                                    <DatePicker
                                        selected={requestDate}
                                        onChange={(d) => setRequestDate(d)}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="DD/MM/YYYY"
                                        className={`h-[46px] w-[200px] border rounded-lg px-4 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all shadow-sm ${showCustomError && !requestDate ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                        ref={dateRef}
                                        onFocus={(e) => e.target.blur()}
                                    />
                                    <Calendar
                                        size={16}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer group-hover:text-[#34b350] transition-colors"
                                        onClick={() => dateRef.current.setOpen(true)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-10 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                SEARCH
                            </button>

                            <div className="flex flex-col gap-2 ml-4">
                                <label className="text-[13px] font-bold text-gray-700">Search By Client Code</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={clientCode}
                                        onChange={(e) => setClientCode(e.target.value)}
                                        placeholder="Search by Client Code"
                                        className={`h-[46px] w-[280px] border rounded-lg px-4 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all shadow-sm ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleApply}
                                className="bg-[#1EB04C] hover:bg-[#18a045] text-white px-10 h-[46px] rounded-full font-bold text-[13px] transition-all active:scale-[0.98] shadow-md uppercase"
                            >
                                APPLY &gt;
                            </button>
                        </>
                    )}
                </div>
            </div>

            {searched && (
                <>
                    <ResultsHeader count={displayData.length} onDownload={handleDownload} />
                    {activeSubTab === "MTF Setoff" ? (
                        <MTFSetoffTable data={displayData} />
                    ) : (
                        <DataTable 
                            headers={["DATE", "CODE", "SCRIPT", "QUANTITY", "PRICE", "AMOUNT"]}
                            rows={displayData.map(d => [d.date, d.code, d.script, d.quantity, d.price, d.amount])}
                        />
                    )}
                </>
            )}

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

export default MTFSetoff;
