import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import JenisDataForm from "../forms/jenis-data-form"
import UnitKerjaForm from "../forms/unit-kerja-form"

export function CreateUnitKerjaDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 size-4" /> Add Unit Kerja
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Unit Kerja</DialogTitle>
          <DialogDescription>
            Lengkapi data berikut untuk menambahkan unit kerja baru.
          </DialogDescription>
        </DialogHeader>
        <UnitKerjaForm submitRoute="/master-data/unit-kerja" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
