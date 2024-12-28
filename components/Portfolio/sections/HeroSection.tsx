// components/Portfolio/sections/HeroSection.tsx
import { motion } from "framer-motion";
import cn from "@/utils/cn";

export const HeroSection = () => {
  return (
    <motion.div
      className={cn(
        "relative w-full max-w-7xl mx-auto px-6",
        "flex flex-col items-center justify-center text-center",
        "min-h-screen"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className={cn(
          "text-7xl font-bold mb-6",
          "bg-clip-text text-transparent",
          "bg-gradient-to-r from-blue-500 to-purple-500"
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Creative Developer
      </motion.h1>

      <motion.p
        className="text-xl text-gray-300 max-w-2xl mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Crafting immersive digital experiences through code and creativity.
        Specializing in interactive web development and smooth animations.
      </motion.p>

      <motion.div
        className="flex gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
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
      </motion.div>

      <motion.div
        className="absolute bottom-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
