"use client";

import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 50], [0, 1]);
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 5]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 10);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      className={cn(
        "px-4 fixed top-0 left-0 right-0 z-50 transition-all duration-200 py-5",
        isScrolled && "backdrop-blur-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/0"
        style={{
          opacity,
          backdropFilter: `blur(${backdropBlur}px)`,
        }}
      />
      <div className="container mx-auto flex items-center justify-between relative">
        <Logo />

        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <motion.li
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <a href="#features" className="font-medium hover:text-primary">
                  Features
                </a>
              </motion.li>
              <motion.li
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <a
                  href="#playground"
                  className="font-medium hover:text-primary"
                >
                  Playground
                </a>
              </motion.li>
              <motion.li
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <a href="#docs" className="font-medium hover:text-primary">
                  Documentation
                </a>
              </motion.li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="outline" size="icon" asChild>
              <a
                href="https://github.com/damianricobelli/imgz"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="size-4" />
              </a>
            </Button>
            <Button asChild>
              <a href="#playground">Get Started</a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
