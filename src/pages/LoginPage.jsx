import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCsrfToken, sendOtp, verifyOtp } from '../api/authApi';
import banner from '../left-banner.svg';
import logo from '../logo-arihant-capital.png';
import smartphone from '../smartphone.svg';
import Footer from './Footer';

const LoginPage = () => {

  const [branchCode, setBranchCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  const [maskedMobile, setMaskedMobile] = useState('+91******000');

  // Resend timer states
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(120);

  useEffect(() => {
    let timer;
    if (showOTP && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [showOTP, resendTimer]);

  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(120);
  };

  const handleSendOTP = async (e) => {
    if (e) e.preventDefault();

    if (!branchCode.trim()) {
      toast.error('Please enter Branch Code');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const csrfRes = await getCsrfToken(branchCode.trim());
      const currentCsrf = csrfRes.data?.message;

      if (!currentCsrf) {
        throw new Error('Failed to obtain security token');
      }
      setCsrfToken(currentCsrf);

      const response = await sendOtp(branchCode.trim(), currentCsrf);

      if (response.data && response.data.success) {
        const mobile = response.data.result?.mobile || '';
        if (mobile) setMaskedMobile(`+91${mobile}`);

        setShowOTP(true);
        setSuccess('OTP sent successfully!');
        toast.success('OTP sent successfully!');
        startResendTimer();
      } else {
        toast.error(response.data?.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP full error:', error?.response);
      const message = error?.response?.data?.message || error?.message || 'Failed to send OTP. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await verifyOtp(branchCode, otp, csrfToken);

      if (response.data && response.data.success) {
        setSuccess('OTP verified successfully!');
        toast.success('OTP verified successfully!');

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('branchCode', branchCode);
        if (response.data.result) {
          localStorage.setItem('userData', JSON.stringify(response.data.result));
        }

        window.location.href = '/dashboard';
      } else {
        toast.error(response.data?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP full error:', error?.response);
      const message = error?.response?.data?.message || error?.message || 'Failed to verify OTP. Please try again.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = () => {
    if (!canResend) return;
    handleSendOTP();
  };

  return (
    <div className="login-container min-h-screen flex flex-col bg-[#f1f9f2]">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="text-center text-white">
            <div className="flex gap-3 mb-6 justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-dotBounce [animation-delay:-0.32s]"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-dotBounce [animation-delay:-0.16s]"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-dotBounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-dotBounce [animation-delay:0.16s]"></div>
            </div>
            <p className="text-xl font-medium m-0 opacity-90 animate-fadeInOut">Good things take time... Hold on...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-[#34b350] h-[60px] md:h-[70px] px-6 md:px-10 flex items-center fixed top-0 left-0 right-0 z-[1000] shadow-sm">
        <div className="w-full flex items-center justify-start">
          <img
            src={logo}
            alt="Arihant Capital"
            className="h-[35px] md:h-[45px] w-auto object-contain transition-transform hover:scale-105"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1300px] w-full mx-auto py-12 px-6 md:px-12 gap-12 items-center justify-between mt-[60px] md:mt-[80px]">
        {/* Left Side - Illustration */}
        <section className="flex-1 flex items-center justify-center w-full lg:max-w-[650px] min-h-[300px] md:min-h-[450px] bg-transparent">
          <div className="w-full h-auto">
            <img
              src={banner}
              alt="Illustration"
              className="w-full h-auto max-w-[550px] md:max-w-[650px] block animate-fadeInSlow"
            />
          </div>
        </section>

        {/* Right Side - Login Card */}
        <section className="flex-1 flex items-center justify-center w-full lg:max-w-[480px] mt-10">
          {!showOTP ? (
            <div className="bg-white rounded-[35px] shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 w-full max-w-[450px] animate-fadeIn text-center font-sans">
              <div className="mb-4">
                <h2 className="text-[2.2rem] font-bold text-[#333] mb-0.5 leading-tight tracking-tight">Backoffice login</h2>
                <p className="text-[#666] text-[0.85rem] font-medium">Get access to the detailed reports</p>
              </div>

              <form className="mb-4" onSubmit={handleSendOTP}>
                <div className="mb-4 text-left">
                  <label htmlFor="branchCode" className="block mb-1.5 font-bold text-[#333] text-[0.8rem]">
                    Enter Your Branch Code *
                  </label>
                  <input
                    type="text"
                    id="branchCode"
                    className={`w-full p-3 border border-gray-300 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#34b350]/20 focus:border-[#34b350] ${error ? 'border-red-500' : ''}`}
                    placeholder="Enter Your Branch Code*"
                    value={branchCode}
                    onChange={(e) => {
                      setBranchCode(e.target.value.toUpperCase());
                      if (error) setError('');
                    }}
                  />
                  {error && <span className="block text-red-500 text-xs mt-1 font-medium">{error}</span>}
                </div>

                <button type="submit" className="w-fit min-w-[180px] mx-auto px-10 py-3 bg-[#42ba61] text-white border-none rounded-xl text-base font-bold cursor-pointer transition-all hover:bg-[#34b350] hover:shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2" disabled={loading}>
                  {loading ? 'VERIFYING...' : 'VERIFY >'}
                </button>
              </form>

              <div className="text-center mt-4">
                <p className="text-[#666] text-[0.8rem] mb-3">
                  Need assistance? Call us on <span className="font-semibold text-[#444]">0731-4217208</span>
                </p>
                <div className="bg-[#eeeeee] p-2.5 rounded-xl">
                  <p className="text-[#666] text-[0.65rem] leading-relaxed font-medium">
                    <strong className="text-[#444]">Note:</strong> Never share your login credentials with anyone. Any mis-handling of the account would be dealt seriously.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-10 w-full max-w-[450px] animate-fadeIn text-center font-sans">
              <div className="mb-6">
                <h2 className="text-[1.8rem] font-bold text-[#333] mb-2 leading-tight">Verify Access</h2>
                <p className="text-[#666] text-sm font-medium mb-4">OTP Sent on {maskedMobile}</p>
              </div>

              <img src={smartphone} alt="Smartphone" className="w-14 h-14 my-4 opacity-80 block mx-auto" />

              <form className="mb-4" onSubmit={handleVerifyOTP}>
                <div className="mb-5 px-2 text-left">
                  <label htmlFor="otp" className="block mb-2 font-bold text-[#333] text-[0.85rem]">Enter OTP</label>
                  <input
                    type="text"
                    id="otp"
                    className={`w-full px-4 py-3 border border-gray-300 rounded-xl text-[1.1rem] text-center tracking-[0.25rem] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#34b350]/20 focus:border-[#34b350] ${error || otpError ? 'border-red-500' : ''}`}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 6) setOTP(val);
                      if (otpError) setOTPError('');
                      if (error) setError('');
                    }}
                    maxLength={6}
                  />
                  {(otpError || error) && <span className="block text-red-500 text-xs mt-1 font-medium">{otpError || error}</span>}
                </div>
                <button type="submit" className="w-fit min-w-[200px] mx-auto px-10 py-3.5 bg-[#42ba61] text-white border-none rounded-xl text-base font-bold cursor-pointer transition-all hover:bg-[#34b350] hover:shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2" disabled={loading}>
                  {loading ? 'VERIFYING...' : 'VERIFY OTP >'}
                </button>
              </form>

              <div className="mt-4 text-center">
                {canResend ? (
                  <button
                    type="button"
                    className="text-[#34b350] font-bold hover:underline bg-transparent border-none p-0 cursor-pointer text-sm"
                    onClick={resendOTP}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Resend OTP'}
                  </button>
                ) : (
                  <p className="text-[#666] text-xs font-medium">
                    Resend OTP in {Math.floor(resendTimer / 60)}:{(resendTimer % 60).toString().padStart(2, '0')}
                  </p>
                )}
                <button type="button" className="block mx-auto mt-6 text-gray-400 hover:text-gray-600 font-bold text-[10px] uppercase tracking-widest bg-transparent border-none cursor-pointer" onClick={() => setShowOTP(false)}>← Back to Login</button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
