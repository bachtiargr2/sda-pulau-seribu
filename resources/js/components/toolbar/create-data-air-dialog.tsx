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
import DataAirForm from "../forms/data-air-form"

interface CreateDataAirDialogProps {
  pulauOptions: { id: number; nama: string }[];
  jenisDataOptions: { id: number; nama: string }[];
  statusOptions: { id: number; nama: string }[];
}

export function CreateDataAirDialog({ pulauOptions, jenisDataOptions, statusOptions }: CreateDataAirDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="mr-2 h-4 w-4" /> Add Data Air
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Data Air</DialogTitle>
          <DialogDescription>
            Lengkapi data berikut untuk menambahkan data anggaran air baru.
          </DialogDescription>
        </DialogHeader>
        <DataAirForm
          pulauOptions={pulauOptions}       // default kosong
          jenisDataOptions={jenisDataOptions}   // default kosong
          statusOptions={statusOptions}   // default kosong
          submitRoute="/data-air"
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
