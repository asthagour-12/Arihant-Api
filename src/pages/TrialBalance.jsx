import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ResultsHeader from "../components/common/ResultsHeader";
import TrialBalanceTable from "../components/common/TrialBalanceTable";
import { FilterItem, SearchInput, ApplyButton } from "../components/common/FilterSection";
import { toast } from "react-toastify";

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
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
            <h1 className="text-[20px] font-bold text-gray-800 mb-6">Trial Balance</h1>

            {/* Optimized Filter Bar */}
            <div className="bg-white p-6 mb-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-end gap-6">
                    <FilterItem label="Search By Client">
                        <SearchInput 
                            placeholder="Enter client code" 
                            width="380px" 
                            // Standardizing height via the component's internal styles (which are 44px)
                        />
                    </FilterItem>
                    
                    <ApplyButton 
                        label="APPLY" 
                        onClick={() => toast.info("Searching Trial Balance...")} 
                    />
                </div>
            </div>

            <ResultsHeader count={12} />

            <TrialBalanceTable data={dummyData} />
        </div>
    );
};

export default TrialBalance;
