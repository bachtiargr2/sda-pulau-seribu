import { Status } from "@/types";
import { CheckCircle, Clock, Circle } from "lucide-react";
import { Badge } from "./ui/badge";

export default function StatusColumn({ status }: Status) {
    const statusMap: Record<number, string> = {
        1: "Belum Dimulai",
        2: "Sedang Proses",
        3: "Selesai",
    }

    const colorMap: Record<number, string> = {
        1: "bg-gray-100 text-gray-500",
        2: "bg-yellow-200 text-yellow-600",
        3: "bg-green-200 text-green-600",
    }

    const Icon = getStatusIcon(status)
    const label = statusMap[status] || "-"
    const color = colorMap[status]

    function getStatusIcon(status: number) {
        switch (status) {
          case 1:
            return Circle // Belum Dimulai
          case 2:
            return Clock // Sedang Proses
          case 3:
            return CheckCircle // Selesai
          default:
            return Circle
        }
    }

    return (
        <Badge variant="secondary" className={`flex items-center ${color}`}>
          <Icon
            className="mr-2 size-4"
            aria-hidden="true"
          />
          <span className="capitalize">{label}</span>
        </Badge>
      )
}
