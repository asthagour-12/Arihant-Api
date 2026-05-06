import React, { useState, useEffect } from 'react';
import axios from 'axios';
import banner from './left-banner.svg';
import logo from './logo-arihant-capital.png';
import smartphone from './smartphone.svg';

const LoginPage = () => {
  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  
  // Resend timer states
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // Start resend timer
  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(120);
  };

  useEffect(() => {
    let timer;
    if (showOTP && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOTP, resendTimer]);

  // STEP 1: Branch Code Verification API Call
  const handleBranchCodeSubmit = async (e) => {
    e.preventDefault();
    if (!branchCode.trim()) {
      setError('Please enter your branch code');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await axios.post(
        'https://connectarihant.onrender.com/api/auth/login',
        { manager_id: branchCode.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setShowOTP(true);
      startResendTimer();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Invalid branch code. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: OTP Verification API Call
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setOTPError('Please enter your OTP');
      return;
    }
    
    setLoading(true);
    setOTPError('');
    
    try {
      const response = await axios.post(
        'https://connectarihant.onrender.com/api/auth/verify-otp',
        {
          manager_id: branchCode.trim(),
          otp: otp.trim()
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      const authToken = response.data.token || response.data.access_token;
      if (authToken) {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('branchCode', branchCode.trim());
        localStorage.setItem('isLoggedIn', 'true');
        setToken(authToken);
        setIsAuthenticated(true);
        setShowOTP(false);
      } else {
        setOTPError('Login successful but no token received.');
      }
    } catch (error) {
      setOTPError(error.response?.data.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = () => {
    if (!canResend) return;
    alert('OTP resent! (For demo: 123456)');
    startResendTimer();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-[#34b350] selection:text-white flex flex-col relative overflow-hidden">
      
      {/* 🌀 LOADING OVERLAY */}
      {showLoader && (
        <div className="fixed inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-3 h-3 rounded-full bg-[#34b350] animate-bounce delay-${i * 100}`}></div>
              ))}
            </div>
            <p className="text-[#34b350] font-bold text-sm tracking-widest uppercase">Verifying Account...</p>
          </div>
        </div>
      )}

      {/* 🟢 HEADER */}
      <header className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src={logo} alt="Arihant Capital" className="h-10 object-contain" />
          <div className="hidden md:block">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Connecting Growth</span>
          </div>
        </div>
      </header>

      {/* 🖥 MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 p-6 lg:p-12">
        
        {/* 🎨 ILLUSTRATION SECTION */}
        <section className="hidden lg:flex flex-col items-center justify-center lg:w-1/2 animate-in fade-in slide-in-from-left-12 duration-1000">
          <img
            src={banner}
            alt="Fintech analytics banner"
            className="w-full max-w-lg drop-shadow-2xl"
          />
          <div className="mt-12 text-center">
            <h1 className="text-3xl font-black text-gray-800 tracking-tighter mb-4">Empowering Your Decisions</h1>
            <p className="text-gray-500 text-lg max-w-sm font-medium">Access powerful insights and manage your branch with precision.</p>
          </div>
        </section>

        {/* 🔐 LOGIN SECTION */}
        <section className="w-full max-w-md lg:w-1/2 animate-in fade-in slide-in-from-right-12 duration-1000">
          {isAuthenticated ? (
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl shadow-green-900/10 border border-gray-100 text-center flex flex-col gap-8">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-[#34b350]">
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Welcome Back!</h2>
                <p className="text-gray-500 font-medium italic">Login Successful. Let's take you home.</p>
              </div>
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-[#34b350] hover:bg-[#2e9e47] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all active:scale-[0.98]"
              >
                GO TO DASHBOARD
              </button>
            </div>
          ) : !showOTP ? (
            /* 🆔 BRANCH CODE CARD */
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#34b350]"></div>
              
              <div className="mb-10">
                <h2 className="text-3xl font-black text-gray-800 tracking-tighter mb-2">Backoffice Login</h2>
                <p className="text-gray-400 font-bold text-[11px] uppercase tracking-widest">Access your personalized reports</p>
              </div>
              
              <form onSubmit={handleBranchCodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="branchCode" className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 ml-1">
                    Enter Your Branch Code
                  </label>
                  <input
                    type="text"
                    id="branchCode"
                    className={`w-full bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-gray-800 font-bold placeholder:text-gray-300 outline-none focus:bg-white focus:border-[#34b350] focus:ring-4 focus:ring-green-500/5 transition-all shadow-inner`}
                    placeholder="e.g. MP21"
                    value={branchCode}
                    onChange={(e) => {
                      setBranchCode(e.target.value);
                      if (error) setError('');
                    }}
                  />
                  {error && <p className="text-red-500 text-[11px] font-bold px-1 ml-1 animate-pulse">{error}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#34b350] hover:bg-[#2e9e47] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all disabled:bg-gray-200 disabled:shadow-none active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {loading ? 'VERIFYING...' : 'VERIFY ACCESS'}
                  {!loading && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                </button>
              </form>

              <div className="mt-12 pt-8 border-t border-gray-50 space-y-4">
                <p className="text-[12px] text-gray-500 font-medium">
                  Need assistance? <strong className="text-gray-800">0731-4217208</strong>
                </p>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <p className="text-[10px] text-orange-800 leading-relaxed font-bold">
                    <span className="uppercase tracking-widest block mb-1 opacity-50">Security Note</span>
                    Never share your login credentials with anyone. Any mishandling of the account would be dealt seriously.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* 📱 OTP VERIFICATION CARD */
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-2xl shadow-green-900/10 border border-gray-100 text-center animate-in zoom-in-95 duration-500">
              <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">Verify OTP</h2>
                <p className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Sent on +91******911</p>
              </div>
              
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce duration-[2000ms]">
                <img src={smartphone} alt="OTP" className="w-12 h-12" />
              </div>
              
              <form onSubmit={handleOTPSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label htmlFor="otp" className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Enter OTP</label>
                  <input
                    type="text"
                    id="otp"
                    className={`w-full text-center tracking-[0.5em] text-2xl bg-gray-50 border ${otpError ? 'border-red-500' : 'border-gray-100'} rounded-2xl px-6 py-4 text-gray-900 font-black outline-none focus:bg-white focus:border-[#34b350] focus:ring-4 focus:ring-green-500/5 transition-all`}
                    placeholder="••••••"
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOTP(val);
                      if (otpError) setOTPError('');
                    }}
                    maxLength={6}
                  />
                  {otpError && <p className="text-red-500 text-[11px] font-bold text-center mt-2">{otpError}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={loading || otp.length !== 6}
                  className="w-full bg-[#34b350] hover:bg-[#2e9e47] text-white py-4 rounded-2xl font-black text-sm tracking-widest uppercase shadow-xl shadow-green-500/20 transition-all disabled:bg-gray-200 disabled:shadow-none active:scale-[0.98]"
                >
                  {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                </button>
              </form>

              <div className="mt-8">
                {canResend ? (
                  <button 
                    onClick={resendOTP}
                    className="text-[#34b350] font-black text-[12px] uppercase tracking-widest hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-[11px] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></span>
                    Resend OTP in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 🎨 BACKGROUND DECORATIONS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#34b350]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#34b350]/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>
    </div>
  );
};

export default LoginPage;
