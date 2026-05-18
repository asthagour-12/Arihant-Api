import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../logo-arihant-capital.png';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  const tabs = [
    { name: "Algo Brokerage", path: "/algo-brokerage" },
    { name: "Mutual Fund", path: "/mutual-fund" },
    { name: "Rejection", path: "/rejection" },
    { name: "Mandate", path: "/mandate" },
    { name: "Product Deck", path: "/product-deck" },
    { name: "MF Structure & Brokerage", path: "/mf-structure" },
    { name: "Wealth Basket", path: "/wealth-basket" },
    { name: "SIP Revenue Calculator", path: "/sip-calculator" },
    { name: "Bonds", path: "/bonds" }
  ];

  return (
    <>
      {/* Header Section */}
      <div className="topbar">
        <div className="left">
          <img src={logo} alt="logo" className="logo" />
          <div className="menu">
            <span onClick={() => navigate("/dashboard")}>Dashboard</span>
            <span>Reports</span>
            <span>Account Opening</span>
            <span>Download</span>
            <span className="active">Research call</span>
            <span onClick={() => navigate("/dealslip")}>Deal Slip</span>
            <span>Third Party</span>
            <span onClick={() => navigate("/contests")} className="cursor-pointer hover:underline">contests</span>
            <span 
              onClick={() => navigate("/profile")}
              className="cursor-pointer hover:text-black"
            >
              Profile<sup className="beta-badge">BETA</sup>
            </span>
            <span onClick={() => navigate("/clicktocall")}>Click To Call</span>
            <span onClick={() => navigate("/payout")}>Payout</span>
          </div>
        </div>

        <div className="right">
          <span className="user-icon">
            <i className="fa-solid fa-user text-white"></i>
            <i className="fa fa-chevron-down fa-2xs text-white"></i>
          </span>
        </div>
      </div>

      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab) => (
              <span
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className={`pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline cursor-pointer ${
                  tab.path === "/profile"
                    ? "border-b-2 border-green-600 text-black font-medium"
                    : "text-gray-600 font-medium hover:text-black"
                }`}
              >
                {tab.name}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

            {/* TAB CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* PERSONAL INFO */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91-9876543210"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
                    <input
                      type="text"
                      defaultValue="ABCDE1234F"
                      className="w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* ACCOUNT SETTINGS */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SMS Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Two-Factor Authentication</span>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                      Enable
                    </button>
                  </div>
                </div>
              </div>

              {/* SECURITY */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                
                <div className="space-y-4">
                  <button className="w-full text-left bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100">
                    <i className="fa fa-key mr-2"></i>
                    Change Password
                  </button>

                  <button className="w-full text-left bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100">
                    <i className="fa fa-shield-alt mr-2"></i>
                    Privacy Settings
                  </button>

                  <button className="w-full text-left bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100">
                    <i className="fa fa-download mr-2"></i>
                    Download My Data
                  </button>

                  <button className="w-full text-left bg-red-50 p-3 rounded-md border border-red-200 hover:bg-red-100 text-red-600">
                    <i className="fa fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
