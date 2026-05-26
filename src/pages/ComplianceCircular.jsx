import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarHeader from "../components/common/CalendarHeader";
import { getComplianceFiles } from "../api/korpApiService";

export default function ComplianceCircular() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const fromRef = useRef();
  const toRef = useRef();
  const [showError, setShowError] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  // FETCH DATA (Backend Ready)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (selectedType = type) => {
    setIsLoading(true);
    try {
      const params = {
        pageNumber: 0,
        size: 50,
      };
      if (selectedType) {
        params.SearchType = "CIR";
        params.Search = selectedType === "Others" ? "Other" : selectedType;
      }
      const response = await getComplianceFiles(params);
      console.log("Compliance Files API Response:", response.data);
      
      const responseData = response?.data;
      let items = [];
      if (responseData) {
        if (Array.isArray(responseData)) {
          items = responseData;
        } else if (responseData.result && Array.isArray(responseData.result)) {
          items = responseData.result;
        } else if (responseData.result && typeof responseData.result === "object") {
          const firstArrayKey = Object.keys(responseData.result).find(key => Array.isArray(responseData.result[key]));
          if (firstArrayKey) {
            items = responseData.result[firstArrayKey];
          }
        } else if (responseData.data && Array.isArray(responseData.data)) {
          items = responseData.data;
        } else if (responseData.data && typeof responseData.data === "object") {
          const firstArrayKey = Object.keys(responseData.data).find(key => Array.isArray(responseData.data[key]));
          if (firstArrayKey) {
            items = responseData.data[firstArrayKey];
          }
        } else if (responseData.Data && Array.isArray(responseData.Data)) {
          items = responseData.Data;
        }
      }

      if (Array.isArray(items)) {
        setOriginalData(items);
        
        let filtered = [...items];
        if (fromDate) {
          filtered = filtered.filter((item) => {
            const itemDate = item.CircularDate || item.circularDate || item.date || item.Date || item.uploadDate || item.CreatedDate || "";
            return new Date(itemDate) >= new Date(fromDate);
          });
        }
        if (toDate) {
          filtered = filtered.filter((item) => {
            const itemDate = item.CircularDate || item.circularDate || item.date || item.Date || item.uploadDate || item.CreatedDate || "";
            return new Date(itemDate) <= new Date(toDate);
          });
        }
        setData(filtered);
      } else {
        setData([]);
        setOriginalData([]);
      }
    } catch (err) {
      console.error("Failed to fetch compliance circulars:", err);
      setData([]);
      setOriginalData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 FILTER APPLY
  const handleApply = () => {
    if (!fromDate || !toDate) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500);
      return;
    }

    let filtered = [...originalData];

    if (type) {
      filtered = filtered.filter((item) => {
        const itemType = item.type || item.Type || item.fileType || item.FileType || "";
        return itemType.toLowerCase() === type.toLowerCase();
      });
    }

    if (fromDate) {
      filtered = filtered.filter((item) => {
        const itemDate = item.CircularDate || item.circularDate || item.date || item.Date || item.uploadDate || item.CreatedDate || "";
        return new Date(itemDate) >= new Date(fromDate);
      });
    }

    if (toDate) {
      filtered = filtered.filter((item) => {
        const itemDate = item.CircularDate || item.circularDate || item.date || item.Date || item.uploadDate || item.CreatedDate || "";
        return new Date(itemDate) <= new Date(toDate);
      });
    }

    setData(filtered);
  };

  // 🚀 SORT FUNCTION
  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="p-6 pt-6">

        {/* FILTER SECTION */}
        <div className="bg-gray-200 p-5 rounded-lg flex flex-wrap gap-6 items-end pt-3 pb-4 ">

          {/* FROM DATE */}
          <div className="mt-0">
            <p className="text-sm mb-1">From Date</p>
            <div className="relative group">
              <DatePicker
                selected={fromDate}
                onChange={(d) => setFromDate(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                maxDate={new Date()}
                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                className="px-4 py-2 rounded border w-52 bg-white outline-none focus:border-[#34b350] transition-all"
                ref={fromRef}
                onFocus={(e) => e.target.blur()}
              />
              <i
                className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                onClick={() => fromRef.current.setOpen(true)}
              />
            </div>
          </div>

          {/* TO DATE */}
          <div className="mt-0">
            <p className="text-sm mb-1">To Date</p>
            <div className="relative group">
              <DatePicker
                selected={toDate}
                onChange={(d) => setToDate(d)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                maxDate={new Date()}
                renderCustomHeader={(props) => <CalendarHeader {...props} />}
                className="px-4 py-2 rounded border w-52 bg-white outline-none focus:border-[#34b350] transition-all"
                ref={toRef}
                onFocus={(e) => e.target.blur()}
              />
              <i
                className="fa fa-calendar absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 group-hover:text-[#34b350] transition-colors"
                onClick={() => toRef.current.setOpen(true)}
              />
            </div>
          </div>

          {/* DROPDOWN */}
          <div className="mt-0">
            <p className="text-sm mb-1">Search By Circular Type</p>
            <div className="relative w-56">
              <select
                className="px-4 py-2 rounded bg-gray-700 text-white w-56 appearance-none pr-10"
                value={type}
                onChange={(e) => {
                  const val = e.target.value;
                  setType(val);
                  fetchData(val);
                }}
              >
                <option value="">Select Type</option>
                <option value="NSE">NSE</option>
                <option value="BSE">BSE</option>
                <option value="Others">Others</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* APPLY BUTTON (ENHANCED) */}
          <button
            onClick={handleApply}
            className="bg-gradient-to-r from-green-500 to-green-700 
            hover:from-green-600 hover:to-green-800 
            text-white px-8 py-3 rounded-full font-semibold 
            shadow-md hover:shadow-xl 
            transition-all duration-300 active:scale-95"
          >
            APPLY →
          </button>
        </div>

        {/* � TABLE */}
        <div className="mt-6 border rounded-md overflow-hidden bg-white">

          {/* HEADER */}
          <div className="grid grid-cols-3 bg-green-600 text-white text-sm font-semibold">

            {/* TYPE */}
            <div
              onClick={() => handleSort("type")}
              className="p-3 border-r flex items-center justify-between cursor-pointer"
            >
              Compliance Type
              <i
                className={`fa ${
                  sortConfig.key === "type"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

            {/* FILE */}
            <div
              onClick={() => handleSort("file")}
              className="p-3 border-r flex items-center justify-between cursor-pointer"
            >
              File
              <i
                className={`fa ${
                  sortConfig.key === "file"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

            {/* DATE */}
            <div
              onClick={() => handleSort("date")}
              className="p-3 flex items-center justify-between cursor-pointer"
            >
              Date
              <i
                className={`fa ${
                  sortConfig.key === "date"
                    ? sortConfig.direction === "asc"
                      ? "fa-sort-up"
                      : "fa-sort-down"
                    : "fa-sort"
                }`}
              />
            </div>

          </div>

          {/* BODY WITH SCROLL */}
          <div className="max-h-[350px] overflow-y-auto">
            {isLoading ? (
              <div className="p-16 text-center text-gray-500 font-semibold text-[15px]">
                Loading compliance circulars from UAT...
              </div>
            ) : data.length === 0 ? (
              <div className="p-16 text-center text-gray-400 font-medium">
                No circulars available
              </div>
            ) : (
              data.map((item, index) => {
                const complianceType = item.complianceType || item.ComplianceType || item.circularType || item.CircularType || item.type || item.Type || item.fileType || item.FileType || "Circular";
                const fileName = item.circularName || item.CircularName || item.file || item.File || item.fileName || item.FileName || item.name || item.Name || "Download File";
                const rawDate = item.CircularDate || item.circularDate || item.date || item.Date || item.uploadDate || item.CreatedDate || item.uploadedDate || item.UploadedDate || "-";
                let circularDate = "-";
                if (rawDate && rawDate !== "-") {
                  const firstPart = String(rawDate).split(" ")[0].split("T")[0];
                  if (firstPart.includes("-") && firstPart.split("-")[0].length === 4) {
                    const [yyyy, mm, dd] = firstPart.split("-");
                    circularDate = `${dd}/${mm}/${yyyy}`;
                  } else {
                    circularDate = firstPart;
                  }
                }
                const fileUrl = item.fileUrl || item.url || item.Url || `https://korpapuatapi.arihantcapital.com/api/V1/reports/downloadComplianceFile?fileName=${fileName}`;

                return (
                  <div
                    key={index}
                    className="grid grid-cols-3 text-sm border-t hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="p-3 border-r font-medium text-gray-800">{complianceType}</div>

                    <div className="p-3 border-r text-blue-600 font-bold">
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline text-blue-600 hover:underline cursor-pointer"
                      >
                        {fileName}
                      </a>
                    </div>

                    <div className="p-3 text-gray-600 font-medium">{circularDate}</div>
                  </div>
                );
              })
            )}
          </div>

          {/* FOOTER */}
          <div className="p-3 text-xs text-gray-500">
            {data.length} total
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2">
          <i className="fa fa-exclamation-circle"></i>
          <span>Please select both From Date and To Date</span>
        </div>
      )}
    </div>
  );
}