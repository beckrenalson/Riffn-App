import { MoonLoader } from "react-spinners";

function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <MoonLoader color="#FFFFFF" size={60} />
        </div>
    );
}

export default Loading