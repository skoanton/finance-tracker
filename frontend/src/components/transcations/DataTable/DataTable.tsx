import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  RowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { after } from "node:test";
import { Transaction } from "@/models/generatedTypes";
import { deleteTransaction } from "@/services/api/transactionService";
import { TransactionTableData } from "./Columns";
import { CodeSquare } from "lucide-react";
import { on } from "events";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  handleDeleteTransactions: (ids: number[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  handleDeleteTransactions,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const handleDelete = async () => {
    setIsLoading(true);

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const transactions: TransactionTableData[] = selectedRows.map(
      (row) => row.original
    ) as TransactionTableData[];

    // Collect transaction IDs to be deleted
    const transactionIdsToDelete = transactions.map(
      (transaction) => transaction.id!
    );

    try {
      // Delete all transactions concurrently
      await Promise.all(
        transactionIdsToDelete.map((id) => deleteTransaction(id))
      );

      // Update the transactions state in one batch
      handleDeleteTransactions(transactionIdsToDelete);

      // Unselect all rows after deletions
      selectedRows.forEach((row) => {
        console.log("Unselecting:", row);
        row.toggleSelected(false);
      });
    } catch (error) {
      console.error("Failed to delete transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row items-start gap-5 mb-5">
        <Input
          placeholder="Search description.."
          value={
            (table.getColumn("description")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("description")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          onClick={handleDelete}
          disabled={
            !table.getFilteredSelectedRowModel().rows.length || isLoading
          }
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              className="animate-spin"
            >
              <path
                fill="currentColor"
                d="M136 32v32a8 8 0 0 1-16 0V32a8 8 0 0 1 16 0m37.25 58.75a8 8 0 0 0 5.66-2.35l22.63-22.62a8 8 0 0 0-11.32-11.32L167.6 77.09a8 8 0 0 0 5.65 13.66M224 120h-32a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16m-45.09 47.6a8 8 0 0 0-11.31 11.31l22.62 22.63a8 8 0 0 0 11.32-11.32ZM128 184a8 8 0 0 0-8 8v32a8 8 0 0 0 16 0v-32a8 8 0 0 0-8-8m-50.91-16.4l-22.63 22.62a8 8 0 0 0 11.32 11.32l22.62-22.63a8 8 0 0 0-11.31-11.31M72 128a8 8 0 0 0-8-8H32a8 8 0 0 0 0 16h32a8 8 0 0 0 8-8m-6.22-73.54a8 8 0 0 0-11.32 11.32L77.09 88.4A8 8 0 0 0 88.4 77.09Z"
              />
            </svg>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}
