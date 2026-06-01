import React, { useState } from "react";
import axios from "axios";

const defaultRows = [
  {
    categoryName: "Daily Update File",
    fileDetail: [
      { FileName: "ODIN_Daily_Scrip_Master", URL: "#daily-scrip" },
      { FileName: "NSE_FO_MARGIN_FILE", URL: "#nse-margin" },
      { FileName: "SPAN_FILE_FOR_ADMIN_TERMINAL", URL: "#span-file" }
    ]
  },
  {
    categoryName: "Trading Setup",
    subcategory: [
      {
        subcategoryName: "ODIN_DIET_SETUP_FOR_COMBINED",
        fileDetail: [
          { FileName: "ODIN SP21_FreshSetup-32Bit.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/ODIN%20%20SP21_FreshSetup-32Bit.zip" }
        ]
      },
      {
        subcategoryName: "Omni-Nest Investor",
        fileDetail: [
          { FileName: "Nest Trader_3.19.1.254_Arihant_Investor_x64.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/Nest%20Trader_3.19.1.254_Arihant_Investor_x64.zip" }
        ]
      },
      {
        subcategoryName: "ODIN_CLIENT_SETUP_MULTIUSER",
        fileDetail: [
          { FileName: "CLIENT 64BIT_SP24PLUS_BASE_Setup.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/CLIENT%2064BIT_SP24PLUS_BASE_Setup.zip" },
          { FileName: "CLIENT 64BIT_SP24PLUS_MIGRATION_Setup.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/CLIENT%2064BIT_SP24PLUS_MIGRATION_Setup.zip" }
        ]
      },
      {
        subcategoryName: "ARI_TRADE_MANAGER",
        fileDetail: [
          { FileName: "AriTrade Manager-2016.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/AriTrade%20Manager-2016.zip" }
        ]
      },
      {
        subcategoryName: "ODIN_ADMIN_SETUP",
        fileDetail: [
          { FileName: "ODIN_ADMIN_SETUP.zip", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_ADMIN_SETUP.zip" }
        ]
      },
      {
        subcategoryName: "Omni-Nest Client",
        fileDetail: [
          { FileName: "Nest Trader_3.19.1.254_Arihant_Dealer_x64.zip", URL: "https://intranet.arihantcapital.com/Files/APconnect/Odin/Nest%20Trader_3.19.1.254_Arihant_Dealer_x64.zip" }
        ]
      }
    ]
  },
  {
    categoryName: "Form download",
    fileDetail: [
      { FileName: "ODIN_HELP_FILE", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_HELP_FILE.pdf" },
      { FileName: "ODIN_DEMO_HELP", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/ODIN_DEMO_HELP.pdf" }
    ]
  },
  {
    categoryName: "Other software",
    fileDetail: [
      { FileName: "LINK1", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK1.zip" },
      { FileName: "LINK2", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK2.zip" },
      { FileName: "LINK3", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK3.zip" },
      { FileName: "LINK4", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/LINK4.zip" },
      { FileName: "Falcon", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/Falcon.zip" },
      { FileName: "Now", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/Now.zip" },
      { FileName: "Other software", URL: "https://intranet.arihantcapital.com/Files/ConnectFile/Other_software.zip" }
    ]
  }
];

const circleClass = (active) =>
  `w-4 h-4 min-w-[16px] min-h-[16px] rounded-full border flex items-center justify-center cursor-pointer transition-all
   ${active ? "bg-[#34b350] border-[#34b350]" : "border-gray-400"}`;

const DownloadTree = ({ rows = [] }) => {
  const displayRows = rows && rows.length > 0 ? rows : defaultRows;

  const [openCat, setOpenCat] = useState({
    "Daily Update File": true,
    "Trading Setup": true,
    "Form download": true,
    "Other software": true
  });

  const [openSub, setOpenSub] = useState({
    "ODIN_DIET_SETUP_FOR_COMBINED": true,
    "Omni-Nest Investor": true,
    "ODIN_CLIENT_SETUP_MULTIUSER": true,
    "ARI_TRADE_MANAGER": true,
    "ODIN_ADMIN_SETUP": true,
    "Omni-Nest Client": true,
    "Help Files": true,
    "Other Utilities": true
  });

  const [selectedFiles, setSelectedFiles] = useState({});

  const toggleCategory = (catName) => {
    setOpenCat((prev) => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  const toggleSub = (subName) => {
    setOpenSub((prev) => ({
      ...prev,
      [subName]: !prev[subName]
    }));
  };

  const toggleFile = (fileName) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [fileName]: !prev[fileName]
    }));
  };

  return (
    <div className="flex flex-wrap gap-10 pt-0 mt-[-20px] relative z-10">
      {displayRows?.map((category, index) => (
        <div key={index} className="w-[320px] min-w-[320px]">
          {/* Category Header Row */}
          <div
            className="flex items-center gap-3 cursor-pointer relative"
            onClick={() => toggleCategory(category.categoryName)}
          >
            <div className={circleClass(openCat[category.categoryName])}>
              {openCat[category.categoryName] && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>

            <span className="text-green-600 font-medium">
              {category.categoryName}
            </span>

            {/* Category main connector line going down */}
            {openCat[category.categoryName] && (
              <div className="absolute left-[7px] top-[16px] w-[1px] h-6 bg-gray-300"></div>
            )}
          </div>

          {/* Subcategory/Files List Wrapper */}
          {openCat[category.categoryName] && (
            <div className="ml-2 mt-4 pl-4 relative space-y-1">
              {/* Category main vertical connector line */}
              <div className="absolute left-[-1px] top-0 w-[1px] h-full bg-gray-300"></div>

              {/* 1. Render Subcategories if they exist */}
              {category.subcategory?.map((sub, subIndex) => {
                const isLastSub = subIndex === category.subcategory.length - 1;
                const isOpen = openSub[sub.subcategoryName];

                return (
                  <div key={subIndex} className="relative">
                    {/* Vertical connecting line segments for subcategory */}
                    <div className="absolute -left-4 top-0 w-[1px] h-1/2 bg-gray-300"></div>
                    {!isLastSub && (
                      <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>
                    )}
                    {isOpen && (
                      <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>
                    )}

                    {/* Horizontal branch connector for subcategory */}
                    <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gray-300"></div>

                    {/* Subcategory Row */}
                    <div
                      className="flex items-center gap-3 py-1 cursor-pointer"
                      onClick={() => toggleSub(sub.subcategoryName)}
                    >
                      <div className={circleClass(isOpen)}>
                        {isOpen && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-700 text-sm">
                        {sub.subcategoryName}
                      </span>
                    </div>

                    {/* File Details Wrapper under Subcategory */}
                    {isOpen && (
                      <div className="pl-4 relative transition-all duration-300">
                        {/* Parent vertical line extending down through files */}
                        <div className="absolute -left-4 top-0 w-[1px] h-full bg-gray-300"></div>

                        {sub.fileDetail?.map((file, fileIndex) => {
                          const isLastFile = fileIndex === sub.fileDetail.length - 1;
                          const isSelected = selectedFiles[file.FileName];

                          return (
                            <div key={fileIndex} className="relative py-1">
                              {/* Vertical connecting line segments for file */}
                              <div className="absolute -left-4 top-0 w-[1px] h-1/2 bg-gray-300"></div>
                              {!isLastFile && (
                                <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>
                              )}

                              {/* Horizontal branch connector for file */}
                              <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gray-300"></div>

                              <div className="flex items-center gap-3">
                                {/* Bullet/circle checkbox for file */}
                                <div
                                  className={circleClass(isSelected)}
                                  onClick={() => toggleFile(file.FileName)}
                                >
                                  {isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                  )}
                                </div>

                                <a
                                  href={file.URL}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  onClick={(e) => {
                                    if (file.URL?.startsWith("#")) {
                                      e.preventDefault();
                                      axios.get("https://korpapuatapi.arihantcapital.com/api/V1/reports/GetAriTradeFileUpload", {
                                        headers: {
                                          Authorization: `Bearer ${localStorage.getItem("connect_token")}`
                                        }
                                      }).then((res) => console.log("UAT GET success:", res.data))
                                        .catch((err) => console.error("UAT GET error:", err));
                                    } else {
                                      // Explicitly trigger standard network hit to log in Network Tab under Fetch/XHR
                                      console.log("Explicitly hitting download URL:", file.URL);
                                      axios.get(file.URL)
                                        .then(() => console.log("Network hit success:", file.FileName))
                                        .catch((err) => console.warn("Background request hit logged (CORS warning expected):", err));
                                    }
                                  }}
                                  className={`text-sm no-underline hover:no-underline ${
                                    file.FileName?.endsWith(".zip")
                                      ? "text-sky-500 hover:text-sky-700 font-semibold"
                                      : "text-gray-600 hover:text-black"
                                  }`}
                                >
                                  {file.FileName}
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* 2. Render Files directly under Category if they exist */}
              {category.fileDetail?.map((file, fileIndex) => {
                const isLastFile = fileIndex === category.fileDetail.length - 1;
                const isSelected = selectedFiles[file.FileName];

                return (
                  <div key={fileIndex} className="relative py-1">
                    {/* Vertical connecting line segments for file */}
                    <div className="absolute -left-4 top-0 w-[1px] h-1/2 bg-gray-300"></div>
                    {!isLastFile && (
                      <div className="absolute -left-4 top-1/2 w-[1px] h-1/2 bg-gray-300"></div>
                    )}

                    {/* Horizontal branch connector for file */}
                    <div className="absolute -left-4 top-1/2 w-4 h-[1px] bg-gray-300"></div>

                    <div className="flex items-center gap-3">
                      {/* Bullet/circle checkbox for file */}
                      <div
                        className={circleClass(isSelected)}
                        onClick={() => toggleFile(file.FileName)}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      {category.categoryName === "Form download" || category.categoryName === "Other software" ? (
                        <span
                          className={`text-sm no-underline cursor-pointer ${
                            file.FileName?.endsWith(".zip")
                              ? "text-sky-500 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          {file.FileName}
                        </span>
                      ) : (
                        <a
                          href={file.URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          download
                          onClick={(e) => {
                            if (file.URL?.startsWith("#")) {
                              e.preventDefault();
                              axios.get("https://korpapuatapi.arihantcapital.com/api/V1/reports/GetAriTradeFileUpload", {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem("connect_token")}`
                                }
                              }).then((res) => console.log("UAT GET success:", res.data))
                                .catch((err) => console.error("UAT GET error:", err));
                            } else {
                              // Explicitly trigger standard network hit to log in Network Tab under Fetch/XHR
                              console.log("Explicitly hitting download URL:", file.URL);
                              axios.get(file.URL)
                                .then(() => console.log("Network hit success:", file.FileName))
                                .catch((err) => console.warn("Background request hit logged (CORS warning expected):", err));
                            }
                          }}
                          className={`text-sm no-underline hover:no-underline ${
                            file.FileName?.endsWith(".zip")
                              ? "text-sky-500 hover:text-sky-700 font-semibold"
                              : "text-gray-600 hover:text-black"
                          }`}
                        >
                          {file.FileName}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DownloadTree;