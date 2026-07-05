
const Chat = ({username}) =>{
  useEffect(() => {
        // Notify the backend cluster instance to register this component instance to the target room
        socket.emit("user-join", username);
});
}
export default Chat;