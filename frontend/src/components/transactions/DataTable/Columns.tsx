"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import EditTransactionModal from "../EditTransactionModal";
import { after } from "node:test";
import { Transaction } from "@/models/generatedTypes";
import { useTransactionStore } from "@/stores/useTransactionsStore";
import { deleteTransaction } from "@/services/api/transactionService";

export type TransactionTableData = {
  id: number;
  account: string;
  description: string;
  category: string;
  amount: number;
  date: Date;
};

export const columns: ColumnDef<TransactionTableData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button className="text-left" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateValue = new Date(row.getValue("date"));
      const formattedDate = new Intl.DateTimeFormat("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(dateValue);

      return <div className="text-left">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("category")}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("se-SV", {
        style: "currency",
        currency: "SEK",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const removeTransaction = useTransactionStore((state) => state.removeTransaction);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);

      const onModalClose = () => {
        setSelectedTransactionId(null);
        setIsModalOpen(false);
      };

      const handleEdit = (transactionId: number) => {
        setSelectedTransactionId(transactionId);
        setIsModalOpen(true);
      };

      const handleDelete = async (transactionId: number) => {
        await deleteTransaction(transactionId);
        removeTransaction(transactionId);
      };

      const handleView = (transactionId: number) => {
        console.log("View transaction");
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(transaction.id)}>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleView(transaction.id)}>View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isModalOpen && selectedTransactionId && (
            <EditTransactionModal
              isModalOpen={isModalOpen}
              transactionId={selectedTransactionId} // Pass the selected transaction ID
              onModalClose={onModalClose}
            />
          )}
        </>
      );
    },
  },
];
