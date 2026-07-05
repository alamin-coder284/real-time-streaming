import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MainLayout from "./layouts/MainLayout.jsx";
import MessageStream from "./features/chat/components/MessageStream.jsx";
import CompositionInput from "./features/chat/components/CompositionInput.jsx";
import JoinModal from "./features/chat/components/JoinModal.jsx";
import Chat from "./features/chat/Chat.jsx";

// Instantiate backend hook linkage instance globally to avoid component re-render loops
const socket = io("http://localhost:3000");
const CURRENT_ROOM = "public-lobby";

export default function App() {
    const [username, setUsername] = useState(null);
    const [messages, setMessages] = useState([
        {
            id: 0,
            username: "@system_bot",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
            badge: "Cluster Core",
            timestamp: "12:00 PM",
            content: "Welcome to the Pulse9 live stream matrix room.",
            hasVerse: false
        }
    ]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setUsername(username);
        }
    }, []);

    useEffect(() => {
        // Listens for structural payload relays broadcasting down from outside clients
        socket.on("message-history", data => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        // Cleanup logic on unmount routines
        return () => {
            socket.off("receive_message");
        };
    }, []);

    const handleSendMessage = messageText => {
        const messagePayload = {
            room: CURRENT_ROOM,
            username: "@current_user", // Local identity string mock tracking state
            content: messageText
        };

        // 1. Instantly push client message locally to our own user layout display
        /*
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        username: '@current_user',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
        badge: 'You',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: messageText,
        hasVerse: messageText.includes('#')
      }
    ]);
    */

        // 2. Deliver the payload transaction over to the websocket cluster pipeline nodes
        socket.emit("chat-message", messagePayload);
    };

    return (
        <MainLayout>
          <Chat username={username} />
            {!username && <JoinModal onJoin={setUsername} />}
            <div className="bg-slate-50/50 border-b border-slate-200/80 p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center space-x-3">
                    <span className="text-emerald-500 text-lg font-mono animate-pulse">
                        #
                    </span>
                    <h2 className="text-sm font-semibold text-slate-900">
                        {CURRENT_ROOM}
                    </h2>
                </div>
            </div>

            <MessageStream messages={messages} />
            <CompositionInput onSendMessage={handleSendMessage} />
        </MainLayout>
    );
}
