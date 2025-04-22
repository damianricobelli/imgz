"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ArrowRight,
  LayoutGrid,
  Palette,
  Type,
  Zap,
  Settings,
  Layers,
  Globe,
} from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

function FeatureCard({
  title,
  description,
  icon,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      className="bg-card border rounded-lg p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="bg-primary/10 dark:bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}

export function Features() {
  const features = [
    {
      title: "Custom Dimensions",
      description:
        "Specify any width and height for your placeholder images. Perfect for any design mockup.",
      icon: <LayoutGrid className="text-primary h-6 w-6" />,
    },
    {
      title: "Custom Text",
      description:
        "Add your own text to the placeholder image to provide context or specify usage.",
      icon: <Type className="text-primary h-6 w-6" />,
    },
    {
      title: "Background Colors",
      description:
        "Choose from any HEX, RGB, or named color for the image background.",
      icon: <Palette className="text-primary h-6 w-6" />,
    },
    {
      title: "Fast Delivery",
      description:
        "Images are delivered through a global CDN for lightning-fast performance.",
      icon: <Zap className="text-primary h-6 w-6" />,
    },
    {
      title: "Advanced Options",
      description:
        "Control font size, text color, padding, and more through URL parameters.",
      icon: <Settings className="text-primary h-6 w-6" />,
    },
    {
      title: "Format Options",
      description:
        "Choose between JPG, PNG, and WebP formats to suit your specific needs.",
      icon: <Layers className="text-primary h-6 w-6" />,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple URL, powerful features
          </h2>
          <p className="text-xl text-muted-foreground">
            Generate the perfect placeholder image with just a URL and a few
            parameters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-primary font-medium">
            <span>Learn more about our API</span>
            <ArrowRight size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
