"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Building2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { Cuisine } from "@prisma/client";
import axios from "axios";
import { useCuisineModal } from "@/hooks/use-cuisine-modal";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface CuisineSwitcherProps extends PopoverTriggerProps {
  onFilterChange: (value: Cuisine) => void;
}

function CuisineFilter({ className, onFilterChange }: CuisineSwitcherProps) {
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<Cuisine>();

  const model = useCuisineModal();

  useEffect(() => {
    console.log("loading ")
    async function fetchCuisines() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_APP_URL}/api/cuisines`);
        console.log(response.data)
        setCuisines(response.data);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    }

    fetchCuisines();
  }, []);

 

  const currentCuisine = cuisines.find(
    (item) => item.id === selectedCuisine?.id
  );

  const [open, setOpen] = useState(false);

  const onCuisineSelect = (cuisine: { id: string; name: string }) => {
    setOpen(false);
    setSelectedCuisine(cuisine);
    onFilterChange(cuisine);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a cuisine"
          className={cn("md:w-48 lg:w-64 w-32 h-10 justify-between", className)}
        >
          <Building2 className="mr-2 h-4 w-4" />
          {currentCuisine?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-48 lg:w-64 w-32 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search cuisine..." />
            <CommandEmpty>No cuisine found.</CommandEmpty>
            <CommandGroup heading="Cuisines">
              {cuisines.map((cuisine) => (
                <CommandItem
                  key={cuisine.id}
                  onSelect={() => onCuisineSelect(cuisine)}
                  className="text-sm"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {cuisine.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentCuisine?.id === cuisine.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  model.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Cuisine
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CuisineFilter;
