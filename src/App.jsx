import React from 'react';
import Dashboard from './Dashboard';
import Payout from './Payout';
import PayoutRequest from './PayoutRequest';
import BulkPayout from './BulkPayout.jsx';
import CancelRequest from './CancelRequest';
import DealSlip from './DealSlip';
import Footer from './Footer';
import ContestsData from './ContestsData';
import Contests from './Contests.jsx';
import ClickToCall from './ClickToCall.jsx';
import ContestsVideo from './ContestsVideo';
import MinorDriveCreatives from './MinorDriveCreatives';
import ResearchCall from './ResearchCall'
import FundamentalCall from './FundamentalCall'
import ReportsPage from './ReportsPage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './Index.css'
import ZoomResearch from "./ZoomResearch";
import FollowUpReport from "./FollowUpReport"
import ProfileBeta from "./ProfileBeta"
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
import MarketingMaterial from "./MarketingMaterial";
import KRAStatusPage from './KRAStatusPage.jsx';
import HoldingReport from './HoldingReport.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Default Route - Redirect to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
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
          <Route path="/payout-request" element={<PayoutRequest />} />
          <Route path="/bulk-payout" element={<BulkPayout />} />
          <Route path="/cancel-request" element={<CancelRequest />} />
          <Route path="/clicktocall" element={<ClickToCall />} />
          <Route path="/ProfileBeta" element={<ProfileBeta />} />
          <Route path="/profile" element={<ProfileBeta />} />
          <Route path="/followupreport" element={<FollowUpReport />} />
          <Route path="/mutual-fund" element={<MutualFund />} />
          <Route path="/rejection" element={<Rejection />} />
          <Route path="/mandate" element={<Mandate />} />
          <Route path="/product-deck" element={<ProductDeck />} />
          <Route path="/mf-structure" element={<MFStructure />} />
          <Route path="/wealth-basket" element={<WealthBasket />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/bonds" element={<Bonds />} />
          <Route path="/download" element={<Download />} />
          <Route path="/marketing-material" element={<Download />} />
          <Route path="/algo-brokerage" element={<AlgoBrokerage />} />
          <Route path="/kra-status" element={<KRAStatusPage />} />
          <Route path="/holding-report" element={<HoldingReport />} />

          <Route path="/third-party" element={<ThirdParty />}>
            <Route path="algo-brokerage" element={<div></div>} />
            <Route path="mutual-fund" element={<div></div>} />
            <Route path="rejection" element={<div></div>} />
            <Route path="mandate" element={<div></div>} />
            <Route path="product-deck" element={<div></div>} />
            <Route path="mf-structure" element={<div></div>} />
            <Route path="wealth-basket" element={<div></div>} />
            <Route path="sip-calculator" element={<div></div>} />
            <Route path="bonds" element={<div></div>} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
