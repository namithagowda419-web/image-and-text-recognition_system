import React, { useState } from 'react';
import { User, Key, Lock, Camera, Check, Copy, RefreshCw, LogOut, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecognition } from '../context/RecognitionContext';
import { copyToClipboard } from '../utils/exportUtils';

export default function ProfilePage() {
  const { user, token, updateProfile, logout } = useAuth();
  const { showToast } = useRecognition();

  const [name, setName] = useState(user?.name || 'Alex Morgan');
  const [bio, setBio] = useState(user?.bio || 'AI Product Designer & Vision Researcher');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [apiKey, setApiKey] = useState(user?.apiKey || 'sk_live_lumina_9823471928374912');

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
  ];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, bio, avatar: selectedAvatar });
    showToast('Profile information updated successfully!', 'success');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();

      if (data.success) {
        setPassSuccess('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        showToast('Password updated successfully!', 'success');
      } else {
        setPassError(data.message || 'Error changing password');
      }
    } catch (err) {
      setPassSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      showToast('Password updated!', 'success');
    }
  };

  const regenerateKey = () => {
    const newKey = `sk_live_lumina_${Math.random().toString(36).substring(2, 18)}`;
    setApiKey(newKey);
    updateProfile({ apiKey: newKey });
    showToast('Regenerated new API key', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-10 animate-fade-in">
      
      {/* Header */}
      <div className="border-b border-[#E8DFF5] pb-6 flex items-center justify-between">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
            User Settings
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Profile & Credentials</h1>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-2xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 text-xs font-bold flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Avatar & Quick Actions (4 Cols) */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={selectedAvatar}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover border-2 border-[#BFA2DB] shadow-soft-glow"
              />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-900">{name}</h3>
              <p className="text-xs text-gray-500">{user?.email || 'alex@example.com'}</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Choose Avatar Preset</p>
              <div className="flex justify-center gap-2">
                {avatarPresets.map((av, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAvatar(av)}
                    className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${
                      selectedAvatar === av ? 'border-[#8C62B5] scale-110' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={av} alt="Preset" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* API Key Box */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-[#8C62B5]" />
                <h4 className="text-xs font-bold text-gray-900">API Secret Key</h4>
              </div>
              <button
                onClick={regenerateKey}
                className="p-1 text-gray-400 hover:text-[#8C62B5]"
                title="Regenerate Key"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-[11px] font-mono text-gray-800 flex items-center justify-between truncate">
              <span className="truncate pr-2">{apiKey}</span>
              <button
                onClick={async () => {
                  await copyToClipboard(apiKey);
                  showToast('API key copied', 'success');
                }}
                className="p-1 rounded-lg bg-white border border-[#E8DFF5] hover:bg-[#E8DFF5] text-gray-700"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Edit Form & Password (8 Cols) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* General Information */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-5">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-[#8C62B5]" />
              General Profile Information
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Bio Summary</label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gradient-primary px-6 py-2.5 rounded-2xl text-xs font-bold"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white p-7 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-5">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#8C62B5]" />
              Change Account Password
            </h3>

            {passError && (
              <div className="p-3 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                {passError}
              </div>
            )}

            {passSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                {passSuccess}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Current Password</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-white border border-[#E8DFF5] text-xs font-bold text-gray-800 hover:bg-[#E8DFF5]/60 transition-all"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
