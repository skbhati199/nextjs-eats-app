"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Commnet } from "./Commnet";

export type ReviewColumn = {
  id: string,
  rating:number,
  comment: string;
  userName: string;
  restaurant: string;
  restaurantId: string;
}

export const columns: ColumnDef<ReviewColumn>[] = [
  {
    accessorKey: "userName",
    header: "Name",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => <Commnet data={row.original} />
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