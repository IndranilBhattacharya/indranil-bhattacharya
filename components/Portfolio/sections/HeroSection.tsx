// components/Portfolio/sections/HeroSection.tsx
import React, { useCallback, WheelEvent, WheelEventHandler } from "react";
import Spline from "@splinetool/react-spline";
import { motion } from "motion/react";
import { Highlight } from "./ProjectsSection";
import StylizedButton from "@/components/ui/stylized-button";
import { LinkPreview } from "@/components/ui/link-preview";
import { myLinkedIn } from "@/constants/socials";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1], // Custom cubic-bezier for smooth motion
    },
  },
};

export default function HeroSection() {
  const wheelEventHandler: WheelEventHandler<HTMLDivElement> = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      if (!event.ctrlKey) {
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY,
          behavior: "auto",
        });
      }
    },
    []
  );

  return (
    <main className="pl-8 pr-4 w-full h-screen grid grid-cols-2 overflow-hidden">
      <motion.div
        className="flex flex-col justify-center px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading container */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[5rem] font-bold leading-tight tracking-tight text-foreground"
            variants={textVariants}
          >
            Bridging <Highlight>Design</Highlight>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-[5rem] font-bold leading-none tracking-tight text-foreground"
            variants={textVariants}
          >
            & <Highlight>Development</Highlight>
          </motion.h1>
        </div>
        {/* Introduction text container */}
        <div className="overflow-hidden">
          <motion.p
            className="mt-2 text-xl text-secondary-foreground leading-tight tracking-normal max-w-2xl"
            variants={textVariants}
          >
            Hi! I&apos;m{" "}
            <LinkPreview
              isStatic
              url={myLinkedIn}
              imageSrc="/images/me.webp"
              previewText="This is me! 😁"
              className="z-30 font-extrabold text-foreground"
            >
              Indranil Bhattacharya
            </LinkPreview>
            , Full-stack Developer & UI/UX Designer bringing creative visions to
            life since{" "}
            <LinkPreview
              previewText="Time flies right? ⌛"
              className="z-30 font-extrabold text-foreground"
            >
              2019
            </LinkPreview>
          </motion.p>
        </div>
        <StylizedButton
          className="mt-12"
          onClick={() => {}}
          revealChildren={"View Resume"}
        >
          About me
        </StylizedButton>
      </motion.div>

      {/* Right side for 3D content */}
      <div className="relative h-screen">
        <div className="absolute right-0 bottom-0 z-10 h-8 w-20 bg-black rounded"></div>
        {/* <Spline
          onWheel={wheelEventHandler}
          scene="https://prod.spline.design/C5mrs2sdu1PpdPXw/scene.splinecode"
        /> */}
      </div>
    </main>
  );
}
