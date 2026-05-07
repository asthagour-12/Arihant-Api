import React from "react";

export const L = {
  wrapper: {
    padding: "20px",
    backgroundColor: "#f4f7f6",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  row: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
};

export const LField = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <label style={{ fontSize: "14px", fontWeight: "600", color: "#666" }}>
      {label}
    </label>
    {children}
  </div>
);

export const LDateInput = (props) => (
  <input
    type="date"
    {...props}
    style={{
      padding: "10px 14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "14px",
      outline: "none",
      ...props.style,
    }}
  />
);

export const LSearchInput = (props) => (
  <input
    type="text"
    {...props}
    style={{
      padding: "10px 14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "14px",
      outline: "none",
      width: props.width || "300px",
      ...props.style,
    }}
  />
);

export const LSelectInput = ({ options, value, onChange, width, ...props }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      padding: "10px 14px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "14px",
      outline: "none",
      width: width || "100%",
      backgroundColor: "white",
      ...props.style,
    }}
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
    style={{
      backgroundColor: "#34b350",
      color: "white",
      padding: "10px 24px",
      borderRadius: "4px",
      border: "none",
      fontSize: "14px",
      fontWeight: "bold",
      cursor: "pointer",
      height: "42px",
    }}
  >
    {label}
  </button>
);
