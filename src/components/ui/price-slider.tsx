"use client";

import * as Slider from "@radix-ui/react-slider";
import { formatPrice } from "@/lib/utils";

interface PriceSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export function PriceSlider({ min, max, value, onValueChange }: PriceSliderProps) {
  return (
    <div className="space-y-3">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={5}
        minStepsBetweenThumbs={1}
      >
        <Slider.Track className="bg-gray-200 relative grow h-[3px] rounded-full">
          <Slider.Range className="absolute bg-primary-400 h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary-400 rounded-full hover:bg-primary-50 focus:outline-none cursor-grab active:cursor-grabbing" />
        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary-400 rounded-full hover:bg-primary-50 focus:outline-none cursor-grab active:cursor-grabbing" />
      </Slider.Root>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatPrice(value[0])}</span>
        <span>{formatPrice(value[1])}</span>
      </div>
    </div>
  );
}
