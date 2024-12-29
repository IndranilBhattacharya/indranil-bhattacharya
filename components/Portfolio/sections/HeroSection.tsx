// components/Portfolio/sections/HeroSection.tsx
import React, { useCallback, WheelEvent, WheelEventHandler } from "react";
import Spline from "@splinetool/react-spline";

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
    <main className="w-full h-screen grid grid-cols-2 overflow-hidden">
      <h1 className="text-8xl font-bold leading-tight text-white">
        Making
        <br />
        Good
        <br />
        Shits
      </h1>

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
