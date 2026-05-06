import React, { useState } from "react";

const SliderComponent = ({ label, value, setValue, min, max, type, step = 1 }) => {
    const percentage = ((value - min) / (max - min)) * 100 || 0;

    return (
        <div className="mb-10">
            <div className="text-[17px] font-black text-gray-900 mb-6 tracking-tighter uppercase tabular-nums">
                {label}: <span className="text-[#34b350] ml-2">
                    {type === "currency" ? `₹${parseFloat(value).toLocaleString()}` : type === "year" ? `${value} yrs` : type === "percent" ? `${value}%` : value}
                </span>
            </div>
            <div className="flex items-center gap-8 group">
                <div className="flex-1 relative h-6 flex items-center">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value || 0}
                        onChange={(e) => setValue(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#34b350]"
                        style={{
                            background: `linear-gradient(to right, #34b350 ${percentage}%, #f3f4f6 ${percentage}%)`
                        }}
                    />
                </div>
                <div className="relative w-32 shrink-0">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => {
                            let val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                            if (val > max) val = max;
                            setValue(val);
                        }}
                        className="w-full h-[52px] bg-white border border-gray-100 rounded-xl text-center text-lg font-black text-gray-900 outline-none focus:border-[#34b350] shadow-inner transition-all tabular-nums"
                    />
                </div>
            </div>
            <div className="flex justify-between mt-3 text-[11px] font-black text-gray-300 uppercase tracking-widest leading-none">
                <span>{type === "currency" ? `₹ 0` : type === "year" ? `1 yr` : type === "percent" ? `0%` : min}</span>
                <span>{type === "currency" ? `₹ ${(max/100000).toFixed(0)}L` : type === "year" ? `${max} yrs` : type === "percent" ? `${max}%` : max}</span>
            </div>
        </div>
    );
};

export default function SipRevenueCalculator() {
    const [amount, setAmount] = useState(5000);
    const [years, setYears] = useState(10);
    const [sipCount, setSipCount] = useState(10);
    const [returns, setReturns] = useState(12);
    const [trail, setTrail] = useState(0.8);

    const [tableData, setTableData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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
        <div className="min-h-screen bg-[#f6f6f6] font-sans selection:bg-[#34b350] selection:text-white">
            {/* 🟢 TOP DASHBOARD HEADER */}
            <div className="bg-[#34b350] px-[32px] h-[64px] flex items-center justify-between sticky top-0 z-[100] shadow-md text-white font-bold">
                <div className="flex items-center gap-10">
                    <div className="text-2xl font-black tracking-tighter">ArihantCapital</div>
                    <nav className="flex gap-6 text-[13px] opacity-90">
                        <span>Dashboard</span>
                        <span className="border-b-2 border-white pb-0.5">Reports</span>
                        <span>Account Opening</span>
                        <span>Contests</span>
                        <span>Click To Call</span>
                    </nav>
                </div>
            </div>

            {/* 🔵 CONTENT AREA */}
            <div className="px-[40px] py-[40px]">
                <div className="flex flex-col xl:flex-row gap-10">
                    
                    {/* 📊 LEFT: CALCULATOR INPUTS */}
                    <div className="flex-1 bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 p-12">
                        <div className="text-2xl font-black text-gray-900 mb-12 tracking-tighter uppercase border-b border-gray-50 pb-4">SIP Revenue Calculator</div>
                        
                        <SliderComponent label="Monthly SIP Amount" value={amount} setValue={setAmount} min={0} max={1000000} type="currency" step={500} />
                        <SliderComponent label="Duration" value={years} setValue={setYears} min={1} max={40} type="year" />
                        <SliderComponent label="Total SIPs Registered" value={sipCount} setValue={setSipCount} min={1} max={1000} />
                        <SliderComponent label="Estimated Annual Returns" value={returns} setValue={setReturns} min={0} max={30} type="percent" step={0.1} />
                        <SliderComponent label="Expected Trail Income" value={trail} setValue={setTrail} min={0} max={5} type="percent" step={0.05} />

                        <div className="flex gap-6 mt-16">
                            <button onClick={handleReset} className="flex-1 h-14 bg-gray-50 text-gray-400 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all border border-gray-100">RESET</button>
                            <button onClick={handleCalculate} className="flex-[2] h-14 bg-[#34b350] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_10px_25px_-5px_rgba(52,179,80,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(52,179,80,0.5)] active:scale-[0.98] transition-all">CALCULATE REVENUE &gt;</button>
                        </div>
                    </div>

                    {/* 📈 RIGHT: RESULTS BREAKUP */}
                    <div className="flex-1 bg-white rounded-2xl shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col min-h-[800px]">
                        <div className="p-12 pb-8">
                            <div className="text-2xl font-black text-gray-900 mb-2 tracking-tighter uppercase">Revenue Breakup</div>
                            <div className="text-gray-400 font-bold mb-8 uppercase tracking-[0.2em] text-[11px] opacity-60">Month-wise project income</div>
                            
                            <div className="bg-green-50/50 rounded-2xl p-8 border border-green-100 flex justify-between items-center">
                                <div className="text-[13px] text-gray-500 font-black uppercase tracking-widest">Total Projected Income</div>
                                <div className="text-4xl font-black text-[#34b350] tracking-tighter tabular-nums">₹{parseFloat(totalIncome).toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col px-12 pb-12">
                            <div className="overflow-hidden rounded-xl border border-gray-100 shadow-[0_20px_40px_rgb(0,0,0,0.05)] bg-white flex-1 flex flex-col">
                                <div className="overflow-y-auto flex-1 group">
                                    <table className="w-full text-left text-[11px] font-black uppercase text-gray-700">
                                        <thead className="bg-[#34b350] text-white sticky top-0 z-10">
                                            <tr className="leading-none">
                                                {["MONTH", "TOTAL INFLOW", "EST. AUM", "TRAIL INCOME"].map(h => (
                                                    <th key={h} className="px-6 py-[22px] border-r border-white/10 last:border-0">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentRows.length > 0 ? (
                                                currentRows.map((row, i) => (
                                                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-5 border-r border-gray-50 text-gray-400 font-black italic">#{row.month}</td>
                                                        <td className="px-6 py-5 border-r border-gray-50 text-gray-900 font-bold tabular-nums">₹{row.inflow.toLocaleString()}</td>
                                                        <td className="px-6 py-5 border-r border-gray-50 text-gray-900 font-bold tabular-nums">₹{row.aum.toLocaleString()}</td>
                                                        <td className="px-6 py-5 text-[#34b350] font-black tabular-nums">₹{row.income.toLocaleString()}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="py-40 text-center">
                                                        <div className="text-gray-200 font-black text-2xl italic tracking-tighter uppercase opacity-50">No Data Calculated</div>
                                                        <div className="text-gray-300 text-[10px] font-bold mt-2 uppercase tracking-widest">Click calculate to see result</div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* 🔢 PAGINATION */}
                                <div className="px-8 py-5 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                    <div className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                                        Page {currentPage} of {totalPages || 1}
                                    </div>
                                    <div className="flex gap-4">
                                        <button 
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                            className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#34b350] disabled:opacity-30 shadow-sm transition-all"
                                        >&lt;</button>
                                        <button 
                                            disabled={currentPage >= totalPages}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                            className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#34b350] disabled:opacity-30 shadow-sm transition-all"
                                        >&gt;</button>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-8 h-14 bg-[#22c55e] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all">EXPORT DATA TO EXCEL ↓</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 📦 FOOTER PRODUCT SECTION */}
            <div className="px-[40px] pb-16">
                <div className="bg-white border border-gray-100 rounded-2xl p-12 shadow-[0_5px_15px_rgba(0,0,0,0.02)]">
                    <div className="text-2xl font-black text-gray-800 mb-10 pb-4 border-b border-gray-50 uppercase tracking-tighter">Arihant Product</div>
                    <div className="flex flex-wrap justify-between gap-8 text-[#34b350] font-black text-[14px]">
                        {[
                            { label: "Official Website", url: "https://www.arihantcapital.com/" },
                            { label: "Demat your MF Units", url: "https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" },
                            { label: "Insta Options", url: "https://instaoptions.arihantplus.com/login" },
                            { label: "Trade Bridge", url: "https://tradebridge.arihantplus.com/signup" },
                            { label: "Value Stocks", url: "https://arihantplus.valuestocks.in/" },
                            { label: "Stock Stack", url: "https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" }
                        ].map(p => (
                            <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform">{p.label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}