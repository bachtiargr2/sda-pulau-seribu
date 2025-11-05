import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { PlusIcon } from "lucide-react"
import PulauForm from "../forms/pulau-form"
import pulau from "@/routes/pulau"

export function CreatePulauDialog() {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="default" size="sm">
            <PlusIcon className="mr-2 size-4" aria-hidden="true" />
                Add Pulau
            </Button>
        </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create pulau</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new pulau.
          </DialogDescription>
        </DialogHeader>
        <PulauForm submitRoute={pulau.store().url} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
