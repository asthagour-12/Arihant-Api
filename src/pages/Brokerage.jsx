import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import DataTable from "../components/common/DataTable";
import FilterSection, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterSection";
import StatsCard from "../components/common/StatsCard";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";

const Brokerage = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [error, setError] = useState("");

    const handleApply = () => {
        const errorMsg = validateDates(fromDate, toDate);
        if (errorMsg) {
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }
        setError("");
        toast.success("Filters applied successfully");
    };

    const headers = ["Client Name", "Brokerage", "Turnover", "Segment"];
    const data = [
        ["DHRUVIK BHAVESHKUMAR SHAH 286400023", "xxxxxx", "xxxxxxxx", "FNO"],
        ["DHRUVIK BHAVESHKUMAR SHAH 286400023", "xxxxxx", "xxxxxxxx", "FNO"]
    ];

    const stats = [
        { title: "Total Brokerage", value: "xxx", masked: true },
        { title: "Total Cap Brok", value: "0", masked: true },
        { title: "Total Comm Brok", value: "0", masked: true },
        { title: "Total FNO Brok", value: "xxx", masked: true },
        { title: "Total Cap Turnover", value: "0", masked: true },
        { title: "Total FNO Turnover", value: "xxxxxxxxx", masked: true },
        { title: "Total Turnover", value: "xxxxxxxxx", masked: true },
        { title: "Total Comm Turnover", value: "0", masked: true },
    ];

    return (
        <div className="px-10 py-10 max-w-[1600px] mx-auto">
            <FilterSection title="Search criteria">
                <FilterItem label="From Date">
                    <DateInput 
                        selected={fromDate} 
                        onChange={(d) => setFromDate(d)} 
                        error={error}
                    />
                </FilterItem>
                <FilterItem label="To Date">
                    <DateInput 
                        selected={toDate} 
                        onChange={(d) => setToDate(d)} 
                        error={error}
                    />
                </FilterItem>
                <ApplyButton onClick={handleApply} />

                <div className="ml-12 flex items-end gap-6">
                    <FilterItem label="Search By Client">
                        <SearchInput placeholder="Search client code" width="320px" />
                    </FilterItem>
                    <ApplyButton label="SEARCH" onClick={() => toast.info("Searching client...")} />
                </div>
            </FilterSection>


            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {stats.map((s, i) => (
                    <StatsCard key={i} title={s.title} value={s.value} isMasked={s.masked} />
                ))}
            </div>

            <DataTable
                headers={headers}
                rows={data}
                resultsCount={5}
                showMaskIcon={true}
            />
        </div>
    );
};

export default Brokerage;
