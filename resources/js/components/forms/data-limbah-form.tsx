import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useTransition } from "react"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { LoaderIcon } from "lucide-react"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import InputError from "../input-error"
import { createData } from "@/utils/create"
import { updateData } from "@/utils/update"
import { YearPicker } from "../year-picker"
import { updateDataWithFile } from "@/utils/update-with-file"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"

type DataLimbahFormProps = {
    pulauOptions: { id: number; nama: string }[]
    jenisDataOptions: { id: number; nama: string }[]
    statusOptions: { id: number; nama: string }[]
    initialData?: any
    onSuccess?: () => void
    submitRoute: string
    method?: "post" | "put"
}

export default function DataLimbahForm({
    pulauOptions,
    jenisDataOptions,
    statusOptions,
    initialData,
    onSuccess,
    submitRoute,
    method = "post",
}: DataLimbahFormProps) {
    const [isPending, startTransition] = useTransition()
    const { data, setData, errors, reset, setError } = useForm({
        id_pulau: initialData?.id_pulau ?? "",
        id_jenis_data: initialData?.id_jenis_data ?? "",
        tahun: initialData?.tahun ?? "",
        dokumen_nama: initialData?.dokumen_nama ?? "",
        dokumen_path: initialData?.dokumen_path ?? "",
        dokumen_url: initialData?.dokumen_url ?? "",
        dokumen: undefined,   // ← file object
        status: initialData?.status ?? "",
        _method: "PUT",
    })

    const handleChange = (field: keyof typeof data, value: any) => {
        setData(field, value)
        if (errors[field]) setError(field, "")
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        startTransition(() => {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) formData.append(key, value)
            })

            if (method === "put" && initialData?.id) {
                updateDataWithFile({
                    url: submitRoute,
                    id: initialData.id,
                    data: formData,
                    label: "Data Limbah",
                    onSuccess,
                })
            } else {
                createData({
                    url: "/kelola-data/limbah",
                    data: formData,
                    label: "Data Limbah",
                    onSuccess: () => {
                        reset()
                        onSuccess?.()
                    },
                })
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className={cn("flex flex-col gap-4", method === "put" && "px-4")}>
                <div>
                    <Label>Nama Pulau</Label>
                    <Select
                        value={data.id_pulau?.toString() ?? ""}
                        onValueChange={(value) => handleChange("id_pulau", Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="-- Pilih pulau --" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {pulauOptions.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>{p.nama}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.id_pulau && <InputError message={errors.id_pulau} />}
                </div>

                <div>
                    <Label>Jenis Data</Label>
                    <Select
                        value={data.id_jenis_data?.toString() ?? ""}
                        onValueChange={(value) => handleChange("id_jenis_data", Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="-- Pilih jenis data --" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {jenisDataOptions.map((j) => (
                                    <SelectItem key={j.id} value={j.id.toString()}>{j.nama}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.id_jenis_data && <InputError message={errors.id_jenis_data} />}
                </div>

                <div>
                    <Label>Tahun</Label>
                    <YearPicker
                        value={data.tahun}
                        onChange={(year) => handleChange("tahun", year)}
                        placeholder="Pilih tahun"
                        minYear={1950}
                        maxYear={new Date().getFullYear()}
                    />
                    {errors.tahun && <InputError message={errors.tahun} />}
                </div>

                <div>
                    <Label>Upload Dokumen</Label>
                    <Input
                        type="file"
                        onChange={(e) => handleChange('dokumen', e.target.files?.[0])}
                    />
                    {errors.dokumen && <InputError message={errors.dokumen} />}
                    {data.dokumen_url ? (
                        <div className="text-sm text-gray-600">
                            Current file:{" "}
                            <a
                                href={data.dokumen_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {data.dokumen_nama.split('/').pop()}
                            </a>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No file uploaded yet</p>
                    )}
                </div>

                <div>
                    <Label>Status</Label>
                    <Select
                        value={data.status?.toString() ?? ""}
                        onValueChange={(value) => handleChange("status", Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="-- Pilih status --" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {statusOptions.map((s) => (
                                    <SelectItem key={s.id} value={s.id.toString()}>{s.nama}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.status && <InputError message={errors.status} />}
                </div>
            </div>

            {method === "post" ? (
                <DialogFooter className="gap-2 pt-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={isPending}>
                        {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
                        Create
                    </Button>
                </DialogFooter>
            ) : (
                <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                    <SheetClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button disabled={isPending}>
                        {isPending && <LoaderIcon className="mr-1.5 size-4 animate-spin" />}
                        Save
                    </Button>
                </SheetFooter>
            )}
        </form>
    )
}
