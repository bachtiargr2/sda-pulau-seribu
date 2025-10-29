import { router } from "@inertiajs/react"
import { toast } from "sonner"

interface DeleteItemsOptions<T extends { id: number | string }> {
  items: T[]
  url: string
  label?: string
  onSuccess?: () => void
  onOpenChange?: (open: boolean) => void
}

export async function deleteItems<T extends { id: number | string }>({
  items,
  url,
  label = "Item",
  onSuccess,
  onOpenChange,
}: DeleteItemsOptions<T>) {
  if (!items || items.length === 0) {
    toast.error(`No ${label.toLowerCase()} selected`)
    return
  }

  router.delete(url, {
    data: { ids: items.map((item) => item.id) },
    preserveScroll: true,
    onSuccess: () => {
      toast.success(
        `${items.length > 1 ? `${label}s` : label} deleted successfully`
      )
      onOpenChange?.(false)
      onSuccess?.()
    },
    onError: () => {
      toast.error(`Failed to delete ${label.toLowerCase()}s`)
    },
  })
}
