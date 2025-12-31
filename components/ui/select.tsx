"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "lucide-react"

export const Select = SelectPrimitive.Root
export const SelectTrigger = ({ className, ...props }: SelectPrimitive.SelectTriggerProps) => (
  <SelectPrimitive.Trigger
    className={`inline-flex h-10 items-center justify-between rounded-md border px-3 text-sm ${className ?? ""}`}
    {...props}
  >
    <SelectPrimitive.Value />
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)
export const SelectValue = SelectPrimitive.Value
export const SelectContent = ({ className, ...props }: SelectPrimitive.SelectContentProps) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={`absolute z-[100] min-w-[200px] rounded-md border border-primary/20 bg-background p-1 shadow-lg ${className ?? ""}`}
      position="popper"
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-pointer items-center justify-center py-1" />
      <SelectPrimitive.Viewport className="p-1" />
      <SelectPrimitive.ScrollDownButton className="flex cursor-pointer items-center justify-center py-1" />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)
export const SelectItem = ({ className, children, ...props }: SelectPrimitive.SelectItemProps & { children?: React.ReactNode }) => (
  <SelectPrimitive.Item className={`cursor-pointer rounded-sm px-3 py-2 text-sm hover:bg-primary/10 focus:bg-primary/10 outline-none ${className ?? ""}`} {...props}>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)
