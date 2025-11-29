import React from 'react';

export const CardBack = ({ isFlipped }: { isFlipped: boolean }) => (
  <div className={`absolute inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center transition-all duration-700 ${isFlipped ? 'opacity-100 rotate-y-0' : 'opacity-0 pointer-events-none -rotate-y-180'}`}>
      <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 bg-white/5 backdrop-blur-sm animate-pulse">
        <span className="text-4xl font-black text-white italic tracking-tighter">F1</span>
      </div>
  </div>
);