import React from "react";

export const NewsCardSkeleton = () => {
    return (
        <div className="animate-pulse bg-white rounded-2xl shadow p-4 space-y-4">
            <div className="h-80 bg-gray-200 rounded-xl" />
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
    );
};
