import { useState } from "react";
import socket from "./services/socket.js";
import MessageStream from "./components/MessageStream.jsx";
import CompositionInput from "./components/CompositionInput.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";
import OnlineUsers from "./components/OnlineUsers.jsx";

const Chat = ({
    username,
    room,
    messages,
    users,
    typingUsers,
    privateChats,
    sendMessage,
    selectedUser,
    onSelectUser,
    unreadByUser,
}) => {
    const [showUsers, setShowUsers] = useState(false);

    const handleSendMessage = text => {
        if (selectedUser) {
            socket.emit("private-message", {
                toUserId: selectedUser.id,
                message: text,
            });
        } else {
            sendMessage(text);
        }
    };

    const activeMessages = selectedUser ? privateChats[selectedUser.id] || [] : messages;
    const typingInThisView = selectedUser
        ? typingUsers.includes(selectedUser.username)
            ? [selectedUser.username]
            : []
        : typingUsers;

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="bg-slate-50/50 border-b border-slate-200 p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    {selectedUser ? (
                        <button
                            onClick={() => onSelectUser(null)}
                            className="text-slate-500 hover:text-emerald-600 p-1 -ml-1 rounded-lg hover:bg-slate-100 transition flex-shrink-0"
                            aria-label="Back to room"
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                    ) : (
                        <span className="text-emerald-500 text-lg font-mono animate-pulse flex-shrink-0">#</span>
                    )}

                    <div className="flex items-center gap-2 min-w-0">
                        {selectedUser && (
                            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center justify-center text-xs flex-shrink-0">
                                {selectedUser.username.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <h2 className="text-sm font-semibold truncate">
                            {selectedUser ? selectedUser.username : room}
                        </h2>
                        {selectedUser && (
                            <span className="hidden sm:inline text-[10px] text-slate-400 font-mono">· direct message</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setShowUsers(true)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 sm:px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition flex-shrink-0"
                >
                    <i className="fa-solid fa-users"></i>
                    <span className="hidden sm:inline">Users</span>
                    <span className="text-xs text-slate-400 font-mono">{users.length}</span>
                </button>
            </div>

            <OnlineUsers
                users={users}
                typingUsers={typingUsers}
                isOpen={showUsers}
                onClose={() => setShowUsers(false)}
                onSelectUser={user => {
                    onSelectUser(user);
                    setShowUsers(false);
                }}
                unreadByUser={unreadByUser}
            />

            <MessageStream
                key={selectedUser ? `dm-${selectedUser.id}` : "room"}
                messages={activeMessages}
                username={username}
            />
            <TypingIndicator users={typingInThisView} />
            <CompositionInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chat;
