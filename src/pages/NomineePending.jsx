import React, { useEffect, useState } from "react";
import { getNomineeNotDone } from "../api/korpApiService";
import { toast } from "react-toastify";

const NomineePending = () => {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const topTabs = [
        "KRA & UCC Status",
        "Hold KRA Status",
        "Modification Status",
        "Physical Account Opening",
        "Nominee Pending",
        "Contact Details",
        "Rekyc TAT",
        "EKYC TAT",
        "Reactivation TAT"
    ];

    // API CALL
    const fetchData = async () => {

        setLoading(true);

        try {

            const params = {};

            if (search.trim()) {
                params.clientCode = search.trim();
            }

            const response = await getNomineeNotDone(params);

            console.log("FULL API RESPONSE :", response.data);

            // ✅ CORRECT RESPONSE ARRAY
            const items = response?.data?.result || [];

            setResults(items);
            setCurrentPage(1);

        } catch (error) {

            console.log(error);

            toast.error("Failed to fetch nominee data");

            setResults([]);

        } finally {

            setLoading(false);

        }
    };

    // PAGE LOAD
    useEffect(() => {
        fetchData();
    }, []);

    const totalPages = Math.ceil(results.length / rowsPerPage);
    const visibleData = results.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-[#34b350] selection:text-white">

            {/* 🟢 HEADER */}
            <div className="bg-[#34b350] px-[32px] h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white font-bold">
                <div className="flex items-center gap-10">
                    <div className="text-2xl font-black tracking-tighter">
                        ArihantCapital
                    </div>

                    <nav className="flex gap-6 text-[13px] opacity-90">
                        <span>Dashboard</span>
                        <span className="border-b-2 border-white pb-0.5">
                            Reports
                        </span>
                        <span>Account Opening</span>
                        <span>Contests</span>
                        <span>Click To Call</span>
                    </nav>
                </div>
            </div>

            {/* 🔵 BREADCRUMB */}
            <div className="bg-[#e6f7ff] px-[40px] py-[14px] flex items-center gap-3 text-[12px] text-gray-800 font-bold uppercase tracking-widest">
                <div className="w-[8px] h-[8px] bg-[#34b350] rounded-full"></div>

                <span>Circulars</span>

                <span className="text-gray-300">/</span>

                <span className="text-[#34b350]">
                    Nominee Pending
                </span>
            </div>

            {/* 📑 TABS */}
            <div className="bg-white border-b border-gray-100 px-[40px] pt-[24px] sticky top-[64px] z-[90]">

                <div className="flex flex-wrap gap-x-[35px] gap-y-4 mb-4 overflow-x-auto no-scrollbar">

                    {topTabs.map((tab) => (

                        <div
                            key={tab}
                            className={`pb-3 text-[14px] font-bold transition-all relative cursor-pointer tracking-tighter whitespace-nowrap
                            
                            ${tab === "Nominee Pending"
                                    ? "text-gray-900 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[4px] after:bg-[#34b350]"
                                    : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            {tab}
                        </div>

                    ))}

                </div>

            </div>

            {/* 🖥 CONTENT */}
            <div className="px-[40px] py-[40px] min-h-[600px]">

                <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12 space-y-10">

                    {/* TOP */}
                    <div className="flex justify-between items-center px-1">

                        <div className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
                            Nominee Pending
                        </div>

                        <button className="bg-[#34b350] text-white px-10 h-12 rounded-full font-black text-[12px] uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
                            DOWNLOAD XLS ↓
                        </button>

                    </div>

                    {/* SEARCH */}
                    <div className="flex items-end gap-8 max-w-xl group">

                        <div className="space-y-4 flex-1">

                            <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest ml-1 opacity-60">
                                Search Client
                            </div>

                            <div className="relative">

                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 font-bold text-lg">
                                    🔍
                                </span>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Enter client code"
                                    className="w-full h-14 border border-gray-100 rounded-full pl-14 pr-6 text-[14px] bg-white shadow-inner outline-none italic font-medium focus:border-[#34b350] transition-all"
                                />

                            </div>

                        </div>

                        <button
                            onClick={fetchData}
                            className="bg-[#34b350] text-white px-12 h-14 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_8px_20px_-5px_rgba(52,179,80,0.5)] hover:shadow-[0_12px_25px_-5px_rgba(52,179,80,0.6)] active:scale-[0.98] transition-all"
                        >
                            APPLY &gt;
                        </button>

                    </div>

                    {/* TABLE */}
                    <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white">

                        <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">

                            {/* HEADER */}
                            <thead className="bg-[#34b350] text-white">

                                <tr className="leading-none">

                                    {[
                                        "Client Code",
                                        "Client Name",
                                        "Mobile",
                                        "Email"
                                    ].map((h) => (

                                        <th
                                            key={h}
                                            className="px-6 py-[22px] border-r border-white/10 last:border-0 whitespace-nowrap"
                                        >
                                            <div className="flex items-center gap-1.5">

                                                {h}

                                                <div className="flex flex-col text-[7px] leading-[4px] opacity-40">
                                                    <span>▲</span>
                                                    <span>▼</span>
                                                </div>

                                            </div>
                                        </th>

                                    ))}

                                </tr>

                            </thead>

                            {/* BODY */}
                            <tbody>

                                {loading ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-20 text-center text-gray-400 font-black text-[18px] uppercase"
                                        >
                                            Loading nominee data...
                                        </td>
                                    </tr>

                                ) : results.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-32 text-center"
                                        >
                                            <div className="text-gray-300 font-black text-[22px] italic tracking-tight uppercase opacity-50">
                                                No pending nominee data found
                                            </div>
                                        </td>
                                    </tr>

                                ) : (

                                    visibleData.map((row, index) => {

                                        // ✅ CORRECT API KEYS
                                        const clientCode =
                                            row.Code || "-";

                                        const clientName =
                                            row.Name || "-";

                                        const mobile =
                                            row.Mobile || "-";

                                        const email =
                                            row.Email || "-";

                                        return (

                                            <tr
                                                key={index}
                                                className="border-b border-gray-100 hover:bg-[#f8fff9] transition-all"
                                            >

                                                <td className="px-6 py-[22px] font-bold text-gray-700">
                                                    {clientCode}
                                                </td>

                                                <td className="px-6 py-[22px] font-bold text-gray-700">
                                                    {clientName}
                                                </td>

                                                <td className="px-6 py-[22px] font-bold text-gray-500">
                                                    {mobile}
                                                </td>

                                                <td className="px-6 py-[22px] font-bold text-gray-500 lowercase">
                                                    {email}
                                                </td>

                                            </tr>

                                        );
                                    })

                                )}

                            </tbody>

                        </table>

                        {/* FOOTER */}
                        <div className="px-10 py-5 bg-gray-50/20 text-gray-400 font-black border-t border-gray-100 uppercase italic text-[11px] tracking-[2px] flex items-center justify-between">
                            <div>
                                Showing {results.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, results.length)} of {results.length} total
                            </div>
                            
                            {results.length > rowsPerPage && (
                                <div className="flex items-center gap-1.5 font-sans not-italic tracking-normal">
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

        </div>
    );
};

export default NomineePending;
