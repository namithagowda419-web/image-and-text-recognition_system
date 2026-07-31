import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Check } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setErrorMsg('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setErrorMsg('Unable to access camera device. Please ensure permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraReady(false);
  };

  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    onCapture(dataUrl);
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-[#E8DFF5] shadow-soft-glow max-w-2xl w-full p-6 space-y-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#8C62B5]" />
            <h3 className="text-base font-bold text-gray-900">Live Camera Snapshot</h3>
          </div>
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg ? (
          <div className="p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-100 text-sm">
            {errorMsg}
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-xs gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-[#BFA2DB]" />
                Initializing Optical Stream...
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => { stopCamera(); onClose(); }}
            className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!isCameraReady}
            onClick={handleSnap}
            className="btn-gradient-primary px-6 py-2.5 rounded-full text-xs flex items-center gap-2 font-bold disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            Capture Photo
          </button>
        </div>
      </div>
    </div>
  );
}
