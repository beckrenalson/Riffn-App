function ProfileSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl w-full border border-gray-600 bg-[#1a1a1a] shadow-sm animate-pulse mb-3">
            {/* Avatar circle - matches w-16 h-16 */}
            <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gray-700"></div>
            </div>

            {/* Text placeholders */}
            <div className="flex-1 min-w-0 space-y-2">
                {/* Username placeholder */}
                <div className="h-5 bg-gray-700 rounded w-32"></div>
                {/* Location placeholder */}
                <div className="h-4 bg-gray-700 rounded w-24"></div>
            </div>
        </div>
    );
}

export default ProfileSkeleton;