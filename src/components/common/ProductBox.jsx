import React from 'react';

const ProductBox = () => {
  const products = [
    { label: "Official Website", url: "https://www.arihantcapital.com/" },
    { label: "Demat your MF Units", url: "https://eservices.nsdl.com/cas-stmt-mf-conv/#/login" },
    { label: "Insta Options", url: "https://instaoptions.arihantplus.com/login" },
    { label: "Trade Bridge", url: "https://tradebridge.arihantplus.com/signup" },
    { label: "Value Stocks", url: "https://arihantplus.valuestocks.in/" },
    { label: "Stock Stack", url: "https://tradebridge.arihantplus.com/sso/login?api_key=IBOFTIrFIx1AYBWz0a&source=DESEO" }
  ];

  return (
    <div className="mt-8 bg-white border border-gray-200 p-8 shadow-none">
      <div className="text-[18px] font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">Arihant Product</div>
      <div className="flex flex-wrap justify-between gap-6">
        {products.map(p => (
          <a 
            key={p.label} 
            href={p.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#1EB04C] font-medium text-[13px] hover:underline transition-all"
          >
            {p.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductBox;
