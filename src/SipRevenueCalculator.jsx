import React, { useState, useEffect } from "react";
import Header from "./Header";
import ThirdPartyHeader from "./components/layout/ThirdPartyHeader";


const SliderComponent = ({ label, value, setValue, min, max, type, step = 1 }) => {
    const percentage = ((value - min) / (max - min)) * 100 || 0;

    const formatValue = (val) => {
        if (type === "currency") return `₹${parseFloat(val).toLocaleString()}`;
        if (type === "year") return `${val} Yrs`;
        if (type === "percent") return `${val}%`;
        return val;
    };

    const formatLimit = (val) => {
        if (type === "currency") return `₹${val.toLocaleString()}`;
        if (type === "year") return `${val} Yrs`;
        if (type === "percent") return `${val}%`;
        return val;
    };

    return (
        <div className="mb-8">
            <div className="text-[15px] font-normal text-gray-700 mb-4 uppercase tracking-tight">
                {label}
            </div>
            <div className="flex items-center gap-6 group">
                {type === "currency" && <span className="text-gray-400 font-medium">₹</span>}
                <div className="flex-1 relative h-6 flex flex-col justify-center">
                    <style>{`
                        input[type='range'] {
                            -webkit-appearance: none;
                            width: 100%;
                            height: 6px;
                            border-radius: 8px;
                            background: linear-gradient(to right, #34b350 ${percentage}%, #f3f4f6 ${percentage}%);
                            outline: none;
                            -webkit-slider-thumb-appearance: none;
                        }
                        input[type='range']::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #4A90E2; /* Blue thumb in screenshot */
                            cursor: pointer;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        input[type='range']::-moz-range-thumb {
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            background: #4A90E2;
                            cursor: pointer;
                            border: none;
                        }
                    `}</style>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value || 0}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                        className="w-full cursor-pointer"
                    />
                </div>
                <div className="relative w-24 shrink-0">
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => {
                                let val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                                if (val > max) val = max;
                                setValue(val);
                            }}
                            className="w-full h-[40px] bg-white border border-gray-200 rounded-lg text-center text-md font-normal text-gray-900 outline-none focus:border-[#34b350] transition-all"
                        />
                        {type === "year" && <span className="ml-2 text-sm text-gray-500 whitespace-nowrap">Yrs</span>}
                        {type === "percent" && <span className="ml-2 text-sm text-gray-500">%</span>}
                    </div>
                </div>
            </div>
            <div className="flex justify-between mt-2 text-[11px] font-normal text-gray-400">
                <span>{formatLimit(min)}</span>
                <span>{formatLimit(max)}</span>
            </div>
        </div>
    );
};

export default function SipRevenueCalculator() {
    const [amount, setAmount] = useState(0);
    const [years, setYears] = useState(0);
    const [sipCount, setSipCount] = useState(1);
    const [returns, setReturns] = useState(30);
    const [trail, setTrail] = useState(1.0);

    const [tableData, setTableData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    }, []);

    const handleCalculate = () => {
        let monthlyRate = (returns / 100) / 12;
        let months = years * 12;
        let data = [];
        let netIncome = 0;

        let currentInflow = 0;
        for (let i = 1; i <= months; i++) {
            currentInflow += amount * sipCount;
            let aum = currentInflow * Math.pow(1 + monthlyRate, i);
            let income = (aum * (trail / 100)) / 12;
            netIncome += income;

            data.push({
                month: i,
                inflow: Math.round(currentInflow),
                aum: Math.round(aum),
                income: Math.round(income),
            });
        }

        setTableData(data);
        setTotalIncome(netIncome.toFixed(2));
        setCurrentPage(1);
    };

    const handleReset = () => {
        setAmount(0);
        setYears(1);
        setSipCount(1);
        setReturns(0);
        setTrail(0);
        setTableData([]);
        setTotalIncome(0);
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = tableData.slice(startIndex, startIndex + rowsPerPage);
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="p-4 pt-[60px]">
                <ThirdPartyHeader />
                <div className="py-[30px] selection:bg-[#34b350] selection:text-white" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
                    <div className="flex flex-col xl:flex-row gap-8 max-w-full mx-auto">

                    {/* 📊 LEFT: CALCULATOR INPUTS */}
                    <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
                        <div className="text-2xl font-normal text-gray-800 mb-10 tracking-tight">SIP Revenue Calculator</div>

                        <SliderComponent label="Select Amount" value={amount} setValue={setAmount} min={0} max={10000000} type="currency" step={500} />
                        <SliderComponent label="Select Duration" value={years} setValue={setYears} min={1} max={40} type="year" />
                        <SliderComponent label="No. of SIP Registered" value={sipCount} setValue={setSipCount} min={1} max={999} />
                        <SliderComponent label="Annualized Assumed Returns" value={returns} setValue={setReturns} min={0} max={30} type="percent" step={0.1} />
                        <SliderComponent label="Trail Income" value={trail} setValue={setTrail} min={0} max={100} type="percent" step={0.05} />

                        <div className="flex gap-2 mt-10 justify-end">
                            <button onClick={handleReset} className="px-4 h-10 border border-gray-200 rounded text-[13px] text-gray-600 font-medium uppercase bg-white hover:bg-gray-50 transition-all">RESET</button>
                            <button onClick={handleCalculate} className="px-6 h-10 bg-[#007bff] text-white rounded text-[13px] font-bold uppercase hover:bg-blue-600 transition-all">CALCULATE</button>
                            <button className="px-6 h-10 bg-[#28a745] text-white rounded text-[13px] font-bold hover:bg-green-700 transition-all">Export Excel</button>
                        </div>
                    </div>

                    {/* 📈 RIGHT: RESULTS BREAKUP */}
                    <div className="flex-[1.6] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col min-h-[700px]">
                        <div className="p-8">
                            <div className="text-2xl font-normal text-gray-800 mb-2 tracking-tight">SIP Revenue Breakup</div>
                            <div className="text-blue-500 font-normal text-sm mb-8">Total Income/Trail: <span className="font-normal">₹{parseFloat(totalIncome).toLocaleString()}</span></div>

                            <div className="overflow-hidden rounded-lg border border-gray-100 bg-white flex-1 flex flex-col">
                                <div className="overflow-y-auto flex-1 group min-h-[400px]">
                                    <table className="w-full text-left text-[12px] font-normal text-gray-500">
                                        <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-4 font-normal uppercase">MONTHS</th>
                                                <th className="px-6 py-4 font-normal uppercase text-center">INFLOW (₹)</th>
                                                <th className="px-6 py-4 font-normal uppercase text-center">AUM (₹)</th>
                                                <th className="px-6 py-4 font-normal uppercase text-right">INCOME/TRAIL (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows.length > 0 ? (
                                                currentRows.map((row, i) => (
                                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                        <td className="px-6 py-4 text-gray-600">#{row.month}</td>
                                                        <td className="px-6 py-4 text-gray-600 text-center">₹{row.inflow.toLocaleString()}</td>
                                                        <td className="px-6 py-4 text-gray-600 text-center">₹{row.aum.toLocaleString()}</td>
                                                        <td className="px-6 py-4 text-gray-600 text-right font-medium">₹{row.income.toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="py-32 text-center">
                                                        <div className="text-gray-400 font-normal text-sm">No data available. Please calculate SIP.</div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* 🔢 PAGINATION */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-[12px] text-gray-500 font-normal">
                                        {tableData.length > 0 
                                            ? `Showing ${startIndex + 1}-${Math.min(startIndex + rowsPerPage, tableData.length)} of ${tableData.length} rows`
                                            : "Showing 0-0 of 0 rows"}
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="flex gap-1">
                                            <button
                                                disabled={currentPage === 1}
                                                onClick={() => setCurrentPage(p => p - 1)}
                                                className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all"
                                            >&lt;</button>
                                            <button
                                                disabled={currentPage >= totalPages}
                                                onClick={() => setCurrentPage(p => p + 1)}
                                                className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 disabled:opacity-30 transition-all"
                                            >&gt;</button>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[12px] text-gray-500">Rows per page:</span>
                                            <select 
                                                value={rowsPerPage}
                                                onChange={(e) => {
                                                    setRowsPerPage(parseInt(e.target.value));
                                                    setCurrentPage(1);
                                                }}
                                                className="px-1 py-1 border border-gray-200 rounded text-[12px] font-normal outline-none bg-white"
                                            >
                                                <option>10</option>
                                                <option>25</option>
                                                <option>50</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}