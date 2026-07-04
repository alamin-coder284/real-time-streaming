import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
    methods: ["GET", "POST"]
});

const users = new Map();
const messageHistory = [];
const MAX_HISTORY = 50;

io.on("connection", socket => {
    console.log("User Connected: ", socket.id);

    //-- when a user joins the chatroom
    socket.on("user-join", username => {
        users.set(socket.id, {
            id: socket.id,
            username: username,
            joinedAt: new Date()
        });

        // boradcast to all users about new user joining
        io.emit("user-joined", {
            username: username,
            users: Array.from(users.value())
        });

        socket.emit("message-history", messageHistory);
        console.log(`${username} joined chatroom`);
    });

    // --joined

    //-- listen to chat messages
    socket.on("chat-message", message => {
        const user = users.get(socket.id);
        if (user) {
            const messageData = {
                id: Date.now(),
                userId: socket.id,
                username: user.username,
                text: message,
                timestamp: new Date().toISOString()
            };
            messageHistory.push(messageData);
            if (messageHistory.length > MAX_HISTORY) {
                messageHistory.shift();
            }
        }
    });
    // -- end listening to chat-message

    // show typing indicator
    socket.on("typing", isTyping => {
        const user = users.get(socket.id);
        if (user) {
            socket.boradcast.emit("user-typing", {
                username: user.username,
                isTyping: isTyping
            });
        }
    });

    // -- ends typing indicator

    // handling private messages

    socket.on("private-message", ({ toUserId, message }) => {
        const fromUser = users.get(socket.id);
        const toUser = users.get(toUserId);

        if (fromUser && toUser) {
            const privateMessage = {
                from: fromUser.username,
                to: toUser.username,
                text: message,
                timestamp: new Date().toISOString()
            };
        }

        socket.emit("private-message", privateMessage);
        io.to(toUserId).emit("private-message", privateMessage);
    });
    // -- end handling private messages
    
    socket.on('disconnect',()=>{
      const user = users.get(socket.id);
      
      if(user) {
        users.delete(socket.id);
        io.emit('user-left',{
          username: user.username,
          users: Array.from(users.value())
        });
        console.log(`${user.username} has left the chatroom!`);
      }
    });
    
    socket.on('error', (error)=>{
      console.log('Socket error: ', error);
    });
    
});

server.listen(3000, () => {
    console.log("Pulse server live on Port: 3000");
});
