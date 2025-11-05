import { useState, useTransition } from "react"
import { router } from "@inertiajs/react"
import { toast } from "sonner"
import { TrashIcon, LoaderIcon } from "lucide-react"

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
import { deleteData } from "@/utils/delete"

interface DeleteDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
    items: number | number[]
    url: string
    label?: string
    onSuccess?: () => void
    showTrigger?: boolean
}

export function DeleteDialog({
    items,
    url,
    label = "item",
    onSuccess,
    showTrigger = true,
    ...props
}: DeleteDialogProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(() => {
            deleteData({
                url,
                items,
                onSuccess: () => {
                    props.onOpenChange?.(false)
                    onSuccess?.()
                },
            })
        })
    }

    return (
        <Dialog {...props}>
            {showTrigger && (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete{" "}
                        <span className="font-medium">{label}</span> from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending && (
                            <LoaderIcon className="mr-1.5 size-4 animate-spin" aria-hidden="true" />
                        )}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
