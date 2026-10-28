/**
 * SMARTDEPT - Login Page (Email OTP Flow)
 *
 * Step 1: Enter college email → request OTP
 * Step 2: Enter 6-digit OTP → get JWT + redirect to correct dashboard
 *
 * Security:
 * - Role is NEVER set here; it comes from the server response
 * - OTP is never shown or stored on client side
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
} from 'lucide-react';
import { authApi } from '../api/client';
import { useAuth } from '../contexts/AuthContext';

// ── OTP Input Component ────────────────────────────────────

const OtpInput = ({ value, onChange, disabled }) => {
  const digits = value.split('').concat(Array(6).fill('')).slice(0, 6);
  const refs = Array.from({ length: 6 }, () => useRef(null));

  const handleKey = (idx, e) => {
    if (e.key === 'Backspace') {
      const newVal = value.slice(0, -1);
      onChange(newVal);
      if (idx > 0) refs[idx - 1].current?.focus();
    }
  };

  const handleChange = (idx, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    if (!char) return;
    const arr = value.split('').concat(Array(6).fill('')).slice(0, 6);
    arr[idx] = char;
    const newVal = arr.join('').replace(/ /g, '').slice(0, 6);
    onChange(newVal);
    if (idx < 5) refs[idx + 1].current?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    refs[Math.min(pasted.length, 5)].current?.focus();
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '8px 0' }}>
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          style={{
            width: '48px',
            height: '56px',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: 0,
            borderRadius: '10px',
            border: `2px solid ${d ? 'var(--color-brand-primary)' : 'var(--border-color)'}`,
            backgroundColor: d ? 'rgba(79, 110, 247, 0.06)' : 'var(--bg-input)',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'border-color 0.15s, background-color 0.15s',
            caretColor: 'transparent',
          }}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
};

// ── Role Badge Preview ─────────────────────────────────────

const ROLE_COLORS = {
  HOD: { bg: 'rgba(139, 92, 246, 0.12)', color: '#7C3AED', label: 'Head of Department' },
  FACULTY: { bg: 'rgba(16, 185, 129, 0.12)', color: '#065F46', label: 'Faculty' },
  STUDENT: { bg: 'rgba(79, 110, 247, 0.12)', color: '#1D4ED8', label: 'Student' },
  ADMIN: { bg: 'rgba(239, 68, 68, 0.12)', color: '#B91C1C', label: 'Administrator' },
};

// ── Main LoginPage Component ───────────────────────────────

export const LoginPage = () => {
  const { login } = useAuth();

  // Steps: 'email' | 'otp' | 'success'
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [successUser, setSuccessUser] = useState(null);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleRequestOtp = async (e) => {
    e?.preventDefault();
    if (!email.trim()) return;
    setError('');
    setIsLoading(true);
    try {
      const res = await authApi.requestOtp(email.trim().toLowerCase());
      setCooldownSeconds(res.cooldown_seconds || 60);
      setResendCountdown(res.cooldown_seconds || 60);
      setStep('otp');
    } catch (err) {
      if (err.cooldown) {
        setError(`Please wait ${err.cooldown}s before requesting a new OTP.`);
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP.');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const tokenResponse = await authApi.verifyOtp(email.trim().toLowerCase(), otp);
      setSuccessUser(tokenResponse.user);
      setStep('success');
      // Brief success flash then log in
      setTimeout(() => {
        login(tokenResponse); // sets user + token in AuthContext
      }, 1400);
    } catch (err) {
      setError(err.message || 'Verification failed. Please check your OTP.');
      if (err.code === 'OTP_MAX_ATTEMPTS' || err.code === 'OTP_INVALID') {
        setOtp('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit when all 6 digits filled
  useEffect(() => {
    if (otp.length === 6 && step === 'otp' && !isLoading) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setError('');
    setOtp('');
    await handleRequestOtp();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-app)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border-color-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-color-subtle) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient blobs */}
      <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,110,247,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Card Top Gradient Bar */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #4F6EF7, #8B5CF6)' }} />

        {/* Card Header */}
        <div style={{ padding: '32px 32px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #4F6EF7, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>SmartDept</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Departmental Activity Platform</div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div style={{ padding: '0 32px 32px' }}>
          <AnimatePresence mode="wait">

            {/* ── STEP 1: EMAIL ── */}
            {step === 'email' && (
              <motion.div key="email" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                  Sign in to SmartDept
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 24px', lineHeight: 1.5 }}>
                  Enter your official college email to receive a secure login code.
                </p>

                <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      College Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError(''); }}
                        placeholder="yourname@college.edu"
                        required
                        autoFocus
                        className="form-input"
                        style={{ paddingLeft: '42px', height: '46px', fontSize: '14px' }}
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    style={{
                      height: '46px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #4F6EF7, #7C3AED)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: 'none',
                      cursor: isLoading || !email ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: isLoading || !email ? 0.65 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send One-Time Code
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '20px', lineHeight: 1.6 }}>
                  Access is granted by your department administrator.
                  Contact admin if you don't have an account.
                </p>
              </motion.div>
            )}

            {/* ── STEP 2: OTP ── */}
            {step === 'otp' && (
              <motion.div key="otp" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <button
                  onClick={() => { setStep('email'); setError(''); setOtp(''); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px', padding: '0 0 16px', marginLeft: '-4px' }}
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(79,110,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <ShieldCheck size={28} color="var(--color-brand-primary)" />
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                    Check your email
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                    We sent a 6-digit code to<br />
                    <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp}>
                  <OtpInput value={otp} onChange={setOtp} disabled={isLoading} />

                  {error && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', marginTop: '12px' }}>
                      <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0, marginTop: '1px' }} />
                      <span style={{ fontSize: '13px', color: '#B91C1C' }}>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    style={{
                      width: '100%',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #4F6EF7, #7C3AED)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '14px',
                      border: 'none',
                      cursor: isLoading || otp.length !== 6 ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      opacity: isLoading || otp.length !== 6 ? 0.65 : 1,
                      transition: 'opacity 0.2s',
                      marginTop: '16px',
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#FFFFFF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                        Verifying...
                      </>
                    ) : (
                      <>Verify & Sign In</>
                    )}
                  </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  {resendCountdown > 0 ? (
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                      Resend available in <strong>{resendCountdown}s</strong>
                    </span>
                  ) : (
                    <button
                      onClick={handleResend}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--color-brand-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RefreshCw size={13} /> Resend OTP
                    </button>
                  )}
                </div>

                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '8px', padding: '10px 14px', marginTop: '20px' }}>
                  <p style={{ margin: 0, fontSize: '12px', color: '#92400E', lineHeight: 1.5 }}>
                    <strong>Note:</strong> The OTP expires in 10 minutes and can only be used once.
                    SmartDept staff will never ask for your OTP.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: SUCCESS ── */}
            {step === 'success' && successUser && (
              <motion.div key="success" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                <div style={{ textAlign: 'center', padding: '8px 0' }}>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}
                  >
                    <CheckCircle2 size={36} color="#10B981" />
                  </motion.div>

                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                    Welcome back, {successUser.name.split(' ')[0]}!
                  </h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 20px' }}>
                    Signing you in to your dashboard...
                  </p>

                  {/* Role Badge */}
                  {(() => {
                    const roleStyle = ROLE_COLORS[successUser.role] || ROLE_COLORS.STUDENT;
                    return (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: roleStyle.bg, color: roleStyle.color, border: `1px solid ${roleStyle.color}30`, borderRadius: '20px', padding: '6px 16px', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
                        <ShieldCheck size={14} />
                        {roleStyle.label}
                        {successUser.department && (
                          <span style={{ opacity: 0.7, fontWeight: 500 }}>• {successUser.department.split('&')[0].trim()}</span>
                        )}
                      </div>
                    );
                  })()}

                  <div style={{ marginTop: '20px' }}>
                    <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-muted)', borderRadius: '2px', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.3, ease: 'easeInOut' }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, #4F6EF7, #10B981)' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
