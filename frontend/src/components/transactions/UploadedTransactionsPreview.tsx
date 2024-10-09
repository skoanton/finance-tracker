import { Category, Transaction } from "@/models/generatedTypes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/services/api/categoryServices";
import CategoryOptions from "./CategoryOptions";
import {
  updateTransaction,
  uploadTransactions,
} from "@/services/api/transactionService";
import { ScrollArea } from "../ui/scroll-area";

type UploadedTransactionsPreviewProps = {
  transactions: Transaction[] | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function UploadedTransactionsPreview({
  transactions,
  isOpen,
  onOpenChange,
}: UploadedTransactionsPreviewProps) {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newTransactions, setNewTransactions] = useState<Transaction[] | null>(
    null
  );

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const response = await getCategories();

      if (response) {
        setCategories(response);
      }
      setIsLoading(false);
    };
    fetchCategories();
  }, []);

  const onSetTransactions = (transaction: Transaction, category: Category) => {
    const newTransaction = {
      ...transaction,
      category: category,
    };
    if (!newTransactions || newTransactions!.length === 0) {
      setNewTransactions([newTransaction]);
    } else {
      const transactionExists = newTransactions.some(
        (t) => t.id === newTransaction.id
      );
      if (!transactionExists) {
        setNewTransactions([...newTransactions, newTransaction]);
      }
    }
  };

  const handleUpload = async () => {
    if (newTransactions) {
      setIsLoading(true);
      for (const transaction of newTransactions) {
        try {
          await updateTransaction(transaction);
        } catch (error) {
          console.error("Error updating transaction", error);
        }
      }
      setIsLoading(false);
      onOpenChange(false);
      console.log("Transactions updated", newTransactions);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Transactions</DialogTitle>
            <DialogDescription>
              Confirm transactions to be uploaded
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] border-none p-4">
            <div className="flex flex-col gap-5">
              {transactions?.map((transaction) => (
                <div key={transaction.id}>
                  <div className="flex justify-between items-center border p-5 rounded-md shadow-md">
                    <div className="flex flex-col justify-center">
                      <p className="font-bold">{transaction.description}</p>
                      <p className="italic">{transaction.amount} SEK</p>
                    </div>
                    <div>
                      {isLoading && <p className="animate-pulse">Loading...</p>}
                      {categories && (
                        <CategoryOptions
                          transaction={transaction}
                          categories={categories}
                          onSetTransactions={onSetTransactions}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Button onClick={() => handleUpload()}>Confirm transactions</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
