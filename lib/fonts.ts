export const fonts: Array<{ value: Font; label: string; fontFamily: string }> = [
  { value: "lato", label: "Lato", fontFamily: "Lato" },
  { value: "lora", label: "Lora", fontFamily: "Lora" },
  { value: "montserrat", label: "Montserrat", fontFamily: "Montserrat" },
  { value: "noto-sans", label: "Noto Sans", fontFamily: "Noto Sans" },
  { value: "open-sans", label: "Open Sans", fontFamily: "Open Sans" },
  { value: "oswald", label: "Oswald", fontFamily: "Oswald" },
  {
    value: "playfair-display",
    label: "Playfair Display",
    fontFamily: "Playfair Display",
  },
  { value: "poppins", label: "Poppins", fontFamily: "Poppins" },
  { value: "pt-sans", label: "PT Sans", fontFamily: "PT Sans" },
  { value: "raleway", label: "Raleway", fontFamily: "Raleway" },
  { value: "roboto", label: "Roboto", fontFamily: "Roboto" },
  { value: "source-sans-3", label: "Source Sans 3", fontFamily: "Source Sans 3" },
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
  | "source-sans-3";
