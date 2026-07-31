import React, { useState } from 'react';
import { LayoutDashboard, Image, FileText, TrendingUp, CheckCircle, Clock, Search, Filter, Bell, Download, Trash2, Eye, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useRecognition } from '../context/RecognitionContext';

export default function DashboardPage({ setActiveTab }) {
  const { history, deleteHistoryItem, showToast } = useRecognition();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'object_detection' | 'ocr'
  const [selectedItem, setSelectedItem] = useState(null);

  const stats = [
    { title: 'Images Processed', value: '14,892', change: '+12.4%', icon: Image },
    { title: 'OCR Requests', value: '9,240', change: '+8.1%', icon: FileText },
    { title: 'Accuracy Rate', value: '99.4%', change: '+0.3%', icon: CheckCircle },
    { title: 'Storage Saved', value: '142 MB', change: '+18 MB', icon: TrendingUp }
  ];

  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 flex gap-8 animate-fade-in">
      
      {/* Sidebar Navigation */}
      <div className="hidden lg:block">
        <Sidebar activeTab="dashboard" setActiveTab={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DFF5] pb-6">
          <div>
            <span className="px-3 py-1 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
              Analytics Overview
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-1">Platform Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('workspace')}
              className="btn-gradient-primary px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              New Recognition Run
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">{st.title}</span>
                  <div className="w-8 h-8 rounded-xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900">{st.value}</h3>
                <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {st.change} vs last month
                </span>
              </div>
            );
          })}
        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Activity Chart Card */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900">Recognition Activity Trends</h3>
                <p className="text-xs text-gray-500">Real-time daily inference volume</p>
              </div>
              <span className="text-xs font-bold text-[#8C62B5] bg-[#E8DFF5] px-3 py-1 rounded-full">July 2026</span>
            </div>

            {/* Custom SVG Soft Gradient Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2">
              {[40, 65, 55, 80, 95, 70, 85, 100, 90, 110, 125, 105].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full bg-[#F3EEF9] rounded-t-xl overflow-hidden relative" style={{ height: '140px' }}>
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#BFA2DB] to-[#C7D2FE] rounded-t-xl transition-all duration-500 group-hover:from-[#8C62B5] group-hover:to-[#BFA2DB]"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium">d{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Doughnut Card */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Model Task Distribution</h3>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>Multi-Object Vision</span>
                  <span>62.4%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#BFA2DB] h-full rounded-full w-[62.4%]"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-gray-700">
                  <span>OCR Document Text</span>
                  <span>37.6%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#C7D2FE] h-full rounded-full w-[37.6%]"></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs space-y-1 mt-4">
                <span className="font-bold text-gray-900 block">Avg Engine Latency</span>
                <span className="text-gray-500 block">Browser WebGL: 310ms</span>
                <span className="text-gray-500 block">Tesseract WASM: 420ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities & History */}
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-gray-900">Recent Recognition Logs</h3>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search logs..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:outline-none focus:ring-1 focus:ring-[#BFA2DB]"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-semibold text-gray-700 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="object_detection">Object Detection</option>
                <option value="ocr">OCR Text</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-[#F9F7FC] text-gray-700 uppercase font-bold text-[10px] tracking-wider border-y border-[#E8DFF5]">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Title & Type</th>
                  <th className="py-3 px-4">Summary</th>
                  <th className="py-3 px-4">Latency</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9F7FC]/60 transition-colors">
                    <td className="py-3 px-4">
                      <img src={item.imageUrl} alt="Thumbnail" className="w-12 h-10 object-cover rounded-xl border border-[#E8DFF5]" />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 block">{item.title}</span>
                      <span className="text-[10px] text-[#8C62B5] font-semibold uppercase">{item.type}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate">{item.summary}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{item.processingTimeMs} ms</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1.5 rounded-lg bg-[#E8DFF5] text-[#8C62B5] hover:bg-[#BFA2DB] hover:text-gray-900 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
          <div className="bg-white rounded-3xl border border-[#E8DFF5] shadow-soft-glow max-w-lg w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-gray-900">{selectedItem.title}</h3>
            <img src={selectedItem.imageUrl} alt="Detail Preview" className="w-full h-48 object-cover rounded-2xl" />
            <p className="text-xs text-gray-600 bg-[#F9F7FC] p-3 rounded-2xl border border-[#E8DFF5] leading-relaxed">
              {selectedItem.extractedText || selectedItem.summary}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="btn-gradient-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
