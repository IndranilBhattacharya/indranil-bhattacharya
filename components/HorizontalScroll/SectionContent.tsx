// components/HorizontalScroll/SectionContent.tsx
import React from "react";
import cn from "@/utils/cn";
import { SectionContentProps } from "./types";

/**
 * Renders the content of a single section, handling both SSR and client-side cases
 * @param {SectionContentProps} props - Component props
 */
export const SectionContent: React.FC<SectionContentProps> = ({
  section,
  isClient,
}) => {
  // Pre-hydration render: simple, SEO-friendly content
  if (!isClient) {
    return (
      <div className="opacity-0">
        <span>{section.subtitle}</span>
        <h2>{section.title}</h2>
        <div>
          {section.content.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>
      </div>
    );
  }

  // Post-hydration render: full animated content
  return (
    <>
      {/* Subtitle with animation class */}
      <span
        className={cn(
          "animate-in text-sm uppercase tracking-widest mb-4 opacity-80",
          "transform-gpu" // Enable hardware acceleration
        )}
      >
        {section.subtitle}
      </span>

      {/* Main title with animation class */}
      <h2 className={cn("animate-in text-6xl font-bold mb-8", "transform-gpu")}>
        {section.title}
      </h2>

      {/* Content grid with animation class */}
      <div className={cn("animate-in grid grid-cols-2 gap-8", "transform-gpu")}>
        {section.content.map((text, idx) => (
          <p key={idx} className="text-lg opacity-80 leading-relaxed">
            {text}
          </p>
        ))}
      </div>
    </>
  );
};
