"use client"

import { Button } from "@/components/ui/button"
import { CreateDataAirDialog } from "@/components/toolbar/create-data-air-dialog"
import { DownloadIcon } from "lucide-react"

interface TableToolbarActionsDataAirProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function TableToolbarActionsDataAir({
  pulauOptions,
  jenisDataOptions,
  statusOptions,
}: TableToolbarActionsDataAirProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateDataAirDialog
        pulauOptions={pulauOptions}
        jenisDataOptions={jenisDataOptions}
        statusOptions={statusOptions}
      />
    </div>
  )
}

