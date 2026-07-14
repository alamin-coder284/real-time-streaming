import { useState } from "react";

const OnlineUsers = ({ users, typingUsers, isOpen, onClose, onSelectUser }) => {
    
    return (
        <div
            className={`z-[100] fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-slate-200 transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-100"
            >
                <i className="fa-solid fa-xmark"></i>
            </button>
            <aside className="h-full border-l border-slate-200 bg-white w-72 flex flex-col">
                <div className="px-5 py-4 border-b border-slate-200">
                    <h2 className="text-sm font-semibold text-slate-800">
                        Online · {users.length}
                    </h2>
                </div>

                <div className="overflow-y-auto">
                    {users.map(user => (
                        <div
                            onClick={() => {
                                console.log(user);
                                onSelectUser(user);
                            }}
                            key={user.id}
                            className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition"
                        >
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>

                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                            </div>

                            <div className="flex-1">
                                <p className="font-medium text-slate-800">
                                    {user.username}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {typingUsers.includes(user.username)
                                        ? "Typing..."
                                        : "Active now"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default OnlineUsers;
