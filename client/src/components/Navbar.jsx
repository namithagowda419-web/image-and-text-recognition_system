import React, { useState } from 'react';
import { Sparkles, Image, FileText, LayoutDashboard, Clock, Info, Layers, User, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, openAuthModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Sparkles },
    { id: 'workspace', label: 'AI Workspace', icon: Image },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'features', label: 'Features', icon: Layers },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: FileText }
  ];

  return (
    <nav className="sticky top-0 z-40 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#BFA2DB] to-[#C7D2FE] flex items-center justify-center shadow-soft-glow transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="w-6 h-6 text-gray-800" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-gray-900 font-sans">
                Lumina<span className="text-[#8C62B5] font-serif italic font-normal ml-1">AI</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-medium -mt-1">
                Luxury Soft Aesthetic
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-[#E8DFF5]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E8DFF5] text-gray-900 shadow-sm font-semibold'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C62B5]' : 'text-gray-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action & User Profile */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setActiveTab('workspace')}
              className="btn-gradient-primary px-5 py-2.5 rounded-full text-sm flex items-center gap-2 font-medium"
            >
              <Sparkles className="w-4 h-4 text-gray-800" />
              Start Recognition
            </button>

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity p-1 rounded-full bg-white border border-[#E8DFF5]"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-gray-700 pr-2">
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#BFA2DB] text-gray-700 hover:bg-[#E8DFF5]/50 text-sm font-medium transition-all"
              >
                <LogIn className="w-4 h-4 text-[#8C62B5]" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl bg-white border border-[#E8DFF5] text-gray-700 hover:bg-[#E8DFF5]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-[#E8DFF5] px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left font-medium transition-all ${
                  isActive ? 'bg-[#E8DFF5] text-gray-900 font-bold' : 'text-gray-600 hover:bg-white'
                }`}
              >
                <Icon className="w-5 h-5 text-[#8C62B5]" />
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('workspace');
                setMobileMenuOpen(false);
              }}
              className="btn-gradient-primary w-full py-3 rounded-2xl text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Recognition
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
