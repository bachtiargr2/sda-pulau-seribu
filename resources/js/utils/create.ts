import { router } from "@inertiajs/react"
import { toast } from "sonner"

interface CreateDataProps {
  url: string
  data: Record<string, any>
  label?: string
  onSuccess?: () => void
}

export function createData({ url, data, label, onSuccess }: CreateDataProps) {
  router.post(url, data, {
    onSuccess: () => {
      toast.success(`${label ?? "Data"} berhasil ditambahkan`)
      onSuccess?.()
    },
    onError: () => toast.error("Gagal menambahkan data"),
  })
}
