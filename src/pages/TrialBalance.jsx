import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ResultsHeader from "../components/common/ResultsHeader";
import TrialBalanceTable from "../components/common/TrialBalanceTable";

const TrialBalance = () => {
    const dummyData = [
        {
            name: "SURAJ SUNIL RAJOLE",
            code: "AP2100001",
            branch: "AHMEDABAD",
            region: "GUJARAT",
            zone: "WEST",
            openDebit: "3,093.02",
            openCredit: "0.00",
            netDebit: "3,093.02",
            netCredit: "0.00"
        },
        {
            name: "RINAZ MUSHTAQUE SHAIKH",
            code: "295900016",
            branch: "PUNE",
            region: "MAHARASHTRA",
            zone: "WEST",
            openDebit: "0.00",
            openCredit: "134,446.85",
            netDebit: "0.00",
            netCredit: "134,446.85"
        }
    ];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <h1 className="text-[18px] font-bold text-gray-800 mb-3">Trial Balance</h1>

            {/* Filter Section - More Compact */}
            <div className="bg-[#f2f2f2] p-4 mb-4 border border-gray-200 shadow-sm">
                <div className="flex flex-col gap-1 max-w-[280px]">
                    <label className="text-[11px] text-gray-500 font-normal ml-0.5">Search By Client</label>
                    <div className="flex items-center gap-1.5">
                        <div className="relative flex-1">
                            <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none"></i>
                            <input
                                type="text"
                                placeholder="Search client code"
                                className="h-[28px] w-full border border-gray-300 rounded-sm pl-7 pr-2 text-[12px] bg-white outline-none focus:border-[#1EB04C] transition-all"
                            />
                        </div>
                        <button className="bg-[#1EB04C] text-white w-[28px] h-[28px] flex items-center justify-center rounded-sm font-bold text-[14px] transition-all hover:bg-[#18a045]">
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            <ResultsHeader count={12} />

            <TrialBalanceTable data={dummyData} />
        </div>
    );
};

export default TrialBalance;