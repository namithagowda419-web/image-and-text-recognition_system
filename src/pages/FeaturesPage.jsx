import React from 'react';
import { Eye, FileText, Camera, Download, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeaturesPage({ setActiveTab }) {
  const featureList = [
    {
      title: 'Browser Edge Neural Vision',
      desc: 'TensorFlow.js Lite MobileNet models detect bounding boxes over objects directly inside your browser GPU with sub-500ms latency.',
      icon: Eye,
      details: ['Multi-object tracking', 'Confidence percentage meters', 'Custom canvas bounding box overlays']
    },
    {
      title: 'Precision WebAssembly OCR',
      desc: 'Extract formatted document text using Tesseract.js with full layout retention, word & character counters, and live text search.',
      icon: FileText,
      details: ['Editable text area', 'Search & term highlighting', 'Multi-language character sets']
    },
    {
      title: 'Webcam Optical Stream',
      desc: 'Snap photos directly from your desktop or mobile camera using native media APIs and feed them straight into the neural engine.',
      icon: Camera,
      details: ['Zero setup required', 'High-res canvas capture', 'Privacy-first client processing']
    },
    {
      title: 'PDF & TXT Export System',
      desc: 'Export analysis runs into formatted PDF documents or clean TXT files for archival, sharing, and audit reports.',
      icon: Download,
      details: ['One-click PDF generator', 'Raw TXT file download', 'Clipboard instant copy']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-16 animate-fade-in">
      
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
          Platform Capabilities
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Comprehensive Feature Set
        </h1>
        <p className="max-w-xl mx-auto text-sm text-gray-600">
          Explore every neural vision feature built into the Lumina Recognition platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureList.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-5 hover:shadow-soft-glow transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
                <Icon className="w-6 h-6" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-900">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100">
                {feat.details.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#8C62B5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge vs API Comparison Table */}
      <div className="glass-panel p-8 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-6">
        <h3 className="text-xl font-bold text-gray-900 text-center">Browser Edge vs Server API Execution</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-[#F9F7FC] text-gray-800 uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">Browser Edge Mode (Default)</th>
                <th className="py-3 px-4">Express API Fallback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">Inference Engine</td>
                <td className="py-3 px-4">WebGL / TensorFlow.js</td>
                <td className="py-3 px-4">Node.js Engine API</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">Latency Speed</td>
                <td className="py-3 px-4 text-emerald-700 font-bold">&lt; 350 ms</td>
                <td className="py-3 px-4">~ 420 ms</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-gray-900">Privacy Status</td>
                <td className="py-3 px-4 font-bold text-emerald-700">100% Local Browser</td>
                <td className="py-3 px-4">Encrypted REST Transit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
