import React from 'react';

export default function LoadingSkeleton({ type = 'card' }) {
  if (type === 'analysis') {
    return (
      <div className="w-full space-y-4 p-6 glass-panel rounded-3xl animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#E8DFF5]"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-[#E8DFF5] rounded-full w-1/3"></div>
            <div className="h-3 bg-[#F3EEF9] rounded-full w-1/2"></div>
          </div>
        </div>
        <div className="h-48 bg-[#F3EEF9] rounded-2xl w-full"></div>
        <div className="space-y-2 pt-2">
          <div className="h-3 bg-[#E8DFF5] rounded-full w-5/6"></div>
          <div className="h-3 bg-[#E8DFF5] rounded-full w-4/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 bg-white rounded-3xl border border-[#E8DFF5] animate-pulse space-y-3">
          <div className="h-4 bg-[#E8DFF5] rounded-full w-1/2"></div>
          <div className="h-8 bg-[#F3EEF9] rounded-2xl w-1/3"></div>
          <div className="h-3 bg-[#E8DFF5] rounded-full w-3/4"></div>
        </div>
      ))}
    </div>
  );
}
