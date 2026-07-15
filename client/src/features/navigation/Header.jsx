
export default function Header({ username, onMenuClick }) {
  const initial = (username || "?").charAt(0).toUpperCase();

  return (
    <header className="safe-top bg-white border-b border-slate-200/80 px-3 sm:px-6 py-3 flex items-center justify-between shadow-sm z-20 flex-shrink-0">
      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden text-slate-500 hover:text-emerald-600 p-2 -ml-2 rounded-lg hover:bg-slate-50 transition"
          aria-label="Open rooms"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>

        <div className="relative text-white p-1.5 sm:p-2.5 rounded-xl flex items-center justify-center shadow-sm shadow-emerald-600/20 flex-shrink-0">
          <img src="pulse9_logo.png" alt="Pulse9" className="w-8 sm:w-10" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">PULSE_9</span>
            <span className="hidden sm:inline bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] px-2 py-0.5 rounded-md font-mono font-medium tracking-wide">GLOBAL-CLUSTER</span>
          </div>
          <p className="hidden sm:block text-xs text-slate-400 font-mono mt-0.5 truncate">Live syncing with Quran.com API v4</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
        <div className="hidden lg:flex items-center space-x-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-500">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Render Engine: <span className="text-slate-800 font-medium">99.8% uptime</span></span>
        </div>

        <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden sm:block text-slate-400 hover:text-slate-600 transition hover:scale-105 active:scale-95 duration-150">
          <i className="fa-brands fa-github text-xl"></i>
        </a>

        <div className="hidden sm:block h-6 w-[1px] bg-slate-200"></div>

        <div className="flex items-center space-x-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full ring-2 ring-emerald-100 group-hover:ring-emerald-400 transition duration-300 bg-emerald-600 text-white text-sm font-semibold flex items-center justify-center">
            {initial}
          </div>
          <i className="hidden sm:block fa-solid fa-angle-down text-xs text-slate-400 group-hover:text-slate-600 transition"></i>
        </div>
      </div>
    </header>
  );
}
