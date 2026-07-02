import React from 'react';

export function PrayerCard() {
  return (
    <div className="bg-gradient-to-tr from-[#fcfdfd] to-[#f3faf7] border border-emerald-600/10 p-4 rounded-xl shadow-xs relative overflow-hidden group hover:shadow-md hover:shadow-emerald-900/5 transition duration-300">
      <div className="absolute -right-3 -bottom-3 text-slate-100 group-hover:text-emerald-100/40 group-hover:scale-110 transition duration-500 text-5xl">
        <i className="fa-solid fa-mosque"></i>
      </div>
      <div className="flex items-center space-x-2 text-xs text-emerald-700 font-semibold mb-2">
        <i className="fa-regular fa-clock animate-spin" style={{ animationDuration: '10s' }}></i>
        <span>Next Prayer Window</span>
      </div>
      <p className="text-sm font-bold text-slate-800">Dhuhr Inbound</p>
      <p className="text-[11px] text-slate-400 font-mono mt-0.5">Render automated quiet-mode: 42 mins</p>
      <div className="w-full bg-slate-100 h-1 rounded-full mt-3 overflow-hidden">
        <div className="bg-emerald-500 h-1 w-4/5 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}