"use client";
import { motion } from "motion/react";
export default function LoaderView() {
  return (
    <div className="relative flex h-full min-h-100 w-full items-center justify-center">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{
            backgroundPosition: "200% 0%",
          }}
          animate={{
            backgroundPosition: "-100% 100%",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-full w-full bg-linear-to-br from-transparent from-43% via-[#3b82f6] via-50% to-transparent to-60% bg-size-[200%_200%] blur-sm"
        />
      </div>
    </div>
  );
}
