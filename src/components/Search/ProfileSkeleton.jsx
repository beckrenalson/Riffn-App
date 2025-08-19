function ProfileSkeleton() {
    return (
        <div className="flex items-center border p-3 rounded-2xl w-full mb-5 text-left border-gray-500 animate-pulse">
            {/* Avatar circle */}
            <div className="w-20 h-20 rounded-full bg-gray-700"></div>

            {/* Text placeholders */}
            <div className="pl-4 flex flex-col justify-center space-y-2">
                <div className="h-5 bg-gray-700 rounded-full w-32"></div>
                <div className="h-4 bg-gray-700 rounded-full w-24"></div>
            </div>
        </div>
    );
}

export default ProfileSkeleton;
