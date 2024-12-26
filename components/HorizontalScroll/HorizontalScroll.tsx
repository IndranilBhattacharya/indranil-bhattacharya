// components/HorizontalScroll/HorizontalScroll.tsx
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import cn from "@/utils/cn";

import { sections } from "./data";
import { SectionContent } from "./SectionContent";
import { ScrollTimeline } from "./ScrollTimeline";

// Register GSAP plugins in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalScroll: React.FC = () => {
  // Track mounting state and scroll progress
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Create refs for our container elements
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize on mount
  useEffect(() => {
    setIsMounted(true);
    sectionsRef.current = Array(sections.length).fill(null);
  }, []);

  // Set up scroll animations after mount
  useEffect(() => {
    if (!isMounted || !wrapperRef.current || !containerRef.current) return;

    // Create animation context for better cleanup
    const ctx = gsap.context(() => {
      // Create the main scrolling timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true, // Pin the section while scrolling horizontally
          scrub: 1, // Smooth scrolling
          start: "top top", // Start at the top of the section
          end: () => {
            // Calculate end point based on content width
            const contentWidth = containerRef.current?.scrollWidth || 0;
            const viewportWidth = window.innerWidth;
            return `+=${contentWidth - viewportWidth}`;
          },
          invalidateOnRefresh: true, // Recalculate on resize
          onUpdate: (self) => {
            // Update scroll progress for timeline
            setScrollProgress(self.progress);
          },
        },
      });

      // Create the horizontal scrolling animation
      tl.to(containerRef.current, {
        x: () => {
          // Calculate the exact distance to scroll
          const contentWidth = containerRef.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          return -(contentWidth - viewportWidth);
        },
        ease: "none", // Linear scrolling
      });

      // Animate content elements as they come into view
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const elements = section.querySelectorAll(".animate-in");

        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              containerAnimation: tl,
              start: "left center",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    });

    // Cleanup function
    return () => ctx.revert();
  }, [isMounted]);

  // Helper function for setting section refs
  const setSectionRef = (index: number) => (element: HTMLDivElement | null) => {
    if (sectionsRef.current) {
      sectionsRef.current[index] = element;
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden min-h-screen bg-black"
    >
      {/* Progress indicator */}
      <ScrollTimeline progress={scrollProgress} />

      {/* Scrolling container */}
      <div
        ref={containerRef}
        className={cn(
          "flex h-full",
          "transform will-change-transform",
          "transition-opacity duration-500",
          isMounted ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: `${sections.length * 100}vw`, // Total width based on number of sections
          height: "100vh", // Full viewport height
        }}
      >
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={setSectionRef(index)}
            className={cn(
              "w-screen h-full", // Each section takes full viewport width
              "flex items-center justify-center", // Center content
              "px-20", // Horizontal padding
              section.backgroundColor // Background color from section data
            )}
          >
            <div className="relative">
              <SectionContent section={section} isClient={isMounted} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
