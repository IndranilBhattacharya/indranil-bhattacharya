import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * SplashScreen Component
 *
 * A splash screen component that displays an animated sequence of text,
 * culminating in a name transformation animation.
 *
 * Animation Sequence:
 * 1. "Hello" appears and fades (800ms)
 * 2. "I Am" appears and fades (800ms)
 * 3. Full name "Indranil Bhattacharya" appears (1000ms)
 * 4. Transforms into "IB" and moves up (400ms)
 *
 * Total Duration: 3000ms (3 seconds)
 */
const SplashScreen = () => {
  // Controls the current animation phase (0-4)
  // 0: Initial/Hello
  // 1: I Am
  // 2: Full Name
  // 3: Name Fade Start
  // 4: Final State (IB)
  const [currentPhase, setCurrentPhase] = useState(0);

  // Setup animation sequence timings
  useEffect(() => {
    // Define timing for each phase in milliseconds
    const timings = [800, 800, 1000, 400]; // Total = 3000ms (3 seconds)
    const timeouts = [];
    let totalDelay = 0;

    // Create sequence of timeouts for each phase
    timings.forEach((delay, index) => {
      totalDelay += delay;
      timeouts.push(setTimeout(() => setCurrentPhase(index + 1), totalDelay));
    });

    // Cleanup timeouts on component unmount
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background dark:bg-background">
      {/* Initial "Hello" Animation 
          Appears first, fades out when phase changes */}
      <motion.div
        className="absolute text-4xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: currentPhase === 0 ? 1 : 0,
          y: currentPhase === 0 ? 0 : -20,
        }}
        transition={{ duration: 0.4 }}
      >
        Hello
      </motion.div>

      {/* "I Am" Animation
          Appears after "Hello" fades, then fades out */}
      <motion.div
        className="absolute text-4xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: currentPhase === 1 ? 1 : 0,
          y: currentPhase === 1 ? 0 : currentPhase < 1 ? 20 : -20,
        }}
        transition={{ duration: 0.4 }}
      >
        I Am
      </motion.div>

      {/* Name Animation Container
          Handles the full name to initials transformation */}
      <motion.div
        className="absolute flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: currentPhase >= 2 ? 1 : 0,
          y: currentPhase >= 4 ? -200 : currentPhase >= 2 ? 0 : 20,
        }}
        transition={{
          duration: 0.35,
          ease: [0.2, 0.0, 0.0, 1], // Custom easing for smooth motion
        }}
      >
        {/* Name Text Container
            Controls the spacing between first and last name */}
        <motion.div
          className="flex text-4xl font-bold items-center text-foreground"
          animate={{
            gap: currentPhase >= 4 ? "0px" : "0.75rem", // Controls name spacing
          }}
          transition={{
            duration: 0.35,
            ease: [0.2, 0.0, 0.0, 1],
          }}
        >
          {/* First Name Animation
              "I" remains while "ndranil" fades out */}
          <div className="flex items-center">
            <span>I</span>
            <motion.span
              animate={{
                width: currentPhase >= 4 ? 0 : "auto",
                opacity: currentPhase >= 4 ? 0 : 1,
              }}
              transition={{
                duration: 0.35,
                ease: [0.2, 0.0, 0.0, 1],
              }}
              className="overflow-hidden"
            >
              ndranil
            </motion.span>
          </div>

          {/* Last Name Animation
              "B" remains while "hattacharya" fades out */}
          <div className="flex items-center">
            <span>B</span>
            <motion.span
              animate={{
                width: currentPhase >= 4 ? 0 : "auto",
                opacity: currentPhase >= 4 ? 0 : 1,
              }}
              transition={{
                duration: 0.35,
                ease: [0.2, 0.0, 0.0, 1],
              }}
              className="overflow-hidden"
            >
              hattacharya
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Pattern
          Adds visual depth to the background */}
      <div
        className="fixed inset-0 -z-10 bg-dot-thick bg-muted/50 dark:bg-muted/20 
        [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        aria-hidden="true"
      />
    </div>
  );
};

export default SplashScreen;
