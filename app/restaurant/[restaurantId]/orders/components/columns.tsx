"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import Status from "./status"
import { OrderStatus } from "@prisma/client"

export type OrderColumn = {
  id: string
  paymentId: string
  menu: string
  status: OrderStatus
  userName: string;
  price: string;
  restaurant: string;
  createAt: string;
  updateAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "OrderId",
  },
  {
    accessorKey: "paymentId",
    header: "Payment Id",
  },
  {
    accessorKey: "menu",
    header: "Menu Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Status status={row.original.status} />
  },
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "restaurant",
    header: "Restaurant Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createAt",
    header: "Create At",
  },
  {
    accessorKey: "updateAt",
    header: "Update Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];