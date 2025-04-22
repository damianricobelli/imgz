import { Label } from "@/components/ui/label";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getContrastColor } from "@/lib/get-contrast-color";

export const ColorPicker = ({
  label,
  color,
  onChange,
  disabled,
}: ColorPicker.Props) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          className="w-full h-9 rounded-md border border-input bg-background flex items-center justify-between px-3"
          style={{
            backgroundColor: color,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ color: getContrastColor(color) }}>{color}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  </div>
);

namespace ColorPicker {
  export type Props = {
    label: string;
    color: string;
    onChange: (color: string) => void;
    disabled?: boolean;
  };
}
