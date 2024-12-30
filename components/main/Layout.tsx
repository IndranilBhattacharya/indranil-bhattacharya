import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef } from "react";
import HeroSection from "../Portfolio/sections/HeroSection";
import { TestimonialSection } from "../Portfolio/sections/TestimonialSection";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Layout() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <div
      ref={scrollRef}
      onMouseMove={handleMouseMove}
      className="group relative w-full min-h-screen flex flex-col bg-background overflow-hidden"
    >
      <ThemeToggle />

      <div className="absolute inset-0 bg-dot-thick-neutral-200 dark:bg-dot-thick-neutral-800 pointer-events-none" />
      <motion.div
        className="pointer-events-none bg-dot-thick-indigo-300 dark:bg-dot-thick-indigo-500 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`radial-gradient(
            200px circle at ${mouseX}px ${mouseY}px,
            black 0%,
            transparent 100%
          )`,
          maskImage: useMotionTemplate`radial-gradient(
            200px circle at ${mouseX}px ${mouseY}px,
            black 0%,
            transparent 100%
          )`,
        }}
      />

      <motion.section
        className="relative z-20 w-full h-screen flex items-center justify-center"
        initial={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0.5]),
          scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.9]),
          y: useTransform(scrollYProgress, [0, 0.2], [0, -25]),
        }}
      >
        <HeroSection />
      </motion.section>

      <motion.section
        className="relative h-screen bg-black py-20"
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
}
