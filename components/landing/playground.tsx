"use client";

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { getContrastColor } from "@/lib/get-contrast-color";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { CheckIcon, CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { Font, fonts } from "@/lib/fonts";

export function Playground() {
  const { copied, copyToClipboard } = useCopyToClipboard();

  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(300);
  const [text, setText] = useState("imgz");

  const [format, setFormat] = useState<ImageFormat>("png");

  const [font, setFont] = useState<Font>("lato");

  const [useGradient, setUseGradient] = useState(false);
  const [gradientDirection, setGradientDirection] =
    useState<GradientDirection>("to bottom");

  const [bgColor1, setBgColor1] = useState("#4e4e4e");
  const [bgColor2, setBgColor2] = useState("#000000");

  const gradientDirections = [
    { value: "to bottom", label: "Top to Bottom" },
    { value: "to top", label: "Bottom to Top" },
    { value: "to right", label: "Left to Right" },
    { value: "to left", label: "Right to Left" },
  ];

  const handleTextChange = useCallback((value: string) => {
    setText(value.slice(0, 100)); // Limit text length
  }, []);

  const generateImageUrl = (w: number, h: number) => {
    const encodedText = encodeURIComponent(text);
    const baseUrl = `/${w}x${h}?text=${encodedText}&format=${format}&font=${font}`;
    return useGradient
      ? `${baseUrl}&bg=${bgColor1.replace("#", "")}-${bgColor2.replace(
          "#",
          ""
        )}-${gradientDirection.replace("to ", "")}`
      : `${baseUrl}&bg=${bgColor1.replace("#", "")}`;
  };

  const imageUrl = generateImageUrl(width, height);

  const selectedFont = fonts.find((f) => f.value === font) || fonts[0];

  console.log(selectedFont.fontFamily);

  return (
    <section id="playground" className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Try it yourself
          </h2>
          <p className="text-xl text-muted-foreground">
            Customize your placeholder image with our interactive generator.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 md:p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Customize</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (px)</Label>
                  <Input
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <Input
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input
                    id="text"
                    value={text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select
                    value={format}
                    onValueChange={(value) => setFormat(value as ImageFormat)}
                  >
                    <SelectTrigger id="format" className="w-full">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="jpg">JPG</SelectItem>
                      <SelectItem value="svg">SVG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font</Label>
                <Select
                  value={font}
                  onValueChange={(value) => setFont(value as Font)}
                >
                  <SelectTrigger
                    id="font"
                    className="w-full"
                    style={{
                      fontFamily: selectedFont.fontFamily,
                    }}
                  >
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fonts.map((font) => (
                      <SelectItem
                        key={font.value}
                        value={font.value}
                        style={{ fontFamily: font.fontFamily }}
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gradient">Use Gradient</Label>
                  <Switch
                    id="gradient"
                    checked={useGradient}
                    onCheckedChange={setUseGradient}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker
                    label={useGradient ? "Start Color" : "Background Color"}
                    color={bgColor1}
                    onChange={setBgColor1}
                  />
                  <span
                    data-disabled={!useGradient}
                    className="data-[disabled=true]:[&_button]:hover:cursor-not-allowed"
                  >
                    <ColorPicker
                      label="End Color"
                      color={bgColor2}
                      onChange={setBgColor2}
                      disabled={!useGradient}
                    />
                  </span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gradient-direction">Gradient Direction</Label>
                  <Select
                    value={gradientDirection}
                    onValueChange={(value) =>
                      setGradientDirection(value as GradientDirection)
                    }
                    disabled={!useGradient}
                  >
                    <SelectTrigger id="gradient-direction" className="w-full">
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradientDirections.map((direction) => (
                        <SelectItem
                          key={direction.value}
                          value={direction.value}
                        >
                          {direction.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  copyToClipboard(`${window.location.origin}${imageUrl}`);
                  toast("URL copied to clipboard", {
                    description: "You can now use this URL in your projects",
                    duration: 8000,
                    closeButton: true,
                  });
                }}
              >
                {copied ? "Copied" : "Copy URL"}
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={cn(
              "rounded-lg overflow-hidden shadow-lg size-full relative",
              "flex justify-center items-center text-center aspect-square lg:aspect-auto"
            )}
            style={{
              backgroundColor: !useGradient ? bgColor1 : undefined,
              backgroundImage: useGradient
                ? `linear-gradient(${gradientDirection}, ${bgColor1}, ${bgColor2})`
                : undefined,
              fontFamily: selectedFont.fontFamily,
            }}
          >
            <Badge className="absolute top-2 right-2">Preview image</Badge>
            <p
              style={{
                color: getContrastColor(bgColor1),
                fontSize: Math.min(width, height) * 0.15,
              }}
            >
              {text}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

type GradientDirection = "to bottom" | "to top" | "to right" | "to left";
type ImageFormat = "png" | "jpg" | "svg";
