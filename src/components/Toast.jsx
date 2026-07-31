import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useRecognition } from '../context/RecognitionContext';

export default function Toast() {
  const { toastMessage } = useRecognition();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';
  const isError = toastMessage.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-soft-glow border backdrop-blur-md transition-all ${
        isSuccess
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
          : isError
          ? 'bg-red-50/90 border-red-200 text-red-900'
          : 'bg-white/90 border-[#E8DFF5] text-gray-900'
      }`}>
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        ) : isError ? (
          <AlertCircle className="w-5 h-5 text-red-600" />
        ) : (
          <Info className="w-5 h-5 text-[#8C62B5]" />
        )}
        <span className="text-xs font-semibold">{toastMessage.message}</span>
      </div>
    </div>
  );
}
