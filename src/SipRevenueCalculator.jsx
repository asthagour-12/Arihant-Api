import React, { useState } from "react";
import Header from "./Header.jsx";

export default function Training() {
  const [activeSubTab, setActiveSubTab] = useState("past");

  const data = [
    {
      date: "11-07-2025",
      description:
        "India - The Emerging Economic Giant in Midst of Global Uncertainty",
      department: "",
      trainer: "Pankaj Murarka",
      banner: "",
      link: "https://www.youtube.com/watch?v=vvSpJJB8Ex8",
    },
    {
      date: "05-07-2025",
      description: "",
      department: "Wealth Department",
      trainer: "Shailesh Saraf",
      banner: "",
      link:
        "https://download.arihantcapital.com/Webinar/Shailesh%20Saraf%20Marriott%20Event%20Video224mb.mp4",
    },
    {
      date: "05-07-2025",
      description: "Greek Training",
      department: "RMS Team",
      trainer: "GREEKSOFT team and Arihant Admin team",
      banner: "",
      link:
        "https://download.arihantcapital.com/client/Greek_Training_5_7_2025.mp4",
    },
    {
      date: "04-07-2025",
      description: "Social Media and Digital (LinkedIn) Selling & Upskilling",
      department: "",
      trainer: "Mr. Pushpendra Singh Jadon",
      banner: "/assets/images/social_media_4_7.png",
      link:
        "https://download.arihantcapital.com/client/4_July_2025_Social_Media.mp4",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="p-4 pt-[80px]">
        <div className="bg-white rounded-lg shadow-sm p-6">

          {/* SUB TABS (same line under Training tab) */}
          <div className="flex gap-6 border-b text-sm">
            <span
              onClick={() => setActiveSubTab("upcoming")}
              className={`pb-2 cursor-pointer ${activeSubTab === "upcoming"
                  ? "border-b-2 border-green-600 font-semibold text-black"
                  : "text-gray-500"
                }`}
            >
              Upcoming Session
            </span>

            <span
              onClick={() => setActiveSubTab("past")}
              className={`pb-2 cursor-pointer ${activeSubTab === "past"
                  ? "border-b-2 border-green-600 font-semibold text-black"
                  : "text-gray-500"
                }`}
            >
              Past Recorded Session
            </span>

            <span
              onClick={() => setActiveSubTab("webinar")}
              className={`pb-2 cursor-pointer ${activeSubTab === "webinar"
                  ? "border-b-2 border-green-600 font-semibold text-black"
                  : "text-gray-500"
                }`}
            >
              Client Webinar
            </span>
          </div>

          {/* TABLE (NO EXTRA BOX, SAME UI) */}
          {activeSubTab === "past" && (
            <div className="mt-4 overflow-x-auto">

              <table className="w-full border border-gray-200">

                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Department</th>
                    <th className="p-3 text-left">Trainer</th>
                    <th className="p-3 text-left">Banner</th>
                    <th className="p-3 text-left">Recording</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                    >
                      <td className="p-3 font-semibold">{item.date}</td>

                      <td className="p-3">{item.description}</td>

                      <td className="p-3">{item.department}</td>

                      <td className="p-3">{item.trainer}</td>

                      <td className="p-3">
                        {item.banner && (
                          <a
                            href={item.banner}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            Img
                          </a>
                        )}
                      </td>

                      <td className="p-3">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Click here
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}