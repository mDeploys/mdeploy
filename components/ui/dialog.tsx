"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogContent = ({ className, ...props }: DialogPrimitive.DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
    <DialogPrimitive.Content
      className={`fixed left-1/2 top-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-background p-6 shadow-lg ${className ?? ""}`}
      {...props}
    />
  </DialogPrimitive.Portal>
)

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 space-y-2">{children}</div>
)

export const DialogTitle = (props: React.ComponentProps<typeof DialogPrimitive.Title>) => (
  <DialogPrimitive.Title className="text-xl font-semibold" {...props} />
)

export const DialogDescription = (props: React.ComponentProps<typeof DialogPrimitive.Description>) => (
  <DialogPrimitive.Description className="text-sm text-muted-foreground" {...props} />
)

export const DialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 flex justify-end gap-2">{children}</div>
)
