"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Account, CsvFile } from "@/models/generatedTypes";
import { createAccount } from "@/services/api/accountService";
import { useState } from "react";
import { useUploadToDatabase } from "@/hooks/useUploadToDatabase";
import { useAccountStore } from "@/stores/useAccountStore";

const formSchema = z.object({
  accountName: z.string().min(2).max(50),
  accountType: z.enum(["Checking Account", "Savings"]),
  startAmount: z.coerce.number().min(0),
});
type AccountFormProps = {
  onSetIsOpen: () => void;
};
export default function AccountForm({ onSetIsOpen }: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadTransactionToDatabase } = useUploadToDatabase();
  const newAccountInfo = useAccountStore((state) => state.newAccountInfo);
  console.log(newAccountInfo.name);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: newAccountInfo.name ? newAccountInfo.name : "NaN",
      accountType: "Checking Account",
      startAmount: newAccountInfo.balance ? newAccountInfo.balance : 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const newAccount: Account = {
      name: values.accountName,
      type: values.accountType,
      balance: values.startAmount,
    };

    try {
      setIsLoading(true);
      await createAccount(newAccount);
    } catch (error) {
      console.error("Error creating account", error);
    } finally {
      setIsLoading(false);
      onSetIsOpen();
      uploadTransactionToDatabase(true);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input disabled={true} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <FormControl>
                  <Input placeholder="Account Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starting balance</FormLabel>
                <FormControl>
                  <Input disabled={true} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-5" disabled={isLoading}>
            Add account
          </Button>
        </form>
      </Form>
    </div>
  );
}
