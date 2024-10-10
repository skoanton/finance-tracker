import { CsvFile, Transaction } from "@/models/generatedTypes";
import { create } from "zustand";

interface UploadState {
  uploadedTransactions: Transaction[];
  setUploadedTransactions: (transactions: Transaction[]) => void;
  addUploadedTransaction: (transaction: Transaction) => void;
  updateUploadedTransaction: (updatedTransaction: Transaction) => void;
  resetUploadedTransactions: () => void;

  transactionsToUpload: CsvFile[];
  setTransactionsToUpload: (transactions: CsvFile[]) => void;
  addTransactionToUpload: (transaction: CsvFile) => void;
  removeTransactionToUpload: (id: number) => void;
  resetTransactionsToUpload: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  uploadedTransactions: [],
  setUploadedTransactions: (transactions: Transaction[]) => set({ uploadedTransactions: transactions }),
  addUploadedTransaction: (transaction: Transaction) =>
    set((state) => ({
      uploadedTransactions: [...state.uploadedTransactions, transaction],
    })),
  updateUploadedTransaction: (updatedTransaction: Transaction) =>
    set((state) => ({
      uploadedTransactions: state.uploadedTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      ),
    })),
  resetUploadedTransactions: () => set({ uploadedTransactions: [] }),

  transactionsToUpload: [],
  setTransactionsToUpload: (transactions: CsvFile[]) => set({ transactionsToUpload: transactions }),
  addTransactionToUpload: (transaction: CsvFile) =>
    set((state) => ({
      transactionsToUpload: [...state.transactionsToUpload, transaction],
    })),
  removeTransactionToUpload: (id: number) =>
    set((state) => ({
      transactionsToUpload: state.transactionsToUpload.filter((transaction) => transaction.id !== id),
    })),
  resetTransactionsToUpload: () => set({ transactionsToUpload: [] }),
}));
