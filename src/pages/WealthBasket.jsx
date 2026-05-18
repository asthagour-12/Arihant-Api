import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo-arihant-capital.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "../Header.jsx";

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

export default function WealthBasket() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* MAIN CONTENT */}
      <div className="p-4 pt-11">

        {/* -------- TABS -------- */}
        <div className="bg-white rounded-lg shadow-sm p-4 w-full mt-10">
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
                className={`pb-3 text-base whitespace-nowrap leading-tight tracking-tight no-underline cursor-pointer ${tab === "Wealth Basket"
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
              href="https://download.arihantcapital.com/client/Arihant%20Deseo%20wealth%20basket.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline text-blue-600 no-underline"
            >
              Arihant Wealth Basket
            </a>
            <a
              href="https://download.arihantcapital.com/account/170520250317451991745.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline text-blue-600 no-underline"
            >
              Value Stock
            </a>
          </div>

          {/* INFO */}
          <div className="flex items-center gap-4 my-10 justify-center">
            <div className="w-32 border-t"></div>
            <p className="text-base text-gray-600 text-center flex-1">
              What we mean when we say -{" "}
              <b>(Z)</b>: Zone, <b>(R)</b>: Region, <b>(Br)</b>: Branch,{" "}
              <b>(AP)</b>: Authorized Person/Sub Broker
            </p>
            <div className="w-32 border-t"></div>
          </div>

          {/* PRODUCT CARD */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Arihant Product
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-sm">
              <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Official Website
              </a>
              <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Demat your MF Units
              </a>
              <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Insta Options
              </a>
              <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Trade Bridge
              </a>
              <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Value Stocks
              </a>
              <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                Stock Stack
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}