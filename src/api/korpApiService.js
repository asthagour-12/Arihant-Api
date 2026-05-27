import axios from "axios";

// Primary instance for korpapuatapi
const korpInstance = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1",
  withCredentials: true,
});

// Secondary instance for apuatapi (SSO/Admin/Login)
const ssoInstance = axios.create({
  baseURL: "https://apuatapi.arihantcapital.com/api/V1",
  withCredentials: true,
});

// ── 🛡️ INTERCEPTORS (Shared Logic) ────────────────────────────────────────────

const attachInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("connect_token");
    if (token && token !== "undefined" && token !== "null" && token.trim() !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use(
    (response) => {
      const data = response.data;
      if (data && data.success === false && (data.message === "invalid token" || data.message?.toLowerCase().includes("token"))) {
        // TEMPORARILY COMMENTED OUT REDIRECT:
        // localStorage.removeItem("connect_token");
        // localStorage.removeItem("connect_manager");
        // window.location.href = "/login";
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // TEMPORARILY COMMENTED OUT REDIRECT:
        // localStorage.removeItem("connect_token");
        // localStorage.removeItem("connect_manager");
        // window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

attachInterceptors(korpInstance);
attachInterceptors(ssoInstance);

// ── 🔑 AUTHENTICATION APIs ──────────────────────────────────────────────────

export const korpLogin = (data) => ssoInstance.post("/login", data);
export const korpSendOtp = (mobileNumber) => korpInstance.post("/sendotp", { mobileNumber });
export const korpValidateOtp = (data) => korpInstance.post("/validatingotp", data);
export const korpResendOtp = () => korpInstance.get("/resentOtp");
export const korpCheckUsername = (data) => ssoInstance.post("/checkUsername", data);

// ── 📊 REPORTS APIs ──────────────────────────────────────────────────────────

export const getClientLedger = (searchTerm) => korpInstance.get(`/reports/korpgetclientledger?Search=${searchTerm}`);
export const getHoldingReport = (params) => korpInstance.get("/reports/KorpHoldingReport", {
  params,
  paramsSerializer: {
    serialize: (params) => {
      return Object.entries(params)
        .filter(([_, val]) => val !== null && val !== undefined)
        .map(([key, val]) => `${key}=${encodeURIComponent(val).replace(/%2F/g, '/')}`)
        .join('&');
    }
  }
});
export const getFreeHoldingsData = (params) => {
  return korpInstance.get("/reports/KorpHoldingReport", {
    params,
    paramsSerializer: {
      serialize: (params) => {
        return Object.entries(params)
          .filter(([_, val]) => val !== null && val !== undefined)
          .map(([key, val]) => `${key}=${encodeURIComponent(val).replace(/%2F/g, '/')}`)
          .join('&');
      }
    }
  });
};
export const getOpenPositionData = (params) =>
  korpInstance.get("/reports/getKorpFOholding", { params });
export const getGlobalPositionReport = (clientCode) => korpInstance.get("/reports/KorpglobalPositionReport", { params: { clientCode } });
export const getFOGlobalPositionReport = (clientCode) => korpInstance.get("/reports/KorpFoGlobalPosition", { params: { clientCode } });
export const getClientMIS = (params) => korpInstance.get("/reports/korpgetclientmis", { params });
export const getTrialBalance = (params) => korpInstance.get("/reports/korpgettrialbalance", { params });
export const getContractNote = (params) => korpInstance.get("/reports/KorpContractNote", { params });
export const getBrokerageClientWise = (params) => korpInstance.get("/reports/korpgetbrokerageclientwise", { params });
export const getBrokerageDateWise = (params) => korpInstance.get("/reports/korpgetbrokeragedatewise", { params });
// New endpoints for third party and research reports
export const getThirdPartyReport = (params) => korpInstance.post("/reports/GetThirdPartyReport", {}, { params });
export const getResearchCallReportAP = (params) => korpInstance.post("/reports/ResearchCallReportAP", {}, { params });
export const getDPSlip = (params) => korpInstance.post("/reports/KorpdpSlip", {}, { params });
export const getClientPortfolio = (params = {}, body = {}) => korpInstance.post("/reports/GetClientPortpolio", body, { params });
export const getResearchCalls = (type) => korpInstance.get("/reports/getResearchCallDisplay", { params: { SearchType: type } });
export const getOneClickEarlyPaying = (clientCode) => korpInstance.get("/reports/OneClickEarlypaying", { params: { clientCode } });
export const getMfPerformanceReport = (clientCode) => korpInstance.get("/reports/korpgetMfPerformanceReport", { params: { clientCode } });
export const getMobileLoginData = (params) => {
  const { pageNumber, size, ...body } = params;
  return korpInstance.post("/reports/GetmobLoginTradedDate", body, {
    params: { pageNumber, size }
  });
};
export const getBranchLedger = (clientCode, pageNumber = 0, size = 50) =>
  korpInstance.post(`/reports/korpBranchLedger`, {}, {
    params: { size, pageNumber, ClientCode: clientCode }
  });
export const getCertificate = (params) => {
  const { pageNumber, size, ...body } = params;
  return korpInstance.post("/reports/GetCertificate", body, {
    params: { pageNumber, size }
  });
};
export const getMarkrtingMaterialFiles = (params) => {
  const { pageNumber, size, ...body } = params;
  return korpInstance.post("/reports/GetMarkrtingMaterialFiles", body, {
    params: { pageNumber, size }
  });
};

// ── 🏢 DASHBOARD & ADMIN APIs ───────────────────────────────────────────────

export const getDashboardData = async () => {
  try {
    const response = await korpInstance.get(
      "/dashboard/korpgetdashboarddata"
    );

    console.log("Dashboard API Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("Dashboard API Error:", error.response?.data);
    console.error("Status Code:", error.response?.status);
    throw error;
  }
};
export const getClientDetailByType = (clientCode, type) => korpInstance.get("/dashboard/korpgetclientDetail", { params: { clientCode, Type: type } });
export const getUserProfile = () => korpInstance.get("/dashboard/getprofile");
// Auditor profile endpoints
export const getAuditorProfile = () => getUserProfile();
export const getAuditorMe = () => korpInstance.get("/auditor/me");
export const getAdminSubbrokerCount = () => korpInstance.get("/AdminDashboard/getAdminsubbrokerclientcount");
export const getTopPerformedBrokers = (type) => ssoInstance.get("/AdminDashboard/getTopPerformedBrk", { params: { SearchType: type } });
export const getAdminDashboardDetails = (code) => ssoInstance.get("/AdminDashboard/getrespadmindashboardsubrokerDetails", { params: { subbrokerCode: code } });
export const getBranchPerformanceAdmin = (params) => korpInstance.get("/AdminDashboard/korpBranchPerformanceReportAdmin", { params });
// Branch performance (public reports endpoint)
export const getBranchPerformance = (params) => korpInstance.get("/reports/korpBranchPerformanceReport", { params });
export const getMISReportAdmin = (clientCode) => korpInstance.get("/AdminDashboard/korpClientMisReport1", { params: { clientCode } });
export const getUserLoginCount = (userType) => korpInstance.get("/AdminDashboard/getUserLoginCount", { params: { userType } });
export const getClickEventReport = (eventType) => korpInstance.get("/AdminDashboard/korpClickEventReport", { params: { eventType } });

// ── 💰 PAYOUT APIs ──────────────────────────────────────────────────────────

export const getClientBalance = (clientCode) => korpInstance.get("/payout/korpgetclientBalance", { params: { clientCode } });
export const payoutRequest = (data) => korpInstance.post("/payout/payoutrequest", data);
export const getPayoutRequestReport = (params = {}) => korpInstance.get("/payout/korpgetpayoutrequestreport", { params });
export const cancelPayoutRequest = (params = {}, body = {}) => korpInstance.post("/payout/getPayOutCancelData", body, { params });
export const bulkUploadPayout = (data) => korpInstance.post("/payout/payoutrequestbulk", data);
export const mtfRequest = (data) => korpInstance.post("/payout/mtfrequest", data);

// ── 🏢 ZONE & RO APIs ───────────────────────────────────────────────────────

export const getZoneDashboard = () => korpInstance.get("/dashboard/korpZonedashboarddata");
export const getRODashboard = (data) => korpInstance.post("/KorpRO/RoDashboard", data);
export const getCustomZoneAccountOpen = (zoneCode) => korpInstance.get("/dashboard/korpCustomZoneAccountopen", { params: { zoneCode } });
export const getCustomZoneBrokerage = (params) => korpInstance.get("/dashboard/korpCustomZoneBrokerage", { params });
export const getCustomZoneHolding = (zoneCode) => korpInstance.get("/reports/KorpCustomZoneHoldingReport", { params: { zoneCode } });
export const getCustomZoneDashboard = () => korpInstance.get("/dashboard/korpCustomZonedashboarddata");
export const getROClientDetail = (params) => ssoInstance.get("/ROReport/getclientDetailRO", { params });
export const getROBranchBrokerage = (data) => korpInstance.post("/KorpRO/RoBranchWiseBrokerage", data);
export const getROAccountOpening = (data) => korpInstance.post("/KorpRO/RoAccountOpening", data);
export const getRORevenueReport = (roCode) => ssoInstance.get("/ROReport/getRORevenueReport", { params: { roCode } });

// ── 📦 THIRD PARTY & IPO APIs ────────────────────────────────────────────────

export const getIPOList = (type) => korpInstance.get("/AdminDashboard/korpGetBranchZoneRoSymbol", { params: { ipoType: type } });
export const getBranchZoneRoSymbolBranch = (params = {}) => korpInstance.get("/AdminDashboard/korpGetBranchZoneRoSymbolBranch", { params });
export const getIPOBiddingData = (params) => korpInstance.get("/AdminDashboard/korpIpoDataBidding", { params });
export const getMfReport = (params = {}, body = {}) => korpInstance.post("/ThirdpartyAdmin/reports/MfAp", body, { params });
export const getSgbReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/SgbAp", data);
export const getBondsReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/BondsAp", data);
export const getMfAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/MfAdmin", data);
export const getSgbAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/SgbAdmin", data);
export const getBondsAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/BondsAdmin", data);
export const getSipRejections = (params = {}, body = {}) => korpInstance.post("/MF/reports/SipRejection", body, { params });
export const getMfMandates = (params = {}, body = {}) => korpInstance.post("/MF/reports/MfMandate", body, { params });

// ── 📞 COMMUNICATION & CALLING APIs ──────────────────────────────────────────

export const sendMailCzone = (data) => korpInstance.post("/reports/sendmailForCzone", data);
export const getInactiveClickToCall = (params = {}, body = {}) => korpInstance.post("/reports/GetInActiveClicktoCall", body, { params });
export const getInactiveFollowupData = (params = {}, body = {}) => korpInstance.post("/reports/GetInActiveFollowupData", body, { params });
export const saveFollowupData = (data) => korpInstance.post("/reports/SaveInActiveClientDate", data);
export const sendWhatsApp = (data) => korpInstance.post("/reports/SendWhatsAppInActiveClient", data);
export const getSamparkClientLog = (params = {}) => korpInstance.post("/sampark/samparkclientlog", null, { params });
export const updateCallingRemark = (data) => korpInstance.post("/DailyCalling/CallingList", data);

// ── 🛠️ MISC & COMPLIANCE APIs ────────────────────────────────────────────────

export const getKRAClientData = () => korpInstance.get("/reports/getKRAClientData");
export const getNomineeNotDone = (params = {}) => korpInstance.get("/reports/getNomineenotdoneDetails", { params });
export const getKRAHold = () => korpInstance.get("/reports/GetKRAHOLD");
export const getPhysicalModification = (params = {}) => korpInstance.get("/reports/GetPhysicalModification", { params });
export const getPhysicalAccountOpening = (params = {}) => korpInstance.get("/reports/GetPhysicalAccountOpening", { params });
export const getRekycModification = (params = {}) => korpInstance.get("/reports/Rekycmodificationlist", { params });
export const getComplianceFiles = (params = {}) => {
  const { pageNumber, size, SearchType, Search, ...body } = params;
  return korpInstance.post("/ComplianceCircular/CircularList", body, {
    params: { pageNumber, size, SearchType, Search }
  });
};
export const getAriTradeFileUpload = () => korpInstance.get("/reports/GetAriTradeFileUpload");
export const getMarketDataFiles = (type) => korpInstance.get("/reports/getMarketDatafiles", { params: { fileType: type } });
export const getPnlFileDownload = (date) => korpInstance.get("/reports/GetPnlFileDownload", { params: { date } });
export const getAsperoBond = (data) => korpInstance.post("/reports/GetAsperoBond", data);
export const saveAsperoBond = (data) => korpInstance.post("/reports/SaveAsperoBond", data);

// ── 📈 RMS & MARGIN APIs ─────────────────────────────────────────────────────

export const getOverAllCashReport = (data) => korpInstance.post("/reports/OverAllCashReport", data);
export const getOverAllFNOReport = (data) => korpInstance.post("/reports/OverAllFNOReport", data);
export const getClientPositionCash = (data) => korpInstance.post("/reports/ClientPositionCash", data);
export const getClientPositionFNO = (data) => korpInstance.post("/reports/ClientPositionFNO", data);
export const getCombinePeakMargin = (params) => {
  const { pageNumber, size, ...body } = params;
  return korpInstance.post("/reports/CombinePeakMargin", body, {
    params: { pageNumber, size }
  });
};
export const getRealtimeMargin = (data) => korpInstance.post("/reports/RealtimrMargin", data);
export const getMTFBalance = (clientCode) => korpInstance.get("/mtf/korpgetclientmtfBalance", { params: { clientCode } });

// ── 🆕 NEWLY ADDED UAT APIs ──────────────────────────────────────────────────
export const getClientList = (params) => korpInstance.get("/reports/getclientlist", { params });
export const getKRAData = (params) => korpInstance.get("/reports/getKRAData", { params });
export const getKRADataNew = (params) => korpInstance.get("/reports/getKRADataNew", { params });
export const getComplianceFolder = () => korpInstance.get("/reports/getCompliancefolder");
export const getFTPDirectory = (params) => korpInstance.get("/FTP/FTPDirectory", { params });
export const getFTPDirectoryFiles = (params) => korpInstance.get("/FTP/FTPDirectoryFiles", { params });
export const getFTPFile1 = (params) => korpInstance.get("/FTP/getftpFile1", { params });
export const getAlgoBrokerage = (params = {}) => {
  return axios.get("https://korpapuatapi.arihantcapital.com/api/V1/AdminDashboard/korpIAlgoBrokerage", { params });
};
export const getMfStructure = (params = {}, body = {}) => korpInstance.post("/reports/GetMfStructure", body, { params });
export const getTipsOnBondOfferData = (data = {}) => korpInstance.post("/reports/TipsonBondOfferData", data);
export const getClientContactDetails = (params = {}) => {
  return axios.get("https://korpapuatapi.arihantcapital.com/api/V1/AdminDashboard/korpClientContactDetails", { params });
};
export const getClientPayoutBalance = (params = {}) => korpInstance.get("/payout/korpgetclientBalance", { params });

// Re-activation clients (supports optional datefrom/dateto, pageNumber, size)
// Some backends expect POST with querystring rather than JSON body.
export const getReActivationClient = (params = {}) => korpInstance.post("/reports/GetReActivationClient", null, { params });

export default korpInstance;
