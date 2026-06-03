import React from "react";

export const L = {
  wrapper: "p-5 bg-[#f4f7f6]",
  card: "bg-white rounded-lg p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
  row: "flex gap-5 items-end flex-wrap",
};

export const LField = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-[#666]">
      {label}
    </label>
    {children}
  </div>
);

export const LDateInput = (props) => (
  <input
    type="date"
    {...props}
    className={`px-3.5 py-2.5 rounded border border-[#ddd] text-sm outline-none ${props.className || ""}`}
  />
);

export const LSearchInput = (props) => (
  <input
    type="text"
    {...props}
    className={`px-3.5 py-2.5 rounded border border-[#ddd] text-sm outline-none ${props.className || ""}`}
    style={{ width: props.width || "300px", ...props.style }}
  />
);

export const LSelectInput = ({ options, value, onChange, width, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    className={`px-3.5 py-2.5 rounded border border-[#ddd] text-sm outline-none bg-white ${props.className || ""}`}
    style={{ width: width || "100%", ...props.style }}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);

export const LApplyBtn = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#34b350] text-white px-6 py-2.5 rounded border-none text-sm font-bold cursor-pointer h-[42px]"
  >
    {label}
  </button>
);
