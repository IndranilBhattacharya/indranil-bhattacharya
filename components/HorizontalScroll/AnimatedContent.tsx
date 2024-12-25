// components/HorizontalScroll/AnimatedContent.tsx
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { sections } from "./data";
import { SCROLL_CONFIG } from "./constants";
import cn from "@/utils/cn";

export const AnimatedContent: React.FC = () => {
  // Create refs for our animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Initialize our refs array in useEffect to avoid SSR issues
  useEffect(() => {
    sectionsRef.current = new Array(sections.length).fill(null);
  }, []);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Create our animation context
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Configure hardware-accelerated transforms for better performance
      gsap.set(containerRef.current, {
        force3D: true,
        willChange: "transform",
      });

      // Create the main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${SCROLL_CONFIG.SCROLL_LENGTH}`,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      // Add the horizontal scroll animation
      tl.to(containerRef.current, {
        x: () => {
          const totalWidth = containerRef.current?.scrollWidth || 0;
          return -(totalWidth - window.innerWidth);
        },
        ease: "none",
        force3D: true,
      });

      // Create an intersection observer for optimized animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const elements = entry.target.querySelectorAll(".animate-in");
              gsap.fromTo(
                elements,
                {
                  y: 50,
                  opacity: 0,
                  force3D: true,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  stagger: 0.1,
                  ease: "power2.out",
                  force3D: true,
                }
              );
            }
          });
        },
        { threshold: 0.1 }
      );

      // Observe each section for animation triggers
      sectionsRef.current.forEach((section) => {
        if (section) observer.observe(section);
      });

      // Cleanup function for our animations and observers
      return () => {
        observer.disconnect();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-full transform-gpu will-change-transform",
        "transition-opacity duration-500"
      )}
      style={{ width: `${sections.length * 100}vw` }}
    >
      {sections.map((section, idx) => (
        <div
          key={section.id}
          // Fixed ref callback that properly handles null and doesn't return a value
          ref={(element: HTMLDivElement | null) => {
            if (sectionsRef.current) {
              sectionsRef.current[idx] = element;
            }
          }}
          className={cn(
            "w-screen h-full flex flex-col justify-center",
            "px-20 py-16 transform-gpu",
            section.backgroundColor
          )}
        >
          <span className="animate-in text-sm uppercase tracking-widest mb-4">
            {section.subtitle}
          </span>
          <h2 className="animate-in text-6xl font-bold mb-8">
            {section.title}
          </h2>
          <div className="animate-in grid grid-cols-2 gap-8">
            {section.content.map((text, i) => (
              <p key={i} className="text-lg opacity-80 leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
