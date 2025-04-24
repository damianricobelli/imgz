import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";
import { getContrastColor } from "@/lib/get-contrast-color";
import satori from "satori";
import { readFileSync } from "node:fs";
import sharp from "sharp";
import { Font } from "@/lib/fonts";
import { ImageFormat } from "@/lib/image-format";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";

//#region Constants

const DEFAULTS = {
  width: 400,
  height: 400,
  font: "lato",
  format: "png",
  text: "",
  bgColor: "4e4e4e",
};

const MAX_SIZE = 2000;
const MIN_SIZE = 10;

//#endregion

//#region Parse size

function parseSize(size: string | null): [number, number] {
  const [w, h] = (size || `${DEFAULTS.width}x${DEFAULTS.height}`)
    .split("x")
    .map(Number);
  const width = clamp(w || DEFAULTS.width);
  const height = clamp(h || w || DEFAULTS.height);
  return [width, height];
}

function clamp(val: number): number {
  return Math.min(Math.max(val, MIN_SIZE), MAX_SIZE);
}

//#endregion

//#region Get background style

function getBackgroundStyle(bg: string): {
  background: string;
  textColor: string;
} {
  const hasGradient = bg.includes("-");
  if (hasGradient) {
    const [c1, c2, dir = "right"] = bg.split("-");
    const color1 = `#${c1}`;
    const color2 = `#${c2}`;
    return {
      background: `linear-gradient(to ${dir}, ${color1}, ${color2})`,
      textColor: getContrastColor(color1),
    };
  }
  return {
    background: `#${bg}`,
    textColor: getContrastColor(bg),
  };
}

//#endregion
//#region Build template

function buildTemplate(
  text: string,
  bg: string,
  fontSize: number,
  textColor: string
) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bg,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ color: textColor, fontSize, textAlign: "center", padding: 20 }}
      >
        {text}
      </div>
    </div>
  );
}

//#endregion

//#region Convert to format

async function convertToFormat(
  buffer: ArrayBuffer,
  format: "jpg" | "webp"
): Promise<Buffer> {
  const img = sharp(Buffer.from(buffer));
  return format === "jpg"
    ? img.jpeg({ quality: 80 }).toBuffer()
    : img.webp({ quality: 80 }).toBuffer();
}

//#endregion

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  try {
    const url = request.url;
    const cached = await redis.get<{ format: string; buffer: string }>(url);
    if (cached) {
      const { format, buffer } = cached;
      return new Response(Buffer.from(buffer, "base64"), {
        headers: { "Content-Type": `image/${format}` },
      });
    }

    const { searchParams } = new URL(request.url);
    const format = (searchParams.get("format") ||
      DEFAULTS.format) as ImageFormat;
    const fontName = (searchParams.get("font") || DEFAULTS.font) as Font;
    const text = searchParams.get("text") || DEFAULTS.text;
    const bgColor = searchParams.get("bg") || DEFAULTS.bgColor;

    if (!(fontName in fonts)) throw new Error(`Invalid font: ${fontName}`);
    const fontData = fonts[fontName];

    const { size } = await params;
    const [width, height] = parseSize(size);
    const { background, textColor } = getBackgroundStyle(bgColor);
    const fontSize = Math.min(width, height) * 0.15;

    const template = buildTemplate(text, background, fontSize, textColor);

    let buffer: Buffer;

    if (format === "svg") {
      const svg = await satori(template, {
        width,
        height,
        fonts: [{ name: "sans-serif", data: fontData, weight: 400 }],
      });
      await redis.set(url, {
        format,
        buffer: svg,
      });
      return new Response(svg, {
        headers: { "Content-Type": "image/svg+xml" },
      });
    } else {
      const imageResponse = new ImageResponse(template, {
        width,
        height,
        fonts: [{ name: "sans-serif", data: fontData, weight: 400 }],
      });

      if (format === "png") {
        buffer = Buffer.from(await imageResponse.arrayBuffer());
      } else {
        const arrayBuffer = await imageResponse.arrayBuffer();
        buffer = await convertToFormat(arrayBuffer, format);
      }

      await redis.set(url, {
        format,
        buffer: buffer.toString("base64"),
      });

      return new Response(buffer, {
        headers: { "Content-Type": `image/${format}` },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate image", { status: 500 });
  }
}

const fonts: Record<Font, Buffer> = {
  lato: readFileSync(`${process.cwd()}/public/fonts/Lato-Regular.ttf`),
  lora: readFileSync(`${process.cwd()}/public/fonts/Lora-Regular.ttf`),
  montserrat: readFileSync(
    `${process.cwd()}/public/fonts/Montserrat-Regular.ttf`
  ),
  "open-sans": readFileSync(
    `${process.cwd()}/public/fonts/OpenSans-Regular.ttf`
  ),
  oswald: readFileSync(`${process.cwd()}/public/fonts/Oswald-Regular.ttf`),
  "playfair-display": readFileSync(
    `${process.cwd()}/public/fonts/PlayfairDisplay-Regular.ttf`
  ),
  poppins: readFileSync(`${process.cwd()}/public/fonts/Poppins-Regular.ttf`),
  "pt-sans": readFileSync(`${process.cwd()}/public/fonts/PTSans-Regular.ttf`),
  raleway: readFileSync(`${process.cwd()}/public/fonts/Raleway-Regular.ttf`),
  roboto: readFileSync(`${process.cwd()}/public/fonts/Roboto-Regular.ttf`),
};
