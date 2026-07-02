import React from 'react';
import { PrayerCard } from '../../components/ui/PrayerCard.jsx';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">Stream Environment</label>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition duration-150 group">
            <span className="text-xs font-semibold text-slate-700 font-mono">prod-asia-pacific</span>
            <i className="fa-solid fa-sliders text-xs text-slate-400 group-hover:text-emerald-600 transition"></i>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">Active Rooms</label>
          
          <a href="#" className="flex items-center justify-between bg-emerald-50/70 text-emerald-900 font-medium px-3 py-2.5 rounded-lg border-l-2 border-emerald-600 text-sm transition">
            <span className="flex items-center space-x-2.5">
              <i className="fa-regular fa-comment-dots text-emerald-600 animate-pulse"></i>
              <span># public-lobby</span>
            </span>
            <span className="bg-emerald-600/10 text-emerald-700 text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold">412 live</span>
          </a>

          <a href="#" className="flex items-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-3 py-2.5 rounded-lg text-sm transition group">
            <span className="flex items-center space-x-2.5">
              <i className="fa-solid fa-terminal text-slate-400 group-hover:text-slate-600 transition"></i>
              <span># dev-halaqah</span>
            </span>
          </a>

          <a href="#" className="flex items-center text-slate-600 hover:bg-slate-50 hover:text-slate-900 px-3 py-2.5 rounded-lg text-sm transition group">
            <span className="flex items-center space-x-2.5">
              <i className="fa-regular fa-bookmark text-slate-400 group-hover:text-slate-600 transition"></i>
              <span># ayah-sync</span>
            </span>
          </a>
        </div>

        <PrayerCard />
      </div>

      <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between font-mono">
        <span>Cluster node: <span className="text-slate-600 font-medium">p9-r1</span></span>
        <span className="hover:text-emerald-600 transition cursor-pointer">v2.1-live</span>
      </div>
    </aside>
  );
}