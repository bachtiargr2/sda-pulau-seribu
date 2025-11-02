import { Button } from "@/components/ui/button"
import { CreateJenisDataDialog } from "@/components/toolbar/create-jenis-data-dialog"
import { DownloadIcon } from "lucide-react"

export function TableToolbarActionsJenisData() {
  return (
    <div className="flex items-center gap-2">
      <CreateJenisDataDialog />
      <Button variant="outline" size="sm">
        <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  )
}
