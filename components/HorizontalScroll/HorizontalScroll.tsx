// components/HorizontalScroll/HorizontalScroll.tsx
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import cn from "@/utils/cn";

import { sections } from "./data";
import { SectionContent } from "./SectionContent";
import { SCROLL_CONFIG } from "./constants";

// We'll register GSAP plugins in a useEffect to avoid SSR issues
const HorizontalScroll: React.FC = () => {
  // Track mounting state for handling animations
  const [isMounted, setIsMounted] = useState(false);

  // Create refs for DOM elements
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Initialize GSAP plugins and mounting state
  useEffect(() => {
    // Register plugins after component mounts
    gsap.registerPlugin(ScrollTrigger);
    // Set mounted state
    setIsMounted(true);
    // Initialize sections array
    sectionsRef.current = Array(sections.length).fill(null);
  }, []);

  // Set up animations after component is mounted
  useEffect(() => {
    if (!isMounted) return;

    // Create animation context
    const ctx = gsap.context(() => {
      if (!mainContainerRef.current || !sectionsContainerRef.current) return;

      // Create main scrolling timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainContainerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${SCROLL_CONFIG.SCROLL_LENGTH}`,
          invalidateOnRefresh: true,
        },
      });

      // Animate horizontal scroll
      tl.to(sectionsContainerRef.current, {
        x: () => {
          const totalWidth = sectionsContainerRef.current?.scrollWidth || 0;
          const viewportWidth = window.innerWidth;
          return -(totalWidth - viewportWidth);
        },
        ease: "none",
      });

      // Animate section contents
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const elements = section.querySelectorAll(".animate-in");

        gsap.from(elements, {
          y: SCROLL_CONFIG.ANIMATION_OFFSET,
          opacity: 0,
          duration: SCROLL_CONFIG.DURATION,
          stagger: SCROLL_CONFIG.STAGGER_DELAY,
          scrollTrigger: {
            trigger: section,
            containerAnimation: tl,
            start: "left center",
            toggleActions: "play none none reverse",
          },
        });
      });
    });

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMounted]); // Only run when mounted state changes

  // Initial render structure that matches on both server and client
  const renderContent = () => (
    <div
      ref={mainContainerRef}
      className="relative w-full overflow-hidden min-h-screen"
    >
      <div
        ref={sectionsContainerRef}
        className={cn(
          "flex h-full",
          "transform will-change-transform",
          isMounted
            ? "transition-opacity duration-500 opacity-100"
            : "opacity-0"
        )}
        style={{ width: `${sections.length * 100}vw` }}
      >
        {sections.map((section, i) => (
          <div
            key={section.id}
            ref={(element: HTMLDivElement | null) => {
              if (sectionsRef.current) {
                sectionsRef.current[i] = element;
              }
            }}
            className={cn(
              "w-screen h-full flex flex-col justify-center",
              "px-20 py-16",
              "transform-gpu",
              section.backgroundColor
            )}
          >
            <SectionContent section={section} isClient={isMounted} />
          </div>
        ))}
      </div>
    </div>
  );

  return renderContent();
};

export default HorizontalScroll;
