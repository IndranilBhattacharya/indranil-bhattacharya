// components/Portfolio/sections/HeroSection.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import cn from "@/utils/cn";

// Register ScrollTrigger plugin only in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  // Create refs for animated elements
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure we're in browser environment and have our elements
    if (typeof window === "undefined") return;

    // Create entrance animation using GSAP context for better cleanup
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      // Set initial states for our elements
      gsap.set([headingRef.current, subheadingRef.current, ctaRef.current], {
        y: 50,
        opacity: 0,
      });

      // Create timeline for entrance animation
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      // Add our animations to the timeline with staggered timing
      tl.to(headingRef.current, {
        y: 0,
        opacity: 1,
      })
        .to(
          subheadingRef.current,
          {
            y: 0,
            opacity: 1,
          },
          "-=0.5"
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
          },
          "-=0.5"
        );

      // Add scroll-based animation for parallax effect
      gsap.to(containerRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef); // Scope our animations to the container

    // Clean up all animations when component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-7xl mx-auto px-6",
        "flex flex-col items-center justify-center text-center",
        "min-h-screen"
      )}
    >
      {/* Main heading with gradient text effect */}
      <h1
        ref={headingRef}
        className={cn(
          "text-7xl font-bold mb-6",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-blue-500 to-purple-500"
        )}
      >
        Creative Developer
      </h1>

      {/* Subheading with descriptive text */}
      <p ref={subheadingRef} className="text-xl text-gray-300 max-w-2xl mb-12">
        Crafting immersive digital experiences through code and creativity.
        Specializing in interactive web development and smooth animations.
      </p>

      {/* Call to action buttons */}
      <div ref={ctaRef} className="flex gap-6">
        <button
          className={cn(
            "px-8 py-3 rounded-full",
            "bg-blue-500 hover:bg-blue-600",
            "transition-colors duration-300"
          )}
        >
          View Projects
        </button>
        <button
          className={cn(
            "px-8 py-3 rounded-full",
            "border border-white/20",
            "hover:bg-white/10",
            "transition-colors duration-300"
          )}
        >
          Contact Me
        </button>
      </div>

      {/* Scroll indicator with bounce animation */}
      <div className="absolute bottom-12 animate-bounce">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};
