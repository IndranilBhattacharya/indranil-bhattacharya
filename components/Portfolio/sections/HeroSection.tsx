import Spline from "@splinetool/react-spline";
import { motion, Variants } from "motion/react";

import React, { useCallback, WheelEvent, WheelEventHandler } from "react";

import { myLinkedIn } from "@/constants/socials";
import TextHighlight from "@/components/ui/text-highlight";
import { LinkPreview } from "@/components/ui/link-preview";
import StylizedButton from "@/components/ui/stylized-button";

const containerVariants: Variants = {
  visible: {
    transition: {
      delayChildren: 1,
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
    <main className="pl-24 pr-4 w-full h-screen grid grid-cols-2 overflow-hidden">
      <motion.div
        className="flex flex-col justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading container */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-[5.5rem] font-bold leading-tight tracking-tight text-foreground"
            variants={textVariants}
          >
            Bridging <TextHighlight delay={2}>Design</TextHighlight>
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-[5.5rem] font-bold leading-none tracking-tight text-foreground"
            variants={textVariants}
          >
            & <TextHighlight>Development</TextHighlight>
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
              previewText="UI wizard at your service"
              className="z-30 font-extrabold text-foreground"
            >
              Indranil Bhattacharya
            </LinkPreview>
            , Full-stack Developer & UI/UX Designer bringing creative visions to
            life since{" "}
            <LinkPreview
              previewText="When I traded sleep for semicolons"
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
        <Spline
          onWheel={wheelEventHandler}
          scene="https://prod.spline.design/C5mrs2sdu1PpdPXw/scene.splinecode"
        />
      </div>
    </main>
  );
}
