
export default function EmbeddedVerse() {
  return (
    <div className="relative p-[1px] rounded-2xl overflow-hidden max-w-2xl group shadow-sm">
      <div className="absolute inset-0 animated-gradient-border opacity-70 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-white rounded-[15px] p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-2 border-b border-slate-100">
          <span>Surah Al-An'am [6:162]</span>
          <a href="https://quran.com" target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700 transition flex items-center space-x-1">
            <span>Quran.com</span>
            <i className="fa-solid fa-up-right-from-square text-[10px]"></i>
          </a>
        </div>
        {/* Render fallback layout handling if standard arabic web-fonts require loading latency buffers */}
        <p className="font-serif text-right text-xl sm:text-2xl text-slate-900 leading-loose py-2 tracking-wide font-normal selection:bg-emerald-100 break-words">
          قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ
        </p>
        <p className="text-xs text-slate-500 italic leading-relaxed pt-1 font-sans">
          "Say, 'Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds.'"
        </p>
      </div>
    </div>
  );
}