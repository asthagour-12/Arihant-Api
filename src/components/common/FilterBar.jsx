import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterBar = ({ children }) => {
  return (
    <div className="bg-[#f3f3f3] p-3 mb-4 border-b border-gray-200">
      <div className="flex flex-wrap items-end gap-4">
        {children}
      </div>
    </div>
  );
};

export const FilterItem = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <div className="text-[11px] text-gray-500 font-bold uppercase ml-0.5">{label}</div>
    {children}
  </div>
);

export const SearchInput = ({ placeholder = "Search", width = "220px", value, onChange }) => (
    <div className="relative group">
        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none group-focus-within:text-[#34b350] transition-colors"></i>
        <input 
            type="text" 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className="h-[32px] border border-gray-300 rounded-md pl-8 pr-3 text-[12px] bg-white outline-none focus:border-[#34b350] transition-all shadow-sm" 
            style={{ width }}
        />
    </div>
);

export const DateInput = ({ selected, onChange, placeholder = "DD/MM/YYYY", width = "140px", error }) => {
    const dateRef = React.useRef();
    return (
        <div className="relative group">
            <DatePicker
                selected={selected}
                onChange={onChange}
                dateFormat="dd/MM/yyyy"
                placeholderText={placeholder}
                maxDate={new Date()}
                className={`h-[32px] border rounded-md px-3 text-[12px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all shadow-sm ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-300"}`}
                style={{ width }}
                ref={dateRef}
                onFocus={(e) => e.target.blur()}
            />
            <i 
                className="fas fa-calendar-alt absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer text-[10px]"
                onClick={() => dateRef.current.setOpen(true)}
            ></i>
        </div>
    );
};

export const ApplyButton = ({ onClick, label = "APPLY" }) => (
  <button 
    onClick={onClick}
    className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-6 h-[32px] rounded-md font-bold text-[12px] transition-all shadow-sm active:scale-[0.98] uppercase tracking-wider"
  >
    {label}
  </button>
);

export default FilterBar;
