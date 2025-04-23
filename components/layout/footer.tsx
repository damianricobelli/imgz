"use client";

import { Github, MailIcon, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t mt-24 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground max-w-xs">
              Generate placeholder images on-the-fly with our simple and
              powerful API. Perfect for developers and designers.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                href="https://x.com/damianricobelli"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="https://github.com/damianricobelli"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="mailto:dricobelli@gmail.com"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <MailIcon size={18} />
              </motion.a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} imgz. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Made with ❤️ for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
