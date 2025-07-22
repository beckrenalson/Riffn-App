function AlertDialog({ message, onConfirm, onCancel, isVisible }) {

    if (!isVisible) {
        return null;
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center p-4">

            <div className="bg-[#121212]/80 backdrop-blur border-gray-800 rounded-xl p-8 max-w-sm w-full">
                <p className="text-center mb-8">
                    {message}
                </p>

                <div className="flex flex-col justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="bg-green-600 font-semibold py-3 px-6 rounded-lg"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-400 font-semibold py-3 px-6 rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog
