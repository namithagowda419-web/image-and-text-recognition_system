import React, { useState } from 'react';
import { Sparkles, Upload, FileText, ArrowRight, ShieldCheck, Eye, Cpu, Download, CheckCircle2, ChevronDown, Star, Zap } from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const sampleStats = [
    { label: 'Recognition Accuracy', value: '99.8%', desc: 'Powered by Edge Neural Networks' },
    { label: 'Images Recognized', value: '50,000+', desc: 'Across 120+ object classes' },
    { label: 'Processing Speed', value: '< 450ms', desc: 'Real-time WebGL inference' },
    { label: 'Supported Languages', value: '25+', desc: 'High-precision Tesseract OCR' }
  ];

  const features = [
    {
      title: 'Multi-Object AI Detection',
      desc: 'Instantly detect multiple object classes within any image with live bounding boxes and confidence metrics.',
      icon: Eye,
      tag: 'Neural Vision'
    },
    {
      title: 'Precision OCR Text Extraction',
      desc: 'Extract formatted text from invoices, documents, posters, and handwriting with 99.4% accuracy.',
      icon: FileText,
      tag: 'OCR Engine'
    },
    {
      title: 'Webcam Live Capture',
      desc: 'Capture photos directly from your browser camera and process them instantly without uploading.',
      icon: Upload,
      tag: 'Real-time'
    },
    {
      title: 'Multi-Format Exporting',
      desc: 'Download processed results as formatted TXT files or elegant PDF reports with one click.',
      icon: Download,
      tag: 'PDF & TXT'
    }
  ];

  const workflowSteps = [
    { step: '01', title: 'Upload or Capture', desc: 'Drag and drop an image, pick from sample presets, or snap a photo with your webcam.' },
    { step: '02', title: 'AI Neural Inference', desc: 'TensorFlow.js and Tesseract.js analyze visual tokens in under 500ms.' },
    { step: '03', title: 'Interactive Insights', desc: 'Inspect bounding box overlays, confidence levels, or edit extracted OCR text.' },
    { step: '04', title: 'Export & Store', desc: 'Download PDF reports, copy raw text, or save to your persistent history dashboard.' }
  ];

  const testimonials = [
    {
      name: 'Elena Rostova',
      role: 'Lead UI/UX Architect at Studio K',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment: 'The soft luxury aesthetic of Lumina is astonishing. It feels like an Apple product combined with the intelligence of modern neural models.'
    },
    {
      name: 'David Chen',
      role: 'Senior Machine Learning Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment: 'In-browser TensorFlow object detection with instant bounding boxes makes testing vision models a breeze. Sub-500ms latency is remarkable.'
    }
  ];

  const faqs = [
    { q: 'How does the AI Image & Text Recognition platform work?', a: 'Lumina uses client-side WebGL accelerated neural networks (@tensorflow-models/coco-ssd) for multi-object detection and WebAssembly Tesseract OCR for text extraction, paired with Node.js API fallbacks.' },
    { q: 'Can I export extracted text and object detection reports?', a: 'Yes! Every recognition run can be exported as a beautifully styled PDF report or plain TXT file, or copied to your clipboard with a single click.' },
    { q: 'Is my uploaded image data secure and private?', a: 'Absolute privacy by design. Image inference occurs directly inside your local browser runtime without sending sensitive imagery to third-party tracking services.' }
  ];

  return (
    <div className="space-y-24">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Floating Ambient Glow Background Shapes */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#BFA2DB]/40 via-[#E8DFF5]/60 to-[#C7D2FE]/40 rounded-full blur-3xl -z-10 animate-pulse-glow"></div>
        <div className="absolute top-10 left-10 w-24 h-24 rounded-3xl bg-[#E8DFF5]/70 backdrop-blur-md border border-white/80 animate-float shadow-soft-glow hidden lg:block"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#C7D2FE]/50 backdrop-blur-md border border-white/80 animate-float shadow-soft-glow hidden lg:block" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-5xl mx-auto text-center space-y-8 px-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#E8DFF5] shadow-card-luxury text-xs font-semibold text-[#8C62B5] animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Gen Soft Luxury AI Recognition Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.15] font-sans">
            Recognize Objects & Extract Text with <span className="bg-gradient-to-r from-[#8C62B5] via-[#A888C9] to-[#6366F1] bg-clip-text text-transparent italic font-serif">Soft Elegance</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
            Experience sub-second neural object detection, precision OCR text extraction, live webcam snapshots, and PDF export reporting in an Apple-inspired minimal interface.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('workspace')}
              className="btn-gradient-primary px-8 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 w-full sm:w-auto shadow-soft-glow"
            >
              <Upload className="w-5 h-5 text-gray-800" />
              Upload Image & Recognize
            </button>
            <button
              onClick={() => setActiveTab('workspace')}
              className="px-8 py-4 rounded-2xl bg-white border border-[#E8DFF5] text-sm font-bold text-gray-800 hover:bg-[#E8DFF5]/50 flex items-center gap-3 w-full sm:w-auto transition-all shadow-card-luxury"
            >
              <FileText className="w-5 h-5 text-[#8C62B5]" />
              Enter Text & OCR
            </button>
          </div>

          {/* Hero Illustration / Preview Card */}
          <div className="pt-10 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-3xl border border-[#E8DFF5] shadow-soft-glow relative overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
                alt="AI Visual Recognition Demo"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-sm transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Bounding Box Badges Overlay */}
              <div className="absolute top-12 left-16 px-3 py-1.5 rounded-full bg-[#BFA2DB] text-gray-900 font-bold text-xs shadow-md border border-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Laptop 98.4%
              </div>

              <div className="absolute bottom-16 right-20 px-3 py-1.5 rounded-full bg-[#C7D2FE] text-gray-900 font-bold text-xs shadow-md border border-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Coffee Cup 94.2%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sampleStats.map((stat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-[#E8DFF5] text-center space-y-2 shadow-card-luxury hover:translate-y-[-4px] transition-transform">
              <h3 className="text-3xl font-extrabold text-gray-900 font-sans bg-gradient-to-r from-[#8C62B5] to-[#6366F1] bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-xs font-bold text-gray-800">{stat.label}</p>
              <p className="text-[11px] text-gray-500">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Engineered for Luxury Performance
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Combining browser edge computing with soft minimalist aesthetic design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="bg-white p-7 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4 hover:shadow-soft-glow hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F9F7FC] border border-[#E8DFF5] text-[10px] font-bold text-gray-600">
                  {feat.tag}
                </span>
                <h3 className="text-base font-bold text-gray-900">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-[#C7D2FE]/60 text-indigo-900 text-xs font-bold uppercase tracking-wider">
            Workflow Timeline
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">How Lumina Operates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-[#E8DFF5] space-y-3 relative">
              <span className="text-3xl font-black text-[#BFA2DB] block">{step.step}</span>
              <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Loved by Designers & Engineers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-7 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">"{t.comment}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#BFA2DB]" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{t.name}</h4>
                  <p className="text-[10px] text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="max-w-3xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-[#E8DFF5] overflow-hidden shadow-sm">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between text-xs font-bold text-gray-900"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#8C62B5]' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
