import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import FilterBar, { FilterItem, ApplyButton, SearchInput } from "../components/common/FilterBar";
import ResultsHeader from "../components/common/ResultsHeader";
import ClientTable from "../components/common/ClientTable";

const ClientMIS = () => {
    const dummyData = [
        { 
            name: "SURAJ SUNIL RAJOLE", 
            code: "AP2100001", 
            pan: "ABCDE1234F", 
            mobile: "9876543210", 
            email: "suraj@gmail.com", 
            bank: "KOTAK Ac: 4146029056", 
            city: "AHMEDABAD GJ", 
            date: "30 Dec 2023", 
            dp: "20164299" 
        },
        { 
            name: "RINAZ MUSHTAQUE SHAIKH", 
            code: "295900016", 
            pan: "FGHIJ5678K", 
            mobile: "9123456789", 
            email: "rinaz@outlook.com", 
            bank: "HDFC Ac: 50100204124010", 
            city: "PUNE MH", 
            date: "22 Sep 2023", 
            dp: "00175048" 
        }
    ];

    return (
        <div className="px-6 py-4 max-w-[1600px] mx-auto">
            <FilterBar>
                <FilterItem label="Search By Client">
                    <SearchInput placeholder="Search By Client" width="300px" />
                </FilterItem>
                <ApplyButton label="Apply" />
            </FilterBar>

            <ResultsHeader count={12} />

            <ClientTable data={dummyData} />
        </div>
    );
};

export default ClientMIS;
