export const fonts: Array<{ value: Font; label: string; fontFamily: string }> = [
  { value: "lato", label: "Lato", fontFamily: "Lato" },
  { value: "lora", label: "Lora", fontFamily: "Lora" },
  { value: "montserrat", label: "Montserrat", fontFamily: "Montserrat" },
  { value: "noto-sans", label: "Noto Sans", fontFamily: "NotoSans" },
  { value: "open-sans", label: "Open Sans", fontFamily: "OpenSans" },
  { value: "oswald", label: "Oswald", fontFamily: "Oswald" },
  {
    value: "playfair-display",
    label: "Playfair Display",
    fontFamily: "PlayfairDisplay",
  },
  { value: "poppins", label: "Poppins", fontFamily: "Poppins" },
  { value: "pt-sans", label: "PT Sans", fontFamily: "PTSans" },
  { value: "raleway", label: "Raleway", fontFamily: "Raleway" },
  { value: "roboto", label: "Roboto", fontFamily: "Roboto" },
  { value: "source-sans", label: "Source Sans", fontFamily: "SourceSans" },
];

export type Font =
  | "lato"
  | "lora"
  | "montserrat"
  | "noto-sans"
  | "open-sans"
  | "oswald"
  | "playfair-display"
  | "poppins"
  | "pt-sans"
  | "raleway"
  | "roboto"
  | "source-sans";
