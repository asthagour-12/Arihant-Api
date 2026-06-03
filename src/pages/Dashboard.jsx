import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Calendar, Wifi, User, Folder, Loader2, X } from "lucide-react";
import Header from "./Header";
import korpInstance, { getDashboardData, getClientDetailByType, getMobileLoginData, getUserProfile, sendOtpMasking } from "../api/korpApiService";
import { verifyOtp } from "../api/authApi";
import "@fortawesome/fontawesome-free/css/all.css";
import { toast as toastify } from "react-toastify";

// Internal VideoCard — auto-fetches latest video from Arihant Capital YouTube channel
const ARIHANT_CHANNEL_ID = "UCrPcG3wkHygflvEIMcb_I3Q"; // @arihant_plus verified channel ID
const FALLBACK_VIDEO_ID = "67CeWgOOIPU";

// Vite dev proxy — /api/youtube-rss → https://www.youtube.com/feeds/videos.xml (server-side, no CORS)
// In production, configure your backend to proxy this route.

// Regex-based extraction — avoids all XML namespace issues
const extractVideoIdFromText = (xmlText) => {
  // <yt:videoId>VIDEO_ID</yt:videoId>
  const match = xmlText.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
  if (match) return match[1].trim();
  // Fallback: yt:video:VIDEO_ID inside <id> tag
  const idMatch = xmlText.match(/<id>yt:video:([^<]+)<\/id>/);
  if (idMatch) return idMatch[1].trim();
  return null;
};

const extractTitleFromText = (xmlText) => {
  // First <title> inside an <entry>
  const entryMatch = xmlText.match(/<entry[\s\S]*?<title>([^<]+)<\/title>/);
  if (entryMatch) return entryMatch[1].trim();
  return "";
};

const VideoCard = () => {
  const [play, setPlay] = useState(false);
  const [videoId, setVideoId] = useState(FALLBACK_VIDEO_ID);
  const [videoTitle, setVideoTitle] = useState("");
  const [loadingVid, setLoadingVid] = useState(true);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        // Uses Vite server proxy — no CORS issues
        const res = await fetch(
          `/api/youtube-rss?channel_id=${ARIHANT_CHANNEL_ID}`,
          { signal: AbortSignal.timeout(8000) }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const xmlText = await res.text();
        const id = extractVideoIdFromText(xmlText);
        const title = extractTitleFromText(xmlText);
        if (id && id.length >= 8) {
          setVideoId(id);
          setVideoTitle(title);
        }
      } catch (e) {
        console.warn("[VideoCard] YouTube RSS fetch failed, using fallback:", e.message);
      } finally {
        setLoadingVid(false);
      }
    };
    fetchLatestVideo();
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden bg-white shadow-[0_3px_12px_rgba(0,0,0,0.1)] relative">
      {!play ? (
        <div className="w-full h-full relative cursor-pointer group" onClick={() => setPlay(true)}>
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="video thumbnail"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
          />
          {/* Shimmer while loading */}
          {loadingVid && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          {/* Latest badge */}
          <div className="absolute top-3 left-3 bg-[#FF0000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow">
            Latest
          </div>
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[68px] h-[48px] bg-black/80 group-hover:bg-[#FF0000] rounded-[12px] flex items-center justify-center transition-all duration-300 shadow-xl">
              <div className="w-0 h-0 border-l-[18px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"></div>
            </div>
          </div>
          {/* Video title */}
          {videoTitle && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-white text-xs font-medium line-clamp-2 leading-tight">{videoTitle}</p>
            </div>
          )}
        </div>
      ) : (
        <iframe
          className="w-full h-full border-none block"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={videoTitle || "YouTube video"}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value, onEyeClick, isRevealed }) => {
  const renderIcon = () => {
    if (typeof icon === "string") {
      return <i className={`${icon} text-[#34b350] text-[18px]`}></i>;
    } else {
      const Icon = icon;
      return <Icon size={18} />;
    }
  };

  // Render the value or masked placeholder
  const displayValue = isRevealed ? value : "XXXXX";

  return (
    <div className="flex items-center gap-3 p-[15px] bg-[#f9f9f9] rounded-md border border-[#e0e0e0] flex-1 min-w-[140px]">
      <div className="flex items-center justify-center text-[#34b350] text-[18px]">
        {renderIcon()}
      </div>

      <div className="flex-1">
        <p className="m-0 mb-1.5 text-[13px] text-gray-600 font-medium">{label}</p>
        <div className="flex items-center justify-between gap-2.5">
          <span className="text-sm font-semibold text-gray-800">{displayValue}</span>
          {/* Eye toggle */}
          <button
            type="button"
            onClick={onEyeClick}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            {isRevealed ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();

  // OTP States
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [otp, setOtp] = useState("");
  const [isRevealed, setIsRevealed] = useState(() => {
    return sessionStorage.getItem("revenue_verified") === "true";
  });
  const [resendTimer, setResendTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [dashboardMetrics, setDashboardMetrics] = useState(() => {
    const saved = sessionStorage.getItem("dashboard_metrics");
    return saved ? JSON.parse(saved) : {
      newClient: "0",
      totalClients: "0",
      activeClients: "0",
      totalAppLogin: "0",
      inactiveClients: "0"
    };
  });
  const [revenueData, setRevenueData] = useState(() => {
    const saved = sessionStorage.getItem("revenue_data");
    return saved ? JSON.parse(saved) : {
      ytdRevenue: "0",
      ytdClientsAcquired: "0",
      ytdTradedClients: "0",
      mtdRevenue: "0",
      mtdTradedClients: "0",
      mtdClientsAcquired: "0",
      todayTurnover: "0"
    };
  });

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Clear stale sessionStorage cache
        sessionStorage.removeItem("dashboard_metrics");
        sessionStorage.removeItem("revenue_data");

        const [dashRes] = await Promise.allSettled([
          getDashboardData(),
          getUserProfile()
        ]);

        // NOTE: getDashboardData() already returns response.data from korpApiService
        // API response: { success, message, result: { ACTIVE_CLIENT, TOTAL_CLIENT, ... } }
        if (dashRes.status === "fulfilled" && dashRes.value) {
          const raw = dashRes.value;
          const data = Array.isArray(raw.result) ? raw.result[0] : (raw.result || raw.data || raw || {});

          console.log("Dashboard parsed data:", data);

          // ✅ CORRECT API KEYS from actual response
          const nextMetrics = {
            newClient: String(data.NEW_CLIENT ?? "0"),
            totalClients: String(data.TOTAL_CLIENT ?? "0"),
            activeClients: String(data.ACTIVE_CLIENT ?? "0"),
            totalAppLogin: String(data.TOTALAPPLOGIN_Client ?? "0"),
            inactiveClients: String(data.INACTIVE_CLIENT ?? "0")
          };
          setDashboardMetrics(nextMetrics);
          sessionStorage.setItem("dashboard_metrics", JSON.stringify(nextMetrics));

          // ✅ CORRECT revenue keys
          const nextRevenue = {
            ytdRevenue: String(data.YTD_revenue ?? "0"),
            ytdClientsAcquired: String(data.YTD_Client_Aquired ?? "0"),
            ytdTradedClients: String(data.YTD_Client ?? "0"),
            mtdRevenue: String(data.MTD_revenue ?? "0"),
            mtdTradedClients: String(data.MTD_Client ?? "0"),
            mtdClientsAcquired: String(data.MTD_Client_Aquired ?? "0"),
            todayTurnover: String(data.TODAY_TURNOVER ?? "0")
          };
          setRevenueData(nextRevenue);
          sessionStorage.setItem("revenue_data", JSON.stringify(nextRevenue));
        }

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const slides = [
    "480920250448563074856",
    "42092025054204790424",
    "360920250536464153646",
    "370920250537151493715",
    "550920250455229795522",
    "380920250538105403810",
    "380920250538366803836",
    "380920250538598053859",
    "370920250537324933732"
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Extend slides for infinite loop: [Last Slide, ...Slides, First Slide]
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (showOtpModal && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, resendTimer]);

  const handleNext = () => {
    if (currentIndex >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(slides.length);
    }
  };

  const handleEyeClick = async () => {
    if (isRevealed) {
      setIsRevealed(false);
      sessionStorage.removeItem("revenue_verified");
      return;
    }

    setShowOtpModal(true);
    setResendTimer(120);
    setCanResend(false);
    setOtp("");

    try {
      const branchCode = localStorage.getItem("branchCode");
      // Use masking-specific OTP endpoint
      const response = await sendOtpMasking(branchCode);

      if (response?.data?.success) {
        const csrf = response?.data?.result?.CsrfToken || "";
        setCsrfToken(csrf);
        setToast({
          show: true,
          type: "success",
          message: "OTP sent to your registered mobile number",
        });
      } else {
        throw new Error(response?.data?.message || "Failed to send OTP");
      }
    } catch (err) {
      setToast({
        show: true,
        type: "error",
        message: err.message || "Failed to send OTP",
      });
    } finally {
      setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
    }
  };

  // OTP Submit Handler
  const handleSubmitOtp = async () => {
    if (otp.length !== 6) {
      setToast({ show: true, type: "error", message: "Enter 6-digit OTP" });
      return;
    }

    // Static OTP bypass for testing/demo environment
    if (otp === "986764") {
      setShowOtpModal(false);
      setIsRevealed(true);
      sessionStorage.setItem("revenue_verified", "true");
      setOtp("");
      setToast({ show: true, type: "success", message: "OTP Verified Successfully!" });
      return;
    }

    try {
      setLoading(true);
      const branchCode = localStorage.getItem("branchCode");

      const response = await verifyOtp(branchCode, otp, csrfToken);

      if (response?.data?.success) {
        setShowOtpModal(false);
        setIsRevealed(true);
        sessionStorage.setItem("revenue_verified", "true");
        setOtp("");
        setToast({ show: true, type: "success", message: "OTP Verified Successfully!" });
      } else {
        setToast({ show: true, type: "error", message: response?.data?.message || "Invalid OTP" });
      }
    } catch (err) {
      setToast({ show: true, type: "error", message: err?.response?.data?.message || "Verification Failed" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
    }
  };

  // Resend OTP Handler
  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      const branchCode = localStorage.getItem("branchCode");
      const response = await sendOtpMasking(branchCode);
      if (response?.data?.success) {
        const csrf = response?.data?.result?.CsrfToken || "";
        setCsrfToken(csrf);
        setToast({
          show: true,
          type: "success",
          message: "New OTP Sent Successfully!",
        });
        setResendTimer(120);
        setCanResend(false);
      } else {
        throw new Error(response?.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      setToast({
        show: true,
        type: "error",
        message: err.message || "Failed to resend OTP",
      });
    } finally {
      setTimeout(() => setToast({ show: false, type: "", message: "" }), 3000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="bg-[#f1f1f1] min-h-screen font-sans relative">
      <Header />

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[15px] p-[15px] mt-[60px]">
        {[
          { label: "Total Clients", value: dashboardMetrics.totalClients, path: "/total-client" },
          { label: "Active Clients", value: dashboardMetrics.activeClients, path: "/active-client" },
          { label: "New Client", value: dashboardMetrics.newClient, path: "/new-client" },
          { label: "Inactive Clients", value: dashboardMetrics.inactiveClients, path: "/inactive-client" },
          { label: "Total App Login", value: dashboardMetrics.totalAppLogin, path: "/client-code-list" },
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => card.path && navigate(card.path)}
            className="bg-white p-2.5 rounded-none text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] w-full max-w-[210px] mx-auto cursor-pointer flex flex-col justify-center transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <h2 className="m-0 text-gray-900 text-base font-normal">{card.value}</h2>
            <p className="m-0 mt-1 text-[9px] text-gray-400 font-bold uppercase tracking-widest">{card.label}</p>
          </div>
        ))}
      </div>

      {/* New Revenue Dashboard Component */}
      <div className="bg-white p-6 rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] m-[15px] border border-gray-50">
        <h2 className="m-0 mb-0.5 text-[15px] text-gray-800 font-normal uppercase tracking-tight">My revenue details</h2>

        {/* Horizontal Divider Line */}
        <div className="my-2 border-t border-gray-100"></div>

        <div className="flex flex-nowrap gap-[15px] overflow-x-auto pb-1">
          <StatItem icon={Calendar} label="YTD Revenue" value={revenueData.ytdRevenue} onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={Wifi} label="YTD Traded Clients" value={revenueData.ytdTradedClients} onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon="fa fa-suitcase" label="MTD Revenue" value={revenueData.mtdRevenue} onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={User} label="MTD Traded Clients" value={revenueData.mtdTradedClients} onEyeClick={handleEyeClick} isRevealed={isRevealed} />
          <StatItem icon={Folder} label="MTD Clients Acquired" value={revenueData.mtdClientsAcquired} onEyeClick={handleEyeClick} isRevealed={isRevealed} />
        </div>
      </div>

      {/* Slider + Video Section */}
      <div className="px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Carousel Section */}
          <div className="w-full lg:w-[65%] my-auto relative group">
            <div className="relative overflow-hidden shadow-2xl h-[380px] rounded-none border border-gray-100">
              <div
                className={`flex h-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedSlides.map((id, idx) => (
                  <div key={idx} className="min-w-full h-full relative">
                    <img
                      src={`https://download.arihantcapital.com/account/${id}.jpg`}
                      className="w-full h-full object-cover"
                      alt={`Slide ${idx + 1}`}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Controls - Transparent, Always Visible, and Smaller Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 text-white flex items-center justify-center transition-all opacity-75 hover:opacity-100 bg-transparent border-none cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xl drop-shadow-md"></i>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 text-white flex items-center justify-center transition-all opacity-75 hover:opacity-100 bg-transparent border-none cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-xl drop-shadow-md"></i>
              </button>

              {/* Minimal Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => {
                  let isActive = false;
                  if (currentIndex === 0) isActive = idx === slides.length - 1;
                  else if (currentIndex === extendedSlides.length - 1) isActive = idx === 0;
                  else isActive = idx === currentIndex - 1;

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setIsTransitioning(true);
                        setCurrentIndex(idx + 1);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${isActive ? "bg-white w-6" : "bg-white/50 w-1.5"}`}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="w-full lg:w-[35%] h-[380px]">
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
            <span className="text-[14px] font-bold text-black transition-colors">{service.name}</span>
            <span className="text-black font-black text-lg group-hover:translate-x-1 transition-transform">{'>'}</span>
          </a>
        ))}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 z-[2000] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-lg relative">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute right-5 top-5 text-gray-400 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>

            <div className="text-left px-2">
              <h2 className="text-[20px] font-semibold text-gray-800 mb-5">Please enter OTP</h2>

              <div className="mb-4">
                <label className="block text-[14px] text-gray-600 mb-1.5 font-medium">OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 6) setOtp(val);
                  }}
                  placeholder="Enter your 6-digit OTP"
                  className="w-full h-[44px] border border-gray-200 rounded-lg px-4 text-[14px] focus:border-[#34b350] outline-none transition-all placeholder:text-gray-300"
                  onKeyDown={(e) => e.key === "Enter" && handleSubmitOtp()}
                />
              </div>

              <div className="text-center mb-6">
                <p className="text-[13px] text-gray-500 mb-1">Resend OTP in {formatTime(resendTimer)}</p>
                <button
                  onClick={handleResendOtp}
                  className={`text-[13px] font-medium transition-colors ${canResend ? "text-[#34b350] cursor-pointer hover:underline" : "text-gray-300 cursor-default"}`}
                >
                  Resend OTP
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleSubmitOtp}
                  className="bg-[#34b350] text-white font-medium rounded-full px-12 h-[44px] text-[15px] hover:bg-[#2e9e47] transition-all shadow-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Popup */}
      {toast.show && (
        <div
          className={`fixed top-10 right-10 z-[3000] min-w-[300px] rounded-2xl px-6 py-4 shadow-2xl text-white animate-in slide-in-from-right duration-500
          ${toast.type === "error" ? "bg-pink-600" : "bg-green-500"}`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">{toast.type === "error" ? "Error" : "Success"}</h3>
              <p className="text-sm font-medium opacity-90">{toast.message}</p>
            </div>
            <div className="text-3xl font-black">
              {toast.type === "error" ? "⊘" : "✓"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;