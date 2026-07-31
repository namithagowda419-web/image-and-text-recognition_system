import React from 'react';
import { Sparkles, Cpu, Layers, ShieldCheck, Zap, Code, Database, ArrowRight } from 'lucide-react';

export default function AboutPage({ setActiveTab }) {
  const stackItems = [
    { name: 'React.js (v19)', desc: 'Modern component architecture with Vite HMR', icon: Code },
    { name: 'Tailwind CSS', desc: 'Custom Pearl White & Soft Lavender aesthetic palette', icon: Layers },
    { name: 'TensorFlow.js', desc: 'In-browser Lite MobileNet object detection model', icon: Cpu },
    { name: 'Tesseract.js', desc: 'WebAssembly multi-language OCR extraction engine', icon: Zap },
    { name: 'Node.js & Express', desc: 'RESTful API with CORS & JWT authentication', icon: Code },
    { name: 'MongoDB & Mongoose', desc: 'Document store with in-memory local fallback layer', icon: Database }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-16 animate-fade-in">
      
      {/* Vision Header */}
      <div className="text-center space-y-4">
        <span className="px-4 py-1.5 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
          About Lumina AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Where Neural Intelligence Meets <span className="italic font-serif text-[#8C62B5]">Soft Luxury Design</span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
          Lumina AI was engineered to break away from typical dark cyberpunk AI interfaces. We crafted a soothing Pearl White & Soft Lavender aesthetic inspired by Notion, Linear, Arc Browser, and Apple simplicity.
        </p>
      </div>

      {/* Tech Stack Matrix */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Technology Stack & Architecture</h2>
          <p className="text-xs text-gray-500">Built from scratch with modern frontend frameworks and edge AI runtimes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-3 hover:shadow-soft-glow transition-all">
                <div className="w-10 h-10 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture Flow Section */}
      <div className="glass-panel p-8 rounded-3xl border border-[#E8DFF5] shadow-soft-glow space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#8C62B5]" />
          Edge-First Data Flow Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 bg-white rounded-2xl border border-[#E8DFF5] space-y-2">
            <span className="text-xs font-bold text-[#8C62B5] uppercase">Layer 01</span>
            <h4 className="text-sm font-bold text-gray-900">Local Browser Runtime</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Images and webcam feeds are evaluated directly inside the browser using WebGL and WebAssembly.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DFF5] space-y-2">
            <span className="text-xs font-bold text-[#8C62B5] uppercase">Layer 02</span>
            <h4 className="text-sm font-bold text-gray-900">Express REST Backend</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Handles history persistence, account management, JWT authentication, and export endpoints.</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8DFF5] space-y-2">
            <span className="text-xs font-bold text-[#8C62B5] uppercase">Layer 03</span>
            <h4 className="text-sm font-bold text-gray-900">Hybrid Persistence</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Mongoose ORM backed by MongoDB with an in-memory data store for 100% offline capability.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#BFA2DB] to-[#C7D2FE] text-gray-900 text-center space-y-4 shadow-soft-glow">
        <h3 className="text-2xl font-bold font-sans">Ready to experience Lumina AI?</h3>
        <p className="text-xs font-medium text-gray-800 max-w-lg mx-auto">
          Start recognizing multi-class objects and extracting high-accuracy document text today.
        </p>
        <button
          onClick={() => setActiveTab('workspace')}
          className="px-8 py-3.5 rounded-full bg-white text-gray-900 text-xs font-bold shadow-md hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          Launch AI Workspace
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
