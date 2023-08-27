"use client";

import * as React from "react";
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
import { useModal } from "@/hooks/use-modal";
import { useParams, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ResturantSwitcherProps extends PopoverTriggerProps {
  items: Record<string, any>[];
}

export default function ResturantSwitcher({
  className,
  items = [],
}: ResturantSwitcherProps) {
  const restaurantModal = useModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    name: item.name,
    id: item.id,
  }));

  const currentResturant = formattedItems.find(
    (item) => item.id === params.restaurantId
  );

  const [open, setOpen] = React.useState(false);

  const onResturantSelect = (restaurant: { id: string; name: string }) => {
    setOpen(false);
    router.push(`/restaurant/${restaurant.id}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="dark:text-white">
        <Button
          variant="outline"
          size="lg"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a restaurant"
          className={cn(
            `w-48 lg:w-64 h-12 justify-between 
            dark:text-white 
            text-slate-500 
            hover:text-slate-700 
            dark:hover:text-slate-100`,
            className
          )}
        >
          <Building2 className="mr-2 h-4 w-4" />
          {currentResturant?.name && "Select Resturant"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 lg:w-64  p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search restaurant..." />
            <CommandEmpty>No restaurant found.</CommandEmpty>
            <CommandGroup heading="Resturants">
              {formattedItems.map((restaurant) => (
                <CommandItem
                  key={restaurant.id}
                  onSelect={() => onResturantSelect(restaurant)}
                  className="text-xl"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {restaurant.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentResturant?.id === restaurant.id
                        ? "opacity-100"
                        : "opacity-50"
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
                  restaurantModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Resturant
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
