import React, { useState, useEffect } from 'react';
import { Upload, Camera, FileText, Sparkles, Copy, Download, RefreshCw, Check, Search, Eye, AlertCircle, Layers } from 'lucide-react';
import BoundingBoxCanvas from '../components/BoundingBoxCanvas';
import CameraModal from '../components/CameraModal';
import { detectObjectsInImage, extractTextFromImage } from '../utils/aiEngine';
import { copyToClipboard, downloadAsTxt, downloadAsPdf } from '../utils/exportUtils';
import { useRecognition } from '../context/RecognitionContext';

export default function WorkspacePage() {
  const { addHistoryItem, showToast } = useRecognition();
  
  const [activeTab, setActiveTab] = useState('object'); // 'object' | 'ocr'
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Object Detection State
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [top3Predictions, setTop3Predictions] = useState([]);
  const [objectSummary, setObjectSummary] = useState('');
  const [processingTime, setProcessingTime] = useState(0);

  // OCR State
  const [extractedText, setExtractedText] = useState('');
  const [ocrConfidence, setOcrConfidence] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample Presets
  const sampleImages = [
    { name: 'Office Laptop', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
    { name: 'Financial Invoice', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Cute Dog', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80' }
  ];

  // Run initial recognition on mount
  useEffect(() => {
    runRecognition(selectedImage);
  }, [activeTab]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      setSelectedImage(evt.target.result);
      runRecognition(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const runRecognition = async (imgUrl = selectedImage) => {
    setIsProcessing(true);

    if (activeTab === 'object') {
      const result = await detectObjectsInImage(imgUrl);
      setDetectedObjects(result.predictions || []);
      setTop3Predictions(result.top3 || []);
      setObjectSummary(result.summary || 'No recognizable object found.');
      setProcessingTime(result.durationMs || 0);
      setIsProcessing(false);

      if (result.success && (result.top3?.length > 0 || result.predictions?.length > 0)) {
        addHistoryItem({
          type: 'object_detection',
          title: `Object Detection: ${result.top3[0]?.label || result.predictions[0]?.label || 'Object'}`,
          imageUrl: imgUrl,
          summary: result.summary,
          detectedObjects: result.predictions,
          processingTimeMs: result.durationMs
        });
      }
    } else {
      const result = await extractTextFromImage(imgUrl);
      setExtractedText(result.text || 'No readable text detected.');
      setOcrConfidence(result.confidence || 0);
      setProcessingTime(result.durationMs || 0);
      setIsProcessing(false);

      if (result.success && result.text && result.text !== 'No readable text detected.') {
        addHistoryItem({
          type: 'ocr',
          title: 'OCR Text Extraction',
          imageUrl: imgUrl,
          summary: `Extracted ${result.wordCount} words with ${result.confidence}% confidence`,
          extractedText: result.text,
          processingTimeMs: result.durationMs
        });
      }
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(activeTab === 'ocr' ? extractedText : objectSummary);
    showToast('Copied to clipboard!', 'success');
  };

  const handleExportTxt = () => {
    downloadAsTxt(activeTab === 'ocr' ? extractedText : objectSummary);
    showToast('Exported result as TXT file', 'success');
  };

  const handleExportPdf = () => {
    downloadAsPdf({
      type: activeTab === 'ocr' ? 'ocr' : 'object_detection',
      predictions: detectedObjects.length > 0 ? detectedObjects : top3Predictions,
      extractedText,
      durationMs: processingTime
    });
    showToast('Generated PDF report', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8 animate-fade-in">
      
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E8DFF5] pb-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-[#E8DFF5] text-[#8C62B5] text-xs font-bold uppercase tracking-wider">
            AI Recognition Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Neural Vision & Text Processing Engine
          </h1>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-[#E8DFF5] shadow-card-luxury">
          <button
            onClick={() => setActiveTab('object')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'object'
                ? 'bg-[#E8DFF5] text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Eye className="w-4 h-4 text-[#8C62B5]" />
            Object Recognition
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ocr'
                ? 'bg-[#E8DFF5] text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <FileText className="w-4 h-4 text-[#8C62B5]" />
            OCR Text Extraction
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input & Preview Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* File Upload Zone */}
          <div className="glass-panel p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#8C62B5]" />
                Upload or Capture Target Image
              </h3>
              <button
                onClick={() => setIsCameraOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8DFF5] text-xs font-bold text-gray-700 hover:bg-[#E8DFF5]/50 flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Camera className="w-3.5 h-3.5 text-[#8C62B5]" />
                Webcam Snapshot
              </button>
            </div>

            {/* Drag and drop input box */}
            <label className="border-2 border-dashed border-[#BFA2DB]/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#8C62B5] transition-colors bg-[#F9F7FC]/80 text-center">
              <div className="w-10 h-10 rounded-2xl bg-[#E8DFF5] flex items-center justify-center text-[#8C62B5] mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-gray-800">Click to browse or drop image here</p>
              <p className="text-[10px] text-gray-500 mt-1">Supports PNG, JPG, WEBP up to 20MB</p>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Preset Samples */}
            <div className="space-y-2 pt-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Try Preset Samples</p>
              <div className="grid grid-cols-3 gap-3">
                {sampleImages.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(sample.url);
                      runRecognition(sample.url);
                    }}
                    className={`relative rounded-xl overflow-hidden border transition-all text-left p-1 ${
                      selectedImage === sample.url ? 'border-[#8C62B5] ring-2 ring-[#BFA2DB]' : 'border-[#E8DFF5] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img src={sample.url} alt={sample.name} className="w-full h-16 object-cover rounded-lg" />
                    <span className="block text-[10px] font-bold text-gray-700 mt-1 truncate px-1">{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas & Visual Overlay Display */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                {activeTab === 'object' ? 'Visual Overlay Preview' : 'Source Document Preview'}
              </h3>
              <button
                onClick={() => runRecognition(selectedImage)}
                disabled={isProcessing}
                className="btn-gradient-primary px-4 py-1.5 rounded-full text-xs flex items-center gap-1.5 font-bold"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                {isProcessing ? 'Analyzing...' : 'Re-Run Neural AI'}
              </button>
            </div>

            {activeTab === 'object' ? (
              <BoundingBoxCanvas imageUrl={selectedImage} detectedObjects={detectedObjects.length > 0 ? detectedObjects : top3Predictions} />
            ) : (
              <div className="rounded-2xl overflow-hidden border border-[#E8DFF5] shadow-card-luxury bg-white">
                <img src={selectedImage} alt="OCR Source" className="w-full h-auto max-h-[400px] object-contain bg-gray-950/5 p-2" />
              </div>
            )}
          </div>
        </div>

        {/* Right Output & Analysis Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFF5] shadow-card-luxury space-y-6 relative">
            
            {/* Loading Overlay Spinner */}
            {isProcessing && (
              <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center space-y-3 p-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#BFA2DB] to-[#C7D2FE] flex items-center justify-center shadow-soft-glow animate-spin">
                  <Sparkles className="w-6 h-6 text-gray-800" />
                </div>
                <p className="text-xs font-bold text-gray-900">
                  {activeTab === 'object' ? 'Running MobileNet & COCO-SSD Neural Vision...' : 'Running Tesseract.js WebAssembly OCR...'}
                </p>
                <p className="text-[11px] text-gray-500">Analyzing pixels & visual tokens in real time</p>
              </div>
            )}

            {/* Header & Status */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  {activeTab === 'object' ? 'Detection & Top 3 Predictions' : 'Extracted Text (OCR)'}
                </h3>
                <p className="text-xs text-gray-500">Latency: {processingTime} ms</p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Completed
              </span>
            </div>

            {/* Object Detection Results Breakdown */}
            {activeTab === 'object' ? (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 bg-[#F9F7FC] p-3 rounded-2xl border border-[#E8DFF5] leading-relaxed font-medium">
                  {objectSummary}
                </p>

                {top3Predictions.length === 0 && detectedObjects.length === 0 ? (
                  <div className="p-8 text-center bg-[#F9F7FC] rounded-2xl border border-[#E8DFF5] space-y-2">
                    <AlertCircle className="w-8 h-8 text-gray-400 mx-auto" />
                    <p className="text-xs font-bold text-gray-700">No recognizable object found</p>
                    <p className="text-[11px] text-gray-500">Try uploading a clearer image with a distinct subject.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Top Predictions (MobileNet)</p>
                    <div className="space-y-2.5">
                      {(top3Predictions.length > 0 ? top3Predictions : detectedObjects).slice(0, 3).map((obj, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#E8DFF5] shadow-sm space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#8C62B5]"></span>
                              <span className="text-xs font-bold text-gray-900">{obj.label}</span>
                            </div>
                            <span className="text-xs font-extrabold text-[#8C62B5]">
                              {Math.round((obj.confidence || 0) * 100)}%
                            </span>
                          </div>

                          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#BFA2DB] to-[#6366F1] h-full rounded-full transition-all duration-500"
                              style={{ width: `${Math.round((obj.confidence || 0) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* OCR Extracted Text Breakdown */
              <div className="space-y-4">
                {/* Search in text */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search extracted text..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs focus:outline-none focus:ring-1 focus:ring-[#BFA2DB]"
                  />
                </div>

                {/* Text Area */}
                <textarea
                  rows={9}
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)}
                  placeholder="Extracted text will appear here..."
                  className="w-full p-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-mono text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#BFA2DB] leading-relaxed resize-none"
                />

                <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                  <span>Words: {extractedText === 'No readable text detected.' ? 0 : extractedText.trim().split(/\s+/).filter(Boolean).length}</span>
                  <span>Characters: {extractedText === 'No readable text detected.' ? 0 : extractedText.length}</span>
                  <span>Confidence: {ocrConfidence}%</span>
                </div>
              </div>
            )}

            {/* Export & Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-bold text-gray-800 hover:bg-[#E8DFF5]/60 flex items-center justify-center gap-2 transition-all"
              >
                <Copy className="w-4 h-4 text-[#8C62B5]" />
                Copy
              </button>

              <button
                onClick={handleExportTxt}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-[#F9F7FC] border border-[#E8DFF5] text-xs font-bold text-gray-800 hover:bg-[#E8DFF5]/60 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-[#8C62B5]" />
                Export TXT
              </button>

              <button
                onClick={handleExportPdf}
                className="btn-gradient-primary px-5 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          setSelectedImage(dataUrl);
          runRecognition(dataUrl);
        }}
      />
    </div>
  );
}
