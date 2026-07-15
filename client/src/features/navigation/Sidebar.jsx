import { PrayerCard } from '../../components/ui/PrayerCard.jsx';

export default function Sidebar({ isOpen, onClose, unreadRoom = 0, onOpenRoom }) {
  return (
    <>
      {/* Backdrop only exists on mobile, while the drawer is open */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-30 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 md:w-64 bg-white border-r border-slate-200
                    p-4 flex flex-col justify-between overflow-y-auto
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between md:hidden">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Rooms</span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">Stream Environment</label>
            <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg flex items-center justify-between cursor-pointer hover:bg-slate-100/50 transition duration-150 group">
              <span className="text-xs font-semibold text-slate-700 font-mono">prod-asia-pacific</span>
              <i className="fa-solid fa-sliders text-xs text-slate-400 group-hover:text-emerald-600 transition"></i>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">Active Rooms</label>

            <button
              onClick={onOpenRoom}
              className="w-full flex items-center justify-between bg-emerald-50/70 text-emerald-900 font-medium px-3 py-2.5 rounded-lg border-l-2 border-emerald-600 text-sm transition"
            >
              <span className="flex items-center space-x-2.5">
                <i className="fa-regular fa-comment-dots text-emerald-600 animate-pulse"></i>
                <span># public-lobby</span>
              </span>
              {unreadRoom > 0 ? (
                <span className="bg-amber-500 text-white text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold min-w-[1.25rem] text-center">
                  {unreadRoom > 99 ? '99+' : unreadRoom}
                </span>
              ) : (
                <span className="bg-emerald-600/10 text-emerald-700 text-[10px] font-mono px-1.5 py-0.5 rounded-md font-bold">412 live</span>
              )}
            </button>

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
    </>
  );
}
