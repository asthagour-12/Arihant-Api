import React from "react";
import Layout from "../components/layout/Layout";
import SubNavigation from "../components/layout/SubNavigation";
import { L, LField, LSelectInput, LApplyBtn } from "../styles/legacyStyles";

const AuditorPortal = () => {
    const [year, setYear] = React.useState("2024-2025");

    return (
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 rounded-xl">
                <div className="flex items-end gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] text-gray-400 font-bold uppercase ml-1">Financial year</label>
                        <select
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            className="h-[44px] w-[220px] border border-gray-200 rounded-lg px-4 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all cursor-pointer appearance-none shadow-sm"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%239ca3af\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px' }}
                        >
                            <option value="2024-2025">2024-2025</option>
                            <option value="2023-2024">2023-2024</option>
                            <option value="2022-2023">2022-2023</option>
                        </select>
                    </div>
                    <button
                        className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-10 h-[44px] rounded-full font-bold text-[13px] transition-all uppercase tracking-wider shadow-md active:scale-[0.98]"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
export default AuditorPortal;
