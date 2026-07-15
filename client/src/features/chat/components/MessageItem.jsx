import EmbeddedVerse from "./EmbeddedVerse.jsx";

export default function MessageItem({ message, username }) {
    if (message.type === "system") {
        return (
            <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs text-slate-500 font-medium">{message.text}</span>
                <div className="h-px flex-1 bg-slate-200" />
            </div>
        );
    }

    const isOwn = message.username === username;

    return (
        <div
            className={`flex items-end gap-2.5 animate-message ${isOwn ? "flex-row-reverse" : ""}`}
            style={{ animationDelay: message.delay }}
        >
            {!isOwn && (
                <img
                    src={message.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(message.username)}
                    alt=""
                    className="w-8 h-8 rounded-lg border border-slate-200 flex-shrink-0 mb-0.5"
                />
            )}

            <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
                {!isOwn && (
                    <div className="flex items-baseline gap-2 mb-1 px-1">
                        <span className="font-semibold text-slate-900 text-xs hover:underline cursor-pointer">
                            {message.username}
                        </span>
                        {message.badge && (
                            <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 rounded-md font-mono font-bold">
                                {message.badge}
                            </span>
                        )}
                    </div>
                )}

                <div
                    className={`px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        isOwn
                            ? "bg-emerald-600 text-white rounded-2xl rounded-br-md"
                            : "bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-bl-md"
                    }`}
                >
                    {message.text}
                </div>

                <span className={`text-[10px] text-slate-400 font-mono mt-1 px-1 ${isOwn ? "text-right" : ""}`}>
                    {message.timestamp}
                </span>

                {message.hasVerse && (
                    <div className="mt-2 w-full">
                        <EmbeddedVerse />
                    </div>
                )}
            </div>
        </div>
    );
}
