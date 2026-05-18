import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header.jsx";
import ArihantProductsSection from "../ArihantProducts.jsx";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";


export default function Bonds() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [showModal, setShowModal] = useState(false);
  const [clientCode, setClientCode] = useState("");
  const [error, setError] = useState("");
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  // API CALL
  useEffect(() => {
    // Example dummy data (remove when API connected)
    const dummy = [
      {
        securityName: "6.36% Government O",
        isin: "IN0020250141",
        ipFrequency: "Semi-Annual",
        price: 0,
        faceValue: 100,
        type: "-",
        rating: "-",
        yield: 6.5
      },
      {
        securityName: "6.75% GOVERNMENT",
        isin: "IN0020240183",
        ipFrequency: "Semi-Annual",
        price: 0,
        faceValue: 100,
        type: "-",
        rating: "-",
        yield: 5.99
      },
      {
        securityName: "8.18% GOVERNMENT",
        isin: "IN3120180192",
        ipFrequency: "Semi-Annual",
        price: 0,
        faceValue: 100,
        type: "-",
        rating: "-",
        yield: 6.8
      }
    ];

    setData(dummy);
    setLoading(false);

    // Real API Example:
    // fetch("YOUR_API_URL_HERE")
    //   .then((res) => res.json())
    //   .then((resData) => {
    //     setData(resData);
    //     setLoading(false);
    //   })
    //   .catch(() => setLoading(false));
  }, []);

  // SORT FUNCTION
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "";
    }

    let sorted = [...data];

    if (direction !== "") {
      sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setSortConfig({ key, direction });
    setData(sorted);
  };

  // SORT ICON
  const SortIcon = ({ column }) => {
    const isActive = sortConfig.key === column;
    const isAsc = isActive && sortConfig.direction === "asc";
    const isDesc = isActive && sortConfig.direction === "desc";

    return (
      <span className="ml-1 flex flex-col">
        <svg width="8" height="5" viewBox="0 0 10 6" className={isAsc ? "fill-black" : "fill-green-200"}>
          <path d="M5 0 L10 6 H0 Z" />
        </svg>
        <svg width="8" height="5" viewBox="0 0 10 6" className={isDesc ? "fill-black" : "fill-green-200 mt-[1px]"}>
          <path d="M0 0 L10 0 L5 6 Z" />
        </svg>
      </span>
    );
  };

  const handleSubmit = async () => {
    if (!clientCode.trim()) {
      setError("Client code is required");
      setCustomErrorMsg("Please Enter Client Code");
      setShowCustomError(true);
      return;
    }

    const codes = clientCode
      .split(",")
      .map(c => c.trim())
      .filter(c => c !== "");

    if (codes.length === 0) {
      setError("Enter valid client code");
      setCustomErrorMsg("Please Enter Valid Client Code");
      setShowCustomError(true);
      return;
    }

    const isValid = codes.every(c => /^\d+$/.test(c));

    if (!isValid) {
      setError("Only numeric client codes allowed");
      setCustomErrorMsg("Only Numeric Client Codes Allowed");
      setShowCustomError(true);
      return;
    }

    try {
      // API CALL (FUTURE IMPLEMENTATION)
      /*
      const res = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientCodes: codes
        })
      });

      const data = await res.json();
      */

      // FAKE SUCCESS FOR NOW
      console.log("Submitted:", codes);

      setShowModal(false);
      setClientCode("");
      setError("");

      toast.success("Submitted successfully");

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />

      {/* MAIN CONTENT */}
      <div className="p-4 pt-11">

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">

          {/* TABS */}
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {["Algo Brokerage", "Mutual Fund", "Rejection", "Mandate", "Product Deck", "MF Structure & Brokerage", "Wealth Basket", "SIP Revenue Calculator", "Bonds"].map((tab, i) => (
              <div
                key={i}
                onClick={() => navigate(tab === "Algo Brokerage" ? "/algo-brokerage" :
                  tab === "Mutual Fund" ? "/mutual-fund" :
                    tab === "Rejection" ? "/rejection" :
                      tab === "Mandate" ? "/mandate" :
                        tab === "Product Deck" ? "/product-deck" :
                          tab === "MF Structure & Brokerage" ? "/mf-structure" :
                            tab === "Wealth Basket" ? "/wealth-basket" :
                              tab === "SIP Revenue Calculator" ? "/sip-calculator" :
                                tab === "Bonds" ? "/bonds" : "/")}
                className={`pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline cursor-pointer ${tab === "Bonds"
                    ? "border-b-2 border-green-600 text-black font-medium"
                    : "text-gray-600 font-medium hover:text-black"
                  }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-3 mt-4">
            <div className="text-sm text-gray-700">
              Search results ({data.length})
            </div>

            <i className="fa fa-download text-green-600 cursor-pointer"></i>
          </div>

          <div className="mt-4 bg-white rounded-lg border">

            {/* SCROLL CONTAINER (IMPORTANT) */}
            <div className="max-h-[400px] overflow-auto">

              <table className="w-full text-[12px] border border-gray-300 table-auto">

                {/* HEADER */}
                <thead className="sticky top-0 z-10">
                  <tr className="bg-[#2fb344] text-white">

                    {[
                      { label: "Security Name", key: "securityName" },
                      { label: "ISIN", key: "isin" },
                      { label: "IP Frequency", key: "ipFrequency" },
                      { label: "Price", key: "price" },
                      { label: "Face Value", key: "faceValue" },
                      { label: "Type", key: "type" },
                      { label: "Rating", key: "rating" },
                      { label: "Yield (%)", key: "yield" },
                      { label: "Apply", key: "apply" }
                    ].map((col) => (
                      <th
                        key={col.key}
                        className="px-3 py-2 border-r whitespace-nowrap"
                      >
                        <div
                          onClick={() => col.key !== "apply" && handleSort(col.key)}
                          className="flex items-center cursor-pointer"
                        >
                          {col.label}

                          {/* SORT ICON */}
                          {col.key !== "apply" && <SortIcon column={col.key} />}
                        </div>
                      </th>
                    ))}

                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="p-4 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item, i) => (
                      <tr key={i} className="border-b h-[28px]">

                        <td className="px-3 py-[4px] border-r whitespace-nowrap">
                          {item.securityName}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.isin}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.ipFrequency}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.price}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.faceValue}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.type}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.rating}
                        </td>

                        <td className="px-3 py-[4px] border-r">
                          {item.yield}%
                        </td>

                        {/* APPLY BUTTON */}
                        <td className="px-3 py-[4px] text-center">
                          <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-600 text-white px-4 py-1 rounded-full text-xs"
                          >
                            Apply
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="p-4 text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>

          {/* TOTAL */}
          <div className="mt-3 text-sm text-gray-500">
            Total: {data.length}
          </div>

        </div>
      </div>

      <ArihantProductsSection />

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

          {/* MODAL BOX */}
          <div className="bg-white w-[500px] rounded-2xl p-8 shadow-xl">

            {/* TITLE */}
            <p className="text-gray-700 mb-4 text-lg">
              Enter Client Code
            </p>

            {/* INPUT */}
            <input
              type="text"
              value={clientCode}
              onChange={(e) => {
                setClientCode(e.target.value);
                setError("");
              }}
              placeholder="Search client code (e.g. 114,115,117)"
              className="w-full border rounded-full px-4 py-3 text-sm outline-none mb-6"
            />

            {/* ERROR MESSAGE */}
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}

            {/* LINE */}
            <div className="border-t mb-6"></div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-5 py-2 rounded-md"
              >
                Submit
              </button>

            </div>

          </div>
        </div>
      )}

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[60000]
                transition-all duration-500 transform ${showCustomError ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold -mb-1">Error</h2>
          <p className="text-base font-semibold">{customErrorMsg}</p>
        </div>
        <div className="ml-6 flex items-center">
          <div className="w-9 h-9 border-[3px] border-white rounded-full relative">
            <span className="absolute top-1/2 left-1/2 w-4 h-[2.5px] bg-white -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] rounded"></span>
          </div>
        </div>
      </div>
    </>
  );
}