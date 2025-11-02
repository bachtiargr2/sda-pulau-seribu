"use client"

import { Button } from "@/components/ui/button"
import { CreateDataPantaiDialog } from "@/components/toolbar/create-data-pantai-dialog"
import { DownloadIcon } from "lucide-react"

interface TableToolbarActionsDataPantaiProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function TableToolbarActionsDataPantai({
  pulauOptions,
  jenisDataOptions,
  statusOptions,
}: TableToolbarActionsDataPantaiProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateDataPantaiDialog
        pulauOptions={pulauOptions}
        jenisDataOptions={jenisDataOptions}
        statusOptions={statusOptions}
      />
      <Button variant="outline" size="sm">
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}

