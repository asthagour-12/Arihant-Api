import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import ArihantProducts from "./ArihantProducts.jsx";
import { L } from "../styles/legacyStyles.jsx";
import { Search, Download, Trash2, ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../components/common/Table";
import ResultsHeader from "../components/common/ResultsHeader";
import CalendarHeader from "../components/common/CalendarHeader";
import { useNavigate } from "react-router-dom";
import korpInstance, { getUserProfile } from "../api/korpApiService";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";



const Payout = () => {
    const [activeTab, setActiveTab] = useState("Payout");

    const tabs = ["Payout", "Bulk Payout", "Payout Report", "Cancel Request"];

    useEffect(() => {
        const hitGetProfile = async () => {
            try {
                await getUserProfile();
                console.log("getUserProfile API hit successfully on Payout click/tab mount!");
            } catch (error) {
                console.error("Error hitting getUserProfile API on Payout click:", error);
            }
        };
        hitGetProfile();
    }, [activeTab]);

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
    const navigate = useNavigate();
    const [clientCode, setClientCode] = useState("");
    const [rows, setRows] = useState([]);
    const [allCount, setAllCount] = useState(0);
    const [count, setCount] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState({
        pageNumber: 0,
        size: 50,
    });

    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    // =========================================
    // GET PAYOUT REPORT
    // =========================================
    const getPayOutReports = async (
        pageNumber = page.pageNumber,
        size = page.size
    ) => {
        try {
            if (!clientCode.trim()) {
                setCustomErrorMsg("Please Enter Client Code");
                setShowCustomError(true);
                return;
            }

            setIsLoading(true);

            const params = {
                size,
                pageNumber,
                clientcode: clientCode.trim(),
            };

            console.log("REQUEST PARAMS =>", params);

            const response = await korpInstance.get(
                "/payout/korpgetclientBalance",
                {
                    params,
                }
            );

            console.log("FULL RESPONSE =>", response.data);

            const res = response.data;

            if (res.success) {
                setAllCount(res?.result?.all_Count || 0);
                setCount(res?.result?.all_Count || 0);

                setPage({
                    pageNumber,
                    size,
                });

                setNumberOfPages(res?.result?.numberOfPages || 0);
                setRowsPerPage(res?.result?.rowsPerPage || 0);

                const balanceList = res?.result?.balancelist || [];

                const updatedRows = balanceList.map((row) => ({
                    ...row,
                    request: "",
                    tempRequest: "",
                    selectedBankAccount:
                        row.bankdetailslist?.[0]?.BankAccount || "",
                }));

                setRows(updatedRows);
                if (updatedRows.length === 0) {
                    toast.info("No records found for the entered client code.");
                }
            } else {
                toast.error(res.message || "Failed to fetch payout details");
                navigate("/payout");
            }
        } catch (error) {
            console.log("API ERROR =>", error);
            toast.error("Something went wrong while fetching payout details");
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = () => {
        getPayOutReports(0);
    };

    // =========================================
    // INPUT CHANGE
    // =========================================
    const onInputChange = (index, value) => {
        const updatedRows = [...rows];
        updatedRows[index].request = value;
        updatedRows[index].tempRequest = value;
        setRows(updatedRows);
    };

    // =========================================
    // BANK CHANGE
    // =========================================
    const handleBankChange = (index, value) => {
        const updatedRows = [...rows];
        updatedRows[index].selectedBankAccount = value;
        setRows(updatedRows);
    };

    // =========================================
    // UPDATE BUTTON (SUBMIT PAYOUT)
    // =========================================
    const updateBtn = async (row, index) => {
        try {
            // VALIDATION
            if (!row.request) {
                toast.error("Please enter request amount");
                return;
            }

            const requestAmount = parseFloat(row.request);

            if (isNaN(requestAmount) || requestAmount <= 0) {
                toast.error("Please enter a valid positive amount");
                return;
            }

            const clientBalance = parseFloat(row.ClientBalance);

            if (requestAmount > clientBalance) {
                toast.error("Request amount cannot exceed available balance");
                return;
            }

            setIsSubmitting(true);

            // PAYLOAD
            const payload = {
                Balance: row.ClientBalance.toString(),
                requestbalance: row.request.toString(),
                clientcode: row.ClientCode,
                BankAccount: row.selectedBankAccount,
            };

            console.log("REQUEST PAYLOAD =>", payload);

            const response = await korpInstance.post(
                "/payout/GetRequestReport",
                payload
            );

            console.log("UPDATE RESPONSE =>", response.data);

            const res = response.data;

            if (res.success) {
                toast.success(res.message || "Payout request submitted successfully!");

                const updatedRows = [...rows];
                updatedRows[index].request = "";
                updatedRows[index].tempRequest = "";
                setRows(updatedRows);

                setTimeout(() => {
                    navigate("/payout");
                    window.location.reload();
                }, 3000);
            } else {
                toast.error(res.message || "Failed to submit payout request");

                const updatedRows = [...rows];
                updatedRows[index].request = updatedRows[index].tempRequest;
                setRows(updatedRows);
                navigate("/payout");
            }
        } catch (error) {
            console.log("UPDATE ERROR =>", error);
            toast.error(
                error?.response?.data?.message ||
                "Failed to submit payout request"
            );

            const updatedRows = [...rows];
            updatedRows[index].request = updatedRows[index].tempRequest;
            setRows(updatedRows);
        } finally {
            setIsSubmitting(false);
        }
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
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleApply();
                                }}
                                placeholder="Enter client code"
                                className={`pl-11 pr-4 py-3 border rounded-full focus:outline-none focus:border-[#34b350] text-sm w-[320px] bg-white shadow-sm transition-all h-[44px] font-bold ${showCustomError && !clientCode.trim() ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleApply}
                        disabled={isLoading}
                        className="bg-[#34b350] hover:bg-[#2e9e47] disabled:bg-gray-400 text-white px-10 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-auto active:scale-95"
                    >
                        <span>{isLoading ? "SEARCHING..." : "APPLY"}</span>
                        <span className="text-lg">›</span>
                    </button>
                </div>
            </div>

            {/* 📊 PREMIUM REVIEW TABLE */}
            {(rows.length > 0 || isLoading) && (
                <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center px-1">
                        <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
                            Payout Details ({rows.length})
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-[#27ae60] text-white">
                                    <tr>
                                        {["Client Code", "Client Name", "Balance", "Request Amount", "Bank Account", "Action"].map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-r border-white/10 last:border-0"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-bold tracking-wider">
                                                Loading payout data...
                                            </td>
                                        </tr>
                                    ) : (
                                        rows.map((row, index) => {
                                            const requestAmt = parseFloat(row.request || 0);
                                            const balanceExceeded = requestAmt > parseFloat(row.ClientBalance || 0);

                                            return (
                                                <tr
                                                    key={index}
                                                    className={`hover:bg-gray-50/50 transition-colors group ${balanceExceeded ? "bg-rose-50/40 hover:bg-rose-50/70" : ""
                                                        }`}
                                                >
                                                    <td className="px-6 py-4 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">
                                                        {row.ClientCode}
                                                        {balanceExceeded && (
                                                            <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider animate-pulse">
                                                                Exceeds Balance
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50 uppercase">
                                                        {row.ClientName}
                                                    </td>
                                                    <td className="px-6 py-4 text-[14px] text-gray-800 font-bold whitespace-nowrap border-r border-gray-50">
                                                        ₹
                                                        {Number(row.ClientBalance || 0).toLocaleString("en-IN", {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 border-r border-gray-50 whitespace-nowrap">
                                                        <div className="relative">
                                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[12px] font-bold">₹</span>
                                                            <input
                                                                type="number"
                                                                value={row.request}
                                                                onChange={(e) => onInputChange(index, e.target.value)}
                                                                placeholder="0.00"
                                                                className={`w-[140px] pl-6 pr-3 py-1.5 bg-gray-50 border rounded-lg text-[12px] font-bold text-gray-700 outline-none transition-all ${balanceExceeded
                                                                    ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                                                                    : "border-gray-200 focus:border-[#27ae60] focus:ring-2 focus:ring-[#27ae60]/10"
                                                                    }`}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 border-r border-gray-50 whitespace-nowrap w-[240px]">
                                                        {row.bankdetailslist && row.bankdetailslist.length > 0 ? (
                                                            <select
                                                                value={row.selectedBankAccount}
                                                                onChange={(e) => handleBankChange(index, e.target.value)}
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-bold text-gray-700 outline-none focus:border-[#27ae60] focus:ring-2 focus:ring-[#27ae60]/10 transition-all cursor-pointer"
                                                            >
                                                                {row.bankdetailslist.map((bank, bankIndex) => (
                                                                    <option key={bankIndex} value={bank.BankAccount}>
                                                                        {bank.BankAccount} ({bank.BankName || "Bank"})
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
                                                                No Bank Registered
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                                        <button
                                                            onClick={() => updateBtn(row, index)}
                                                            disabled={isSubmitting || balanceExceeded}
                                                            className="bg-[#27ae60] hover:bg-[#219150] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-1.5 rounded-lg text-[11px] font-black transition-all uppercase tracking-wider shadow-sm active:scale-95 flex items-center justify-center gap-1.5 mx-auto"
                                                        >
                                                            <span>{isSubmitting ? "SUBMITTING..." : "SUBMIT"}</span>
                                                            <span className="text-xs">→</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {numberOfPages > 1 && (
                            <div className="px-6 py-4 bg-gray-50/50 text-gray-500 font-bold border-t border-gray-100 text-[11px] flex justify-between items-center">
                                <span>Total Count: {allCount} | Total Pages: {numberOfPages} | Rows Per Page: {rowsPerPage}</span>
                                <div className="flex gap-2">
                                    <button
                                        disabled={page.pageNumber === 0}
                                        onClick={() => getPayOutReports(page.pageNumber - 1)}
                                        className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled={page.pageNumber + 1 >= numberOfPages}
                                        onClick={() => getPayOutReports(page.pageNumber + 1)}
                                        className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
    const navigate = useNavigate();

    const [allCount, setAllCount] = useState(0);
    const [count, setCount] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(0);

    const [requestDate, setRequestDate] = useState(null);
    const [clientCode, setClientCode] = useState("");

    const [resultData, setResultData] = useState({});
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

    const headerToKey = {
        "Client Code": "ClientCode",
        "Date": "RequestDate",
        "Client Name": "ClientName",
        "BankAccount": "BankAccount",
        "Request Amount": "RequestAmount",
        "Status": "Status"
    };

    const handleSort = (header) => {
        const key = headerToKey[header];
        if (!key) return;
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedRows = React.useMemo(() => {
        if (!sortConfig.key) return rows;
        return [...rows].sort((a, b) => {
            let aVal = a[sortConfig.key] || a[sortConfig.key.toLowerCase()] || a[sortConfig.key.charAt(0).toLowerCase() + sortConfig.key.slice(1)] || "";
            let bVal = b[sortConfig.key] || b[sortConfig.key.toLowerCase()] || b[sortConfig.key.charAt(0).toLowerCase() + sortConfig.key.slice(1)] || "";
            
            // Format check for numbers
            if (sortConfig.key === "RequestAmount") {
                const numA = Number(String(aVal).replace(/,/g, ''));
                const numB = Number(String(bVal).replace(/,/g, ''));
                return sortConfig.direction === "asc" ? numA - numB : numB - numA;
            }

            if (typeof aVal === "string") aVal = aVal.toLowerCase();
            if (typeof bVal === "string") bVal = bVal.toLowerCase();
            
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [rows, sortConfig]);

    const renderSortIcon = (header) => {
        const key = headerToKey[header];
        if (!key || sortConfig.key !== key) {
            return <ChevronsUpDown size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />;
        }
        return sortConfig.direction === "asc" 
            ? <ChevronUp size={14} className="text-white" /> 
            : <ChevronDown size={14} className="text-white" />;
    };

    const [page, setPage] = useState({
        pageNumber: 0,
        size: 50,
    });

    const [showCustomError, setShowCustomError] = useState(false);
    const [customErrorMsg, setCustomErrorMsg] = useState("");

    useEffect(() => {
        if (showCustomError) {
            const timer = setTimeout(() => setShowCustomError(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCustomError]);

    // =========================================
    // DATE FORMAT
    // =========================================
    const formatSearchDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    };

    // =========================================
    // GET DETAILS
    // =========================================
    const getDetail = async (
        pageNumber = page.pageNumber,
        size = page.size,
        searchClientCode = clientCode,
        searchDate = requestDate
    ) => {
        try {
            setIsLoading(true);
            let params = {
                size,
                pageNumber,
            };

            if (searchClientCode.trim()) {
                params.clientcode = searchClientCode.trim();
            }

            if (searchDate) {
                const formattedDate = formatSearchDate(searchDate);
                if (formattedDate) {
                    params.requestdate = formattedDate;
                }
            }

            console.log("REQUEST PARAMS =>", params);

            const response = await korpInstance.get(
                "/payout/korpgetpayoutrequestreport",
                {
                    params,
                }
            );

            console.log("FULL RESPONSE =>", response.data);

            const res = response.data;

            if (res.success) {
                setResultData(res?.result || {});
                setAllCount(res?.result?.all_Count || 0);
                setCount(res?.result?.all_Count || 0);

                setPage({
                    pageNumber,
                    size,
                });

                setNumberOfPages(res?.result?.numberOfPages || 0);
                setRowsPerPage(res?.result?.rowsPerPage || 0);
                setRows(res?.result?.Payoutlist || []);
            } else {
                toast.error(res.message || "Error fetching report details");
                navigate("/payout");
            }
        } catch (error) {
            console.log("API ERROR =>", error);
            toast.error("Failed to fetch payout report details");
        } finally {
            setIsLoading(false);
        }
    };

    // =========================================
    // SEARCH
    // =========================================
    const handleSearch = () => {
        getDetail(0);
    };

    // =========================================
    // CLEAR
    // =========================================
    const clearBtn = () => {
        setRequestDate(null);
        setClientCode("");
        getDetail(0, page.size, "", null);
    };

    // =========================================
    // PAGE LOAD
    // =========================================
    useEffect(() => {
        getDetail(0);
    }, []);

    // =========================================
    // EXPORT EXCEL
    // =========================================
    const exportAsXLSX = async () => {
        try {
            const params = {
                pageNumber: 0,
                size: count || 500,
            };

            if (clientCode.trim()) {
                params.clientcode = clientCode.trim();
            }

            if (requestDate) {
                const formattedDate = formatSearchDate(requestDate);
                if (formattedDate) {
                    params.requestdate = formattedDate;
                }
            }

            const response = await korpInstance.get(
                "/payout/korpgetpayoutrequestreport",
                {
                    params,
                }
            );

            const res = response.data;
            const data = res?.result?.Payoutlist || [];

            const exportData = data.map((item) => {
                const updatedItem = { ...item };
                delete updatedItem.RoCode;
                delete updatedItem.RoName;
                return updatedItem;
            });

            // CREATE EXCEL
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Payout Report");
            XLSX.writeFile(workbook, "payout_report.xlsx");
            toast.success("Excel Export Successful!");
        } catch (error) {
            console.log("EXPORT ERROR =>", error);
            toast.error("Excel Export Failed");
        }
    };

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            {/* Search Panel and Result Info (Merged in a single flow without L.card) */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center px-1">
                    <div className="text-[13px] text-black font-bold uppercase tracking-[0.15em]">
                        Search results ({rows.length})
                    </div>
                    <button
                        onClick={exportAsXLSX}
                        className="w-11 h-11 rounded-full flex items-center justify-center text-[#34b350] bg-green-50 hover:bg-[#34b350] hover:text-white transition-all shadow-sm border border-green-100 active:scale-95 animate-in fade-in"
                    >
                        <i className="fas fa-download text-[16px]"></i>
                    </button>
                </div>

                <div className="flex gap-6 items-end flex-wrap">
                    {/* Date Picker Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-500 font-bold text-[11px] uppercase tracking-wider ml-1">Request Date</label>
                        <div className="relative group">
                            <DatePicker
                                selected={requestDate}
                                onChange={(d) => setRequestDate(d)}
                                placeholderText="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#34b350] text-sm w-48 bg-white shadow-sm transition-all h-[44px] font-bold"
                            />
                            <i className="fas fa-calendar-alt absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"></i>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={clearBtn}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center active:scale-95"
                        >
                            CLEAR
                        </button>
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-6 h-[44px] rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center active:scale-95 disabled:bg-gray-400"
                        >
                            {isLoading ? "SEARCHING..." : "SEARCH"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Compact Summary Cards */}
            <div className="flex flex-wrap gap-3 mt-6 mb-6">
                {[
                    { label: "Total Request" },
                    { label: "Total Process" },
                    { label: "Total Cancel" }
                ].map(card => (
                    <div key={card.label} className="bg-white border border-gray-100 rounded-lg py-2 px-4 shadow-sm flex items-center justify-center min-w-[145px] h-[58px] flex-1 sm:flex-none">
                        <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                            {card.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* 📊 PREMIUM REVIEW TABLE */}
            <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white border border-gray-100 rounded-none overflow-hidden shadow-xl shadow-gray-200/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#34b350] text-white">
                                <tr>
                                    {["Client Code", "Date", "Client Name", "BankAccount", "Request Amount", "Status"].map((header) => (
                                        <th
                                            key={header}
                                            className="px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer hover:bg-[#2e9e47] transition-colors border-r border-white/10 last:border-0"
                                            onClick={() => handleSort(header)}
                                        >
                                            <div className="flex items-center justify-between group">
                                                {header}
                                                {renderSortIcon(header)}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400 font-bold tracking-wider">
                                            Loading report data...
                                        </td>
                                    </tr>
                                ) : sortedRows.length > 0 ? (
                                    sortedRows.map((row, index) => {
                                        const reqDate = row.RequestDate || row.Requestdate || row.date || "";
                                        const cCode = row.ClientCode || row.clientCode || "";
                                        const cName = row.ClientName || row.clientName || "";
                                        const reqAmt = row.RequestAmount || row.amount || 0;
                                        const status = row.Status || row.status || "Pending";
                                        const bankAcc = row.BankAccount || row.BankAccountNo || row.BankAccountNumber || "-";

                                        return (
                                            <tr
                                                key={index}
                                                className="hover:bg-gray-50/50 transition-colors group"
                                            >
                                                <td className="px-6 py-4 text-[13px] text-gray-900 font-bold whitespace-nowrap border-r border-gray-50">
                                                    {cCode}
                                                </td>
                                                <td className="px-6 py-4 text-[13px] text-gray-600 font-medium whitespace-nowrap border-r border-gray-50">
                                                    {reqDate}
                                                </td>
                                                <td className="px-6 py-4 text-[13px] text-gray-700 font-medium whitespace-nowrap border-r border-gray-50 uppercase">
                                                    {cName}
                                                </td>
                                                <td className="px-6 py-4 text-[13px] text-gray-500 font-mono whitespace-nowrap border-r border-gray-50">
                                                    {bankAcc}
                                                </td>
                                                <td className="px-6 py-4 text-[14px] text-[#27ae60] font-black whitespace-nowrap border-r border-gray-50">
                                                    ₹
                                                    {Number(reqAmt).toLocaleString("en-IN", {
                                                        minimumFractionDigits: 2,
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${status.toLowerCase() === "processed"
                                                        ? "bg-green-50 text-green-600 border-green-100"
                                                        : status.toLowerCase() === "cancelled" || status.toLowerCase() === "rejected"
                                                            ? "bg-rose-50 text-rose-600 border-rose-100"
                                                            : "bg-orange-50 text-orange-600 border-orange-100"
                                                        }`}>
                                                        {status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-300 font-black tracking-[0.3em] uppercase">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {numberOfPages > 1 && (
                        <div className="px-6 py-4 bg-gray-50/50 text-gray-500 font-bold border-t border-gray-100 text-[11px] flex justify-between items-center">
                            <span>Total Count: {allCount} | Total Pages: {numberOfPages} | Rows Per Page: {rowsPerPage}</span>
                            <div className="flex gap-2">
                                <button
                                    disabled={page.pageNumber === 0}
                                    onClick={() => getDetail(page.pageNumber - 1)}
                                    className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={page.pageNumber + 1 >= numberOfPages}
                                    onClick={() => getDetail(page.pageNumber + 1)}
                                    className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
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

const CancelRequestTab = () => {
    const [rows, setRows] = useState([]);
    const [allCount, setAllCount] = useState(0);

    const todayDateStr = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${day}-${month}-${year}`;
    };

    const getDetail = async () => {
        try {
            const params = {
                size: 500,
                pageNumber: 0,
                requestdate: todayDateStr(),
            };

            const response = await korpInstance.post("/payout/getPayOutCancelData", {}, { params });
            const res = response.data;
            if (res.success) {
                setAllCount(res?.result?.all_Count || 0);
                setRows(res?.result?.Payoutlist || []);
            }
        } catch (error) {
            console.log("API ERROR =>", error);
        }
    };

    useEffect(() => {
        getDetail();
    }, []);

    const onSubmit = async (submitClientCode, Id) => {
        try {
            const params = {
                RequestId: Id,
                ClientCode: submitClientCode,
                RequestDate: todayDateStr(),
            };

            const response = await korpInstance.get("/payout/GetPayOutCancelRequest", { params });
            if (response.data.success) {
                toast.success(response.data.message || "Cancellation successful!");
                getDetail();
            } else {
                toast.error(response.data.message || "Error processing cancellation");
            }
        } catch (error) {
            toast.error("Cancel Request Failed");
        }
    };

    const handleDownload = () => {
        if (rows.length === 0) return;
        const csv = [["Date", "Client Code", "Client Name", "Request Amount", "Status"]];
        rows.forEach(item => {
            csv.push([
                item.RequestDate || item.date || todayDateStr(),
                item.ClientCode || "",
                `"${item.ClientName || ""}"`,
                String(item.RequestAmount || "").replace(/,/g, ''),
                item.Status || item.status || "Pending"
            ].join(","));
        });
        const blob = new Blob(["\uFEFF" + csv.join("\n")], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Cancel_Request_Report.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const formattedRows = rows.map((row) => [
        row.RequestDate || row.date || todayDateStr(),
        row.ClientCode,
        row.ClientName,
        `₹${Number(row.RequestAmount || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full font-bold text-[10px] uppercase border border-orange-100">
            {row.Status || row.status || "Pending"}
        </span>,
        <button
            onClick={() => onSubmit(row.ClientCode, row.Id)}
            className="bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white px-4 py-1 rounded text-[10px] font-black transition-all uppercase tracking-widest active:scale-95 flex items-center gap-1.5 mx-auto"
        >
            <Trash2 size={12} /> CANCEL
        </button>
    ]);

    return (
        <div style={{ ...L.wrapper, paddingTop: '8px' }}>
            <div style={{ ...L.card, borderRadius: '16px' }} className="mt-2">
                <ResultsHeader count={allCount} onDownload={handleDownload} />
                <Table
                    headers={["Date", "Client Code", "Client Name", "Request Amount", "Status", "Cancel"]}
                    rows={formattedRows}
                />
            </div>
        </div>
    );
};

export default Payout;
