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
import DataLimbahForm from "../forms/data-limbah-form"

interface CreateDataLimbahDialogProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function CreateDataLimbahDialog({ pulauOptions, jenisDataOptions, statusOptions }: CreateDataLimbahDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Tambah Data Limbah
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Data Limbah</DialogTitle>
          <DialogDescription>
            Lengkapi data berikut untuk menambahkan data anggaran limbah baru.
          </DialogDescription>
        </DialogHeader>
        <DataLimbahForm
          pulauOptions={pulauOptions}       // default kosong
          jenisDataOptions={jenisDataOptions}   // default kosong
          statusOptions={statusOptions}   // default kosong
          submitRoute="/data-limbah"
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
