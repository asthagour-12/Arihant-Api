import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header.jsx";

export default function ProfileBeta() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = async () => {
    if (!search) return;

    setLoading(true);

    try {
      // BACKEND API HERE
      /*
      const res = await fetch(`/api/profile-beta?clientCode=${search}`);
      const data = await res.json();
      setClientData(data);
      */

      // Dummy Response
      setTimeout(() => {
        setClientData({
          clientName: "JASPAL SINGH GOUD",
          clientCode: search,
          branch: "Indore",
          mobile: "XXXXXX4934",
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="download-container">
      <Header />

      <div className="bg-[#f3f3f3] min-h-screen pt-[78px] px-3 pb-4">

        {/* Top Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 pt-3 pb-4 ">

          {/* Beta Note */}
          <marquee className="text-[14px] text-gray-700 mb-2 leading-7">
            <span className="text-red-500 font-semibold">Note:</span> This report has been released in{" "}
            <span className="font-bold">Beta version</span> and is currently under active development.
            During this phase, data processing may be slower than usual.
          </marquee>

          {/* Search Area */}
          <div className="bg-[#efefef] rounded-md px-4 py-4">
            <p className="text-[15px] font-medium text-gray-700 mb-4 -mt-2">
              Search By Client
            </p>

            <div className="flex items-center gap-3 -mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search client code"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[275px] h-[44px] rounded-full border border-gray-300 bg-white pl-14 pr-4 text-[16px] outline-none"
                />
                <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
              </div>

              <button
                onClick={handleSearch}
                className="h-[40px] px-3 rounded-full bg-[#31b44b] text-white text-[14px] font-semibold flex items-center gap-2"
              >
                {loading ? "Loading..." : "SEARCH"}
                <span className="text-base leading-none">{'>'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Meaning Text */}
        <div className="flex items-center justify-center gap-8 my-16">
          <div className="w-[190px] h-[1px] bg-gray-300"></div>

          <p className="text-[14px] text-gray-700">
            What we mean when we say -
            <span className="font-semibold"> (Z)</span>: Zone,
            <span className="font-semibold"> (R)</span>: Region,
            <span className="font-semibold"> (Br)</span>: Branch,
            <span className="font-semibold"> (AP)</span>: Authorized Person/Sub Broker
          </p>

          <div className="w-[190px] h-[1px] bg-gray-300"></div>
        </div>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-3">
          <h2 className="text-[24px] font-medium text-gray-700 mb-10 pt-1">
            Arihant Product
          </h2>

          <div className="grid grid-cols-6 gap-6 text-center text-[14px]">
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-500">Official Website</a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-500">Demat your MF Units</a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-500">Insta Options</a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-500">Trade Bridge</a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-500">Value Stocks</a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-500">Stock Stack</a>
          </div>
        </div>

        {/* API Result */}
        {clientData && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-5 mt-6">
            <h3 className="text-xl font-semibold mb-4">Client Details</h3>

            <p><b>Name:</b> {clientData.clientName}</p>
            <p><b>Code:</b> {clientData.clientCode}</p>
            <p><b>Branch:</b> {clientData.branch}</p>
            <p><b>Mobile:</b> {clientData.mobile}</p>
          </div>
        )}
      </div>
    </div>
  );
}