import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Calendar, Wifi, User, Folder } from "lucide-react";
import Header from "./Header.jsx";
import "@fortawesome/fontawesome-free/css/all.css";

// Internal VideoCard component converted to Tailwind
const VideoCard = () => {
  const [play, setPlay] = useState(false);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_3px_12px_rgba(0,0,0,0.1)] relative">
      {!play ? (
        <div className="w-full h-full relative cursor-pointer group" onClick={() => setPlay(true)}>
          <img
            src="https://img.youtube.com/vi/67CeWgOOIPU/maxresdefault.jpg"
            alt="video thumbnail"
            className="w-full h-full object-cover"
          />
          {/* YouTube Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[68px] h-[48px] bg-black/80 group-hover:bg-[#FF0000] rounded-[12px] flex items-center justify-center transition-all duration-300 shadow-xl">
              <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      ) : (
        <iframe
          className="w-full h-full border-none block"
          src="https://www.youtube.com/embed/67CeWgOOIPU?autoplay=1"
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value }) => {
  const [hidden, setHidden] = useState(true);

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <i className={`${icon} text-[#34b350] text-[18px]`}></i>;
    } else {
      const Icon = icon;
      return <Icon size={18} />;
    }
  };

  return (
    <div className="flex items-center gap-3 p-[15px] bg-[#f9f9f9] rounded-md border border-[#e0e0e0]">
      <div className="flex items-center justify-center w-10 h-10 bg-white text-[#34b350] rounded-md text-[18px] shadow-sm">
        {renderIcon()}
      </div>

      <div className="flex-1">
        <p className="m-0 mb-1.5 text-[13px] text-gray-600 font-medium">{label}</p>
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-sm font-semibold text-gray-800">{hidden ? "XXXXXX" : value}</span>
          <button 
            onClick={() => setHidden(!hidden)}
            className="bg-transparent border-none cursor-pointer text-gray-500 p-0.5 rounded transition-colors hover:bg-gray-200"
          >
            {hidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();

  const services = [
    { name: "KORP SSO", href: "https://uatbo.arihantcapital.com/Home/DashBoard" },
    { name: "RM/Subbroker EKYC", href: "http://ekyc-admin-test.s3-website.ap-south-1.amazonaws.com/sso/?branchCode=AP05&sessionID=806483125" },
    { name: "Sampark", href: "#" },
    { name: "IPO Details", href: "https://www.arihantcapital.com/invest-in-ipo" },
    { name: "Apply Mutual Funds", href: "#" },
    { name: "Cheque Receipt", href: "https://inwardbeta.arihantcapital.com/BGEntries.aspx?id=0" },
    { name: "Mutual Fund Details", href: "https://www.arihantcapital.com/invest-in-mutual-funds" },
    { name: "Margin Calculator", href: "http://www.arihantcapital.com/margin-calculator" },
    { name: "Forms and Applications", href: "https://www.arihantcapital.com/application-forms" },
    { name: "Apply NPS New Account", href: "https://mynps.nsdl.com/myNPS/NationalPensionSystem.html?appType=main&authId=ak5pN0hOaTNKaVZwOTFnVjcxY0l2Zz09" },
    { name: "Apply NPS Invest More", href: "#" },
    { name: "Social Media", href: "#" }
  ];

  return (
    <div className="bg-[#f1f1f1] min-h-screen font-sans">
      <Header />

      {/* Sub Header */}
      <div className="bg-white px-[15px] py-[10px] text-sm flex items-center gap-2 mt-[60px]">
        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
        <span className="text-gray-700 font-medium tracking-tight">MP21 &gt; ARIHANT PLUS</span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[15px] p-[15px]">
        {[
          { label: "Total Branch", value: "10" },
          { label: "Total Clients", value: "15,596" },
          { label: "Active Clients", value: "11,594" },
          { label: "Traded Clients", value: "1,587" },
          { label: "Inactive Clients", value: "4,002" },
        ].map((card, idx) => (
          <div 
            key={idx}
            className="bg-white p-4 rounded-xl text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] w-full cursor-pointer flex flex-col justify-center transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="m-0 text-gray-900 text-lg font-black">{card.value}</h2>
            <p className="m-0 mt-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
          </div>
        ))}
      </div>

      {/* New Revenue Dashboard Component */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] m-[15px] border border-gray-50">
        <h2 className="m-0 mb-5 text-[18px] text-gray-800 font-black uppercase tracking-tight">My revenue details</h2>
        
        {/* Horizontal Divider Line */}
        <div className="my-6 border-t border-gray-100"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[15px]">
          <StatItem icon={Calendar} label="YTD Revenue" value="5,20,000" />
          <StatItem icon={Wifi} label="YTD Traded Clients" value="120" />
          <StatItem icon="fa fa-suitcase" label="MTD Revenue" value="80,000" />
          <StatItem icon={User} label="MTD Traded Clients" value="25" />
          <StatItem icon={Folder} label="MTD Clients Acquired" value="18" />
        </div>
      </div>

      {/* Slider + Video Section */}
      <div className="px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Carousel Section */}
          <div className="w-full lg:w-[65%] my-auto">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner rounded-3xl overflow-hidden shadow-2xl h-[330px] border border-gray-100">
                {[
                  "480920250448563074856",
                  "42092025054204790424",
                  "360920250536464153646",
                  "370920250537151493715",
                  "550920250455229795522",
                  "380920250538105403810",
                  "380920250538366803836",
                  "380920250538598053859",
                  "370920250537324933732"
                ].map((id, idx) => (
                  <div key={idx} className={`carousel-item h-full ${idx === 0 ? "active" : ""}`}>
                    <img 
                      src={`https://download.arihantcapital.com/account/${id}.jpg`} 
                      className="block w-full h-full object-cover"
                      alt={`Slide ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="w-full lg:w-[35%] h-[330px]">
             <VideoCard />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px] p-[15px] pb-10">
        {services.map((service, idx) => (
          <a 
            key={idx}
            href={service.href}
            target={service.href !== "#" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="group bg-white p-[15px] rounded-lg flex items-center justify-center gap-3 cursor-pointer shadow-[0_2px_5px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:bg-[#f3fff5] hover:shadow-xl border border-gray-50 hover:border-green-100 no-underline active:scale-95"
          >
            <span className="text-[14px] font-bold text-[#4ade80] group-hover:text-[#22c55e] transition-colors">{service.name}</span>
            <span className="text-[#34b350] font-black text-lg group-hover:translate-x-1 transition-transform">{'>'}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;