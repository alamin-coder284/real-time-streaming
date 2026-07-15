import { io } from "socket.io-client";

const baseURL = "https://pulse9.onrender.com";
const socket = io(baseURL);

export default socket;