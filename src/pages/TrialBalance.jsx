import React, { useState, useEffect } from "react";
import FilterSection, { FilterItem, ApplyButton, SearchInput } from "../components/common/FilterSection";
import { getTrialBalance } from "../api/korpApiService";
import { toast } from "react-toastify";
import { ChevronUp, ChevronDown, ChevronsUpDown, Download } from "lucide-react";

const TrialBalance = () => {
    const [clientCode, setClientCode] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const fetchTableData = async (code = "") => {
        setLoading(true);
        try {
            const params = {
                pageNumber: 0,
                size: 50,
            };
            if (code) {
                params.clientCode = code;
            }

            const response = await getTrialBalance(params);

            const rows =
                response?.data?.result?.userList ||
                response?.data?.result?.result1 ||
                response?.data?.result ||
                response?.data?.data ||
                response?.data?.Data ||
                response?.data ||
                [];

            let finalRows = [];
            if (Array.isArray(rows)) {
                finalRows = rows;
            } else if (typeof rows === 'object' && rows !== null) {
                for (let key of Object.keys(rows)) {
                    if (Array.isArray(rows[key])) {
                        finalRows = rows[key];
                        break;
                    }
                }
            }

            setTableData(finalRows);
            setCurrentPage(1);
        } catch (error) {
            console.error("Trial Balance API Error:", error);
            setTableData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTableData();
    }, []);

    const handleSearchClient = () => {
        if (!clientCode.trim()) {
            toast.error("Please enter Client Code");
            return;
        }
        fetchTableData(clientCode);
        toast.success("Searching client...");
    };

    const fmt = (v) => {
        if (v === null || v === undefined || v === "") return "-";
        const num = parseFloat(v);
        if (!isNaN(num) && (typeof v === 'number' || /^-?\d+(\.\d+)?$/.test(String(v).trim()))) {
            return `₹ ${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
        return String(v);
    };

    // Build mapped rows
    const mappedRows = tableData.map(item => ({
        nameCode: `${item.clientname || item.CLIENTNAME || "-"} (${item.clientcode || item.CLIENTCODE || "-"})`,
        branch: item.BRANCHNAME || item.branchname || item.BranchName || "-",
        region: item.CROCODE || item.CRONAME || item.croname || item.CroName || item.REGIONNAME || item.regionname || "-",
        zone: item.CZOCODE || item.CZONAME || item.czoname || item.CzoName || item.ZONENAME || item.zonename || "-",
        openDebit: fmt(item.OPENDEBIT ?? item.opendebit ?? item.OpenDebit),
        openCredit: fmt(item.OPENCREDIT ?? item.opencredit ?? item.OpenCredit),
        netDebit: fmt(item.NETDEBIT ?? item.netdebit ?? item.NetDebit),
        netCredit: fmt(item.NETCREDIT ?? item.netcredit ?? item.NetCredit),
    }));

    // Determine if any row provides region or zone data
    const hasRegionData = tableData.some(item =>
        item.CRONAME || item.croname || item.CroName || item.REGIONNAME || item.regionname
    );
    const hasZoneData = tableData.some(item =>
        item.CZONAME || item.czoname || item.CzoName || item.ZONENAME || item.zonename
    );

    // Define table columns in the required order
    const headers = [
        { label: "Client Name & Code", key: "nameCode", align: "left" },
        { label: "Branch Name",       key: "branch",   align: "left" },
        { label: "Region Name",       key: "region",   align: "left" },
        { label: "Zone Name",         key: "zone",     align: "left" },
        { label: "Open Debit",        key: "openDebit", align: "left" },
        { label: "Open Credit",       key: "openCredit", align: "left" },
        { label: "Net Debit",         key: "netDebit", align: "left" },
        { label: "Net Credit",        key: "netCredit", align: "left" },
    ];

    // Sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedRows = React.useMemo(() => {
        if (!sortConfig.key) return mappedRows;
        return [...mappedRows].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [mappedRows, sortConfig]);

    const SortIcon = ({ column }) => {
        if (sortConfig.key === column) {
            return sortConfig.direction === "asc" ? (
                <ChevronUp size={14} className="text-white" />
            ) : (
                <ChevronDown size={14} className="text-white" />
            );
        }
        return <ChevronsUpDown size={14} className="text-white/60" />;
    };

    const visibleRows = sortedRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(sortedRows.length / rowsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleDownload = () => {
        const csvHeaders = headers.map(h => h.label).join(",");
        const csvRows = sortedRows.map(row =>
            headers.map(h => `"${String(row[h.key]).replace(/₹/g, "").trim()}"`).join(",")
        ).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + csvHeaders + "\n" + csvRows;
        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `Trial_Balance_Report_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Report downloaded successfully");
    };

    return (
        <div className="px-2 pt-6 pb-0 max-w-[1600px] mx-auto">
            <FilterSection>
                <FilterItem label="Search By Client">
                    <SearchInput
                        placeholder="Search client code"
                        width="280px"
                        value={clientCode}
                        onChange={(e) => setClientCode(e.target.value)}
                    />
                </FilterItem>
                <ApplyButton label="SEARCH" onClick={handleSearchClient} />
            </FilterSection>

            {loading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EB04C]"></div>
                    <span className="ml-3 text-gray-500 text-sm">Loading...</span>
                </div>
            )}

            {/* Custom Table — no scroller, full names, auto column widths */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" style={{ tableLayout: "auto" }}>
                    <thead className="bg-[#1EB04C] text-white">
                        <tr>
                            {headers.map((h, i) => (
                                <th
                                    key={i}
                                    onClick={() => handleSort(h.key)}
                                    className={`px-4 py-4 text-[13px] font-semibold border-r border-white/10 last:border-0 cursor-pointer select-none hover:bg-[#18a045] transition-colors whitespace-nowrap ${h.align === "right" ? "text-right" : "text-left"}`}
                                >
                                    <div className={`flex items-center gap-1.5 ${h.align === "right" ? "justify-end" : "justify-start"}`}>
                                        <span>{h.label}</span>
                                        <SortIcon column={h.key} />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {visibleRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                {headers.map((h, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className={`px-4 py-3.5 border-r border-gray-50 last:border-0 text-[13px] text-gray-700 font-medium whitespace-nowrap ${h.align === "right" ? "text-right" : "text-left"}`}
                                    >
                                        {row[h.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {sortedRows.length === 0 && (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-12 text-center text-gray-400 font-bold text-[14px]">
                                    No data to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 text-gray-500 font-bold border-t border-gray-100 text-[12px] tracking-wider flex items-center justify-between">
                    <div>
                        Showing {sortedRows.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedRows.length)} of {sortedRows.length} RECORDS
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {sortedRows.length > 0 && (
                            <button onClick={handleDownload} className="flex items-center gap-1.5 text-[#1EB04C] hover:text-[#18a045] transition-colors font-bold">
                                <Download size={14} />
                                <span>Download CSV</span>
                            </button>
                        )}
                        
                        {sortedRows.length > rowsPerPage && (
                            <div className="flex items-center gap-1.5">
                                <button 
                                    onClick={handlePrev} 
                                    disabled={currentPage === 1}
                                    className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                                >
                                    <i className="fa fa-chevron-left text-[10px]"></i>
                                </button>
                                
                                <span className="w-7 h-7 flex items-center justify-center bg-[#1EB04C] text-white rounded text-xs font-bold shadow-sm">
                                    {currentPage}
                                </span>

                                <button 
                                    onClick={handleNext} 
                                    disabled={currentPage === totalPages}
                                    className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-200 font-bold"
                                >
                                    <i className="fa fa-chevron-right text-[10px]"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialBalance;