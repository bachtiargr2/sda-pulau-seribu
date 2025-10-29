import { router } from "@inertiajs/react"
import { toast } from "sonner"

interface UpdateDataProps {
  url: string
  id: number | string
  data: Record<string, any>
  label?: string
  onSuccess?: () => void
}

export function updateData({ url, id, data, label, onSuccess }: UpdateDataProps) {
  router.put(`${url}/${id}`, data, {
    onSuccess: () => {
      toast.success(`${label ?? "Data"} berhasil diperbarui`)
      onSuccess?.()
    },
    onError: () => toast.error("Gagal memperbarui data"),
  })
}
