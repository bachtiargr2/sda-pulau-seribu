import { router } from "@inertiajs/react"
import { toast } from "sonner"

interface DeleteItemsOptions {
  items: number | number[]
  url: string
  label?: string
  onSuccess?: () => void
}

export async function deleteData({
  items,
  url,
  label = "Item",
  onSuccess,
}: DeleteItemsOptions) {
  if (!items || Array.isArray(items) && items.length === 0) {
    toast.error(`No ${label.toLowerCase()} selected`)
    return
  }

  if (Array.isArray(items)) {
    router.delete(url, {
      data: { ids: items },
      onSuccess: () => {
        toast.success(`${items.length} ${label ?? "item"} deleted successfully`)
        onSuccess?.()
      },
      onError: () => toast.error("Failed to delete"),
    })
  } else {
    router.delete(`${url}/${items}`, {
      onSuccess: () => {
        toast.success(`${label ?? "Item"} deleted successfully`)
        onSuccess?.()
      },
      onError: () => toast.error("Failed to delete"),
    })
}

//   router.delete(url, {
//     data: { ids: items.map((item) => item.id) },
//     preserveScroll: true,
//     onSuccess: () => {
//       toast.success(
//         `${items.length > 1 ? `${label}s` : label} deleted successfully`
//       )
//       onOpenChange?.(false)
//       onSuccess?.()
//     },
//     onError: () => {
//       toast.error(`Failed to delete ${label.toLowerCase()}s`)
//     },
//   })
}
