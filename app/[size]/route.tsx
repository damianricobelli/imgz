import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { getContrastColor } from "@/lib/get-contrast-color";
import satori from "satori";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);

    const format = searchParams.get("format") || "png";
    const font = searchParams.get("font") || "lato";

    if (!Object.hasOwn(fonts, font)) {
      throw new Error(`Invalid font: ${font}`);
    }

    const fontData = await fonts[font as keyof typeof fonts];

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
            data: fontData,
          },
        ],
      });

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
        },
      });
    }

    return new ImageResponse(template, {
      width,
      height,
      fonts: [
        {
          name: "sans-serif",
          data: fontData,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate image", { status: 500 });
  }
}

const fonts = {
  lato: fetch(
    new URL("../../public/fonts/Lato-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  lora: fetch(
    new URL("../../public/fonts/Lora-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  montserrat: fetch(
    new URL("../../public/fonts/Montserrat-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  "open-sans": fetch(
    new URL("../../public/fonts/OpenSans-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  oswald: fetch(
    new URL("../../public/fonts/Oswald-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  "playfair-display": fetch(
    new URL("../../public/fonts/PlayfairDisplay-Regular.ttf", import.meta.url)
      .href
  ).then((res) => res.arrayBuffer()),
  poppins: fetch(
    new URL("../../public/fonts/Poppins-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  "pt-sans": fetch(
    new URL("../../public/fonts/PTSans-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  raleway: fetch(
    new URL("../../public/fonts/Raleway-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
  roboto: fetch(
    new URL("../../public/fonts/Roboto-Regular.ttf", import.meta.url).href
  ).then((res) => res.arrayBuffer()),
};
