import React, { useRef, useState } from "react";
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

        onSendMessage(typedValue);
        setTypedValue(""); // Clear input box value
        socket.emit("typing", false);
    };

    return (
        <div className="p-4 bg-white border-t border-slate-200">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/5 transition duration-200 flex flex-col shadow-xs"
            >
                <div className="flex items-center justify-between border-b border-slate-200/60 px-3 py-1.5 bg-slate-50/50 rounded-t-xl">
                    <div className="flex items-center space-x-3 text-slate-400 text-xs">
                        <button
                            type="button"
                            className="hover:text-slate-600 transition p-1"
                        >
                            <i className="fa-solid fa-paragraph"></i>
                        </button>
                        <button
                            type="button"
                            className="hover:text-slate-600 transition p-1"
                        >
                            <i className="fa-solid fa-bold"></i>
                        </button>
                        <button
                            type="button"
                            className="hover:text-slate-600 transition p-1"
                        >
                            <i className="fa-solid fa-code"></i>
                        </button>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>Parsing Socket Stream Active</span>
                    </div>
                </div>

                <div className="flex items-center p-3">
                    <input
                        type="text"
                        value={typedValue}
                        onChange={handleChange}
                        placeholder="Type a message to pulse9 or reference a surah tag... (e.g., #6:162)"
                        className="bg-transparent flex-1 focus:outline-none text-sm text-slate-800 px-1 placeholder-slate-400"
                    />
                    <div className="flex items-center space-x-2 pl-2">
                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs transition duration-150 flex items-center space-x-1.5"
                        >
                            <span>Send</span>
                            <i className="fa-regular fa-paper-plane text-[10px]"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
