// features/chat/components/TypingIndicator.jsx

export default function TypingIndicator({ users }) {
    if (users.length === 0) return null;

    let text;

    if (users.length === 1) {
        text = `${users[0]} is typing`;
    } else if (users.length === 2) {
        text = `${users[0]} and ${users[1]} are typing`;
    } else {
        text = `${users.length} people are typing`;
    }

    return (
        <div className="px-6 py-2 text-sm text-slate-500 flex items-center gap-2">
            <div className="flex gap-1">
                <span
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                />
                <span
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                />
                <span
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                />
            </div>

            <span>{text}...</span>
        </div>
    );
}
