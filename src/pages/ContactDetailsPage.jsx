import React from "react";

export default function ContactDetailsPage() {
  const contacts = [
    {
      name: "Mr. Prem Sachdev",
      designation: "Executive",
      desk: "E-KYC - Digital account opening help desk",
      call: "07314217-272",
      email: "ekyc@arihantcapital.com",
      time: "9AM",
    },
    {
      name: "Mr. Prem Sachdev",
      designation: "Executive",
      desk: "Digital Modification (re-KYC) Help desk",
      call: "07314217-272",
      email: "ekyc@arihantcapital.com",
      time: "9AM",
    },
    {
      name: "Prem Sachdev",
      designation: "Executive",
      desk: "E-kyc & re-kyc WHATS APP (Only chat service)",
      call: "7869955852",
      email: "chat",
      time: "9AM",
    },
    {
      name: "Rahul Pal / Rakesh Thakur",
      designation: "Executive",
      desk: "Physical Account Opening Help desk",
      call: "07314217-126",
      email: "accountopening@arihantcapital.com",
      time: "9AM",
    },
    {
      name: "Heena Solanki / Tejbali / Chandresh",
      designation: "Executive",
      desk: "Physical Modification Help Desk",
      call: "07314217-274",
      email: "modification@arihantcapital.com",
      time: "9AM",
    },
    {
      name: "Rohit Diwan / Ankit",
      designation: "Executive",
      desk: "KRA services / CKYC",
      call: "07314217-110",
      email: "rohit.diwan@arihantcapital.com",
      time: "10AM",
    },
    {
      name: "Pramila Sharma",
      designation: "Executive",
      desk: "Exchange / Compliance related",
      call: "07314217-268",
      email: "pramila.sharma@arihantcapital.com",
      time: "8:30",
    },
    {
      name: "Shailendra Mathane",
      designation: "Manager",
      desk: "Critical /& Non individual Process / Escalation",
      call: "07314217-111",
      email: "shailendra.mathane@arihantcapital.com",
      time: "10AM",
    },
  ];

  return (
    <div className="w-full bg-[#f2f2f2] overflow-x-auto">
      <table className="w-[1817px] border-collapse text-[14px] text-[#1b1b1b] font-medium tracking-wide">
        <thead>
          <tr className="bg-[#c7e2c7] h-[62px]">
            <th className="w-[390px] border border-[#9fd49f]">Name</th>
            <th className="w-[255px] border border-[#9fd49f]">Designation</th>
            <th className="w-[490px] border border-[#9fd49f]">Desk</th>
            <th className="w-[185px] border border-[#9fd49f]">Call</th>
            <th className="w-[435px] border border-[#9fd49f]">Email</th>
            <th className="w-[62px] border border-[#9fd49f]"></th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-[#efefef]" : "bg-[#e3e3e3]"}
            >
              <td className="h-[61px] px-14 border border-[#d2d2d2]">
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