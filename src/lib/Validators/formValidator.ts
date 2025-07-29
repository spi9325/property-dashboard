import { z } from "zod"

export const formSchema = z.object({
  property_Name: z.string().min(2, "Name must be at least 2 characters."),
  property_Type: z.string().min(3,"Invalid property type."),
  property_Price: z.number().min(1, "Enter valid price.").max(10000000,"price is too large"),
  property_Location:z.string().min(3,"enter location only")
})

export type FormData = z.infer<typeof formSchema>
