import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Transaction } from "@/models/generatedTypes";
import { getTransactionById } from "@/services/api/transactionService";
import { use, useEffect, useState } from "react";
import EditTransactionForm from "./EditTransactionForm";

type EditTransactionModalProps = {
  isModalOpen: boolean;
  transactionId: number;
  onModalClose: () => void;
};

export default function EditTransactionModal({
  isModalOpen,
  transactionId,
  onModalClose,
}: EditTransactionModalProps) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchTransaction = async () => {
      setIsLoading(true);
      const response = await getTransactionById(transactionId);
      if (response) {
        setTransaction(response);
      }
      setIsLoading(false);
    };
    fetchTransaction();

    return () => {
      setTransaction(null);
    };
  }, [transactionId]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={onModalClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>You are editing a transaction</DialogTitle>
            <DialogDescription>
              Enter the details of the transaction you want to edit
            </DialogDescription>
          </DialogHeader>
          {isLoading && <p>Loading...</p>}
          {transaction && (
            <EditTransactionForm
              transaction={transaction}
              onModalClose={onModalClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
