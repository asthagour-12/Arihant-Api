import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

const ThirdPartyHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
      <div className="flex gap-10 border-b overflow-x-auto w-full no-scrollbar">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline transition-all ${isActive
                ? "border-b-2 border-green-600 text-black font-medium"
                : "text-gray-600 font-medium hover:text-black"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ThirdPartyHeader;
