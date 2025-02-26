import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, SketchPicker } from "react-color";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [showPopover, setShowPopover] = useState(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"} title="Change resume color" onClick={()=>setShowPopover(true)}>
          <Palette className="size-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-none bg-transparent shadow-none" align="end">
        <SketchPicker color={color} onChange={onChange}/>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
