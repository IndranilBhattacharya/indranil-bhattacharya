// components/HorizontalScroll/ScrollTimeline.tsx
import React from "react";

interface ScrollTimelineProps {
  progress: number; // Value between 0 and 1
}

export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({ progress }) => {
  // Calculate the width of the progress bar based on scroll progress
  const progressWidth = `${progress * 100}%`;

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-1/2">
      {/* Container for our timeline */}
      <div className="relative h-1 bg-gray-700 rounded-full overflow-hidden">
        {/* Progress indicator that grows as we scroll */}
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
};
