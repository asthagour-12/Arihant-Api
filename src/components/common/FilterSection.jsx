import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterSection = ({ children, title }) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded-xl border border-gray-200">
      {title && (
        <div className="text-[12px] text-gray-500 font-bold uppercase mb-4 tracking-wider">{title}</div>
      )}
      <div className="flex flex-wrap items-end gap-6">
        {children}
      </div>
    </div>
  );
};

export const FilterItem = ({ label, children }) => (
  <div className="space-y-1.5">
    <div className="text-[12px] text-gray-500 font-bold uppercase ml-1 tracking-wider">{label}</div>
    {children}
  </div>
);

export const ApplyButton = ({ onClick, label = "APPLY" }) => (
  <button
    onClick={onClick}
    className="bg-[#34b350] hover:bg-[#2e9e47] text-white px-8 h-[44px] rounded-full font-bold text-[14px] uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center gap-2"
  >
    {label}
    <i className="fas fa-chevron-right text-[10px]"></i>
  </button>
);

export const SearchInput = ({ placeholder = "Search", width = "320px", value, onChange, error }) => (
  <div className="relative group">
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`h-[44px] border rounded-full pl-6 pr-6 text-[14px] bg-white outline-none font-medium focus:border-[#34b350] transition-all shadow-sm ${error ? "border-pink-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
      style={{ width }}
    />
  </div>
);

export const DateInput = ({ selected, onChange, placeholder = "DD/MM/YYYY", width = "200px", error }) => {
  const dateRef = React.useRef();
  return (
    <div className="relative group">
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        maxDate={new Date()}
        className={`h-[44px] border rounded-lg px-4 text-[14px] text-gray-700 font-bold outline-none shadow-sm bg-white focus:border-[#34b350] transition-all ${error ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]" : "border-gray-200"}`}
        style={{ width }}
        ref={dateRef}
        onFocus={(e) => e.target.blur()}
      />
      <i
        className="fas fa-calendar-alt absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#34b350] transition-colors cursor-pointer"
        onClick={() => dateRef.current.setOpen(true)}
      ></i>
    </div>
  );
};

export const SelectInput = ({ options, width = "220px" }) => (
  <div className="relative group">
    <select className="h-[52px] border border-gray-200 rounded-lg bg-[#434343] text-white px-6 text-[13px] outline-none font-bold appearance-none cursor-pointer" style={{ width }}>
      {options.map((opt, i) => <option key={i}>{opt}</option>)}
    </select>
    <i className="fas fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[10px]"></i>
  </div>
);


export default FilterSection;
