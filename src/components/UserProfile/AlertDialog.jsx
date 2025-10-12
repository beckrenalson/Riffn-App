function AlertDialog({ message, onConfirm, onCancel, isVisible, confirmText = "Confirm", cancelText = "Cancel", confirmButtonClass = "" }) {

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel}></div>

            {/* Dialog */}
            <div className="relative bg-zinc-900/95 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
                <p className="text-center text-zinc-200 mb-8 leading-relaxed">
                    {message}
                </p>

                <div className="flex flex-col justify-center gap-3">
                    <button
                        onClick={onConfirm}
                        className={`${confirmButtonClass || 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500'} text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700/50 rounded-xl px-6 py-3 font-semibold transition-all duration-200"
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog