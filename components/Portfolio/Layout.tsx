// components/Portfolio/Layout.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { HeroSection } from "./sections/HeroSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TestimonialSection } from "./sections/TestimonialSection";

// We only register GSAP plugins in the browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PortfolioLayout: React.FC = () => {
  // Adding a mount state to ensure DOM is ready
  const [isMounted, setIsMounted] = useState(false);

  // Creating refs for our sections
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // When component mounts, we'll set up our animations
  useEffect(() => {
    setIsMounted(true);

    // Return early if we're not mounted yet
    if (!isMounted) return;

    // Create a GSAP context for better cleanup
    const ctx = gsap.context(() => {
      // Let's wait a small bit to ensure DOM is fully ready
      setTimeout(() => {
        // We'll work with each section that needs parallax
        sectionsRef.current.forEach((section) => {
          if (!section) return;

          // First, let's ensure our section content is ready
          const content = section.querySelector(".section-content");
          if (!content) return;

          // Create our parallax effect
          gsap.to(content, {
            y: "-20%", // Move up by 20% of its height
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom", // Start when section top hits viewport bottom
              end: "bottom top", // End when section bottom hits viewport top
              scrub: 1, // Smooth scrolling effect
              markers: process.env.NODE_ENV === "development",
            },
          });

          // Now animate the content elements
          const elements = content.children;
          if (elements.length) {
            // Create reveal animation
            gsap.fromTo(
              elements,
              {
                y: 50,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none reset",
                },
              }
            );
          }
        });
      }, 100); // Small delay to ensure everything is ready
    });

    // Cleanup when component unmounts
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMounted]); // Only run when mounted state changes

  // Helper function to add sections to our refs array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="relative bg-black">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black">
        <HeroSection />
      </section>

      {/* Horizontal Scroll Section */}
      <section className="min-h-screen bg-black">
        <HorizontalScroll />
      </section>

      {/* Projects Section with parallax */}
      <section
        ref={addToRefs}
        className="relative min-h-screen overflow-hidden bg-black py-20"
      >
        <div className="section-content transform-gpu">
          <div className="max-w-7xl mx-auto px-6">
            <ProjectsSection />
          </div>
        </div>
      </section>

      {/* Skills Section with parallax */}
      <section
        ref={addToRefs}
        className="relative min-h-screen overflow-hidden bg-gray-900 py-20"
      >
        <div className="section-content transform-gpu">
          <div className="max-w-7xl mx-auto px-6">
            <SkillsSection />
          </div>
        </div>
      </section>

      {/* Testimonials Section with parallax */}
      <section
        ref={addToRefs}
        className="relative min-h-screen overflow-hidden bg-black py-20"
      >
        <div className="section-content transform-gpu">
          <div className="max-w-7xl mx-auto px-6">
            <TestimonialSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioLayout;
