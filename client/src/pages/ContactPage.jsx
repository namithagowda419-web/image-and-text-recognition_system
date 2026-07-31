import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { useRecognition } from '../context/RecognitionContext';

export default function ContactPage() {
  const { showToast } = useRecognition();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Message received! Our team will respond shortly.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-12 animate-fade-in">
      
      <div className="text-center space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
          Support & Contact
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Get in Touch with Our AI Team
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
          Have questions regarding Lumina AI recognition accuracy, custom model integration, or enterprise API keys?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Support Cards (4 Cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Email Support</h4>
            <p className="text-xs text-gray-500">support@lumina-ai.com</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-gray-900">Response SLA</h4>
            <p className="text-xs text-gray-500">Under 2 hours guarantee</p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#E8DFF5] to-[#C7D2FE] text-gray-900 space-y-2">
            <Sparkles className="w-5 h-5 text-[#8C62B5]" />
            <h4 className="text-sm font-bold">API Integration</h4>
            <p className="text-xs text-gray-700">Looking to connect Lumina OCR with your custom backend? Contact us for dedicated webhooks.</p>
          </div>
        </div>

        {/* Form (8 Cols) */}
        <div className="md:col-span-8 bg-white p-8 rounded-3xl border border-[#E8DFF5] shadow-card-luxury">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Thank You for Contacting Us</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Your inquiry has been logged in our queue. A senior AI engineer will respond to your email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-gradient-primary px-6 py-2.5 rounded-2xl text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Inquiry Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none font-medium"
                >
                  <option value="general">General Inquiry</option>
                  <option value="api">API Key & Webhooks</option>
                  <option value="models">Custom Model Training</option>
                  <option value="bug">Report an Issue</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Message</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with Lumina AI?"
                  className="w-full p-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gradient-primary w-full py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-gray-800" />
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
