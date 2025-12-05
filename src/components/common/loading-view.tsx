"use client"
import {motion} from "motion/react";
export default function LoaderView() {
  return (
    <div className="w-full h-full min-h-100 flex items-center justify-center relative">
      <div className="absolute inset-0 pointer-events-none">
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
         
          className="w-full h-full blur-sm bg-linear-to-br from-43% from-transparent via-50% via-[#3b82f6] to-60% to-transparent bg-size-[200%_200%]"
        />
      </div>
      
    </div>
  );
}