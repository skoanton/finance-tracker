import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { Category, Transaction } from "@/models/generatedTypes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { updateTransaction } from "@/services/api/transactionService";
import { set } from "date-fns";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { TransactionTableData } from "./DataTable/Columns";
import { useTransactionStore } from "@/stores/useTransactionsStore";
const formSchema = z.object({
  transactionDate: z.date(),
  amount: z.number(),
  categoryId: z.coerce.number(),
});

type EditTransactionFormProps = {
  transaction: Transaction;
  onModalClose: () => void;
};

export default function EditTransactionForm({
  transaction,
  onModalClose,
}: EditTransactionFormProps) {
  const categories = useCategoryStore((state) => state.categories);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionDate: new Date(transaction.transactionDate),
      amount: transaction.amount,
      categoryId: transaction.categoryId,
    },
  });
  const updateTransactionState = useTransactionStore(
    (state) => state.updateTransaction
  );
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const newTransaction: Transaction = {
      ...transaction,
      transactionDate: values.transactionDate,
      amount: values.amount,
      categoryId: values.categoryId,
    };

    const updatedTransaction = await updateTransaction(newTransaction);
    const updatedTransactionTable: TransactionTableData = {
      id: updatedTransaction.id!,
      account: updatedTransaction.account!.name,
      description: updatedTransaction.description!,
      category: updatedTransaction.category!.name!,
      amount: updatedTransaction.amount!,
      date: updatedTransaction.transactionDate!,
    };
    console.log(values);
    setIsLoading(false);
    updateTransactionState(updatedTransactionTable);
    onModalClose();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    } // Format to YYYY-MM-DD
                    onChange={(e) => field.onChange(e.target.value)} // Handle input change
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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

                    <SelectContent defaultValue={transaction.category.name}>
                      {categories &&
                        categories.map((category) => (
                          <SelectItem
                            {...field}
                            key={category.id}
                            value={category.id!.toString()}
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
          <Button type="submit" disabled={isLoading}>
            Change
          </Button>
        </form>
      </Form>
    </>
  );
}
