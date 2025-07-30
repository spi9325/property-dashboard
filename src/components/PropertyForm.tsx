"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/Validators/formValidator";
import type z from "zod";
import { Textarea } from "./ui/textarea";



interface typesType {
  propertyName: string;
  propertyLocation: string;
  propertyInfo: string;
  propertyPrice: number;
}

interface propType{
  setFilteredTypes:React.Dispatch<React.SetStateAction<typesType[]>>
}


export function PropertyForm({setFilteredTypes}:propType) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      property_Name: "",
      property_Location: "",
      property_Price: 0,
      property_Info: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFilteredTypes((prev)=>[...prev,
      {
        propertyName:values.property_Name,
        propertyLocation:values.property_Location,
        propertyPrice:values.property_Price,
        propertyInfo:values.property_Info
      }
    ])
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add/property`,
      {
        propertyName:values.property_Name,
        propertyPrice:values.property_Price,
        propertyLocation:values.property_Location,
        propertyInfo:values.property_Info
      }
    );
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="property_Name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Plot" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="property_Location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Location</FormLabel>
              <FormControl>
                <Input placeholder="enter your property location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="property_Price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="enter property price"
                  min={1}
                  {...field}
                  type="number"
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="property_Info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Info</FormLabel>
              <FormControl>
                <Textarea placeholder="enter property Info" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add New Property</Button>
      </form>
    </Form>
  );
}
