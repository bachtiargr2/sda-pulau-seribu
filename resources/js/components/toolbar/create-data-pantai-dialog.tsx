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
import DataPantaiForm from "../forms/data-pantai-form"

interface CreateDataPantaiDialogProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function CreateDataPantaiDialog({ pulauOptions, jenisDataOptions, statusOptions }: CreateDataPantaiDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Tambah Data Pantai
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Data Pantai</DialogTitle>
          <DialogDescription>
            Lengkapi data berikut untuk menambahkan data anggaran pantai baru.
          </DialogDescription>
        </DialogHeader>
        <DataPantaiForm
          pulauOptions={pulauOptions}       // default kosong
          jenisDataOptions={jenisDataOptions}   // default kosong
          statusOptions={statusOptions}   // default kosong
          submitRoute="/data-pantai"
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
