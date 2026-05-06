import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import ResultsHeader from "../components/common/ResultsHeader";
import MTFSetoffTable from "../components/common/MTFSetoffTable";
import { L, LField, LSearchInput, LApplyBtn } from "../styles/legacyStyles";

const MTFSetoff = () => {
    const [search, setSearch] = React.useState("");
    const [searched, setSearched] = React.useState(false);

    const dummyRows = [
        { date: "24-04-2026", code: "CL001", script: "RELIANCE", quantity: "100", price: "2950.00", amount: "2,95,000" },
        { date: "25-04-2026", code: "CL001", script: "TCS", quantity: "50", price: "3850.00", amount: "1,92,500" },
        { date: "26-04-2026", code: "CL001", script: "INFY", quantity: "200", price: "1420.00", amount: "2,84,000" }
    ];

    return (
        <div style={L.wrapper}>
             <h1 className="text-[18px] font-bold text-gray-800 mb-3">MTF Setoff</h1>

            {/* Flat form bar — no card, no shadow */}
            <div style={L.card}>
                <div style={L.row}>
                    <LField label="Search by client">
                        <LSearchInput
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search client code"
                        />
                    </LField>
                    {/* Button label: SEARCH > */}
                    <LApplyBtn label="SEARCH >" onClick={() => setSearched(true)} />
                </div>
            </div>

            <ResultsHeader count={dummyRows.length} />

            {/* Table always visible */}
            <MTFSetoffTable data={dummyRows} />
        </div>
    );
};

export default MTFSetoff;
