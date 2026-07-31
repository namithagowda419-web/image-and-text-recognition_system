import React, { useState } from 'react';
import { Clock, Search, Trash2, Eye, Download, Copy, Calendar, Filter, Sparkles } from 'lucide-react';
import { useRecognition } from '../context/RecognitionContext';
import { copyToClipboard, downloadAsPdf, downloadAsTxt } from '../utils/exportUtils';

export default function HistoryPage({ setActiveTab }) {
  const { history, deleteHistoryItem, clearHistory, showToast } = useRecognition();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredHistory = history.filter(item => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesQuery = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.extractedText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DFF5] pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
            Recognition Audit Trail
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">Recognition History</h1>
        </div>

        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-xs font-bold hover:bg-red-100 transition-all"
            >
              Clear All Logs
            </button>
          )}
          <button
            onClick={() => setActiveTab('workspace')}
            className="btn-gradient-primary px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            New Recognition Run
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-3xl border border-[#E8DFF5] shadow-card-luxury flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, objects, or text..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E8DFF5] text-xs focus:ring-2 focus:ring-[#BFA2DB] focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['all', 'object_detection', 'ocr'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                filterType === type
                  ? 'bg-[#E8DFF5] text-gray-900 shadow-sm border border-[#BFA2DB]'
                  : 'bg-white text-gray-500 hover:bg-[#F9F7FC] border border-[#E8DFF5]'
              }`}
            >
              {type === 'all' ? 'All Logs' : type === 'object_detection' ? 'Object Detection' : 'OCR Text'}
            </button>
          ))}
        </div>
      </div>

      {/* History Grid Cards */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DFF5] space-y-4">
          <Clock className="w-12 h-12 text-gray-300 mx-auto" />
          <p className="text-sm font-bold text-gray-700">No recognition records found</p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">Try running an Object Detection or OCR task in the Workspace page.</p>
          <button
            onClick={() => setActiveTab('workspace')}
            className="btn-gradient-primary px-6 py-2.5 rounded-2xl text-xs font-bold inline-flex items-center gap-2"
          >
            Go to Workspace
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4 hover:shadow-soft-glow transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold uppercase text-[#8C62B5] shadow-sm">
                    {item.type === 'ocr' ? 'OCR Text' : 'Object Vision'}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  <p className="text-[11px] text-gray-400">{new Date(item.createdAt).toLocaleString()}</p>
                </div>

                <p className="text-xs text-gray-600 bg-[#F9F7FC] p-3 rounded-2xl border border-[#E8DFF5] line-clamp-3 leading-relaxed">
                  {item.extractedText || item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-500">{item.processingTimeMs} ms</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecord(item)}
                    className="p-2 rounded-xl bg-[#E8DFF5] text-[#8C62B5] hover:bg-[#BFA2DB] hover:text-gray-900 transition-all text-xs font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect
                  </button>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Inspect Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E8DFF5] shadow-soft-glow max-w-xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">{selectedRecord.title}</h3>
              <span className="px-3 py-1 rounded-full bg-[#E8DFF5] text-xs font-bold text-[#8C62B5]">
                {selectedRecord.type === 'ocr' ? 'OCR Text' : 'Object Detection'}
              </span>
            </div>

            <img src={selectedRecord.imageUrl} alt="Inspect preview" className="w-full h-52 object-cover rounded-2xl border border-[#E8DFF5]" />

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700">Detailed Result Content</span>
              <div className="p-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-mono text-gray-800 max-h-48 overflow-y-auto leading-relaxed">
                {selectedRecord.extractedText || selectedRecord.summary}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await copyToClipboard(selectedRecord.extractedText || selectedRecord.summary);
                    showToast('Copied to clipboard', 'success');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-bold text-gray-700 hover:bg-[#E8DFF5] flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={() => {
                    downloadAsPdf(selectedRecord);
                    showToast('Generated PDF report', 'success');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-bold text-gray-700 hover:bg-[#E8DFF5] flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export PDF
                </button>
              </div>

              <button
                onClick={() => setSelectedRecord(null)}
                className="btn-gradient-primary px-5 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
