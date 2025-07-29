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
                        className=" bg-gray-500 font-semibold py-3 px-6 rounded-2xl"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="border border-gray-300 rounded-2xl px-4 py-2"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertDialog
