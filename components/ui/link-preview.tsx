"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { encode } from "qss";
import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

type LinkPreviewProps = {
  url?: string;
  width?: number;
  height?: number;
  layout?: string;
  quality?: number;
  className?: string;
  previewText?: string;
  children: React.ReactNode;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url = "",
  className,
  previewText,
  width = 200,
  height = 125,
  quality = 50,
  imageSrc = "",
  layout = "fixed",
  isStatic = false,
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      meta: false,
      screenshot: true,
      colorScheme: "dark",
      embed: "screenshot.url",
      "viewport.isMobile": true,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
      "viewport.deviceScaleFactor": 1,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setIsOpen] = useState(false);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!event.target) return;
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root
      openDelay={50}
      closeDelay={100}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <HoverCardPrimitive.Trigger
        target="_blank"
        rel="noopener noreferrer"
        href={url || "//"}
        onMouseMove={handleMouseMove}
        onClick={(event) => {
          if (!url) event.preventDefault();
        }}
        className={cn("text-black dark:text-white", className, {
          "cursor-default": !url,
        })}
      >
        {children}
      </HoverCardPrimitive.Trigger>

      <HoverCardPrimitive.Content
        side="top"
        align="center"
        sideOffset={10}
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{
                y: 0,
                scale: 1,
                opacity: 1,
                transition: {
                  damping: 20,
                  type: "spring",
                  stiffness: 260,
                },
              }}
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{ x: translateX }}
              className="shadow-xl rounded-xl"
            >
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={url}
                onClick={(event) => {
                  if (!url) event.preventDefault();
                }}
                className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800 dark:bg-background"
                style={{
                  fontSize: 0,
                  maxWidth: !isStatic && !imageSrc ? "20vw" : "auto",
                }}
              >
                {!isStatic && !imageSrc ? (
                  <div
                    className={cn(
                      "p-4 text-base text-foreground whitespace-pre-wrap",
                      { "font-bold": !url }
                    )}
                  >
                    {previewText}
                  </div>
                ) : (
                  <>
                    <Image
                      src={isStatic ? imageSrc : src}
                      width={width}
                      height={height}
                      quality={quality}
                      layout={layout}
                      priority={true}
                      className="rounded-lg"
                      alt="preview image"
                    />
                    {previewText && (
                      <div className="p-2 text-sm text-foreground whitespace-pre-wrap">
                        {previewText}
                      </div>
                    )}
                  </>
                )}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};
