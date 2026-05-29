import React, { useState } from "react";

const downloadData = {
  Daily_Update_File: [
    { name: "ODIN_Daily_Scrip_Master" },
    { name: "NSE_FO_MARGIN_FILE" },
    { name: "SPAN_FILE_FOR_ADMIN_TERMINAL" },
  ],
  Trading_Setup: [
    {
      name: "ODIN_DIET_SETUP_FOR_COMBINED",
      children: [
        { name: "ODIN SP21_FreshSetup-32Bit.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN SP21_FreshSetup-32Bit.zip" }
      ]
    },
    {
      name: "Omni-Nest Investor",
      children: [
        { name: "Nest Trader_3.19.1.254_Arihant_Investor_x64.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/Nest Trader_3.19.1.254_Arihant_Investor_x64.zip" }
      ]
    },
    {
      name: "ODIN_CLIENT_SETUP_MULTIUSER",
      children: [
        { name: "CLIENT 64BIT_SP24PLUS_BASE_Setup.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/CLIENT 64BIT_SP24PLUS_BASE_Setup.zip" },
        { name: "CLIENT 64BIT_SP24PLUS_MIGRATION_Setup.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/CLIENT 64BIT_SP24PLUS_MIGRATION_Setup.zip" }
      ]
    },
    {
      name: "ARI_TRADE_MANAGER",
      children: [
        { name: "AriTrade Manager-2016.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/AriTrade Manager-2016.zip" }
      ]
    },
    {
      name: "ODIN_ADMIN_SETUP",
      url: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_ADMIN_SETUP.zip"
    },
    {
      name: "Omni-Nest Client",
      children: [
        { name: "Nest Trader_3.19.1.254_Arihant_Dealer_x64.zip", url: "https://intranet.arihantcapital.com/Files/ConnectFile/Nest Trader_3.19.1.254_Arihant_Dealer_x64.zip" }
      ]
    }
  ],
  Form_download: [
    { name: "ODIN_HELP_FILE", url: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_HELP_FILE.pdf" },
    { name: "ODIN_DEMO_HELP", url: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_DEMO_HELP.pdf" }
  ],
  Other_software: [
    { name: "LINK1", url: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK1.zip" },
    { name: "LINK2", url: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK2.zip" },
    { name: "LINK3", url: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK3.zip" },
    { name: "LINK4", url: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK4.zip" },
    { name: "Falcon", url: "https://intranet.arihantcapital.com/Files/ConnectFile/Falcon.zip" },
    { name: "Now", url: "https://intranet.arihantcapital.com/Files/ConnectFile/Now.zip" },
    { name: "Other software", url: "https://intranet.arihantcapital.com/Files/ConnectFile/Other_software.zip" }
  ],
};

// same reusable circle
const circleClass = (active) =>
  `w-4 h-4 min-w-[16px] min-h-[16px] rounded-full border flex items-center justify-center cursor-pointer transition-all
   ${active ? "bg-[#34b350] border-[#34b350]" : "border-gray-400"}`;

export default function Download() {
  // Expanded by default to match screenshot exactly
  const [open, setOpen] = useState({
    Daily_Update_File: true,
    Trading_Setup: true,
    Form_download: true,
    Other_software: true,
    ODIN_DIET_SETUP_FOR_COMBINED: true,
    "Omni-Nest Investor": true,
    ODIN_CLIENT_SETUP_MULTIUSER: true,
    ARI_TRADE_MANAGER: true,
    "Omni-Nest Client": true
  });
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

  // Safe client-side direct download trigger
  const handleDirectDownload = (url, name) => {
    console.log("Triggering download for:", name, "from:", url);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-wrap gap-10 pt-8 mt-8 relative z-10">

      {Object.keys(downloadData).map((category) => (
        <div key={category} className="w-[320px] min-w-[320px]">

          {/* CATEGORY */}
          <div className="flex items-center gap-3 cursor-pointer relative">
            <div
              onClick={() => toggle(category)}
              className={circleClass(open[category])}
            >
              {open[category] && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>

            {/* Main vertical line start from category bullet */}
            {open[category] && (
              <div className="absolute left-[7px] top-[16px] w-[1px] h-6 bg-gray-300"></div>
            )}

            <span className="text-green-600 font-medium">
              {category.replaceAll("_", " ")}
            </span>
          </div>

          {/* FILE LIST CONTAINER */}
          <div
            className={`ml-2 mt-4 transition-all duration-300 overflow-hidden
            ${open[category] ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            <div className="pl-4 relative space-y-1">

              {downloadData[category].map((item, idx) => {
                const isLast = idx === downloadData[category].length - 1;
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = open[item.name];

                return (
                  <div key={idx} className="relative">
                    {/* Vertical connecting line segments for parent */}
                    <div className="absolute -left-4 top-0 w-[1px] h-1/2 bg-gray-300"></div>
                    {!isLast && <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>}
                    {hasChildren && isOpen && <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>}
                    
                    {/* Horizontal branch segment for parent */}
                    <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gray-300"></div>

                    {/* Parent row content */}
                    <div className="flex items-center gap-3 py-1">
                      <div
                        onClick={() => {
                          if (item.url) {
                            handleDirectDownload(item.url, item.name);
                          } else if (hasChildren) {
                            toggle(item.name);
                          } else {
                            toggleFile(item.name);
                          }
                        }}
                        className={circleClass(hasChildren ? isOpen : selected[item.name])}
                      >
                        {(hasChildren ? isOpen : selected[item.name]) && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      {item.url ? (
                        <span
                          onClick={() => handleDirectDownload(item.url, item.name)}
                          className="text-gray-700 text-sm cursor-pointer hover:text-black whitespace-nowrap hover:underline"
                        >
                          {item.name}
                        </span>
                      ) : (
                        <span className="text-gray-700 text-sm cursor-pointer hover:text-black whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </div>

                    {/* Children List */}
                    {hasChildren && (
                      <div
                        className={`pl-4 relative transition-all duration-300 overflow-hidden
                        ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
                        `}
                      >
                        {/* Parent vertical line extending down through child container offset */}
                        {isOpen && !isLast && (
                          <div className="absolute -left-4 top-0 w-[1px] h-full bg-gray-300"></div>
                        )}
                        {/* Connect down from parent bullet to the children container */}
                        {isOpen && (
                          <div className="absolute -left-4 -top-2 w-[1px] h-[10px] bg-gray-300"></div>
                        )}

                        {item.children.map((child, cIdx) => {
                          const isLastChild = cIdx === item.children.length - 1;
                          return (
                            <div key={cIdx} className="relative">
                              {/* Vertical connecting line segments for child */}
                              <div className="absolute -left-4 top-0 w-[1px] h-1/2 bg-gray-300"></div>
                              {!isLastChild && <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>}
                              
                              {/* Horizontal branch segment for child */}
                              <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gray-300"></div>

                              <div className="flex items-center gap-3 py-1">
                                <div
                                  onClick={() => handleDirectDownload(child.url, child.name)}
                                  className={circleClass(selected[child.name])}
                                >
                                  {selected[child.name] && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>
                                <span
                                  onClick={() => handleDirectDownload(child.url, child.name)}
                                  className="text-sky-500 font-bold text-sm cursor-pointer hover:underline whitespace-nowrap"
                                >
                                  {child.name}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      ))}

    </div>
  );
}