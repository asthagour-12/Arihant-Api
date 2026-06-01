import React, { useState, useEffect } from "react";
import { getClientContactDetails } from "../api/korpApiService";

export default function ContactDetailsPage() {
  const [apiContacts, setApiContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const staticContacts = [
    {
      name: "Mr. Prem Sachdev",
      designation: "Executive",
      desk: "E-KYC - Digital account opening help desk",
      call: "07314217-272",
      email: "ekyc@arihantcapital.com",
      time: "9AM - 6PM",
    },
    {
      name: "Mr. Prem Sachdev",
      designation: "Executive",
      desk: "Digital Modification (re-KYC) Help desk",
      call: "07314217-272",
      email: "ekyc@arihantcapital.com",
      time: "9AM - 6PM",
    },
    {
      name: "Mr. Prem Sachdev",
      designation: "Executive",
      desk: "E-kyc & re-kyc WHATS APP (Only chat service)",
      call: "7869955852",
      email: "chat",
      time: "9AM - 6PM",
    },
    {
      name: "Rahul Pal / Rakesh Thakur",
      designation: "Executive",
      desk: "Physical Account Opening Help desk",
      call: "07314217-126",
      email: "accountopening@arihantcapital.com",
      time: "9AM - 6PM",
    },
    {
      name: "Heena Solanki / Tejbali / Chandresh",
      designation: "Executive",
      desk: "Physical Modification Help Desk",
      call: "07314217-274",
      email: "modification@arihantcapital.com",
      time: "9AM - 6PM",
    },
    {
      name: "Rohit Diwan / Ankit",
      designation: "Executive",
      desk: "KRA services / CKYC",
      call: "07314217-110",
      email: "rohit.diwan@arihantcapital.com",
      time: "10AM - 6PM",
    },
    {
      name: "Pramila Sharma",
      designation: "Executive",
      desk: "Exchange / Compliance related",
      call: "07314217-268",
      email: "pramila.sharma@arihantcapital.com",
      time: "8:30AM - 6PM",
    },
    {
      name: "Shailendra Mathane",
      designation: "Manager",
      desk: "Critical /& Non individual Process / Escalation",
      call: "07314217-111",
      email: "shailendra.mathane@arihantcapital.com",
      time: "10AM - 6PM",
    },
    {
      name: "Mahima Mandloi",
      designation: "Manager",
      desk: "Physical Process escalation 1",
      call: "07314217-120",
      email: "mahima.mandloi@arihantcapital.com",
      time: "9:30AM - 6:30PM",
    },
    {
      name: "Ashish Yadav",
      designation: "Manager",
      desk: "Digital Process escalation 1",
      call: "7974249639",
      email: "ashish.yadav@arihantcapital.com",
      time: "10AM - 6PM",
    },
    {
      name: "Kartikeya Shukla",
      designation: "Head account opening",
      desk: "Any escalation",
      call: "9755618748",
      email: "kartikeya.shukla@arihantcapital.com",
      time: "10AM - 6PM",
    }
  ];

  const contacts = staticContacts;

  return (
    <div className="w-full bg-[#f2f2f2] overflow-x-auto">
      <div className="px-6 py-4 text-sm text-gray-700 font-semibold">
        {loading ? "Loading contact details..." : apiError ? "Showing fallback contact list" : "Contact details"}
      </div>
      <table className="w-[1415px] border-collapse text-[14px] text-[#1b1b1b] font-medium tracking-wide">
        <thead>
          <tr className="bg-[#c7e2c7] h-[62px]">
            <th className="w-[280px] border border-[#9fd49f] text-center">Name</th>
            <th className="w-[180px] border border-[#9fd49f] text-center">Designation</th>
            <th className="w-[350px] border border-[#9fd49f] text-center">Desk</th>
            <th className="w-[185px] border border-[#9fd49f] text-center">Call</th>
            <th className="w-[300px] border border-[#9fd49f] text-center">Email</th>
            <th className="w-[120px] border border-[#9fd49f] text-center">Time</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#efefef]" : "bg-[#e3e3e3]"}
            >
              <td className="h-[61px] px-4 border border-[#d2d2d2]">
                {item.name}
              </td>

              <td className="px-4 border border-[#d2d2d2]">
                {item.designation}
              </td>

              <td className="px-4 border border-[#d2d2d2]">
                {item.desk}
              </td>

              <td className="px-4 border border-[#d2d2d2]">
                {item.call}
              </td>

              <td className="px-4 border border-[#d2d2d2] text-[#0066ff]">
                {item.email}
              </td>

              <td className="px-2 border border-[#d2d2d2] text-center">
                {item.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}