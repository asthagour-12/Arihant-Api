import React from "react";

export default function EKYCTAT () {
  const data = [
    {
      service: "E-KYC e-signature approval TAT",
      request: "If request received up to 7 PM",
      tat: "up to 15 minutes",
      days: "Monday to Friday",
    },
    {
      service: "E-KYC e-signature approval TAT",
      request: "If request received after to 7 PM",
      tat: "Next day before 10AM",
      days: "Monday to Friday",
    },
    {
      service: "E-KYC account activation TAT",
      request: "If request received up to 7 PM",
      tat: "Within 1 hour after E-sign",
      days: "Monday to Friday",
    },
    {
      service: "E-KYC account activation TAT",
      request: "If request received after to 7 PM",
      tat: "Next day before 11AM",
      days: "Monday to Friday",
    },
    {
      service: "E-KYC account eligible for the trade",
      request: "If request received up to 7 PM",
      tat: "Next day will be eligible for the trade subject to exchange approval.",
      days: "Monday to Friday",
    },
    {
      service: "E-KYC account eligible for the trade",
      request: "If request received after to 7 PM",
      tat: "Will be eligible for the trading day after tomorrow subject to exchange approval.",
      days: "Monday to Friday",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px] text-[#222] bg-white">
        <thead>
          <tr>
            <th
              colSpan="4"
              className="border border-gray-300 bg-white py-6 font-bold text-[22px] text-center"
            >
              Online account open via e-KYC
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? "bg-[#d9d9d9]" : "bg-[#f7f7f7]"}
            >
              <td className="border border-gray-300 px-3 py-3 w-[30%]">
                {item.service}
              </td>

              <td className="border border-gray-300 px-3 py-3 w-[25%]">
                {item.request.includes("up to") ? (
                  <>
                    If request received <b>up to</b> 7 PM
                  </>
                ) : (
                  <>
                    If request received <b>after</b> to 7 PM
                  </>
                )}
              </td>

              <td className="border border-gray-300 px-3 py-3 w-[25%] leading-[30px]">
                {item.tat}
              </td>

              <td className="border border-gray-300 px-3 py-3 w-[20%]">
                {item.days}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}