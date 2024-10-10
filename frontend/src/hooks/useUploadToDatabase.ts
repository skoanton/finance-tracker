import { Category, CsvFile, Transaction } from "@/models/generatedTypes";
import { uploadTransactions } from "@/services/api/transactionService";
import { useAccountStore } from "@/stores/useAccountStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useTransactionStore } from "@/stores/useTransactionsStore";
import { useUploadStore } from "@/stores/useUploadStore";
import { use, useState } from "react";

export const useUploadToDatabase = () => {
  const [isFirstUpload, setIsFirstUpload] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transactionsToUpload = useUploadStore((state) => state.transactionsToUpload);
  const setNoCategoryTransactions = useTransactionStore((state) => state.setNoCategoryTransactions);
  const setUploadedTransactions = useUploadStore((state) => state.setUploadedTransactions);
  const removeTransactionToUpload = useUploadStore((state) => state.removeTransactionToUpload);
  const uploadTransactionToDatabase = async () => {
    if (transactionsToUpload.length === 0) {
      console.log("No transactions to upload");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await uploadTransactions(transactionsToUpload);
      setNoCategoryTransactions(response.noCategoryTransactions);
      setUploadedTransactions(response.uploadedTransactions);
      for (const transaction of response.uploadedTransactions) {
        removeTransactionToUpload(transaction.id!);
      }
    } catch (error) {
      setError("Failed to upload transactions. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadTransactionToDatabase,
    isFirstUpload,
    setIsFirstUpload,
    isLoading,
    error,
  };
};
