import { ClipLoader } from "react-spinners";

function Loading() {
    return (
        <div className="flex justify-center items-center h-screen">
            <ClipLoader color="#FFFFFF" size={60} />
        </div>
    );
}

export default Loading