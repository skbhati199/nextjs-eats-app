"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type MenuColumn = {
  id: string
  name: string;
  price: number;
  restaurant: string;
}

export const columns: ColumnDef<MenuColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "restaurant",
    header: "Restaurant Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];