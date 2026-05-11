import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterBar = ({ children }) => {
  return (
    <div className="bg-gray-100 border border-gray-200 p-6 mb-8 rounded-xl">
      <div className="flex flex-wrap items-end gap-6">
        {children}
      </div>
    </div>
  );
};

export const FilterItem = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <div className="text-[11px] text-gray-400 font-bold uppercase ml-1">{label}</div>
    {children}
  </div>
);

export const SearchInput = ({ placeholder = "Search", width = "220px", value, onChange }) => (
    <div className="relative group">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] pointer-events-none group-focus-within:text-[#34b350] transition-colors"></i>
        <input 
            type="text" 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            className="h-[44px] border border-gray-200 rounded-full pl-10 pr-3 text-[13px] bg-white outline-none focus:border-[#1EB04C] transition-all" 
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
                className={`h-[44px] border rounded-lg px-3 text-[13px] text-gray-700 font-bold outline-none bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
                style={{ width }}
                ref={dateRef}
                onFocus={(e) => e.target.blur()}
            />
            <i 
                className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer text-[11px]"
                onClick={() => dateRef.current.setOpen(true)}
            ></i>
        </div>
    );
};

export const ApplyButton = ({ onClick, label = "SEARCH" }) => (
  <button 
    onClick={onClick}
    className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-[12px] transition-all shadow-sm active:scale-[0.98] uppercase tracking-wider disabled:opacity-50"
  >
    {label}
  </button>
);

export default FilterBar;
