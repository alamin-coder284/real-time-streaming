
export default function ToastStack({ toasts, onDismiss, onToastClick }) {
    if (toasts.length === 0) return null;

    return (
        <div
            className="fixed z-[200] flex flex-col gap-2 pointer-events-none
                       top-[calc(env(safe-area-inset-top)+4.25rem)] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm
                       md:top-auto md:left-auto md:translate-x-0 md:bottom-6 md:right-6 md:w-80"
        >
            {toasts.map(toast => (
                <button
                    key={toast.id}
                    onClick={() => onToastClick(toast)}
                    className="pointer-events-auto animate-toast-in flex items-start gap-3 rounded-xl border border-slate-200
                               bg-white/95 backdrop-blur px-4 py-3 shadow-lg shadow-slate-900/10 text-left
                               hover:border-emerald-300 transition group"
                >
                    <img
                        src={
                            toast.avatar ||
                            "https://ui-avatars.com/api/?name=" + encodeURIComponent(toast.title || "?")
                        }
                        alt=""
                        className="w-8 h-8 rounded-lg border border-slate-200 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                            <i className="fa-solid fa-comment-dots text-emerald-500 text-[10px]"></i>
                            <span className="text-xs font-semibold text-slate-800 truncate">
                                {toast.kind === "private" ? `${toast.title} · direct` : toast.title}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{toast.text}</p>
                    </div>
                    <span
                        onClick={e => {
                            e.stopPropagation();
                            onDismiss(toast.id);
                        }}
                        className="text-slate-300 group-hover:text-slate-400 transition text-xs mt-0.5"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            ))}
        </div>
    );
}
