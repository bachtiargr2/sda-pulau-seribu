"use client"

import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { CreateJenisDataDialog } from "./create-jenis-data-dialog"
import { CreatePulauDialog } from "./create-pulau-dialog"

/**
 * Utilitas sederhana untuk ekspor data tabel ke CSV.
 */
function exportTableToCSV<TData>(table: Table<TData>, filename = "export") {
  const rows = table.getRowModel().rows
  if (!rows.length) return alert("Tidak ada data untuk diekspor.")

  // Ambil header
  const headers = table
    .getAllColumns()
    .filter((col) => col.getIsVisible())
    .map((col) => col.columnDef.header as string)

  // Ambil data
  const csvRows = rows.map((row) =>
    row.getVisibleCells().map((cell) => {
      const value = cell.getValue()
      return typeof value === "string" ? `"${value}"` : value
    })
  )

  const csvContent = [headers, ...csvRows]
    .map((r) => r.join(","))
    .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  link.click()
  window.URL.revokeObjectURL(url)
}

interface TableToolbarActionsProps<TData> {
  table?: Table<TData>
  /** Jenis entitas untuk menentukan tombol Create mana yang ditampilkan (optional) */
  type?: "pulau" | "jenis-data" | "default"
}

/**
 * Komponen Toolbar umum untuk semua tabel master data.
 * - Menampilkan tombol `Create` (dinamis berdasarkan type)
 * - Menyediakan tombol `Export CSV`
 */
export function TableToolbarActions<TData>({
  table,
  type = "default",
}: TableToolbarActionsProps<TData>) {
  return (
    <div className="flex items-center gap-2">
      {/* Tombol Create dinamis */}
      {type === "pulau" ? (
        <CreatePulauDialog />
      ) : type === "jenis-data" ? (
        <CreateJenisDataDialog />
      ) : null}

      {/* Tombol Export CSV */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (!table) return alert("Tabel belum terinisialisasi.")
          exportTableToCSV(table, type || "data")
        }}
      >
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}
