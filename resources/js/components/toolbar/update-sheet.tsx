import { ComponentType } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface UpdateSheetProps extends React.ComponentPropsWithoutRef<typeof Sheet> {
  title: string
  description?: string
  formComponent: ComponentType<any>
  data?: any
  submitRoute: string
  method?: "post" | "put"
  onSuccess?: () => void
}

export function UpdateSheet({
  title,
  description,
  formComponent: FormComponent,
  data,
  submitRoute,
  method = "put",
  onSuccess,
  ...props
}: UpdateSheetProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <FormComponent
          initialData={data}
          method={method}
          submitRoute={submitRoute}
          onSuccess={onSuccess}
        />
      </SheetContent>
    </Sheet>
  )
}
