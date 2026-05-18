import axiosInstance from "./axiosInstance";

// ── Auth Helpers ──────────────────────────────────────────────────────────────
export const saveAuthData = (token, manager) => {
  localStorage.setItem("connect_token", token);
  localStorage.setItem("connect_manager", JSON.stringify(manager));
};
export const clearAuthData = () => {
  localStorage.removeItem("connect_token");
  localStorage.removeItem("connect_manager");
};
export const getManager = () => {
  try { return JSON.parse(localStorage.getItem("connect_manager")) || null; }
  catch { return null; }
};
export const isLoggedIn = () => !!localStorage.getItem("connect_token");

// ── 🔐 AUTH APIs ──────────────────────────────────────────────────────────────
// POST /api/auth/login
// Body: { manager_id: "BRAP21001" } — exactly 9 alphanumeric characters
// Response: { success, data: { manager_name, otp_dev_only } }
export const loginSendOTP = (manager_id) =>
  axiosInstance.post("/api/auth/login", { manager_id });

// POST /api/auth/verify-otp
// Body: { manager_id: "BRAP21001", otp: "123456" }
// Response: { success, data: { token, expires_in, manager: { manager_id, name, phone } } }
export const loginVerifyOTP = (manager_id, otp) =>
  axiosInstance.post("/api/auth/verify-otp", { manager_id, otp });

// POST /api/auth/resend-otp
// Body: { manager_id: "BRAP21001" }
// Error 429: { success: false, message: "Wait X seconds", remainingSeconds: 24 }
export const resendOTP = (manager_id) =>
  axiosInstance.post("/api/auth/resend-otp", { manager_id });

// POST /api/reports/brokerage/send-otp
export const brokerageSendOTP = (manager_id) =>
  axiosInstance.post("/api/reports/brokerage/send-otp", { manager_id });

// POST /api/reports/brokerage/verify-otp
export const brokerageVerifyOTP = (manager_id, otp) =>
  axiosInstance.post("/api/reports/brokerage/verify-otp", { manager_id, otp });

// ── 📊 DASHBOARD API ──────────────────────────────────────────────────────────
export const getDashboardStats = (clientCode = "AP2100001") =>
  axiosInstance.get("/dashboard/getdashboarddata", { params: { Search: clientCode } });

export const getProfile = () =>
  axiosInstance.get("/dashboard/getprofile");

export const getKorpZoneDashboardData = () =>
  axiosInstance.get("/dashboard/korpZonedashboarddata");

export const getKorpClientDetail = (params = {}) =>
  axiosInstance.get("/dashboard/korpgetclientDetail", { params });

export const getClients = (params = {}) => {
  let type = "TC";
  if (params.status === "active") type = "AC";
  if (params.status === "inactive") type = "IC";
  if (params.status === "new") type = "NC";
  return axiosInstance.get("/dashboard/korpgetclientDetail", { params: { clientCode: params.clientCode || params.search || "", Type: type } });
};

// GET /api/reports/nominee-pending
export const getNomineePending = (params = {}) =>
  axiosInstance.get("/reports/getNomineenotdoneDetails", { params });

// GET /api/reports/inactive-clients
export const getInactiveClients = (params = {}) =>
  axiosInstance.get("/dashboard/korpgetclientDetail", { params: { clientCode: params.clientCode || params.search || "", Type: "IC" } });

// ── 📈 HOLDINGS & POSITIONS APIs ──────────────────────────────────────────────
// GET /api/reports/holdings?client_code=AP2100001&date=2026-04-06
// Response: { total, holdings: [{ clientName, clientCode, scriptCode, scriptName, isin, pledgePOA, freePOA, mtfQty, netQty, stockValue, closeRate, date }] }
export const getHoldings = (params = {}) =>
  axiosInstance.get("/reports/KorpHoldingReport", { params: { clientCode: params.client_code || params.clientCode || "" } });

// GET /api/reports/positions?type=open|global|fo_global&client_code=AP2100001
// Response: { total, positions: [{ clientName, clientCode, positionType, scriptName, exchange, product, buyQty, sellQty, netQty, buyAvg, sellAvg, ltp, value, pnl, date }] }
export const getOpenPositions = (params = {}) =>
  axiosInstance.get("/reports/KorpglobalPositionReport", { params: { clientCode: params.clientCode || params.client_code || "" } });

export const getGlobalPositions = (params = {}) =>
  axiosInstance.get("/reports/KorpglobalPositionReport", { params: { clientCode: params.clientCode || params.client_code || "" } });

export const getFOGlobalPositions = (params = {}) =>
  axiosInstance.get("/reports/KorpFoGlobalPosition", { params: { clientCode: params.clientCode || params.client_code || "" } });

// ── 📊 BROKERAGE APIs ─────────────────────────────────────────────────────────
// All accept params: { datefrom, dateto, clientCode, pageNumber, size }
export const getBrokerageCapital = (params = {}) =>
  axiosInstance.get("/reports/korpgetbrokerageclientwise", { params: { clientCode: params.clientCode || "" } });

export const getBrokerageThirdParty = (params = {}) =>
  axiosInstance.get("/reports/korpgetbrokeragedatewise", { params });

export const getBrokerageResearch = (params = {}) =>
  axiosInstance.get("/reports/getResearchCallDisplay", { params: { SearchType: params.type || "ALL" } });

export const getBrokerageLedger = (params = {}) =>
  axiosInstance.get("/reports/korpgetclientledger", { params: { Search: params.clientCode || "" } });

export const getBrokerageSummary = (params = {}) =>
  axiosInstance.get("/reports/korpgetbrokeragedatewise", { params });

// ── 📉 REPORTS APIs ───────────────────────────────────────────────────────────
// All accept params: { datefrom, dateto, search, pageNumber, size }
export const getMobileLoginReport = (params = {}) =>
  axiosInstance.get("/reports/getMobileAppLogin", { params });

export const getBranchPerformance = (params = {}) =>
  axiosInstance.get("/AdminDashboard/korpBranchPerformanceReportAdmin", { params });

export const getReactivationReport = (params = {}) =>
  axiosInstance.get("/reports/SendWhatsAppInActiveClient", { params });

export const getSamparkReport = (params = {}) =>
  axiosInstance.post("/sampark/samparkclientlog", params);

export const getKRAStatus = (params = {}) =>
  axiosInstance.get("/reports/getKRAClientData", { params });

export const getHoldKRA = (params = {}) =>
  axiosInstance.get("/reports/GetKRAHOLD", { params });

export const getModificationReport = (params = {}) =>
  axiosInstance.get("/reports/GetPhysicalModification", { params: { status: params.status || "" } });

export const getPhysicalAccountReport = (params = {}) =>
  axiosInstance.get("/reports/GetPhysicalAccountOpening", { params: { status: params.status || "" } });

export const getFollowupReport = (params = {}) =>
  axiosInstance.get("/reports/SendWhatsAppInActiveClient", { params });

// ── 📜 FILES APIs ─────────────────────────────────────────────────────────────
export const getComplianceCircular = (params = {}) =>
  axiosInstance.get("/reports/getCompliancefiles", { params });

export const getCertificate = (params = {}) =>
  axiosInstance.get("/reports/getCompliancefiles", { params });

export const getDownloadFiles = (params = {}) =>
  axiosInstance.get("/reports/getCompliancefiles", { params });

export const getMarketingMaterial = (params = {}) =>
  axiosInstance.get("/reports/getCompliancefiles", { params });

// POST /api/reports/upload-certificate — multipart/form-data
export const uploadCertificate = (formData) =>
  axiosInstance.post("/api/reports/upload-certificate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── 💰 FINANCIAL APIs ─────────────────────────────────────────────────────────
export const getMTFBalance = (params = {}) =>
  axiosInstance.get("/mtf/korpgetclientmtfBalance", { params: { clientCode: params.clientCode || params.client_code || "" } });

export const getDPSlip = (params = {}) =>
  axiosInstance.post("/reports/KorpdpSlip", params);

export const getClientBalance = (params = {}) =>
  axiosInstance.get("/payout/korpgetclientBalance", { params: { clientCode: params.clientCode || "" } });

// ── 🔍 MF & RESEARCH APIs ─────────────────────────────────────────────────────
export const getResearchCall = (params = {}) =>
  axiosInstance.get("/reports/getResearchCallDisplay", { params: { SearchType: params.type || "ALL" } });

export const getMutualFundReport = (params = {}) =>
  axiosInstance.post("/ThirdpartyAdmin/reports/MfAp", params);

export const getMFRejectionReport = (params = {}) =>
  axiosInstance.post("/MF/reports/SipRejection", params);

export const getMFMandateReport = (params = {}) =>
  axiosInstance.post("/MF/reports/MfMandate", params);

export const getMFStructure = (params = {}) =>
  axiosInstance.post("/MF/reports/MfMandate", params);

// ── 🧾 OTHER APIs ─────────────────────────────────────────────────────────────
export const getContestData = (params = {}) =>
  axiosInstance.get("/api/reports/contest-data", { params });

// ── 💸 PAYOUT APIs ────────────────────────────────────────────────────────────
export const getPayoutReport = (params = {}) =>
  axiosInstance.get("/payout/korpgetpayoutrequestreport", { params: { clientCode: params.clientCode || params.search || "" } });

export const getCancelRequest = (params = {}) =>
  axiosInstance.post("/payout/getPayOutCancelData", params);

// POST /api/payout/bulk-upload — multipart/form-data
export const bulkUploadPayout = (formData) =>
  axiosInstance.post("/api/payout/bulk-upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ── 📝 TAT APIs ───────────────────────────────────────────────────────────────
export const getEkycReport = (params = {}) =>
  axiosInstance.get("/api/reports/ekyc-report", { params });

export const getRekycReport = (params = {}) =>
  axiosInstance.get("/api/reports/rekyc-report", { params });
