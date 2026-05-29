import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ArihantProducts from "./ArihantProducts";
import Footer from "./Footer";
import { getUserProfile, getDPSlip } from "../api/korpApiService";

function DealSlip() {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [clientCode, setClientCode] = useState("");
  const [showCustomError, setShowCustomError] = useState(false);
  const [customErrorMsg, setCustomErrorMsg] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [errorResponse, setErrorResponse] = useState(null);
  const fromRef = useRef();
  const toRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("UserProfile Response on DealSlip:", response.data);
        
        if (response.data && response.data.success === false) {
          setErrorResponse(response.data);
          setCustomErrorMsg(response.data.message || "Invalid Client Code");
          setShowCustomError(true);
          return;
        }

        const data = response?.data?.data || response?.data?.Data || response?.data?.result || response?.data;
        if (data) {
          const code = data.clientCode || data.clientcode || data.ClientCode || data.uccCode || data.ucc || "";
          if (code) {
            setClientCode(code);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user profile on deal slip page:", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (showCustomError) {
      const timer = setTimeout(() => setShowCustomError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showCustomError]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleApply = async () => {
    if (!clientCode.trim()) {
      setCustomErrorMsg("Please enter Client Code");
      setShowCustomError(true);
      return;
    }
    if (fromDate && !toDate) {
      setCustomErrorMsg("Please select To Date");
      setShowCustomError(true);
      return;
    }
    if (!fromDate && toDate) {
      setCustomErrorMsg("Please select From Date");
      setShowCustomError(true);
      return;
    }
    if (!fromDate && !toDate) {
      setCustomErrorMsg("Please select Date range");
      setShowCustomError(true);
      return;
    }
    if (fromDate && toDate && fromDate.toDateString() === toDate.toDateString()) {
      setCustomErrorMsg("From and To dates cannot be same");
      setShowCustomError(true);
      return;
    }
    
    setIsDownloading(true);
    try {
      const datefrm = formatDate(fromDate);
      const dateto = formatDate(toDate);

      const response = await getDPSlip({
        ClientCode: clientCode.trim(),
        datefrm,
        dateto,
      });

      console.log("Deal Slip API Response:", response.data);
      const responseData = response?.data;

      if (responseData) {
        // If success is false, display the message in the error toast & error response panel
        if (responseData.success === false) {
          setErrorResponse(responseData);
          setPdfUrl(null);
          setCustomErrorMsg(responseData.message || "Invalid Client Code");
          setShowCustomError(true);
          return;
        }

        // Reset error response on success
        setErrorResponse(null);

        // Extract base64 PDF from FileData
        const base64PDF = responseData.result?.FileData || responseData.result?.fileData || responseData.FileData || responseData.data?.FileData;

        if (base64PDF) {
          const formattedBase64 = base64PDF.startsWith("data:") ? base64PDF.trim() : `data:application/pdf;base64,${base64PDF.trim()}`;
          setPdfUrl(formattedBase64);

          try {
            // Convert base64 to Blob URL for clean preview and direct download
            const byteCharacters = atob(base64PDF.trim());
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });
            const blobUrl = URL.createObjectURL(blob);
            
            // Set pdfUrl to blobUrl for cleaner in-app rendering
            setPdfUrl(blobUrl);

            // Open PDF preview in a new tab (if popup blockers allow)
            window.open(blobUrl, "_blank");

            // Automatically download the file
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `DealSlip_${clientCode.trim()}_${datefrm}_${dateto}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (e) {
            console.error("Failed to parse base64 PDF FileData:", e);
            // Fallback to direct data URL download
            const link = document.createElement("a");
            link.href = formattedBase64;
            link.setAttribute("download", `DealSlip_${clientCode.trim()}_${datefrm}_${dateto}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        } else {
          // Additional fallbacks for fileUrl/base64Data
          const fileUrl = responseData.fileUrl || responseData.url || responseData.Url || responseData.data?.fileUrl || responseData.data?.url;
          const base64Data = responseData.base64 || responseData.Base64 || responseData.pdfBase64 || responseData.data?.base64;

          if (fileUrl && typeof fileUrl === "string" && fileUrl.startsWith("http")) {
            const link = document.createElement("a");
            link.href = fileUrl;
            link.setAttribute("download", `DealSlip_${clientCode.trim()}_${datefrm}_${dateto}.pdf`);
            link.setAttribute("target", "_blank");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else if (base64Data) {
            const link = document.createElement("a");
            link.href = base64Data.startsWith("data:") ? base64Data : `data:application/pdf;base64,${base64Data}`;
            link.setAttribute("download", `DealSlip_${clientCode.trim()}_${datefrm}_${dateto}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            setCustomErrorMsg("No document file (FileData) found in response");
            setShowCustomError(true);
          }
        }
      } else {
        setCustomErrorMsg("Invalid response from server");
        setShowCustomError(true);
      }
    } catch (error) {
      console.error("Deal Slip API Error:", error);
      setCustomErrorMsg(error.response?.data?.message || "Failed to download Deal Slip. Please try again.");
      setShowCustomError(true);
    } finally {
      setIsDownloading(false);
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
      <button
        onClick={(e) => { e.preventDefault(); decreaseMonth(); }}
        disabled={prevMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-left text-[10px] text-gray-500"></i>
      </button>
      
      <div className="flex gap-2">
        <div className="relative">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {months.filter((_, index) => {
              if (date.getFullYear() === currentYear) {
                return index <= currentMonth;
              }
              return true;
            }).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>

        <div className="relative">
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
            className="text-[12px] font-bold bg-white border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-[#34b350] transition-all appearance-none pr-6 shadow-sm"
          >
            {Array.from({ length: currentYear - 1947 + 1 }, (_, i) => 1947 + i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <i className="fa fa-chevron-down absolute right-2 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 pointer-events-none"></i>
        </div>
      </div>

      <button
        onClick={(e) => { e.preventDefault(); increaseMonth(); }}
        disabled={nextMonthButtonDisabled}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors disabled:opacity-30"
      >
        <i className="fa fa-chevron-right text-[10px] text-gray-500"></i>
      </button>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <div className="p-2 md:p-4 flex-grow">
        {/* WHITE CARD */}
        <div className="bg-white rounded-lg shadow border border-gray-200 p-5 mt-12 mb-0">

          {/* INNER GRAY BOX */}
          <div className="bg-gray-200 rounded-md px-5 py-4 flex flex-wrap items-end gap-0">

            {/* CLIENT CODE */}
            <div className="flex flex-col flex-1 min-w-[180px] mr-3">
              <label className="text-sm mb-1 text-gray-600 font-medium">
                Enter Client Code
              </label>
              <input
                type="text"
                value={clientCode}
                onChange={(e) => setClientCode(e.target.value)}
                placeholder="Enter Client Code"
                className="h-10 rounded-full border px-4 bg-gray-100 outline-none focus:border-green-500"
              />
            </div>

            {/* FROM DATE */}
            <div className="flex-1 flex-col flex-1 min-w-[180px]">
              <label className="text-sm mb-1 text-gray-600 font-medium ml-1">
                From Date
              </label>

              <div className="relative group w-72">
                <DatePicker
                  selected={fromDate}
                  onChange={(d) => setFromDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  renderCustomHeader={CustomHeader}
                  className="h-10 w-full border-2 rounded-md pl-3 pr-10 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all"
                  wrapperClassName="w-full"
                  ref={fromRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                  onClick={() => fromRef.current.setOpen(true)}
                ></i>
              </div>
            </div>

            {/* TO DATE */}
            <div className="flex-1 flex-col flex-1 min-w-[180px]">
              <label className="text-sm mb-1 text-gray-600 font-medium ml-1">
                To Date
              </label>

              <div className="relative group w-72">
                <DatePicker
                  selected={toDate}
                  onChange={(d) => setToDate(d)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="DD/MM/YYYY"
                  maxDate={new Date()}
                  renderCustomHeader={CustomHeader}
                  className="h-10 w-full border-2 rounded-md pl-3 pr-10 text-[13px] text-black font-bold outline-none bg-white focus:border-[#34b350] transition-all"
                  wrapperClassName="w-full"
                  ref={toRef}
                  onFocus={(e) => e.target.blur()}
                />
                <i
                  className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] cursor-pointer group-hover:text-[#34b350] transition-colors"
                  onClick={() => toRef.current.setOpen(true)}
                ></i>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex items-end">
              <button
                onClick={handleApply}
                disabled={isDownloading}
                className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${isDownloading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {isDownloading ? (
                  <>
                    DOWNLOADING...
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    DOWNLOAD SLIP <span className="ml-1">›</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* PDF PREVIEW CONTAINER */}
        {pdfUrl && (
          <div className="bg-white rounded-lg shadow border border-gray-200 p-5 mt-4 transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 bg-green-600 rounded-full"></span>
                <h3 className="text-lg font-bold text-gray-800">Deal Slip Preview</h3>
              </div>
              <div className="flex gap-3">
                <a 
                  href={pdfUrl} 
                  download={`DealSlip_${clientCode.trim()}_${formatDate(fromDate)}_${formatDate(toDate)}.pdf`} 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold no-underline flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i className="fa fa-download text-[10px]"></i> Download PDF
                </a>
                <button 
                  onClick={() => setPdfUrl(null)} 
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  Close Preview
                </button>
              </div>
            </div>
            <div className="w-full h-[650px] border border-gray-300 rounded-lg overflow-hidden shadow-inner bg-gray-50">
              <iframe src={pdfUrl} width="100%" height="100%" title="Deal Slip Preview" className="border-none"></iframe>
            </div>
          </div>
        )}



        {/* ARIHANT PRODUCTS */}
        <div className="mt-4">
          <ArihantProducts />
        </div>
      </div>

      <Footer />

      {/* 🚨 CUSTOM ERROR TOAST */}
      <div
        className={`fixed top-5 right-5 bg-[#e50046] text-white rounded-xl shadow-2xl px-6 py-2 min-w-[360px]
                flex items-center justify-between z-[10000]
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
    </div>
  );
}

export default DealSlip;