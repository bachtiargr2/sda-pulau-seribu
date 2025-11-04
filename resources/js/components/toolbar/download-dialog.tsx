import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Download, LoaderIcon, PlusIcon } from "lucide-react"
import PulauForm from "../forms/pulau-form"
import pulau from "@/routes/pulau"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { router } from "@inertiajs/react"

export function DownloadDialog({ nama, path }: any) {
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const handleDownload = () => {
        startTransition(() => {
            const url = `/storage/${path}`;
            window.open(url, '_blank')
            // window.location.href = `/download/${path}/${nama}`;
            setOpen(false)
        })
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Download className="mr-2 size-4" aria-hidden="true" />
                <span className="font-normal whitespace-normal text-left break-words">{nama}</span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>{nama}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
            <DialogTitle>Konfirmasi Unduhan</DialogTitle>
            <DialogDescription>
                Yakin ingin mengunduh dokumen <span className="font-medium">{nama}</span>?
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
                variant="default"
                onClick={handleDownload}
                disabled={isPending}
            >
                {isPending && (
                    <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
                )}
                Download
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
