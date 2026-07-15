import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem.jsx";

const NEAR_BOTTOM_THRESHOLD = 120;

export default function MessageStream({ messages, username }) {
    const scrollRef = useRef(null);
    const prevCount = useRef(0);
    const [isNearBottom, setIsNearBottom] = useState(true);
    const [newBelowCount, setNewBelowCount] = useState(0);

    const isAtBottom = () => {
        const el = scrollRef.current;
        if (!el) return true;
        return el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_THRESHOLD;
    };

    const scrollToBottom = behavior => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollTo({ top: el.scrollHeight, behavior });
        setNewBelowCount(0);
        setIsNearBottom(true);
    };

    // On first mount for this conversation, jump straight to the latest message (no animation, no state churn)
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, []);

    useEffect(() => {
        const grew = messages.length > prevCount.current;
        prevCount.current = messages.length;
        if (!grew) return;

        if (isAtBottom()) {
            requestAnimationFrame(() => scrollToBottom("smooth"));
        } else {
            const last = messages[messages.length - 1];
            const isOwn = last && last.username === username;
            if (isOwn) {
                requestAnimationFrame(() => scrollToBottom("smooth"));
            } else {
                // Intentional: surfaces a "N new messages" pill when the reader has scrolled up,
                // reacting to messages pushed in over the socket rather than a local render.
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setNewBelowCount(count => count + 1);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);

    return (
        <div className="relative flex-1 min-h-0">
            <div
                ref={scrollRef}
                onScroll={() => setIsNearBottom(isAtBottom())}
                className="h-full overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20"
            >
                {messages.map(msg => (
                    <MessageItem key={msg.id} message={msg} username={username} />
                ))}
            </div>

            {(!isNearBottom || newBelowCount > 0) && (
                <button
                    onClick={() => scrollToBottom("smooth")}
                    className="animate-pill-in absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2
                               bg-slate-900 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg
                               hover:bg-slate-800 transition"
                >
                    {newBelowCount > 0 ? (
                        <>
                            <i className="fa-solid fa-arrow-down text-[10px]"></i>
                            <span>{newBelowCount} new message{newBelowCount > 1 ? "s" : ""}</span>
                        </>
                    ) : (
                        <i className="fa-solid fa-arrow-down text-[10px]"></i>
                    )}
                </button>
            )}
        </div>
    );
}
