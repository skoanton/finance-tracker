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

  const transactionsToUpload = useUploadStore(
    (state) => state.transactionsToUpload
  );
  const setMultiCategoryTransactions = useTransactionStore(
    (state) => state.setMultiCategoryTransactions
  );
  const setNoCategoryTransactions = useTransactionStore(
    (state) => state.setNoCategoryTransactions
  );
  const setUploadedTransactions = useUploadStore(
    (state) => state.setUploadedTransactions
  );
  const setMultiMatchesCategories = useCategoryStore(
    (state) => state.setMultiMatchesCategories
  );

  const setNewAccountInfo = useAccountStore((state) => state.setNewAccountInfo);

  const uploadTransactionToDatabase = async (isFirstUpload = false) => {
    console.log(transactionsToUpload);
    if (transactionsToUpload.length === 0) {
      console.log("No transactions to upload");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await uploadTransactions(
        transactionsToUpload,
        isFirstUpload
      );
      setMultiCategoryTransactions(response.multiCategoryTransactions);
      setNoCategoryTransactions(response.noCategoryTransactions);
      setMultiMatchesCategories(response.multiMatchesCategories);
      setNewAccountInfo({
        name: response.newAccountName,
        balance: response.startingBalance,
      });
      setUploadedTransactions(response.uploadedTransactions);
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
