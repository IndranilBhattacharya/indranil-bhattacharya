// components/Portfolio/Layout.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { HeroSection } from "./sections/HeroSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";
import { TestimonialSection } from "./sections/TestimonialSection";

export const PortfolioLayout = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  return (
    <div ref={scrollRef} className="bg-black">
      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex items-center justify-center"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.8]),
          y: useTransform(scrollYProgress, [0, 0.2], [0, -100]),
        }}
      >
        <HeroSection />
      </motion.section>

      {/* Horizontal Scroll Section */}
      <section className="min-h-screen">
        <HorizontalScroll />
      </section>

      {/* Projects Section - Appears as horizontal scroll completes */}
      <motion.section
        className="relative min-h-screen bg-black py-20"
        style={{
          opacity: useTransform(scrollYProgress, [0.4, 0.5], [0, 1]),
          y: useTransform(scrollYProgress, [0.4, 0.5], [100, 0]),
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <ProjectsSection />
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="relative min-h-screen bg-gray-900 py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <SkillsSection />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="relative min-h-screen bg-black py-20"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-20%" }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <TestimonialSection />
        </div>
      </motion.section>
    </div>
  );
};

export default PortfolioLayout;
