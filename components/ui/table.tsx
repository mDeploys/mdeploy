import * as React from "react"

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table ref={ref} className={`w-full border-collapse text-sm ${className ?? ""}`} {...props} />
))
Table.displayName = "Table"

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`bg-muted/50 ${className ?? ""}`} {...props} />
))
TableHeader.displayName = "TableHeader"

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
))
TableBody.displayName = "TableBody"

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={`border-b ${className ?? ""}`} {...props} />
))
TableRow.displayName = "TableRow"

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={`px-3 py-2 text-start font-medium ${className ?? ""}`} {...props} />
))
TableHead.displayName = "TableHead"

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={`px-3 py-2 ${className ?? ""}`} {...props} />
))
TableCell.displayName = "TableCell"
