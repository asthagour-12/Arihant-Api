import axios from "axios";

// Primary instance for korpapuatapi
const korpInstance = axios.create({
  baseURL: "https://korpapuatapi.arihantcapital.com/api/V1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Secondary instance for apuatapi (SSO/Admin/Login)
const ssoInstance = axios.create({
  baseURL: "https://apuatapi.arihantcapital.com/api/V1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ── 🛡️ INTERCEPTORS (Shared Logic) ────────────────────────────────────────────

const attachInterceptors = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("connect_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, (error) => Promise.reject(error));

  instance.interceptors.response.use(
    (response) => {
      const data = response.data;
      if (data && data.success === false && (data.message === "invalid token" || data.message?.toLowerCase().includes("token"))) {
        localStorage.removeItem("connect_token");
        localStorage.removeItem("connect_manager");
        window.location.href = "/login";
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("connect_token");
        localStorage.removeItem("connect_manager");
        window.location.href = "/login";
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
export const getHoldingReport = (params) => korpInstance.get("/reports/KorpHoldingReport", { params });
export const getGlobalPositionReport = (clientCode) => korpInstance.get("/reports/KorpglobalPositionReport", { params: { clientCode } });
export const getFOGlobalPositionReport = (clientCode) => korpInstance.get("/reports/KorpFoGlobalPosition", { params: { clientCode } });
export const getClientMIS = (params) => korpInstance.get("/reports/korpgetclientmis", { params });
export const getTrialBalance = (params) => korpInstance.get("/reports/korpgettrialbalance", { params });
export const getContractNote = (params) => korpInstance.get("/reports/KorpContractNote", { params });
export const getBrokerageClientWise = (params) => korpInstance.get("/reports/korpgetbrokerageclientwise", { params });
export const getBrokerageDateWise = (params) => korpInstance.get("/reports/korpgetbrokeragedatewise", { params });
export const getDPSlip = (params) => korpInstance.post("/reports/KorpdpSlip", params);
export const getClientPortfolio = (data) => korpInstance.post("/reports/GetClientPortpolio", data);
export const getResearchCalls = (type) => korpInstance.get("/reports/getResearchCallDisplay", { params: { SearchType: type } });
export const getOneClickEarlyPaying = (clientCode) => korpInstance.get("/reports/OneClickEarlypaying", { params: { clientCode } });
export const getMfPerformanceReport = (clientCode) => korpInstance.get("/reports/korpgetMfPerformanceReport", { params: { clientCode } });

// ── 🏢 DASHBOARD & ADMIN APIs ───────────────────────────────────────────────

export const getDashboardData = async (clientCode = "AP2100001") => {
  try {
    const response = await korpInstance.get(
      "/dashboard/getdashboarddata",
      {
        params: {
          Search: clientCode
        }
      }
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
export const getAdminSubbrokerCount = () => korpInstance.get("/AdminDashboard/getAdminsubbrokerclientcount");
export const getTopPerformedBrokers = (type) => ssoInstance.get("/AdminDashboard/getTopPerformedBrk", { params: { SearchType: type } });
export const getAdminDashboardDetails = (code) => ssoInstance.get("/AdminDashboard/getrespadmindashboardsubrokerDetails", { params: { subbrokerCode: code } });
export const getBranchPerformanceAdmin = (params) => korpInstance.get("/AdminDashboard/korpBranchPerformanceReportAdmin", { params });
export const getMISReportAdmin = (clientCode) => korpInstance.get("/AdminDashboard/korpClientMisReport1", { params: { clientCode } });
export const getUserLoginCount = (userType) => korpInstance.get("/AdminDashboard/getUserLoginCount", { params: { userType } });
export const getClickEventReport = (eventType) => korpInstance.get("/AdminDashboard/korpClickEventReport", { params: { eventType } });

// ── 💰 PAYOUT APIs ──────────────────────────────────────────────────────────

export const getClientBalance = (clientCode) => korpInstance.get("/payout/korpgetclientBalance", { params: { clientCode } });
export const payoutRequest = (data) => korpInstance.post("/payout/payoutrequest", data);
export const getPayoutRequestReport = (clientCode) => korpInstance.get("/payout/korpgetpayoutrequestreport", { params: { clientCode } });
export const cancelPayoutRequest = (data) => korpInstance.post("/payout/getPayOutCancelData", data);
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
export const getIPOBiddingData = (params) => korpInstance.get("/AdminDashboard/korpIpoDataBidding", { params });
export const getMfReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/MfAp", data);
export const getSgbReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/SgbAp", data);
export const getBondsReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/BondsAp", data);
export const getMfAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/MfAdmin", data);
export const getSgbAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/SgbAdmin", data);
export const getBondsAdminReport = (data) => korpInstance.post("/ThirdpartyAdmin/reports/BondsAdmin", data);
export const getSipRejections = (data) => korpInstance.post("/MF/reports/SipRejection", data);
export const getMfMandates = (data) => korpInstance.post("/MF/reports/MfMandate", data);

// ── 📞 COMMUNICATION & CALLING APIs ──────────────────────────────────────────

export const sendMailCzone = (data) => korpInstance.post("/reports/sendmailForCzone", data);
export const getInactiveClickToCall = (data) => korpInstance.post("/reports/GetInActiveClicktoCall", data);
export const saveFollowupData = (data) => korpInstance.post("/reports/SaveInActiveClientDate", data);
export const sendWhatsApp = (data) => korpInstance.post("/reports/SendWhatsAppInActiveClient", data);
export const getSamparkClientLog = (data) => korpInstance.post("/sampark/samparkclientlog", data);
export const updateCallingRemark = (data) => korpInstance.post("/DailyCalling/CallingList", data);

// ── 🛠️ MISC & COMPLIANCE APIs ────────────────────────────────────────────────

export const getKRAClientData = () => korpInstance.get("/reports/getKRAClientData");
export const getNomineeNotDone = () => korpInstance.get("/reports/getNomineenotdoneDetails");
export const getKRAHold = () => korpInstance.get("/reports/GetKRAHOLD");
export const getPhysicalModification = (status) => korpInstance.get("/reports/GetPhysicalModification", { params: { status } });
export const getPhysicalAccountOpening = (status) => korpInstance.get("/reports/GetPhysicalAccountOpening", { params: { status } });
export const getRekycModification = (status) => korpInstance.get("/reports/Rekycmodificationlist", { params: { status } });
export const getComplianceFiles = () => korpInstance.get("/reports/getCompliancefiles");
export const getMarketDataFiles = (type) => korpInstance.get("/reports/getMarketDatafiles", { params: { fileType: type } });
export const getPnlFileDownload = (date) => korpInstance.get("/reports/GetPnlFileDownload", { params: { date } });
export const getAsperoBond = (data) => korpInstance.post("/reports/GetAsperoBond", data);
export const saveAsperoBond = (data) => korpInstance.post("/reports/SaveAsperoBond", data);

// ── 📈 RMS & MARGIN APIs ─────────────────────────────────────────────────────

export const getOverAllCashReport = (data) => korpInstance.post("/reports/OverAllCashReport", data);
export const getOverAllFNOReport = (data) => korpInstance.post("/reports/OverAllFNOReport", data);
export const getClientPositionCash = (data) => korpInstance.post("/reports/ClientPositionCash", data);
export const getClientPositionFNO = (data) => korpInstance.post("/reports/ClientPositionFNO", data);
export const getCombinePeakMargin = (data) => korpInstance.post("/reports/CombinePeakMargin", data);
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

export default korpInstance;
