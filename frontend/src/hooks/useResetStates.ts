import { useAccountStore } from "@/stores/useAccountStore";
import { useTransactionStore } from "@/stores/useTransactionsStore";
import { useUploadStore } from "@/stores/useUploadStore";
import { useEffect } from "react";

export const useResetStates = () => {
  const resetNoCategoryTransactions = useTransactionStore((state) => state.resetNoCategoryTransactions);
  const resetNewAccount = useAccountStore((state) => state.resetNewAccountInfo);
  const resetTransactionsToUpload = useUploadStore((state) => state.resetTransactionsToUpload);
  const resetUploadedTransactions = useUploadStore((state) => state.resetUploadedTransactions);

  const resetStates = () => {
    console.log("Resetting states");
    resetNoCategoryTransactions();
    resetNewAccount();
    resetTransactionsToUpload();
    resetUploadedTransactions();
  };

  return { resetStates };
};
