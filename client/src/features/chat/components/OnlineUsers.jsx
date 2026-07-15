
const OnlineUsers = ({ users, typingUsers, isOpen, onClose, onSelectUser, unreadByUser = {} }) => {
    return (
        <>
            {isOpen && (
                <div onClick={onClose} className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-[90]" />
            )}

            <aside
                className={`fixed right-0 top-0 z-[100] h-full w-full max-w-xs sm:w-80 bg-white shadow-2xl
                            border-l border-slate-200 flex flex-col transition-transform duration-300
                            ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
                    <h2 className="text-sm font-semibold text-slate-800">Online · {users.length}</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Close">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1">
                    {users.length === 0 && (
                        <p className="px-5 py-6 text-sm text-slate-400 text-center">No one else is online yet.</p>
                    )}

                    {users.map(user => {
                        const unread = unreadByUser[user.id] || 0;
                        const isTyping = typingUsers.includes(user.username);

                        return (
                            <button
                                key={user.id}
                                onClick={() => onSelectUser(user)}
                                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition text-left"
                            >
                                <div className="relative flex-shrink-0">
                                    <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-800 truncate">{user.username}</p>
                                    <p className={`text-xs truncate ${isTyping ? "text-emerald-600 font-medium" : "text-slate-500"}`}>
                                        {isTyping ? "Typing..." : "Active now"}
                                    </p>
                                </div>

                                {unread > 0 && (
                                    <span className="flex-shrink-0 bg-emerald-600 text-white text-[10px] font-bold min-w-[1.25rem] h-5 px-1.5 rounded-full flex items-center justify-center">
                                        {unread > 99 ? "99+" : unread}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};

export default OnlineUsers;
