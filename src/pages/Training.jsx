import React, { useState } from "react";

export default function Training() {
  const [activeSubTab, setActiveSubTab] = useState("past");

  const trainingData = [
    {
      date: "11-07-2025",
      description:
        "India - The Emerging Economic Giant in Midst of Global Uncertainty",
      department: "",
      trainer: "Pankaj Murarka",
      banner: "",
      recording: "https://www.youtube.com/watch?v=vvSpJJB8Ex8",
    },
    {
      date: "05-07-2025",
      description: "",
      department: "Wealth Department",
      trainer: "Shailesh Saraf",
      banner: "",
      recording:
        "https://download.arihantcapital.com/Webinar/Shailesh.mp4",
    },
    {
      date: "04-07-2025",
      description: "Social Media and Digital Selling",
      department: "",
      trainer: "Pushpendra Singh",
      banner: "/assets/images/social.png",
      recording:
        "https://download.arihantcapital.com/client/social.mp4",
    },
  ];

  return (
    <div className="mt-6">

      {/* � SUB TABS */}
      <div className="flex gap-6 border-b text-sm mb-4">
        <span
          onClick={() => setActiveSubTab("upcoming")}
          className={`cursor-pointer pb-2 ${
            activeSubTab === "upcoming"
              ? "border-b-2 border-green-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Upcoming Session
        </span>

        <span
          onClick={() => setActiveSubTab("past")}
          className={`cursor-pointer pb-2 ${
            activeSubTab === "past"
              ? "border-b-2 border-green-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Past Recorded Session
        </span>

        <span
          onClick={() => setActiveSubTab("webinar")}
          className={`cursor-pointer pb-2 ${
            activeSubTab === "webinar"
              ? "border-b-2 border-green-600 font-semibold"
              : "text-gray-500"
          }`}
        >
          Client Webinar
        </span>
      </div>

      {/* TABLE (TABS KE NICHE HI) */}
      {activeSubTab === "past" && (
        <div className="overflow-y-auto max-h-[500px] border rounded-lg">

          <table className="w-full text-sm">
            <thead className="bg-gray-200 sticky top-0">
              <tr className="text-left">
                <th className="px-4 py-3 w-[12%]">Date</th>
                <th className="px-4 py-3 w-[28%]">Description</th>
                <th className="px-4 py-3 w-[20%]">Department</th>
                <th className="px-4 py-3 w-[20%]">Trainer</th>
                <th className="px-4 py-3 w-[10%]">Banner</th>
                <th className="px-4 py-3 w-[10%]">Recording</th>
              </tr>
            </thead>

            <tbody>
              {trainingData.map((item, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 font-semibold">
                    {item.date}
                  </td>

                  <td className="px-4 py-3">
                    {item.description}
                  </td>

                  <td className="px-4 py-3">
                    {item.department}
                  </td>

                  <td className="px-4 py-3">
                    {item.trainer}
                  </td>

                  <td className="px-4 py-3">
                    {item.banner && (
                      <a
                        href={item.banner}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Img
                      </a>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <a
                      href={item.recording}
                      target="_blank"
                      className="text-blue-600 underline"
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
  );
}