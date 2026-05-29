import React from "react";

export default function ArihantProductsSection() {
  return (
    <div className="py-6 mt-8">
      <div className="max-w-[1700px] mx-auto px-4">


        {/* INFO / LEGEND */}
        <div className="flex items-center gap-4 my-10 justify-center">
          <div className="w-32 border-t border-gray-200"></div>
          <p className="text-base text-gray-600 text-center flex-none">
            What we mean when we say -{" "}
            <b>(Z)</b>: Zone, <b>(R)</b>: Region, <b>(Br)</b>: Branch,{" "}
            <b>(AP)</b>: Authorized Person/Sub Broker
          </p>
          <div className="w-32 border-t border-gray-200"></div>
        </div>

        {/* PRODUCT CARD */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 border-b pb-4">
            Arihant Product
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-[15px]">
            <a href="https://www.arihantcapital.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Official Website
            </a>
            <a href="https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Demat your MF Units
            </a>
            <a href="https://instaoptions.arihantplus.com/login" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Insta Options
            </a>
            <a href="https://tradebridge.arihantplus.com/signup" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Trade Bridge
            </a>
            <a href="https://arihantplus.valuestocks.in/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Value Stocks
            </a>
            <a href="https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-medium hover:underline flex items-center gap-2 transition-all">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Stock Stack
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
