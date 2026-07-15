import { useRef, useState } from "react";
import socket from "../services/socket.js";

export default function CompositionInput({ onSendMessage }) {
    const [typedValue, setTypedValue] = useState("");
    const typingTimeout = useRef(null);

    const handleChange = e => {
        setTypedValue(e.target.value);

        socket.emit("typing", true);

        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
            socket.emit("typing", false);
        }, 1000);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!typedValue.trim()) return;

        onSendMessage(typedValue.trim());
        setTypedValue("");
        clearTimeout(typingTimeout.current);
        socket.emit("typing", false);
    };

    return (
        <div className="safe-bottom p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-50 border border-slate-200 rounded-2xl focus-within:bg-white focus-within:border-emerald-600
                           focus-within:ring-4 focus-within:ring-emerald-600/5 transition duration-200
                           flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 shadow-xs"
            >
                <button
                    type="button"
                    className="hidden sm:flex text-slate-400 hover:text-emerald-600 transition p-2 rounded-full hover:bg-slate-100 flex-shrink-0"
                    aria-label="Attach"
                >
                    <i className="fa-solid fa-paperclip"></i>
                </button>

                <input
                    type="text"
                    value={typedValue}
                    onChange={handleChange}
                    placeholder="Message #public-lobby... (e.g., #6:162)"
                    className="bg-transparent flex-1 min-w-0 focus:outline-none text-sm text-slate-800 px-1.5 py-2 placeholder-slate-400"
                />

                <button
                    type="button"
                    className="text-slate-400 hover:text-emerald-600 transition p-2 rounded-full hover:bg-slate-100 flex-shrink-0"
                    aria-label="Emoji"
                >
                    <i className="fa-regular fa-face-smile"></i>
                </button>

                <button
                    type="submit"
                    disabled={!typedValue.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600
                               text-white w-9 h-9 rounded-full text-sm transition duration-150 flex items-center justify-center flex-shrink-0"
                    aria-label="Send"
                >
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
            </form>
        </div>
    );
}
