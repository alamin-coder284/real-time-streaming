import { useEffect, useState } from "react";
import socket from "../services/socket.js";

export default function useChat(username) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const [privateChats, setPrivateChats] = useState({});
    const [mySocketId, setMySocketId] = useState("");

    function sendPrivateMessage(toUserId, text) {
        socket.emit("private-message", {
            toUserId,
            message: text
        });
    }

    useEffect(() => {
        socket.on("connect", () => {
            setMySocketId(socket.id);
        });

        socket.on("message-history", history => {
            setMessages(history);
        });

        socket.on("receive-message", message => {
            setMessages(prev => [...prev, message]);
        });

        socket.on("private-message", message => {
            setPrivateChats(prev => {
                const conversation = prev[message.fromUserId] || [];

                return {
                    ...prev,
                    [message.fromUserId]: [...conversation, message]
                };
            });
        });

        socket.on("user-joined", data => {
            setUsers(data.users);
        });

        socket.on("user-left", data => {
            setUsers(data.users);
        });

        socket.on("user-typing", ({ username, isTyping }) => {
            setTypingUsers(prev => {
                if (isTyping) {
                    if (prev.includes(username)) return prev;
                    return [...prev, username];
                }

                return prev.filter(user => user !== username);
            });
        });

        return () => {
            socket.off("message-history");
            socket.off("receive-message");
            socket.off("user-joined");
            socket.off("user-left");
            socket.off("user-typing");
            socket.off("private-message");
        };
    }, []);

    function sendMessage(text) {
        socket.emit("chat-message", text);
    }

    return {
        messages,
        users,
        typingUsers,
        sendMessage,
        privateChats,
        sendPrivateMessage,
        mySocketId,
    };
}
