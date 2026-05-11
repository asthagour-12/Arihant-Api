import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] border-t border-[#e9ecef] mt-auto font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif] overflow-x-hidden w-full">
      {/* Bottom Orange Line Divider */}
      <div className="h-[1px] bg-[#ff8c00] w-full mt-5 mb-0"></div>

      <div className="w-full max-w-[90%] mx-auto py-8 px-8 box-border overflow-x-hidden">
        {/* Four Column Layout */}
        <div className="flex justify-between gap-8 mb-8 w-full flex-wrap">
          {/* Column 1: Product */}
          <div className="min-w-[200px] box-border transition-transform duration-300 hover:-translate-y-0.5 flex-1">
            <h3 className="text-black text-base font-semibold mb-4 uppercase tracking-wider">Product</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Equity</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Mutual Funds & SIP</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">NPS</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Fixed Income</a></li>
            </ul>
          </div>

          {/* Column 2: MEDIA CENTER */}
          <div className="min-w-[200px] box-border transition-transform duration-300 hover:-translate-y-0.5 flex-1">
            <h3 className="text-black text-base font-semibold mb-4 uppercase tracking-wider">MEDIA CENTER</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">About Us</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Investor Relations</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Media Center</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Press Releases</a></li>
            </ul>
          </div>

          {/* Column 3: OTHER LINKS */}
          <div className="min-w-[200px] box-border transition-transform duration-300 hover:-translate-y-0.5 flex-1">
            <h3 className="text-black text-base font-semibold mb-4 uppercase tracking-wider">OTHER LINKS</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Connect With Us On */}
          <div className="min-w-[200px] box-border transition-transform duration-300 hover:-translate-y-0.5 flex-1">
            <h3 className="text-black text-base font-semibold mb-4 uppercase tracking-wider">Connect With Us On</h3>
            <ul className="list-none p-0 m-0 space-y-2">
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Support</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Fund Transfer</a></li>
              <li><a href="#" className="text-gray-500 no-underline text-base leading-6 transition-colors duration-300 hover:text-black">Partner with us</a></li>
            </ul>

            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              {[
                { label: "Facebook", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                { label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" },
              ].map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  className="flex items-center justify-center w-9 h-9 bg-white border border-gray-200 rounded-full text-[#2e7d32] transition-all duration-300 hover:bg-[#2e7d32] hover:text-white"
                  aria-label={icon.label}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Important Links with Dividers */}
        <div className="my-8">
          <div className="h-[1px] border-t border-dashed border-gray-400 w-full"></div>
          <div className="text-left py-1.5 px-0 m-0">
            <span className="text-gray-500 text-[12px]">
              Important Links | <a href="#" className="no-underline font-bold transition-colors duration-300 hover:text-[#1b5e20] text-gray-500">BSE</a> | <a href="#" className="no-underline font-bold transition-colors duration-300 hover:text-[#1b5e20] text-gray-500">NSE</a> | <a href="#" className="no-underline font-bold transition-colors duration-300 hover:text-[#1b5e20] text-gray-500">SEBI</a>
            </span>
          </div>
          <div className="h-[1px] border-t border-dashed border-gray-400 w-full"></div>
        </div>

        {/* Investor Alert */}
        <div className="mt-4">
          <div className="bg-transparent border-none p-1.5 text-[#1b5e20] w-full overflow-visible whitespace-normal">
            <div className="relative">
              <marquee behavior="scroll" direction="left" onMouseOver={(e) => e.target.stop()} onMouseOut={(e) => e.target.start()} scrollDelay="150">
                <span className="text-[#656465] text-[14px]">
                  <strong>Investor Alert:-</strong> conducting appropriate analysis of respective companies and not to blindly follow unfounded rumors, tips etc. Further, you are also requested to share your
                </span>
              </marquee>
            </div>
          </div>

          {/* Attention Investors */}
          <div className="mt-8">
            <span className="text-[#28a745] font-semibold text-sm mb-4 block no-underline border-b-2 border-[#28a745] pb-0.5 w-fit">ATTENTION INVESTORS</span>
            <ul className="list-none p-0 m-0 space-y-2">
              {[
                "KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (Broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.",
                "For Stock Broking Transaction 'Prevent unauthorised transactions in your account - Update your mobile numbers/email IDs with your stock brokers. Receive information of your transactions directly from Exchange on your mobile/email at the end of the day...Issued in the interest of Investors'",
                "For Depository Transactio 'Prevent Unauthorized Transactions in your demat account - Update your Mobile Number with your Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from CDSL/NSDL on the same day...Issued in the interest of investors",
                "No need to issue cheques y investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investor's account.",
                "Investors should be cautious on unsolicited emails and SMS advising to buy, sell or hold securities and trade only on the basis of informed decision. Investors are advised to invest after conducting appropriate analysis of respective companies and not to blindly follow unfounded rumours, tips etc. Further, you are also requested to share your knowledge or evidence of systemic wrongdoing, potential frauds or unethical behaviour through the anonymous portal facility provided on BSE & NSE website."
              ].map((text, i) => (
                <li key={i} className="text-[#555] text-[11.2px] leading-6 pl-4 relative before:content-['•'] before:absolute before:left-0 before:font-bold">
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2">
              <p className="text-[#555] text-[11.2px] leading-relaxed">Arihant group companies are registered broker and dealer. SEBI Registration number for NSE & BSE :- INZ000180939; NSDL - IN-DP-127-2015 DP ID-IN301983; CDSL DP ID-43000;NCDEX - 01274; MCX - 56565; AMFI - ARN 15114; SEBI Merchant Banking Regn. No. - MB INM 000011070; SEBI Research Analyst Regn. No. - INH000002764. Please carefully read the risk disclosure document as prescribed by SEBI and Do’s & Don’ts by NSE, BSE,NCDEX & MCX. Existing customers can send in their grievances to compliance@arihantcapital.com. and for DP related queries & Complaints please write us to depository@arihantcapital.com If you want to register your complaints through SEBI Score Portal please Click here.</p>
              <p className="text-[#555] text-[11.2px] leading-relaxed">ARIHANT CAPITAL IFSC LIMITED | SEBI Regid. No. : INZ000157539 <br /> Address: Unit No. 424, 4th Floor, The Signature Building, Block 13B, Road 1C, Zone 1, GIFT SEZ, GIFT City, Gandhinagar, Gujarat - 382355.</p>
              <p className="text-[#555] text-[11.2px] leading-relaxed">Disclaimer: Arihant Capital Markets Limited is engaged in client based and proprietary trading on various exchanges. Arihant Capital IFSC Limited is engaged in proprietary trading in NSE IFSC Stock Exchange and India INX Stock Exchange.</p>
              <p className="text-[#555] text-[11.2px] leading-relaxed">#1011 Solitaire Corporate Park, Andheri Ghatkopar Link Road, Chakala, Andheri (E), Mumbai - 4000093. Email: <span className="font-medium">customersupport@arihantcapital.com</span>, Tel: <span className="font-medium">0731-4217003</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
