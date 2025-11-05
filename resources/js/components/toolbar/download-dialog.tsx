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

export function DownloadDialog({ nama, path, ...props }: any) {
    const [isPending, startTransition] = useTransition()

    const handleDownload = () => {
        startTransition(() => {
            const url = `/download/${path}/${nama}`;
            window.location.href = url;
            props.onOpenChange?.(false)
        })
    }
  return (
    <Dialog {...props}>
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
