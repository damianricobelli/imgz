import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { getContrastColor } from "@/lib/get-contrast-color";
import satori from "satori";
import { readFileSync } from "node:fs";
import sharp from "sharp";

const font = readFileSync("./public/fonts/Inter-Regular.ttf");

// export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);

    const format = searchParams.get("format") || "png";

    const sizeParam = await params;
    const [widthStr, heightStr] = sizeParam.size.split("x");

    // Get parameters with defaults
    const width = Math.min(Math.max(Number(widthStr || 400), 10), 2000);
    const height = Math.min(Math.max(Number(heightStr || widthStr), 10), 2000);

    const text = searchParams.get("text") || "imgz";
    const bgColor = searchParams.get("bg") || "6d28d9";

    // Determine background style and text color
    let backgroundStyle: string;
    let textColor: string;

    const hasGradient = bgColor?.includes("-");

    if (hasGradient) {
      const [color1, color2, direction] = bgColor
        .split("-")
        .map((c) => `#${c}`);
      backgroundStyle = `linear-gradient(to ${
        direction || "right"
      }, ${color1}, ${color2})`;
      // Use the first color for text contrast in gradient case
      textColor = getContrastColor(color1);
    } else {
      backgroundStyle = `#${bgColor}`;
      textColor = getContrastColor(bgColor);
    }

    // Calculate font size based on image dimensions
    const fontSize = Math.min(width, height) * 0.15;

    const template = (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: backgroundStyle,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            textAlign: "center",
            padding: "20px",
          }}
        >
          {text}
        </div>
      </div>
    );

    if (format === "svg") {
      const svg = await satori(template, {
        width,
        height,
        fonts: [
          {
            name: "sans-serif",
            data: font,
          },
        ],
      });

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      });
    }

    const imageResponse = new ImageResponse(template, {
      width,
      height,
      headers: {
        "Content-Type": `image/${format}`,
      },
    });

    if (format === "jpg") {
      const pngBuffer = await imageResponse.arrayBuffer();
      const jpgBuffer = await sharp(Buffer.from(pngBuffer))
        .jpeg({ quality: 80 })
        .toBuffer();

      return new Response(jpgBuffer, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    }

    return imageResponse;
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
