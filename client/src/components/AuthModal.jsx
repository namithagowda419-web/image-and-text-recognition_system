import React, { useState } from 'react';
import { X, Sparkles, Lock, Mail, User as UserIcon, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecognition } from '../context/RecognitionContext';

export default function AuthModal({ onAuthSuccess }) {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, login, register, authLoading } = useAuth();
  const { showToast } = useRecognition();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      const res = await login(email, password);
      if (res.success) {
        showToast('Successfully logged in!', 'success');
        if (onAuthSuccess) onAuthSuccess();
      } else {
        setErrorMsg(res.message);
      }
    } else if (authMode === 'register') {
      const res = await register(name, email, password);
      if (res.success) {
        showToast('Welcome to Lumina AI! Account registered.', 'success');
        if (onAuthSuccess) onAuthSuccess();
      } else {
        setErrorMsg(res.message);
      }
    } else if (authMode === 'forgot') {
      showToast('Password reset link sent to ' + email, 'info');
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#E8DFF5] shadow-soft-glow max-w-md w-full p-8 relative space-y-6">
        
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#BFA2DB] to-[#C7D2FE] flex items-center justify-center mx-auto shadow-soft-glow">
            <Sparkles className="w-6 h-6 text-gray-800" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-sans">
            {authMode === 'login' && 'Welcome Back'}
            {authMode === 'register' && 'Create Lumina Account'}
            {authMode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-xs text-gray-500">
            {authMode === 'login' && 'Sign in to access your AI Recognition workspace & history.'}
            {authMode === 'register' && 'Join the soft-aesthetic AI Recognition platform today.'}
            {authMode === 'forgot' && 'Enter your email to receive a password reset link.'}
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Morgan"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-700">Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setErrorMsg(''); setAuthMode('forgot'); }}
                    className="text-[11px] text-[#8C62B5] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="btn-gradient-primary w-full py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 mt-2"
          >
            {authLoading ? 'Processing...' : (
              <>
                {authMode === 'login' && 'Sign In'}
                {authMode === 'register' && 'Create Account'}
                {authMode === 'forgot' && 'Send Reset Link'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Mode Toggle */}
        <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
          {authMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => { setErrorMsg(''); setAuthMode('register'); }}
                className="text-[#8C62B5] font-bold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => { setErrorMsg(''); setAuthMode('login'); }}
                className="text-[#8C62B5] font-bold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
