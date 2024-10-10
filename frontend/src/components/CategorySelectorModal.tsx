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
  useFormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
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
import { updateCategory } from "@/services/api/categoryServices";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { get } from "http";

const formSchema = z.object({
  categoryId: z.number().min(1),
});

type CategorySelectorModalProps = {
  selectedTransaction: CsvFile;
  transactionType: string;
  onSetSelectedTransaction: (transaction: CsvFile) => void;
  onSetSelectedTransactionToNull: () => void;
};

export default function CategorySelectorModal({
  selectedTransaction,
  transactionType,
  onSetSelectedTransaction,
  onSetSelectedTransactionToNull,
}: CategorySelectorModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { getCategories } = useGetAllCategories();

  useEffect(() => {
    getCategories();
  }, []);

  const categories = useCategoryStore((state) => state.categories);
  console.log(categories);
  const multiMatchesCategories = useCategoryStore(
    (state) => state.multiMatchesCategories
  );
  console.log("Currently selected transaction", selectedTransaction);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const categoryToChange = categories.find((x) => x.id == values.categoryId);

    if (categoryToChange) {
      categoryToChange.description!.push(selectedTransaction.description!);
      setIsLoading(true);

      try {
        setIsLoading(false);
        await updateCategory(categoryToChange);
      } catch (error) {
        console.error("Error updating category", error);
      } finally {
        onSetSelectedTransaction(selectedTransaction);
        setIsLoading(false);
      }
    }

    setIsOpen(false);
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
                  <strong>Account:</strong> {selectedTransaction.accountName}{" "}
                </p>
                <p className="text-sm">
                  {" "}
                  <strong>Date:</strong>{" "}
                  {new Date(
                    selectedTransaction.transactionDate!
                  ).toLocaleDateString()}{" "}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Description: </strong>{" "}
                  {selectedTransaction.description}
                </p>{" "}
                <p className="text-sm">
                  <strong>Amount:</strong> {selectedTransaction.amount} kr{" "}
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
                          <SelectValue>
                            {categories.find((c) => c.id === field.value)
                              ?.name || "Pick a category"}
                          </SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                          {transactionType === "No Category"
                            ? categories &&
                              categories.map((category) => (
                                <SelectItem
                                  {...field}
                                  key={category.id}
                                  value={category.id!.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            : multiMatchesCategories &&
                              multiMatchesCategories.map((category) => (
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
