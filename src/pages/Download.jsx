import React, { useState } from "react";

const downloadData = {
  Daily_Update_File: [
    "ODIN_Daily_Scrip_Master",
    "NSE_FO_MARGIN_FILE",
    "SPAN_FILE_FOR_ADMIN_TERMINAL",
  ],
  Trading_Setup: [
    "ODIN_DIET_SETUP_FOR_COMBINED",
    "Omni-Nest Investor",
    "ODIN_CLIENT_SETUP_MULTIUSER",
    "ARI_TRADE_MANAGER",
    "ODIN_ADMIN_SETUP",
    "Omni-Nest Client",
  ],
  Form_download: ["ODIN_HELP_FILE", "ODIN_DEMO_HELP"],
  Other_software: ["LINK1", "LINK2", "LINK3", "LINK4", "Falcon", "Now"],
};

// same reusable circle
const circleClass = (active) =>
  `w-4 h-4 min-w-[16px] min-h-[16px] rounded-full border flex items-center justify-center cursor-pointer transition-all
   ${active ? "bg-[#34b350] border-[#34b350]" : "border-gray-400"}`;

export default function Download() {
  const [open, setOpen] = useState({});
  const [selected, setSelected] = useState({});

  const toggle = (item) => {
    setOpen((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const toggleFile = (file) => {
    setSelected((prev) => ({
      ...prev,
      [file]: !prev[file],
    }));
  };

  return (
    <div className="flex flex-wrap gap-20 pt-8 mt-8 relative z-10">

      {Object.keys(downloadData).map((category) => (
        <div key={category} className="w-[220px]">

          {/* CATEGORY */}
          <div className="flex items-center gap-3 cursor-pointer">

            <div
              onClick={() => toggle(category)}
              className={circleClass(open[category])}
            >
              {open[category] && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>

            <span className="text-green-600 font-medium">
              {category.replaceAll("_", " ")}
            </span>
          </div>

          {/* FILE LIST */}
          <div
            className={`ml-6 mt-3 transition-all duration-300 overflow-hidden
            ${open[category] ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="space-y-3">

              {downloadData[category].map((file, i) => (
                <div key={i} className="flex items-center gap-3">

                  {/* vertical line (tree feel) */}
                  <div className="w-[1px] h-5 bg-gray-300"></div>

                  {/* circle */}
                  <div
                    onClick={() => toggleFile(file)}
                    className={circleClass(selected[file])}
                  >
                    {selected[file] && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  {/* file */}
                  <span className="text-gray-700 text-sm cursor-pointer hover:text-black">
                    {file}
                  </span>

                </div>
              ))}

            </div>
          </div>

        </div>
      ))}

    </div>
  );
}