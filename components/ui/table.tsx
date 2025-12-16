import * as React from "react"

export const Table = ({ children }: { children: React.ReactNode }) => (
  <table className="w-full border-collapse text-sm">{children}</table>
)
export const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-muted/50">{children}</thead>
)
export const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody>{children}</tbody>
)
export const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b">{children}</tr>
)
export const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-3 py-2 text-start font-medium ${className ?? ""}`}>{children}</th>
)
export const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-3 py-2 ${className ?? ""}`}>{children}</td>
)
