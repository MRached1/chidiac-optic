"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "@/lib/constants";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="inline-flex items-center gap-2 text-sm border border-border px-4 py-2 bg-white hover:bg-gray-50 transition-colors">
        <Select.Value placeholder="Sort by" />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 bg-white border border-border shadow-lg">
          <Select.Viewport>
            {SORT_OPTIONS.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="text-sm px-4 py-2.5 cursor-pointer hover:bg-primary-50 hover:text-primary-500 outline-none data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-500"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
