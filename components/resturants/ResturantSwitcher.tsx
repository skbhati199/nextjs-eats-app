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
  const orgainzationModal = useModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    displayName: item.displayName,
    id: item.id,
  }));

  const currentResturant = formattedItems.find(
    (item) => item.id === params.orgId
  );

  const [open, setOpen] = React.useState(false);

  const onResturantSelect = (orgainzation: {
    id: string;
    displayName: string;
  }) => {
    setOpen(false);
    router.push(`/dashboard/org/${orgainzation.id}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a orgainzation"
          className={cn("md:w-48 lg:w-64 w-32 h-10 justify-between", className)}
        >
          <Building2 className="mr-2 h-4 w-4" />
          {currentResturant?.displayName}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-48 lg:w-64 w-32 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search orgainzation..." />
            <CommandEmpty>No orgainzation found.</CommandEmpty>
            <CommandGroup heading="Resturants">
              {formattedItems.map((orgainzation) => (
                <CommandItem
                  key={orgainzation.id}
                  onSelect={() => onResturantSelect(orgainzation)}
                  className="text-sm"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  {orgainzation.displayName}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentResturant?.id === orgainzation.id
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
                  orgainzationModal.onOpen();
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
