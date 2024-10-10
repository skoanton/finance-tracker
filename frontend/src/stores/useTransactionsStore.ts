import { CsvFile, Transaction } from "@/models/generatedTypes";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (updatedTransaction: Transaction) => void;
  removeTransaction: (id: number) => void;

  multiCategoryTransactions: CsvFile[];
  setMultiCategoryTransactions: (transactions: CsvFile[]) => void;
  addMultiCategoryTransactions: (transaction: CsvFile) => void;
  updateMultiCategoryTransactions: (updatedTransaction: CsvFile) => void;
  removeMultiCategoryTransactions: (id: number) => void;
  resetMultiCategoryTransactions: () => void;

  noCategoryTransactions: CsvFile[];
  setNoCategoryTransactions: (transactions: CsvFile[]) => void;
  addNoCategoryTransactions: (transaction: CsvFile) => void;
  updateNoCategoryTransactions: (updatedTransaction: CsvFile) => void;
  removeNoCategoryTransactions: (id: number) => void;
  resetNoCategoryTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (updatedTransaction: Transaction) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      ),
    })),
  removeTransaction: (id: number) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),

  multiCategoryTransactions: [],
  setMultiCategoryTransactions: (transactions: CsvFile[]) =>
    set({ multiCategoryTransactions: transactions }),
  addMultiCategoryTransactions: (transaction: CsvFile) =>
    set((state) => ({
      multiCategoryTransactions: [
        ...state.multiCategoryTransactions,
        transaction,
      ],
    })),
  resetMultiCategoryTransactions: () => set({ multiCategoryTransactions: [] }),
  updateMultiCategoryTransactions: (updatedTransaction: CsvFile) =>
    set((state) => ({
      multiCategoryTransactions: state.multiCategoryTransactions.map(
        (transaction) =>
          transaction.id === updatedTransaction.id
            ? updatedTransaction
            : transaction
      ),
    })),
  removeMultiCategoryTransactions: (id: number) =>
    set((state) => ({
      multiCategoryTransactions: state.multiCategoryTransactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),

  noCategoryTransactions: [],
  setNoCategoryTransactions: (transactions: CsvFile[]) =>
    set({ noCategoryTransactions: transactions }),
  addNoCategoryTransactions: (transaction: CsvFile) =>
    set((state) => ({
      noCategoryTransactions: [...state.noCategoryTransactions, transaction],
    })),
  updateNoCategoryTransactions: (updatedTransaction: CsvFile) =>
    set((state) => ({
      noCategoryTransactions: state.noCategoryTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      ),
    })),
  removeNoCategoryTransactions: (id: number) =>
    set((state) => ({
      noCategoryTransactions: state.noCategoryTransactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),
  resetNoCategoryTransactions: () => set({ noCategoryTransactions: [] }),
}));
