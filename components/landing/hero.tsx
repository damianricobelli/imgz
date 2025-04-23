"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative overflow-hidden pt-32 pb-20 md:pb-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          ref={ref}
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 bg-muted rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Simple. Powerful. Fast.</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Generate placeholder images
            <br />
            <span className="text-primary">in seconds</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Create custom placeholder images on-the-fly with a simple URL.
            Specify text, font, colors, format and background with just query
            parameters.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="gap-2" asChild>
              <a href="#playground">
                Get Started
                <span className="bg-background/20 px-2 py-0.5 rounded text-xs">
                  Free
                </span>
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#docs">View Documentation</a>
            </Button>
          </motion.div>

          <motion.div
            variants={imageVariants}
            className="relative mx-auto max-w-3xl"
          >
            <div className="bg-card border rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b bg-muted/50">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base space-y-4">
                <div>
                  <span className="text-muted-foreground">
                    # Basic dimensions
                  </span>
                  <pre className="mt-1 text-primary">
                    https://imgz.app/400x300
                  </pre>
                </div>

                <div>
                  <span className="text-muted-foreground">
                    # With custom text
                  </span>
                  <pre className="mt-1 text-primary">
                    https://imgz.app/600x400?text=Hello+World
                  </pre>
                </div>

                <div>
                  <span className="text-muted-foreground">
                    # With background color
                  </span>
                  <pre className="mt-1 text-primary">
                    https://imgz.app/800x600?bg=6d28d9&text=Purple+Background
                  </pre>
                </div>

                <div>
                  <span className="text-muted-foreground">
                    # With gradient background
                  </span>
                  <pre className="mt-1 text-primary">
                    https://imgz.app/800x600?bg=6d28d9-4c1d95
                  </pre>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    # With image format
                  </span>
                  <pre className="mt-1 text-primary">
                    https://imgz.app/800x600?format=webp
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
