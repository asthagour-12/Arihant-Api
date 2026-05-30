import React, { useState, useEffect } from "react";
import {
  Search,
  EyeOff,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { getRekycModification } from "../api/korpApiService";

export default function ReKYCModification({ search = "" }) {
  const [visiblePans, setVisiblePans] = useState({});
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchRekycModifications = async () => {
    setIsLoading(true);
    try {
      const params = {
        size: 50,
        pageNumber: 0,
      };
      if (search.trim()) {
        params.clientCode = search.trim(); // Only one query param to prevent 400 error
      }
      const response = await getRekycModification(params);
      console.log("Full Rekyc API response:", response);

      const apiData = response?.data;

      console.log("API DATA =>", apiData);

      const result = apiData?.result || {};

      console.log("RESULT =>", result);

      const items = result?.userList || [];

      console.log("FINAL ITEMS =>", items);
      setTableData(items);
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch Rekyc modifications:", error);
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };
  // Log table data updates
  React.useEffect(() => {
    console.log("Updated Table Data:", tableData);
  }, [tableData]);

  useEffect(() => {
    fetchRekycModifications();
  }, [search]);

  // PAN VISIBILITY TOGGLE
  const togglePanVisibility = (clientCode) => {
    setVisiblePans(prev => ({
      ...prev,
      [clientCode]: !prev[clientCode]
    }));
  };

  // Restore the original search filter
  const filteredData = tableData.filter((item) => {
    const code = item.clientCode || item.clientcode || item.ClientCode || "";
    return String(code).toLowerCase().includes(String(search).toLowerCase());
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const visibleData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); };
  const handlePrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1); };
  console.log('Filtered Data count:', filteredData.length);
  console.log('Filtered Data:', filteredData);

  return (
    <div className="bg-white px-2">
      {/* Table */}
      <div className="w-full overflow-x-auto no-scrollbar border-t border-gray-200 mt-6">
        <style>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
        <div className="min-w-[1100px]">
          {/* Header */}
          <div className="grid grid-cols-7 bg-[#35b34a] text-white text-[13px] font-semibold">
            {[
              "Clientcode",
              "PAN",
              "Client Name",
              "Request Type",
              "Request Date",
              "Request Status",
              "Admin Updated Date",
            ].map((item, index) => (
              <div
                key={index}
                className="px-2 py-2 border-r border-white/30 flex items-center justify-between cursor-pointer select-none whitespace-nowrap"
              >
                <span>{item}</span>
                <div className="flex flex-col leading-none opacity-60 ml-2">
                  <ChevronUp size={10} />
                  <ChevronDown size={10} className="-mt-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {isLoading ? (
            <div className="bg-white h-[100px] flex items-center justify-center px-6 text-[15px] text-gray-500 border-b border-gray-200 font-semibold">
              Loading Rekyc modifications from UAT...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="bg-white h-[45px] flex items-center px-6 text-[15px] text-gray-500 border-b border-gray-200">
              No data to display
            </div>
          ) : (
            visibleData.map((row, index) => {
              const clientCode = row.clientCode || row.client_code || row.ClientCode || "-";
              const pan = row.PAN || row.pan || row.Pan || "-";
              const maskedPan = row.maskedPan || row.maskedpan || row.MaskedPan || (pan !== "-" ? pan.replace(/.(?=.{4})/g, "*") : "-");
              const clientName = row.ClientName || row.clientName || row.clientname || "-";

              let requestType = row.requestType || row.requesttype || row.RequestType || row.type || row.Type || "-";
              let requestStatus = row.requestStatus || row.requeststatus || row.RequestStatus || row.status || row.Status || "-";

              if (requestType === "-") {
                if (row.isnomineeadded === "1") {
                  requestType = "Nominee Addition";
                  requestStatus = row.adminnomineestatus === "1" ? "Accepted" : row.adminnomineestatus === "2" ? "Rejected" : "Pending";
                } else if (row.Isckycrequest === "1") {
                  requestType = "CKYC Request";
                  requestStatus = row.adminckycrequeststatus === "1" ? "Accepted" : row.adminckycrequeststatus === "2" ? "Rejected" : "Pending";
                } else if (row.segmentAddedrequest === "1") {
                  requestType = "Segment Addition";
                  requestStatus = row.adminsegmentAddedstatus === "1" ? "Accepted" : row.adminsegmentAddedstatus === "2" ? "Rejected" : "Pending";
                } else if (row.ismobileUpdate === "1") {
                  requestType = "Mobile Update";
                  requestStatus = row.adminmobileupdatestatus === "1" ? "Accepted" : row.adminmobileupdatestatus === "2" ? "Rejected" : "Pending";
                } else if (row.isemailUpdate === "1") {
                  requestType = "Email Update";
                  requestStatus = row.adminemailUpdatestatus === "1" ? "Accepted" : row.adminemailUpdatestatus === "2" ? "Rejected" : "Pending";
                } else if (row.isbankUpdate === "1") {
                  requestType = "Bank Update";
                  requestStatus = row.adminbankstatus === "1" ? "Accepted" : row.adminbankstatus === "2" ? "Rejected" : "Pending";
                } else if (row.isbankdefaulUpdate === "1") {
                  requestType = "Default Bank Update";
                  requestStatus = row.adminbankdefaulstatus === "1" ? "Accepted" : row.adminbankdefaulstatus === "2" ? "Rejected" : "Pending";
                } else if (row.isaccountclose === "1") {
                  requestType = "Account Closure";
                  requestStatus = row.admincloserstatus === "1" ? "Accepted" : row.admincloserstatus === "2" ? "Rejected" : "Pending";
                } else if (row.IsActivationrequest === "1") {
                  requestType = "Activation Request";
                  requestStatus = row.adminActivationrequeststatus === "1" ? "Accepted" : row.adminActivationrequeststatus === "2" ? "Rejected" : "Pending";
                }
              }

              const requestDate = row.requestDate || row.requestdate || row.RequestDate || row.date || row.Date || "-";

              // Map admin updated date covering all casing edge cases
              let rawAdminDate =
                row.adminUpdatedDate ||
                row.adminupdatedate ||
                row.adminupdateddate ||
                row.AdminUpdatedDate ||
                row.AdminupdateDate ||
                row.AdminUpdateDate ||
                row.adminUpdateDate ||
                row.adminupdateDate ||
                row.LDstatusDate || // Sometime LDstatusDate acts as the updated date
                row.updatedDate ||
                row.updateddate ||
                null;

              const adminUpdatedDate = (rawAdminDate && String(rawAdminDate).trim() !== "") ? rawAdminDate : "-";

              if (index === 0) {
                console.log("REKYC ADMIN DATE DEBUG =>", {
                  adminupdatedate: row.adminupdatedate,
                  LDstatusDate: row.LDstatusDate,
                  rawAdminDate: rawAdminDate,
                  finalValue: adminUpdatedDate
                });
              }

              return (
                <div
                  key={index}
                  className="grid grid-cols-7 text-[13px] bg-[#f2f2f2] border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={clientCode}>{clientCode}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex items-center justify-start gap-2 font-semibold">
                    <span className="truncate" title={visiblePans[clientCode] ? pan : maskedPan}>{visiblePans[clientCode] ? pan : maskedPan}</span>
                    <EyeOff
                      size={12}
                      className="cursor-pointer text-gray-400 hover:text-[#34b44a] flex-shrink-0"
                      onClick={() => togglePanVisibility(clientCode)}
                    />
                  </div>

                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={clientName}>{clientName}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex flex-col justify-center truncate">
                    <div className="font-semibold truncate" title={requestType}>{requestType}</div>
                    {requestStatus.toLowerCase() === "accepted" || requestType !== "-" ? (
                      <span className="inline-flex items-center gap-1 bg-[#35b34a] text-white text-[10px] px-1.5 py-[1px] rounded-md mt-1 w-max">
                        <Check size={10} />
                        Accepted
                      </span>
                    ) : null}
                  </div>

                  <div className="px-2 py-3 border-r border-gray-300 truncate" title={requestDate}>{requestDate}</div>

                  <div className="px-2 py-3 border-r border-gray-300 flex items-center">
                    <span className="bg-[#35b34a] text-white px-3 py-[2px] rounded-md text-[11px] font-bold truncate" title={requestStatus}>
                      {requestStatus}
                    </span>
                  </div>

                  <div className="px-2 py-3 truncate" title={adminUpdatedDate}>{adminUpdatedDate}</div>
                </div>
              );
            })
          )}

          <div className="bg-white px-6 py-3 text-black font-bold border-b border-gray-200 text-[14px] flex items-center justify-between">
            <span>Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} total</span>
            {filteredData.length > rowsPerPage && (
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 1} 
                  className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  <i className="fa fa-chevron-left text-[10px]"></i>
                </button>
                <span className="w-7 h-7 flex items-center justify-center bg-[#1EB04C] text-white rounded text-xs font-bold shadow-sm">{currentPage}</span>
                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages} 
                  className="w-7 h-7 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-[#18a045] hover:text-white hover:border-[#18a045] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                >
                  <i className="fa fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}