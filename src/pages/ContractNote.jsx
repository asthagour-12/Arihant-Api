import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput, DateInput } from "../components/common/FilterBar";
import Table from "../components/common/Table";
import { validateDates } from "../utils/dateValidation";
import { toast } from "react-toastify";

const ContractNote = () => {
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);
    const [error, setError] = React.useState("");

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

    const headers = ["Date", "Client", "Settle", "Contract", "Exchange Code", "File Name"];
    const data = []; // Empty state as requested

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput placeholder="Search By Client" width="280px" />
                </FilterItem>

                <FilterItem label="From Date">
                    <DateInput selected={fromDate} onChange={(d) => setFromDate(d)} error={error} width="180px" />
                </FilterItem>

                <FilterItem label="To Date">
                    <DateInput selected={toDate} onChange={(d) => setToDate(d)} error={error} width="180px" />
                </FilterItem>

                <ApplyButton onClick={handleApply} />
            </FilterBar>

            <Table
                headers={headers}
                rows={data}
            />
        </div>
    );
};

export default ContractNote;
