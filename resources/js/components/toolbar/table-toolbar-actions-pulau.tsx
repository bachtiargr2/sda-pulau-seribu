"use client"

import { Button } from "@/components/ui/button"
import { CreatePulauDialog } from "@/components/toolbar/create-pulau-dialog"
import { DownloadIcon } from "lucide-react"

export function TableToolbarActionsPulau() {
  return (
    <div className="flex items-center gap-2">
      {/* Tombol create khusus Pulau */}
      <CreatePulauDialog />
    </div>
  )
}