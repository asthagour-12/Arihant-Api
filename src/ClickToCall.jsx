import React, { useEffect, useState } from "react";
import { Download, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "./logo-arihant-capital.png";
import Header from "./Header.jsx";

export default function ClickToCall() {
  const navigate = useNavigate();
  const [apiData, setApiData] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("inactive");
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  // 🔹 Future API
  useEffect(() => {
    /*
    fetch("/api/click-to-call")
      .then(res => res.json())
      .then(data => setApiData(data));
    */
  }, []);

  // 🔹 Dummy data (UI ke liye)
  useEffect(() => {
    setLocalData([
      {
        name: "JASPAL SINGH GOUD",
        clientCode: "AP050001",
        mobile: "XXXXXX4934",
        email: "jd****@****.com",
        pan: "ASXXXXXM",
      },
      {
        name: "PRITAM JAIN",
        clientCode: "AP050002",
        mobile: "XXXXXX8408",
        email: "pr****@****.com",
        pan: "ABXXXXJ",
      },
    ]);
  }, []);

  // 🔹 Merge API + Local
  useEffect(() => {
    setTableData([...apiData, ...localData]);
  }, [apiData, localData]);

  // 🔹 Sort handler
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
  };

  // 🔹 Filter and Sort
  const filtered = tableData
    .filter((item) =>
      item.clientCode.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  // 🔹 Download CSV
  const handleDownload = () => {
    const csv = [
      ["Client Name", "Client Code", "Mobile", "Email", "Pan Number", "Mobile App", "SIP", "Reason Mobile App Download"],
      ...filtered.map((i) => [i.name, i.clientCode, i.mobile, i.email, i.pan, "No", "", ""]),
    ]
      .map((r) => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "clients.csv";
    a.click();
  };

  // 🔹 Call
  const handleCall = (num) => {
    window.location.href = `tel:${num}`;
  };

  // Mobile icon click functionality
  const handleMobileClick = () => {
    setShowModal(true);
    setShowError(true);

    // error 3 sec me hide ho jaye
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  // WhatsApp click handler
  const handleWhatsappClick = () => {
    setShowError(true);

    // auto hide after 3 sec
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  // SortIcon component
  const SortIcon = ({ column }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "asc" ? (
        <ChevronUp size={15} className="text-white ml-2" />
      ) : (
        <ChevronDown size={15} className="text-white ml-2" />
      );
    }

    return (
      <ChevronsUpDown
        size={15}
        className="text-white/90 ml-2"
      />
    );
  };

  // Submit functionality
  const handleSubmit = () => {
    // Since dropdown was removed, always allow submission
    console.log("Appointment submitted");
    
    // Close modal after successful submission
    setShowModal(false);
    
    // Show success message
    alert("Appointment submitted successfully!");
  };

  return (
  <div>
    {/* HEADER */}
    <div className="download-container">
      <Header />
    </div>

    {/* BODY */}
    <div className="bg-[#f3f3f3] h-50 px-5 pt-[82px] pb-6">
      {/* TABS */}
      <div className="bg-white rounded-[18px] shadow-sm px-7 pt-6 pb-0">
        <div className="flex gap-8 text-sm border-b border-gray-300 pb-3">

          <button
            onClick={() => setActiveTab("inactive")}
            className={`pb-2 ${
              activeTab === "inactive"
                ? "border-b-2 border-green-600 font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            Click to Call Inactive
          </button>

          <button
            onClick={() => navigate("/followupreport")}
            className={`pb-2 ${
              activeTab === "follow"
                ? "border-b-2 border-green-600 font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            Follow Up Report
          </button>

         
          
            
         
        </div>
    

      {/* Conditional rendering based on active tab */}
      {activeTab === "follow" ? (
        <FollowUpReport />
      ) : (
        <>
          {/* Search + Apply section */}
          <div className="bg-[#efefef] px-7 pt-3 pb-4">
            <p className="text-sm text-black mb-0 pb-2 ">Search client code</p>
            <div className="flex items-center gap-5">
              <div className="relative">
                <input
                  placeholder="Search client code"
                  className="pl-10 pr-4 h-[44px] rounded-full border border-gray-300 w-[250px] bg-white outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              <button className="bg-green-600 text-white px-8 h-[44px] rounded-full font-semibold">
                APPLY
              </button>
            </div>
          </div>

          {/* Result + Download */}
          <div className="flex justify-between items-center mb-2 pt-3">
            <p className="text-sm">Search results ({filtered.length})</p>

            <Download
              size={18}
              className="text-green-600 cursor-pointer"
              onClick={handleDownload}
            />
          </div>

          {/* TABLE */}
          <div className="bg-white border rounded-md overflow-hidden">

            {/* TABLE SCROLL */}
            <div className="overflow-x-auto">

              <table className="min-w-[1100px] border border-gray-300 border-collapse text-sm">

            {/* HEADER */}
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("name")}>
                    <span>CLIENT NAME</span>
                    <SortIcon column="name" />
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("clientCode")}>
                    <span>CLIENT CODE</span>
                    <SortIcon column="clientCode" />
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("mobile")}>
                    <span>Mobile</span>
                    <SortIcon column="mobile" />
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("email")}>
                    <span>Email</span>
                    <SortIcon column="email" />
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => handleSort("pan")}>
                    <span>Pan Number</span>
                    <SortIcon column="pan" />
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Call</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Message</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Whatsapp</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Remark</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Mobile App</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Sip</span>
                  </div>
                </th>
                <th className="p-3 px-4 py-3 border border-gray-300 text-left whitespace-nowrap">
                  <div className="flex items-center justify-between cursor-pointer select-none">
                    <span>Reason Mobile App Download</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">

                  <td className="p-3">{item.name}</td>
                  <td className="p-3 border border-gray-300 text-center">{item.clientCode}</td>
                  <td className="p-3 border border-gray-300text-center">{item.mobile}</td>
                  <td className="p-3 border border-gray-300text-center">{item.email}</td>
                  <td className="p-3 border border-gray-300text-center">{item.pan}</td>

                  {/* CALL */}
                  <td className="p-3 border border-gray-300 text-center">
                    <i
                      className="fas fa-mobile-alt text-lg cursor-pointer"
                      onClick={handleMobileClick}
                    ></i>
                  </td>

                  {/* MESSAGE */}
                  <td className="p-3 border border-gray-300 text-center">
                    <div className="relative w-32 mx-auto">
                      <select className="w-full border rounded px-2 py-1 appearance-none">
                        <option value="">Select</option>
                        <option value="dealer1">Appointment</option>
                        <option value="Trading Resume">Trading Resume</option>
                        <option value="Offer">Offer</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Reactivation">Reactivation</option>
                        <option value="Reactivation Brokerage">Reactivation Brokerage</option>
                      </select>
                      <ChevronDown 
                        className="absolute right-2 top-2 text-gray-500 pointer-events-none" 
                        size={16} 
                      />
                    </div>
                  </td>

                  {/* WHATSAPP */}
                  <td className="p-3 text-center border border-gray-300">
                    <div
                      onClick={handleWhatsappClick}
                      className="bg-green-600 w-8 h-8 flex items-center justify-center rounded cursor-pointer"
                    >
                      <i className="fab fa-whatsapp text-white"></i>
                    </div>
                  </td>

                  {/* REMARK */}
                  <td className="p-3 border border-gray-300">
                    <input className="border w-full px-2 py-1 rounded" />
                  </td>

                  {/* MOBILE APP */}
                  <td className="p-3 text-center border border-gray-300">No</td>

                  {/* SIP */}
                  <td className="p-3 text-center border border-gray-300">
                    <input type="checkbox" />
                  </td>

                  {/* REASON */}
                  <td className="p-3 border border-gray-300">
                    <input className="border w-full px-2 py-1 rounded" placeholder="Enter reason" />
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* COUNT */}
      <p className="text-sm mt-2 text-gray-500 pb-3 pt-2">
        {filtered.length} total
      </p>

      {/* ERROR POPUP (RIGHT SIDE) */}
      {showError && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-8 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between min-w-[350px] transition-all duration-300 ease-in-out mt-12">

          {/* TEXT */}
          <div>
            <p className="font-semibold text-lg">Error</p>
            <p className="text-sm">Data not found !!!</p>
          </div>

          {/* CLOSE BUTTON */}
          <div
            onClick={() => setShowError(false)}
            className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="text-xs">×</span>
          </div>

        </div>
      )}

      {/* MODAL (Dealer Code List) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40">

          <div className="bg-white w-[500px] rounded-xl p-6 relative shadow-xl">

            {/* CLOSE */}
            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold mb-6">
              Dealer Code List
            </h2>
            {/* SELECT + BUTTON */}
            <div className="bg-gray-100 flex items-center gap-4 pt-4 pb-2 mb-4">

              {/* APPOINTMENT DROPDOWN */}
              <div className="relative w-60">
                <select 
                  value={selectedDealer}
                  onChange={(e) => setSelectedDealer(e.target.value)}
                  className="border rounded px-4 py-2 w-60 appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Appointment">Appointment</option>
                  <option value="Trading Resume">Trading Resume</option>
                  <option value="Offer">Offer</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Reactivation">Reactivation</option>
                  <option value="Reactivation Brokerage">Reactivation Brokerage</option>
                </select>

                {/* ARROW */}
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>

              <button 
                onClick={handleSubmit}
                className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
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

      {/* Product Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-lg font-semibold mb-6">Arihant Product</h2>

        <div className="flex flex-wrap gap-32 font-medium">
          <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600">Official Website</a>
          <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600">Demat your MF Units</a>
          <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600">Insta Options</a>
          <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600">Trade Bridge</a>
          <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600">Value Stocks</a>
          <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600">Stock Stack</a>
        </div>
      </div>
  </div>
);
}
