import { motion } from "motion/react";

export default function TextHighlight({
  children,
  delay,
}: {
  readonly children: React.ReactNode;
  readonly delay?: number;
}) {
  return (
    <motion.span className="inline-block relative">
      <span className="text-foreground">{children}</span>
      <motion.span
        className="absolute inset-0 text-accent dark:text-primary"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{
          delay,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
