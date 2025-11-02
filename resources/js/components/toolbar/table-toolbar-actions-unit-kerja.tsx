import { Button } from "@/components/ui/button"
import { CreateJenisDataDialog } from "@/components/toolbar/create-jenis-data-dialog"
import { DownloadIcon } from "lucide-react"
import { CreateUnitKerjaDialog } from "./create-unit-kerja-dialog"

export function TableToolbarActionsUnitKerja() {
  return (
    <div className="flex items-center gap-2">
      <CreateUnitKerjaDialog />
      <Button variant="outline" size="sm">
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}
