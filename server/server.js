import {Server} from 'socket.io';
import express from "express";
import http from "http";
import cors from 'cors';


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin: "*"},
    methods: ["GET", "POST"]
});

io.on('connection', (socket) => {
  console.log('User Connected: ', socket.id);
  
  // User থেকে "send_message" শুনো
  socket.on('send_message', (data) => {
    console.log('Message:', data.text);
    
    // io.emit = Room এর সবাইকে পাঠাও। তুমি সহ!
    io.emit('notification', { message: `User said: ${data.text}` });
  });
});




server.listen(3000, ()=>{
    console.log("Pulse server live on Port: 3000");
});