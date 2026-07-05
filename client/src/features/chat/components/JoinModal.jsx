const Modal = ({ onJoin }) => {
    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username").trim();
        localStorage.setItem("username", username);
        onJoin(username);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    type="text"
                    placeholder="Enter your name:"
                />
                <button type="submit">Join</button>
            </form>
        </div>
    );
};
export default Modal;
