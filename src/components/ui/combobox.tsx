"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface typesType {
  property: string;
  location: string;
  description: string;
  prize: number;
}

interface com{
    types:typesType[];
    setFilteredTypes: React.Dispatch<React.SetStateAction<typesType[]>>
}

export function ComboboxDemo({types,setFilteredTypes}:com) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");

React.useEffect(() => {
  if (value === "") {
    setFilteredTypes(types); 
  } else {
    setFilteredTypes(types.filter((cur) => cur.property === value));
  }
}, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? types.find((cur) => cur.property === value)?.property
            : "Filter By Types..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Types..." className="h-9" />
          <CommandList>
            <CommandEmpty>No property found.</CommandEmpty>
            <CommandGroup>
              {types.map((cur) => (
                <CommandItem
                  key={cur.property}
                  value={cur.property}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {cur.property}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cur.property ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
