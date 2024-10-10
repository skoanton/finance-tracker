"use client";
import { Category, Transaction } from "@/models/generatedTypes";
import { useEffect, useState } from "react";

import { updateTransaction } from "@/services/api/transactionService";

import { useGetAllCategories } from "@/hooks/useGetAllCategories";
import { useUploadStore } from "@/stores/useUploadStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryOptions from "@/components/transactions/CategoryOptions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useResetStates } from "@/hooks/useResetStates";

type UploadedTransactionsPreviewProps = {};

export default function UploadedTransactionsPreview({}: UploadedTransactionsPreviewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newTransactions, setNewTransactions] = useState<Transaction[] | null>(null);
  const router = useRouter();
  const { resetStates } = useResetStates();
  const { getCategories } = useGetAllCategories();
  const categories = useCategoryStore((state) => state.categories);
  const uploadedTransactions = useUploadStore((state) => state.uploadedTransactions);

  useEffect(() => {
    getCategories();
  }, []);

  const onSetTransactions = (transaction: Transaction, category: Category) => {
    const newTransaction = {
      ...transaction,
      categoryId: category.id!,
    };
    if (!newTransactions || newTransactions!.length === 0) {
      setNewTransactions([newTransaction]);
    } else {
      const transactionExists = newTransactions.some((t) => t.id === newTransaction.id);
      if (!transactionExists) {
        setNewTransactions([...newTransactions, newTransaction]);
      }
    }
  };

  const handleUpload = async () => {
    if (newTransactions) {
      for (const transaction of newTransactions) {
        try {
          setIsLoading(true);
          await updateTransaction(transaction);
        } catch (error) {
          console.error("Error updating transaction", error);
        } finally {
          setIsLoading(false);
          toast({
            description: "Transactions has been updated.",
          });
        }
      }
    }
    resetStates();
    router.push("/transactions");
  };

  return (
    <>
      <Button onClick={() => handleUpload()}>Confirm transactions</Button>
      <p className="italic my-2">Here you can double check your transactions if they have correct categories</p>
      <ScrollArea className="border-none my-5">
        <div className="flex flex-col gap-5">
          {uploadedTransactions.map((transaction) => (
            <div key={transaction.id}>
              <div className="flex justify-between items-center border p-8 rounded-md shadow-md">
                <div className="flex flex-col justify-center">
                  <p className="font-bold">{transaction.description}</p>
                  <p className="italic">{transaction.amount} SEK</p>
                </div>
                <div>
                  {isLoading && <p className="animate-pulse">Loading...</p>}
                  {categories && <CategoryOptions transaction={transaction} categories={categories} onSetTransactions={onSetTransactions} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button onClick={() => handleUpload()}>Confirm transactions</Button>
    </>
  );
}
