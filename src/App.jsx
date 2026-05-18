import React from 'react';
import Dashboard from './pages/Dashboard';
import Payout from './pages/Payout';
import PayoutReport from './pages/PayoutReport';
import BulkPayout from './BulkPayout.jsx';
import CancelRequest from './pages/CancelRequest';
import DealSlip from './pages/DealSlip';
import Footer from './Footer';
import ContestsData from './pages/ContestsData';
import Contests from './Contests.jsx';
import ClickToCall from './ClickToCall.jsx';
import ContestsVideo from './pages/ContestsVideo';
import MinorDriveCreatives from './pages/MinorDriveCreatives';
import ResearchCall from './pages/ResearchCall'
import FundamentalCall from './pages/FundamentalCall'
import ReportsPage from './ReportsPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './Index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ZoomResearch from "./pages/ZoomResearch";
import FollowUpReport from "./pages/FollowUpReport"
import ProfileBeta from "./pages/ProfileBeta"
import ThirdParty from './ThirdParty.jsx';
import MutualFund from './MutualFund.jsx';
import Rejection from './Rejection.jsx';
import Mandate from './Mandate.jsx';
import ProductDeck from './ProductDeck.jsx';
import MFStructure from './MFStructure.jsx';
import WealthBasket from './WealthBasket.jsx';
import SIPCalculator from './SipRevenueCalculator.jsx';
import Bonds from './Bonds.jsx';
import AlgoBrokerage from './AlgoBrokerage.jsx';
import Download from './Download.jsx';
import MarketingMaterial from "./pages/MarketingMaterial";
import KRAStatusPage from './KRAStatusPage.jsx';
import HoldingReport from './HoldingReport.jsx';
import ArihantProducts from './ArihantProducts.jsx';
import LoginPage from './LoginPage.jsx';
import ClientCodeList from './ClientCodeList.jsx';
import NewClient from './NewClient.jsx';
import InactiveClient from './InactiveClient.jsx';
import ActiveClient from './ActiveClient.jsx';
import TotalClient from './TotalClient.jsx';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      <Routes>
        {/* Default Route - Redirect to Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/arihant-products" element={<ArihantProducts />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/account-opening" element={<KRAStatusPage />} />
        <Route path="/download" element={<MarketingMaterial />} />
        <Route path="/dealslip" element={<DealSlip />} />
        <Route path="/researchcall" element={<ResearchCall />} />
        <Route path="/fundamentalcall" element={<FundamentalCall />} />
        <Route path="/zoomresearch" element={<ZoomResearch />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/contests-data" element={<ContestsData />} />
        <Route path="/minor-drive-creatives" element={<MinorDriveCreatives />} />
        <Route path="/contests-video" element={<ContestsVideo />} />
        <Route path="/third-party" element={<ThirdParty />} />
        <Route path="/profile" element={<ProfileBeta />} />
        <Route path="/payout" element={<Payout />} />
        <Route path="/payout-report" element={<PayoutReport />} />
        <Route path="/bulk-payout" element={<BulkPayout />} />
        <Route path="/cancel-request" element={<CancelRequest />} />
        <Route path="/clicktocall" element={<ClickToCall />} />
        <Route path="/ProfileBeta" element={<ProfileBeta />} />
        <Route path="/followupreport" element={<FollowUpReport />} />
        <Route path="/mutual-fund" element={<MutualFund />} />
        <Route path="/rejection" element={<Rejection />} />
        <Route path="/mandate" element={<Mandate />} />
        <Route path="/product-deck" element={<ProductDeck />} />
        <Route path="/mf-structure" element={<MFStructure />} />
        <Route path="/wealth-basket" element={<WealthBasket />} />
        <Route path="/sip-calculator" element={<SIPCalculator />} />
        <Route path="/bonds" element={<Bonds />} />
        <Route path="/algo-brokerage" element={<AlgoBrokerage />} />
        <Route path="/kra-status" element={<KRAStatusPage />} />
        <Route path="/holding-report" element={<HoldingReport />} />
        <Route path="/client-code-list" element={<ClientCodeList />} />
        <Route path="/new-client" element={<NewClient />} />
        <Route path="/inactive-client" element={<InactiveClient />} />
        <Route path="/active-client" element={<ActiveClient />} />
        <Route path="/total-client" element={<TotalClient />} />

        <Route path="/third-party" element={<ThirdParty />}>
          <Route path="algo-brokerage" element={<div></div>} />
          <Route path="mutual-fund" element={<div></div>} />
          <Route path="rejection" element={<div></div>} />
          <Route path="mandate" element={<div></div>} />
          <Route path="product-deck" element={<div></div>} />
          <Route path="mf-structure" element={<div></div>} />
          <Route path="wealth-basket" element={<div></div>} />
          <Route path="sip-calculator" element={<SIPCalculator />} />
          <Route path="bonds" element={<div></div>} />
        </Route>
      </Routes>

      {!isLoginPage && <Footer />}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
