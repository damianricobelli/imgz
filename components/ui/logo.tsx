"use client";

import { Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className, size = 24, showText = true }: LogoProps) {
  return (
    <motion.div
      className={cn("flex items-center gap-2", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -5, 0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 5,
          }}
        >
          <Image size={size} className="text-primary" strokeWidth={2.5} />
        </motion.div>
      </div>
      {showText && (
        <span className="font-bold text-xl tracking-tight">imgz</span>
      )}
    </motion.div>
  );
}
