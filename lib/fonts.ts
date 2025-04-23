export const fonts: Array<{ value: Font; label: string; fontFamily: string }> = [
  { value: "lato", label: "Lato", fontFamily: "Lato" },
  { value: "lora", label: "Lora", fontFamily: "Lora" },
  { value: "montserrat", label: "Montserrat", fontFamily: "Montserrat" },
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
];

export type Font =
  | "lato"
  | "lora"
  | "montserrat"
  | "open-sans"
  | "oswald"
  | "playfair-display"
  | "poppins"
  | "pt-sans"
  | "raleway"
  | "roboto"
