"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Copy, Check, Info } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { fonts } from "@/lib/fonts";

export function UsageGuide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [id]: true });
    setTimeout(() => {
      setCopied({ ...copied, [id]: false });
    }, 2000);
  };

  const examples = [
    {
      id: "basic",
      title: "Basic Image",
      description: "Generate a 300x200 placeholder image",
      code: "https://imgz.app/300x200",
    },
    {
      id: "text",
      title: "Custom Text",
      description: "Add custom text to your placeholder",
      code: "https://imgz.app/400x300?text=Hello+World",
    },
    {
      id: "bg",
      title: "Background Color",
      description: "Specify a custom background color",
      code: "https://imgz.app/500x400?bg=6d28d9",
    },
    {
      id: "bg-gradient",
      title: "Background Gradient",
      description: "Specify a custom background gradient",
      code: "https://imgz.app/500x400?bg=6d28d9-000000-bottom",
    },
    {
      id: "format",
      title: "Image Format",
      description: "Specify the image format (png, jpg, webp, svg)",
      code: "https://imgz.app/500x400?bg=6d28d9&format=svg",
    },
    {
      id: "font",
      title: "Font",
      description: "Specify the font",
      code: "https://imgz.app/500x400?bg=6d28d9&font=lato",
    },
    {
      id: "full",
      title: "Complete Example",
      description: "Full example with all parameters",
      code: "https://imgz.app/600x400?bg=6d28d9&text=Custom+Text&bg=ffffff&format=png",
    },
  ];

  const parameters = [
    {
      name: "text",
      description: "Custom text to display on the image",
      required: false,
      example: "Hello+World",
    },
    {
      name: "bg",
      description: "Background color (HEX without #)",
      details: (
        <div className="flex flex-col gap-2 text-xs">
          <p>
            You can specify a background color and a background gradient
            following this format:
          </p>
          <pre>
            <code className="font-bold">color-color-direction</code>
          </pre>
          <p>
            The direction is the direction of the gradient. The possible values
            are:
          </p>
          <pre>
            <code className="font-bold">top | bottom | left | right</code>
          </pre>
        </div>
      ),
      required: false,
      example: "6d28d9",
    },
    {
      name: "font",
      description: "Font name",
      details: (
        <div className="flex flex-col gap-2 text-xs">
          <p>You can specify a font name following this format:</p>
          <p>The possible values are:</p>
          <div className="flex flex-wrap gap-2">
            {fonts.map((value, index) => (
              <code key={value.value} className="font-bold">
                {value.value} {index < fonts.length - 1 && "|"}
              </code>
            ))}
          </div>
        </div>
      ),
      required: false,
      example: "lato",
    },
    {
      name: "format",
      description: "Image format",
      values: ["png", "jpg", "webp", "svg"],
      required: false,
      example: "png",
    },
  ];

  return (
    <section id="docs" className="py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How to use imgz
          </h2>
          <p className="text-xl text-muted-foreground">
            Generate placeholder images with a simple URL structure and
            customizable parameters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
                <p className="text-muted-foreground mb-4">
                  The basic URL structure is simple:
                </p>

                <code className="block p-3 bg-muted rounded mb-4 text-sm">
                  https://imgz.app/{`{width}`}x{`{height}`}
                </code>

                <p className="text-sm text-muted-foreground">
                  Add parameters using standard query string format:
                </p>

                <code className="block p-3 bg-muted rounded my-4 text-sm">
                  https://imgz.app/300x200?text=Hello&bg=6d28d9
                </code>

                <Separator className="my-6" />

                <h4 className="font-medium mb-2">Implementation</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Use imgz in your HTML, CSS, or JavaScript:
                </p>

                <div className="bg-muted p-3 rounded text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-muted-foreground">HTML</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="size-6 p-0"
                      onClick={() =>
                        handleCopy(
                          '<img src="https://imgz.app/300x200" alt="Placeholder" width="300" height="200" />',
                          "html"
                        )
                      }
                    >
                      {copied["html"] ? (
                        <Check className="size-3" />
                      ) : (
                        <Copy className="size-3" />
                      )}
                    </Button>
                  </div>
                  <code>{`<img src="https://imgz.app/300x200" alt="Placeholder" width="300" height="200" />`}</code>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <motion.div
              className="bg-card border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4">Examples</h3>

              <div className="space-y-6">
                {examples.map((example, index) => (
                  <div
                    key={example.id}
                    className={index > 0 ? "pt-4 border-t" : ""}
                  >
                    <h4 className="font-medium">{example.title}</h4>
                    <p className="text-sm text-muted-foreground my-2">
                      {example.description}
                    </p>
                    <div className="flex items-start gap-4 mt-3">
                      <div className="flex-1 bg-muted p-3 rounded-md relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 size-6 p-0"
                          onClick={() => handleCopy(example.code, example.id)}
                        >
                          {copied[example.id] ? (
                            <Check className="size-3" />
                          ) : (
                            <Copy className="size-3" />
                          )}
                        </Button>
                        <code className="text-xs md:text-sm break-all">
                          {example.code}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-card border rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-6">
                Parameters Reference
              </h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parameters.map((param) => (
                    <TableRow key={param.name}>
                      <TableCell className="font-medium">
                        {param.name}
                      </TableCell>
                      <TableCell className="flex items-center">
                        {param.description}
                        {param.details && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Info className="size-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>{param.details}</PopoverContent>
                          </Popover>
                        )}
                      </TableCell>
                      <TableCell>{param.required ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        <code className="bg-muted p-1 rounded text-xs">
                          {param.example}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
