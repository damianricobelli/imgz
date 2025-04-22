"use client";

import { Github, MailIcon, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/logo";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const linkGroups = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Examples", href: "#examples" },
        { label: "Documentation", href: "#docs" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Cookies", href: "#" },
      ],
    },
  ];

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
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <Github size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="bg-secondary text-secondary-foreground p-2 rounded-full"
              >
                <MailIcon size={18} />
              </motion.a>
            </div>
          </div>

          {linkGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="font-medium text-lg mb-3">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link, linkIdx) => (
                  <motion.li key={linkIdx} whileHover={{ x: 2 }}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
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
