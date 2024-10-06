"use client";
import { Category, CsvFile } from "@/models/generatedTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadTransactions } from "@/services/api/transactionService";
import { updateCategory } from "@/services/api/categoryServices";

const formSchema = z.object({
  categoryId: z.number().min(1),
});

type CategorySelectorModalProps = {
  transaction: CsvFile;
  transactionType: string;
  allCategories: Category[] | null;
  categoriesWithMultipleMatches: Category[] | null;
  onSetSelectedTransaction: (transaction: CsvFile) => void;
  onSetSelectedTransactionToNull: () => void;
};

export default function CategorySelectorModal({
  transaction,
  transactionType,
  allCategories,
  categoriesWithMultipleMatches,
  onSetSelectedTransaction,
  onSetSelectedTransactionToNull,
}: CategorySelectorModalProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const categoryToChange = allCategories?.find(
      (x) => x.id == values.categoryId
    );

    if (categoryToChange) {
      categoryToChange.description!.push(transaction.description!);
      setIsLoading(true);
      await updateCategory(categoryToChange).then(() => {
        setIsLoading(false);
      });
    }
    setIsOpen(false);
    onSetSelectedTransaction(transaction);
  }
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClose = () => {
    setIsOpen(false);
    onSetSelectedTransactionToNull();
  };

  return (
    <>
      <Dialog onOpenChange={handleModalClose} open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Transaction
            </DialogTitle>
            <DialogDescription>Pick a category</DialogDescription>
            <>
              <div>
                <p className="text-sm">
                  <strong>Account:</strong> {transaction.accountName}{" "}
                </p>
                <p className="text-sm">
                  {" "}
                  <strong>Date:</strong>{" "}
                  {new Date(transaction.transactionDate!).toLocaleDateString()}{" "}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Description: </strong> {transaction.description}
                </p>{" "}
                <p className="text-sm">
                  <strong>Amount:</strong> {transaction.amount} kr{" "}
                </p>
              </div>
            </>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>

                        <SelectContent>
                          {transactionType === "No Category"
                            ? allCategories &&
                              allCategories.map((category) => (
                                <SelectItem
                                  {...field}
                                  key={category.id}
                                  value={category.id!.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            : categoriesWithMultipleMatches &&
                              categoriesWithMultipleMatches.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.name!}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-1/2 items-center"
              >
                Add
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
