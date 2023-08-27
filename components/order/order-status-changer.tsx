"use client";

import React, {  useState } from "react";
import { Check, ChevronsUpDown,  ListOrderedIcon } from "lucide-react";

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
import { OrderStatus } from "@prisma/client";



type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface OrderStatusSwitcherProps extends PopoverTriggerProps {
  onFilterChange: (value: OrderStatus) => void;
  orderStatus: OrderStatus[],
  defaultValue: OrderStatus
}

function OrderStatusFilter({ className, onFilterChange, defaultValue, orderStatus }: OrderStatusSwitcherProps) {

  const currentOrderStatus = orderStatus.find(
    (item) => item === defaultValue
  );

  const [open, setOpen] = useState(false);

  const onOrderStatusSelect = (orderStatus: OrderStatus) => {
    setOpen(false);
    onFilterChange(orderStatus);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a orderStatus"
          className={cn("md:w-48 lg:w-64 w-32 h-10 justify-between", className)}
        >
          <ListOrderedIcon className="mr-2 h-4 w-4" />
          {currentOrderStatus ? currentOrderStatus : "Change Order Status"}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-48 lg:w-64 w-32 p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search orderStatus..." />
            <CommandEmpty>No orderStatus found.</CommandEmpty>
            <CommandGroup heading="OrderStatuss">
              {orderStatus.map((orderStatus) => (
                <CommandItem
                  key={orderStatus}
                  onSelect={() => onOrderStatusSelect(orderStatus)}
                  className="text-sm"
                >
                  <ListOrderedIcon className="mr-2 h-4 w-4" />
                  {orderStatus}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentOrderStatus === orderStatus
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default OrderStatusFilter;
