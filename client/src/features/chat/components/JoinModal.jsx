const Modal = ({ onJoin }) => {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username").trim();


        if (!username) return;

        localStorage.setItem("username", username);
        onJoin(username);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-emerald-600">
                        Pulse9
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Join the public conversation.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="username"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition
        focus:border-emerald-500
        focus:ring-4
        focus:ring-emerald-100"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-500 py-3 font-medium text-white transition hover:bg-emerald-600"
                        placeholder="Enter your name."
                    >
                        Join
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
