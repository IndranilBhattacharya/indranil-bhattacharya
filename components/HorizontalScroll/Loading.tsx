// components/HorizontalScroll/Loading.tsx
import React from "react";
import cn from "@/utils/cn";

/**
 * Loading component provides a visually appealing and accessible loading state
 * It matches the layout of the main content to prevent layout shifts
 */
export const Loading: React.FC = () => {
  return (
    <progress
      className={cn(
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "bg-black bg-opacity-90",
        "transition-opacity duration-500"
      )}
      aria-valuetext="Loading portfolio content"
    >
      <div className="text-center">
        <div className="mb-4">
          {/* Animated loading indicator */}
          <svg
            className="w-12 h-12 animate-spin text-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
        <p className="text-white text-xl font-light">
          Preparing your experience...
        </p>
      </div>
    </progress>
  );
};
