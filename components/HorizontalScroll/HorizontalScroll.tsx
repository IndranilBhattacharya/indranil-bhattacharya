// components/HorizontalScroll/HorizontalScroll.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import cn from "@/utils/cn";
import { sections } from "./data";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const HorizontalScroll = () => {
  useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Main transforms
  const x = useTransform(
    scrollYProgress,
    [0, 0.75],
    ["0vw", `-${(sections.length - 1) * 100}vw`]
  );

  const progressScale = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const progressOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 0.95],
    [0, 1, 1, 0]
  );

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentX = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress indicator */}
        <motion.div
          className="fixed top-8 left-1/2 w-1/2 h-1 bg-gray-800/20 -translate-x-1/2 rounded-full z-50"
          style={{ opacity: progressOpacity }}
        >
          <motion.div
            className="h-full w-full bg-white rounded-full origin-left"
            style={{ scaleX: progressScale }}
          />
        </motion.div>

        {/* Sections container */}
        <motion.div
          style={{ x }}
          className="absolute top-0 left-0 h-full flex w-[300vw]"
        >
          {sections.map((section) => (
            <div
              key={section.id}
              className={cn(
                "relative w-screen h-full flex-shrink-0",
                "flex items-center justify-center px-20",
                section.backgroundColor
              )}
            >
              {/* Background with parallax */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{ x: backgroundX }}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-4 p-8">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-full bg-white/5 aspect-square"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Content with counter-parallax */}
              <motion.div
                className="relative max-w-4xl"
                style={{ x: contentX }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: false, margin: "-25%" }}
                >
                  <h2
                    className="text-6xl font-bold mb-6 bg-clip-text text-transparent 
                             bg-gradient-to-r from-white to-white/50"
                  >
                    {section.title}
                  </h2>
                  <p className="text-xl text-white/80 leading-relaxed">
                    {section.subtitle}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
