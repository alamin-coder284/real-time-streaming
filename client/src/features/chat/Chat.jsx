import { useEffect, useState } from "react";
import socket from "./services/socket.js";
import useChat from "./hooks/useChat.js";
import MessageStream from "./components/MessageStream.jsx";
import CompositionInput from "./components/CompositionInput.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";
import OnlineUsers from "./components/OnlineUsers.jsx";

const Chat = ({ username, room }) => {
    const [showUsers, setShowUsers] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const { messages, users, sendMessage, typingUsers, privateChats } = useChat(username);

    const handleSendMessage = text => {
        if (selectedUser) {
            socket.emit("private-message", {
                toUserId: selectedUser.id,
                message: text
            });
        } else {
            sendMessage(text);
        }
    };

    useEffect(() => {
        if (!username) return;
        // Notify the backend cluster instance to register this component instance to the target room
        socket.emit("user-join", username);
    }, [username]);
    return (
        <>
            <div className="bg-slate-50/50 border-b border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    
                    {!selectedUser&&                     <span className="text-emerald-500 text-lg font-mono animate-pulse">
                        #
                    </span>}


                    <div className="flex items-center gap-2">
                        {selectedUser && (
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-slate-500 hover:text-emerald-600"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                        )}

                        <h2 className="text-sm font-semibold">
                            {selectedUser ? selectedUser.username : room}
                        </h2>
                    </div>
                </div>

                <button
                    onClick={() => setShowUsers(true)}
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 transition"
                >
                    <i className="fa-solid fa-users"></i>
                    <span>Users</span>
                </button>
            </div>
            <OnlineUsers
                users={users}
                typingUsers={typingUsers}
                isOpen={showUsers}
                onClose={() => setShowUsers(false)}
                onSelectUser={setSelectedUser}
            />


<MessageStream
    messages={
        selectedUser
            ? privateChats[selectedUser.id] || []
            : messages
    }
/>
            <TypingIndicator users={typingUsers} />

            <CompositionInput onSendMessage={handleSendMessage} />
        </>
    );
};
export default Chat;
