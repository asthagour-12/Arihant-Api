import React from "react";
import { getBrokerageCapital, getBrokerageThirdParty, getBrokerageResearch, getBrokerageLedger, getBrokerageSummary } from "../api/apiService";
import useFetch from "../hooks/useFetch";

const API_MAP = {
  capital: getBrokerageCapital,
  thirdParty: getBrokerageThirdParty,
  research: getBrokerageResearch,
  ledger: getBrokerageLedger,
  summary: getBrokerageSummary
};

const HEADERS = {
  capital: ["COMMISSION ACCOUNT", "SUBBROKER NAME", "BROKERAGE AMOUNT", "PASS ON %"],
  thirdParty: ["ACCOUNT", "NAME", "BROKERAGE", "PASS ON %"],
  research: ["ACCOUNT", "NAME", "BROKERAGE", "PASS ON %"],
  ledger: ["DATE", "PARTICULARS", "DEBIT", "CREDIT", "BALANCE"],
  summary: ["MONTH", "BROKERAGE", "SHARING", "NET"]
};

export default function BrokerageTable({ type = "capital", filters = {} }) {
  const fetchFn = API_MAP[type] || getBrokerageCapital;
  const { data: resData, loading, error } = useFetch(fetchFn, filters, Object.keys(filters).length > 0);
  const data = resData?.data || [];

  const headers = HEADERS[type] || HEADERS.capital;

  if (loading) return <div className="p-10 text-center text-gray-500">Loading brokerage data...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-medium">{error}</div>;
  if (data.length === 0) return (
    <div className="bg-white border rounded-lg mt-4">
      <div className="p-4 text-gray-500">No data to display</div>
      <div className="p-4 border-t text-xs text-gray-400">0 total</div>
    </div>
  );

  return (
    <div className="mt-4 bg-white rounded-lg overflow-hidden border">
      <table className="w-full text-[12px] border-collapse">
        <thead>
          <tr className="bg-[#2fb344] text-white">
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 border-r border-white/20 text-left font-semibold uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              {/* This is a generic mapping, we might need specific field names if they vary */}
              {Object.values(item).map((val, i) => (
                <td key={i} className="px-3 py-3 border-r border-gray-100 last:border-r-0">
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 bg-gray-50 border-t text-xs text-gray-500">
        {data.length} total records
      </div>
    </div>
  );
}
