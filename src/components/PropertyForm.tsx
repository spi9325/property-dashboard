"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/lib/Validators/formValidator";
import type z from "zod";
import { Textarea } from "./ui/textarea";

export function PropertyForm() {
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
