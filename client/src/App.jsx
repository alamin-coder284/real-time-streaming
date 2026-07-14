import React, { useEffect, useState } from "react";
import socket from "./features/chat/services/socket.js";
import MainLayout from "./layouts/MainLayout.jsx";
import MessageStream from "./features/chat/components/MessageStream.jsx";
import CompositionInput from "./features/chat/components/CompositionInput.jsx";
import JoinModal from "./features/chat/components/JoinModal.jsx";
import Chat from "./features/chat/Chat.jsx";

// Instantiate backend hook linkage instance globally to avoid component re-render loops
const CURRENT_ROOM = "public-lobby";

export default function App() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            setUsername(username);
        }
    }, []);

    return (
        <MainLayout>
            {!username && <JoinModal onJoin={setUsername} />}
            

            <Chat room={CURRENT_ROOM} username={username} />
        </MainLayout>
    );
}
