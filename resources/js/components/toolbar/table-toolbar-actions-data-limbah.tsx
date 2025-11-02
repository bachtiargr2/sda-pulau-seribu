"use client"

import { Button } from "@/components/ui/button"
import { CreateDataLimbahDialog } from "@/components/toolbar/create-data-limbah-dialog"
import { DownloadIcon } from "lucide-react"

interface TableToolbarActionsDataLimbahProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function TableToolbarActionsDataLimbah({
  pulauOptions,
  jenisDataOptions,
  statusOptions,
}: TableToolbarActionsDataLimbahProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateDataLimbahDialog
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

