<div align="center">
  <img src="https://imgz.app/200x200?text=imgz&bg=f97316" alt="imgz logo" width="200" height="200" />
  <h1>imgz</h1>
  <p>Simple, powerful placeholder images through URLs</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdamianricobelli%2Fimgz)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org/)
</div>

## ✨ Features

- 🖼️ **Simple URL Structure** - Generate images with a clean URL pattern
- 📏 **Custom Dimensions** - Specify any width and height directly in the URL path
- 🔤 **Custom Text & Google Fonts** - Add your own text to the placeholder image
- 🎨 **Custom Colors** - Set solid background colors or beautiful gradients
- 📱 **Responsive** - Perfect for responsive design testing

## 🚀 Quick Start

Generate a placeholder image by visiting:

```
https://imgz.app/600x400
```

This will create a 600x400 pixel image with the default orange background and "imgz" text.

## 📖 Usage Examples

### Basic Usage

```
https://imgz.app/400x300
```

<div align="center">
  <img src="https://imgz.app/400x300" alt="Basic example" width="400" height="300" />
</div>

### Custom Text

```
https://imgz.app/400x300?text=Hello%20World
```

<div align="center">
  <img src="https://imgz.app/400x300?text=Hello%20World" alt="Custom text example" width="400" height="300" />
</div>

### Custom Background Color

```
https://imgz.app/400x300?bg=3b82f6&text=Blue%20Background
```

<div align="center">
  <img src="https://imgz.app/400x300?bg=3b82f6&text=Blue%20Background" alt="Custom color example" width="400" height="300" />
</div>

### Gradient Background

```
https://imgz.app/400x300?text=Gradient&bg=f97316-3b82f6-right
```

<div align="center">
  <img src="https://imgz.app/400x300?text=Gradient&bg=f97316-3b82f6-right" alt="Gradient example" width="400" height="300" />
</div>

## 📋 API Reference

### URL Structure

```
https://imgz.app/{width}x{height}?[options]
```

### Path Parameters

| Parameter | Description                                   | Example   |
| --------- | --------------------------------------------- | --------- |
| `size`    | Image dimensions in format `{width}x{height}` | `600x400` |

### Query Parameters

| Parameter | Description                                 | Default    | Example              |
| --------- | ------------------------------------------- | ---------- | -------------------- |
| `text`    | Text to display on the image                | `"imgz"`   | `text=Hello%20World` |
| `bg`      | Background color (hex without #)            | `"4e4e4e"` | `bg=3b82f6`          |
| `format`  | Image format (png, jpg, webp and svg)       | `png`      | `format=svg`         |
| `font`    | Font family (lato, roboto, montserrat, etc) | `"lato"`   | `font=lato`          |

### Gradient Directions

| Value    | Description   |
| -------- | ------------- |
| `bottom` | Top to Bottom |
| `top`    | Bottom to Top |
| `right`  | Left to Right |
| `left`   | Right to Left |

## 🛠️ Development

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/damianricobelli/imgz.git
   cd imgz
   ```
