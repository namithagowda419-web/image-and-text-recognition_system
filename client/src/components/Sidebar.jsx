import React from 'react';
import { LayoutDashboard, Image, FileText, Clock, User, Settings, Layers, Sparkles, ChevronRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'workspace', label: 'AI Workspace', icon: Image, badge: 'Live AI' },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'History Logs', icon: Clock },
    { id: 'features', label: 'Capabilities', icon: Layers },
    { id: 'profile', label: 'User Profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md rounded-3xl border border-[#E8DFF5] p-5 shadow-card-luxury flex flex-col justify-between h-[calc(100vh-7rem)] sticky top-24">
      <div className="space-y-6">
        
        {/* User Brief */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5]">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border border-[#BFA2DB]"
          />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-gray-900 truncate">{user?.name || 'Alex Morgan'}</h4>
            <p className="text-[10px] text-gray-500 truncate">{user?.email || 'alex@example.com'}</p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider px-3 mb-2">Main Menu</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E8DFF5] text-gray-900 shadow-sm border border-[#BFA2DB]'
                    : 'text-gray-600 hover:bg-[#F9F7FC] hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C62B5]' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#BFA2DB]/40 text-purple-900">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-gray-700' : 'text-gray-300'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer & Quick Actions */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#E8DFF5]/60 to-[#C7D2FE]/40 border border-[#BFA2DB]/40">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#8C62B5]" />
            <span className="text-xs font-bold text-gray-900">Pro Neural Pass</span>
          </div>
          <p className="text-[11px] text-gray-600">Unlimited high-accuracy OCR & real-time object tracking.</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2.5 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
