import React from 'react';
import { Sparkles, Heart, ShieldCheck, Cpu, ArrowUpRight, Globe, Share2, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#F3EEF9] border-t border-[#E8DFF5] pt-16 pb-12 mt-20 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-200/80">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#BFA2DB] to-[#C7D2FE] flex items-center justify-center shadow-soft-glow">
                <Sparkles className="w-5 h-5 text-gray-800" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Lumina<span className="text-[#8C62B5] italic font-serif font-normal">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium soft-aesthetic AI Image & Text Recognition platform. Edge neural inference, real-time OCR extraction, and interactive visual insights.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-white text-gray-600 hover:text-[#8C62B5] hover:bg-[#E8DFF5] transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white text-gray-600 hover:text-[#8C62B5] hover:bg-[#E8DFF5] transition-all">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white text-gray-600 hover:text-[#8C62B5] hover:bg-[#E8DFF5] transition-all">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('workspace')} className="hover:text-gray-900 transition-colors">AI Workspace</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-gray-900 transition-colors">Analytics Dashboard</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-gray-900 transition-colors">Recognition History</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('features')} className="hover:text-gray-900 transition-colors">Neural Features</button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-gray-900 transition-colors">About Lumina</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-gray-900 transition-colors">Support & Contact</button>
              </li>
              <li>
                <a href="#faq" onClick={() => setActiveTab('landing')} className="hover:text-gray-900 transition-colors">FAQ & Specs</a>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  AI API v2.4 Active
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Status */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-gray-500">Subscribe for neural engine updates, model releases, and API announcements.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#E8DFF5] text-xs focus:outline-none focus:ring-2 focus:ring-[#BFA2DB]"
              />
              <button className="btn-gradient-primary px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center font-bold">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Lumina AI Platform. All rights reserved. Crafted with precision & soft luxury design.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
