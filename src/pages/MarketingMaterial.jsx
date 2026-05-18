import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ComplianceCertificate from "./ComplianceCertificate.jsx";
import ComplianceCircular from "./ComplianceCircular.jsx";
import Download from "./Download.jsx";
import Training from "./Training.jsx";
import { ToastContainer, toast } from "react-toastify";
import ArihantProductsSection from "./ArihantProducts";
import "react-toastify/dist/ReactToastify.css";

export default function MarketingMaterial() {
  const [activeTab, setActiveTab] = useState("Marketing Material");
  const [activeSubTab, setActiveSubTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState({});
  const [selected, setSelected] = useState({});

  const tabs = [
    "Marketing Material",
    "Compliance Certificate",
    "Compliance Circular",
    "Download",
    "Training",
  ];

  const data = {
    Posters: [
      "Wealth_Poster_(1).pdf",
      "MBD_Poster_(1).pdf",
      "Mobile_App_Poster_(1).pdf",
      "PMS_Poster_(1).pdf",
      "Research_Posters_(1).pdf",
      "Aplus_Mobile_App_A3_Poster.pdf",
      "ArihantPlus_One_Pager_Nov_2025.pdf",
      "ACML_One_Page_Nov_2025.pdf",
      "AIF_Poster_(1).pdf",
      "IMA_Magazine_Final_Ad_A4_2026.pdf"
    ],

    Logos: [
      "Arihant_Capital_Logo_green.pdf",
      "Arihant_Capital_Logo.pdf",
      "Arihant_Logo_2x1.5_ft.pdf",
      "Arihant_Plus_Logo_2_x_4.pdf",
      "Arihant_Plus_Logo.pdf",
      "AC_Back_Drop__8_X_8_ET_Now.pdf"
    ],

    Brochures: [
      "AC_Corporate_Brochure_summary_18032026.pdf",
      "AC_MF_TP_Wealth_Brochure_-_18032026.pdf",
      "AC_Corporate_Brochure_Detail_110426.pdf",
      "Sip_Arihant_-_Flyer.pdf",
      "B2B_Arihant_-_Flyer.pdf",
      "Corporate_Arihant_-_Flyer.pdf"
    ],

    Standee: [
      "Warren_Buffett_3x6_ft.pdf",
      "AC_Mobile_App_Trading_Made_Smarter.pdf",
      "AP_Mobile_APP_Get_Ready_3_X_6.pdf",
      "Mobile_App_Cutout_3.5x7_inch_02.pdf",
      "PMS_Electrum_3X6.pdf",
      "Podium_2.5x4_Ft..pdf",
      "Product_&_Services_Standee_3x6_Ft_(1).pdf",
      "Research_Posters_4_x_5.pdf",
      "Wealth_Poster_4_X_5.pdf",
      "AIF_Standee_3x6_Ft.pdf",
      "MBD_Standee_3x6_Ft.pdf",
      "Mobile_App_Poster_4_X_5.pdf",
      "AIFE_Standee_Design_3x6_ft.pdf"
    ],

    Others: [
      "AC_Photo_Booth_Block_10x10_ft.pdf",
      "AC_Photo_Booth_Mobile_cutout.pdf",
      "AP_Photo_Booth_Mobile_Cutout.pdf",
      "Arihant_Plus_QR_Mobile_App_Download.pdf",
      "Visiting_Card.pdf"
    ],

    PPT: [
      "Algo_Trading_PPT.pdf",
      "Fixed_Income_&_Other_Product_PPT.pdf",
      "Research_Product_PPT.pdf",
      "Wealth_Basket_&_Value_Stock_PPT.pdf",
      "Wealth_Drive_PPT.pdf"
    ],

    "Product Suit": [
      "Product_Suite_March_2026.pdf",
      "HNI_-_Product_Suite_Mar_2026.pdf",
      "HNI_-_Product_Suite_April_2026_(1).pdf",
      "Product_Suite_April_2026.pdf"
    ]
  };

  const toggleCategory = (cat) => {
    setOpen((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const toggleFile = (file) => {
    setSelected((prev) => ({
      ...prev,
      [file]: !prev[file],
    }));
  };

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please upload file first", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    toast.success("File uploaded successfully");
  };

  return (
    <>
      <div className="bg-white min-h-screen pt-[60px]">
        <Header />

        {/* CONTENT WRAPPER */}
        <div className="bg-white p-6 rounded-md shadow-md border mx-6 mt-6">
          {/* TABS */}
          <div className="flex gap-8 border-b pb-2 text-lg font-semibold">
            {tabs.map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 cursor-pointer relative z-10 ${activeTab === tab
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Compliance Certificate Sub-tabs - Second Line */}
          {activeTab === "Compliance Certificate" && (
            <div className="flex gap-8 pt-4 text-lg font-semibold border-b pb-2">
              <span
                className={`cursor-pointer pb-2 relative z-10 ${activeSubTab === "certificate"
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
                onClick={() => setActiveSubTab("certificate")}
              >
                Certificate
              </span>

              <span
                className={`cursor-pointer pb-2 relative z-10 ${activeSubTab === "upload"
                    ? "border-b-4 border-green-600 text-black"
                    : "text-gray-400 hover:text-black"
                  }`}
                onClick={() => setActiveSubTab("upload")}
              >
                Upload Certificate
              </span>
            </div>
          )}

          {/* CONTENT */}
          {activeTab === "Marketing Material" && (
            <div className="mt-6">
              {/* HORIZONTAL LAYOUT */}
              <div className="flex flex-wrap gap-10">
                {Object.keys(data).map((category) => (
                  <div key={category} className="w-[200px]">

                    {/* CATEGORY */}
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center
                        ${open[category]
                            ? "bg-[#34b350] border-[#34b350]"
                            : "border-gray-400"
                          }`}
                      >
                        {open[category] && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>

                      <span className="font-medium text-gray-800">
                        {category}
                      </span>
                    </div>

                    {/* FILE LIST */}
                    <div
                      className={`ml-6 mt-3 transition-all duration-300 overflow-hidden
                      ${open[category]
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                        }`}
                    >
                      {data[category].map((file, i) => (
                        <div key={i} className="flex items-center gap-3 mt-2">
                          <div
                            onClick={() => toggleFile(file)}
                            className={`w-4 h-4 rounded-full border flex items-center justify-center cursor-pointer
                            ${selected[file]
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-400"
                              }`}
                          >
                            {selected[file] && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>

                          <a
                            href={`https://intranet.arihantcapital.com/Files/ConnectFile/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline cursor-pointer no-underline"
                          >
                            {file}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Compliance Certificate" && (
            <div className="mt-6">
              {/* UPLOAD SECTION */}
              {activeSubTab === "upload" && (
                <div>

                  {/* LABEL */}
                  <label className="block text-sm font-medium mb-2">
                    Upload File
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="border rounded-md px-4 py-3 bg-gray-50 flex items-center gap-3">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-green-500 to-green-700 
                      hover:from-green-600 hover:to-green-800 
                      text-white px-8 py-3 rounded-full font-semibold 
                      shadow-md hover:shadow-xl 
                      transition-all duration-300 
                      flex items-center gap-2 active:scale-95"
                    >
                      SUBMIT
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* CERTIFICATE SECTION */}
              {activeSubTab === "certificate" && (
                <div className="w-full h-2">
                  {/* Certificate content area */}
                </div>
              )}
            </div>
          )}

          {activeTab === "Compliance Circular" && (
            <ComplianceCircular />
          )}

          {activeTab === "Download" && (
            <Download />
          )}

          {activeTab === "Training" && (
            <Training />
          )}
        </div>

        <ArihantProductsSection />
      </div>

      <ToastContainer />
    </>
  );
}