// components/Portfolio/Layout.tsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import { HeroSection } from "./sections/HeroSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TestimonialSection } from "./sections/TestimonialSection";
// import { useLenis } from "@/hooks/useLenis";

// Register GSAP only in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const PortfolioLayout: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) return;

    // Create a GSAP context for better animation management
    const ctx = gsap.context(() => {
      // Allow DOM to settle before initializing animations
      setTimeout(() => {
        sectionsRef.current.forEach((section) => {
          if (!section) return;

          const content = section.querySelector(".section-content");
          if (!content) return;

          // Create a timeline for each section's animations
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top bottom", // Start when section's top reaches bottom of viewport
              end: "bottom top", // End when section's bottom reaches top of viewport
              scrub: 1, // Smooth scrolling effect
              markers: false,
              // For smoother animations
              invalidateOnRefresh: true,
            },
          });

          // First, set the initial state
          gsap.set(content, {
            y: "20%", // Start slightly moved down
            scale: 0.95, // Start slightly smaller
            opacity: 0.5, // Start partially transparent
          });

          // Then animate as the section comes into view
          tl.fromTo(
            content,
            {
              y: "20%", // Start position
              scale: 0.95,
              opacity: 0.5,
            },
            {
              y: "0%", // Move to natural position
              scale: 1, // Scale to full size
              opacity: 1, // Fade to full opacity
              ease: "none", // Linear animation for smooth scrolling
              // When section is in the middle of the viewport
              duration: 0.5,
            }
          ).to(content, {
            y: "-10%", // Move slightly up as it exits
            scale: 0.95, // Scale down slightly
            opacity: 0.5, // Fade out partially
            ease: "none",
            duration: 0.5,
          });

          // Animate individual elements within the section
          const elements = content.children;
          if (elements.length) {
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
                  start: "top 80%", // Start when section is 80% in view
                  toggleActions: "play none none reset",
                },
              }
            );
          }
        });
      }, 100);
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMounted]);

  // Helper function to manage section refs
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

      {/* Projects Section */}
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

      {/* Skills Section */}
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

      {/* Testimonials Section */}
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
