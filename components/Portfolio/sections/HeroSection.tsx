// components/Portfolio/sections/HeroSection.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { damping: 5, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const cursorSize = useSpring(60, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // Get cursor position relative to container
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      <div
        ref={containerRef}
        className="relative h-full w-full flex items-center justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Text with magnifying glass effect */}
        <h1
          className="text-8xl font-bold leading-tight text-white"
          onMouseEnter={() => cursorSize.set(150)}
          onMouseLeave={() => cursorSize.set(60)}
          style={{
            transform: "scale(1)",
            transformOrigin: "center center",
          }}
        >
          Making
          <br />
          Good
          <br />
          Shits
        </h1>

        {/* Glass cursor */}
        <motion.div
          className="absolute pointer-events-none rounded-full backdrop-blur-sm"
          style={{
            x: cursorX,
            y: cursorY,
            width: cursorSize,
            height: cursorSize,
            translateX: "-50%",
            translateY: "-50%",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            scale: 1.2,
          }}
        />
      </div>

      <div className="h-screen w-full">
        <iframe
          src="https://my.spline.design/untitled-d9bbb761f8b78c2a77b396afb35453cb/"
          className="w-full h-full"
          title="3D Model"
        />
      </div>
    </div>
  );
};
