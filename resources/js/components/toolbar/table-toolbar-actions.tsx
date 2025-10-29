"use client"

// import { type Task } from "@/db/schema"
// import { DownloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"
// import { useHotkeys } from "react-hotkeys-hook"

// import { exportTableToCSV } from "@/lib/export"
import { Button } from "@/components/ui/button"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// import { CreateTaskDialog } from "./create-task-dialog"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"
import { CreatePulauDialog } from "./create-pulau-dialog"
import { DownloadIcon } from "lucide-react"

// interface TasksTableToolbarActionsProps {
//   table: Table<Task>
// }

export function TableToolbarActions() {
//   table,
// }: TasksTableToolbarActionsProps) {
//   useHotkeys("shift+e", () =>
//     exportTableToCSV(table, {
//       filename: "tasks",
//       excludeColumns: ["select", "actions"],
//     })
//   )

  return (
    <div className="flex items-center gap-2">
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null} */}
        <CreatePulauDialog />
        <Button
            variant="outline"
            size="sm"
            // onClick={() =>
            // exportTableToCSV(table, {
            //     filename: "tasks",
            //     excludeColumns: ["select", "actions"],
            // })
            // }
        >
            <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
            Export
        </Button>
    </div>
  )
}
