import { useEffect, useRef, useState } from "react";
import socket from "./features/chat/services/socket.js";
import MainLayout from "./layouts/MainLayout.jsx";
import JoinModal from "./features/chat/components/JoinModal.jsx";
import Chat from "./features/chat/Chat.jsx";
import ToastStack from "./features/chat/components/ToastStack.jsx";
import useChat from "./features/chat/hooks/useChat.js";

// The backend only ever runs one room today; kept as a named constant so
// wiring up additional rooms later is a one-line change, not a re-plumb.
const CURRENT_ROOM = "public-lobby";

export default function App() {
    const [username, setUsername] = useState(() => localStorage.getItem("username"));
    const [selectedUser, setSelectedUser] = useState(null);
    const [unreadRoom, setUnreadRoom] = useState(0);
    const [unreadByUser, setUnreadByUser] = useState({});
    const [toasts, setToasts] = useState([]);
    const [isTabVisible, setIsTabVisible] = useState(true);

    const { messages, users, sendMessage, typingUsers, privateChats } = useChat(username);

    const prevMessageCount = useRef(0);
    const prevPrivateCounts = useRef({});
    const selectedUserRef = useRef(selectedUser);
    useEffect(() => {
        selectedUserRef.current = selectedUser;
    }, [selectedUser]);

    useEffect(() => {
        if (!username) return;
        socket.emit("user-join", username);
    }, [username]);

    useEffect(() => {
        const handleVisibility = () => setIsTabVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, []);

    function pushToast(toast) {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts(prev => [...prev.slice(-2), { ...toast, id }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4500);
    }

    // Room messages: badge + toast whenever the room isn't the active view (or tab is hidden)
    useEffect(() => {
        if (messages.length > prevMessageCount.current) {
            const latest = messages[messages.length - 1];
            const viewingRoom = !selectedUserRef.current;
            if (latest && latest.type !== "system" && latest.username !== username) {
                if (!viewingRoom || !isTabVisible) {
                    setUnreadRoom(count => count + 1);
                    pushToast({
                        kind: "room",
                        title: latest.username,
                        text: latest.text,
                        avatar: latest.avatar,
                    });
                }
            }
        }
        prevMessageCount.current = messages.length;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, isTabVisible]);

    // Private messages: per-sender badge + toast whenever that thread isn't open
    useEffect(() => {
        Object.entries(privateChats).forEach(([userId, conversation]) => {
            const prevCount = prevPrivateCounts.current[userId] || 0;
            if (conversation.length > prevCount) {
                const latest = conversation[conversation.length - 1];
                const viewingThisThread = selectedUserRef.current && selectedUserRef.current.id === userId;
                if (latest && latest.username !== username && (!viewingThisThread || !isTabVisible)) {
                    setUnreadByUser(prev => ({
                        ...prev,
                        [userId]: (prev[userId] || 0) + 1,
                    }));
                    pushToast({
                        kind: "private",
                        title: latest.username,
                        text: latest.text,
                        userId,
                    });
                }
            }
            prevPrivateCounts.current[userId] = conversation.length;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [privateChats, isTabVisible]);

    function handleSelectUser(user) {
        setSelectedUser(user);
        if (user) {
            setUnreadByUser(prev => ({ ...prev, [user.id]: 0 }));
        }
    }

    function handleOpenRoom() {
        setSelectedUser(null);
        setUnreadRoom(0);
    }

    function handleToastClick(toast) {
        if (toast.kind === "private") {
            const user = users.find(u => u.id === toast.userId);
            if (user) handleSelectUser(user);
        } else {
            handleOpenRoom();
        }
        setToasts(prev => prev.filter(t => t.id !== toast.id));
    }

    return (
        <MainLayout username={username} unreadRoom={unreadRoom} onOpenRoom={handleOpenRoom}>
            {!username && <JoinModal onJoin={setUsername} />}

            <Chat
                room={CURRENT_ROOM}
                username={username}
                messages={messages}
                users={users}
                typingUsers={typingUsers}
                privateChats={privateChats}
                sendMessage={sendMessage}
                selectedUser={selectedUser}
                onSelectUser={handleSelectUser}
                unreadByUser={unreadByUser}
            />

            <ToastStack
                toasts={toasts}
                onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))}
                onToastClick={handleToastClick}
            />
        </MainLayout>
    );
}
