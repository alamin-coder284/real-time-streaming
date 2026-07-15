import { io } from "socket.io-client";
const socket = io("https://pulse9.onrender.com");

export default socket;