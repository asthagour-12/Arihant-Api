import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import ArihantProductsSection from "./ArihantProducts";

const tabs = [
  "Algo Brokerage",
  "Mutual Fund",
  "Rejection",
  "Mandate",
  "Product Deck",
  "MF Structure & Brokerage",
  "Wealth Basket",
  "SIP Revenue Calculator",
  "Bonds",
];

export default function ProductDeck() {
  const navigate = useNavigate();

  return (
    <>
      {/* HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <div className="p-4 pt-[60px]">

        {/* -------- TABS -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-4">
          <div className="flex gap-10 border-b overflow-x-auto w-full">
            {tabs.map((tab, i) => (
              <div
                key={i}
                onClick={() => navigate(tab === "Algo Brokerage" ? "/algo-brokerage" :
                  tab === "Mutual Fund" ? "/mutual-fund" :
                    tab === "Rejection" ? "/rejection" :
                      tab === "Mandate" ? "/mandate" :
                        tab === "Product Deck" ? "/product-deck" :
                          tab === "MF Structure & Brokerage" ? "/mf-structure" :
                            tab === "Wealth Basket" ? "/wealth-basket" :
                              tab === "SIP Revenue Calculator" ? "/sip-calculator" :
                                tab === "Bonds" ? "/bonds" : "/")}
                className={`pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline cursor-pointer ${tab === "Product Deck"
                  ? "border-b-2 border-green-600 text-black font-medium"
                  : "text-gray-600 font-medium hover:text-black"
                  }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* SUB LINKS */}
          <div className="flex gap-10 mt-6 text-blue-600 text-sm font-medium">
            <a
              href="https://download.arihantcapital.com/account/222520250322389892238.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline text-blue-600 no-underline"
            >
              product Deck
            </a>

          </div>

          </div>

        </div>

        <ArihantProductsSection />
      </>
    );
  }