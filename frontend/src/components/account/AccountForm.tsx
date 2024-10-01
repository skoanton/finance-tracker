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
import { Account } from "@/models/generatedTypes";
import { createAccount } from "@/services/api/accountService";
import { useState } from "react";
import { on } from "events";

const formSchema = z.object({
  accountName: z.string().min(2).max(50),
  accountType: z.string().min(2).max(50),
  startAmount: z.coerce.number().min(0),
});
type AccountFormProps = {
  onSetAccounts: (accounts: Account) => void;
};
export default function AccountForm({ onSetAccounts }: AccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountType: "",
      startAmount: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const newAccount: Account = {
      name: values.accountName,
      type: values.accountType,
      balance: values.startAmount,
    };

    await createAccount(newAccount).then((response) => {
      onSetAccounts(response);
      setIsLoading(false);
    });
  }

  return (
    <div className="p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Create Account</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Account name" {...field} />
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
                <FormLabel>Start Amount</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
