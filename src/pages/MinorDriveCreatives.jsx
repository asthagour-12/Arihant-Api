import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";

function MinorDriveCreatives() {
  const [activeTab, setActiveTab] = useState("creatives");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen pt-[60px]">
      <Header />

      {/* CONTENT WRAPPER */}
      <div className="bg-white p-6 rounded-md shadow-md border mx-6 mt-6">

        {/* Tabs */}
        <div className="flex gap-8 bg-white px-6 py-4 rounded-t-md text-[14px] border mt-1">
          <Link to="/contests" className="text-gray-600 cursor-pointer">
            Contest
          </Link>

          <Link to="/contests-data" className="text-gray-600 cursor-pointer">
            Contest Data
          </Link>

          <span
            onClick={() => setActiveTab("creatives")}
            className={`cursor-pointer pb-2 ${
              activeTab === "creatives"
                ? "border-b-2 border-green-500 font-semibold text-black"
                : "text-gray-500"
            }`}
          >
            Minor Drive Creatives
          </span>

          <Link 
            to="/contests-video"
            className="text-gray-600 cursor-pointer"
          >
            Contest Video
          </Link>
        </div>

        {/* Content */}
        {activeTab === "creatives" && (
          <div className="bg-white border border-gray-200 rounded-b-md p-6">
            <h2 className="text-xl font-bold mb-4">Minor Drive Creatives</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Summer Campaign Banner</h3>
                <p className="text-sm text-gray-600 mb-3">Promotional banner for summer trading contest</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Social Media Post</h3>
                <p className="text-sm text-gray-600 mb-3">Instagram and Facebook creative for minor drive</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">WhatsApp Creative</h3>
                <p className="text-sm text-gray-600 mb-3">Shareable creative for WhatsApp promotion</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Email Template</h3>
                <p className="text-sm text-gray-600 mb-3">Email marketing template for minor drive campaign</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Poster Design</h3>
                <p className="text-sm text-gray-600 mb-3">Print-ready poster for branch display</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="bg-gray-200 h-32 rounded mb-3 flex items-center justify-center">
                  <i className="fa fa-image text-gray-400 text-3xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Video Thumbnail</h3>
                <p className="text-sm text-gray-600 mb-3">YouTube thumbnail for contest promotion video</p>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                    Download
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      <ArihantProductsSection />

    </div>
  );
}

export default MinorDriveCreatives;
