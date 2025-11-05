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

export function CreateJenisDataDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 size-4" /> Tambah Jenis Data
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Jenis Data</DialogTitle>
          <DialogDescription>
            Lengkapi data berikut untuk menambahkan jenis data baru.
          </DialogDescription>
        </DialogHeader>
        <JenisDataForm submitRoute="/master-data/jenis-data" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
