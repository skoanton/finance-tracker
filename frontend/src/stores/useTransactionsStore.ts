import { TransactionTableData } from "@/components/transactions/DataTable/Columns";
import { CsvFile, Transaction } from "@/models/generatedTypes";
import { create } from "zustand";

interface TransactionState {
  transactions: TransactionTableData[];
  setTransactions: (transactions: TransactionTableData[]) => void;
  addTransaction: (transaction: TransactionTableData) => void;
  updateTransaction: (updatedTransaction: TransactionTableData) => void;
  removeTransaction: (id: number) => void;
  removeTransactions: (id: number[]) => void;

  noCategoryTransactions: CsvFile[];
  setNoCategoryTransactions: (transactions: CsvFile[]) => void;
  addNoCategoryTransactions: (transaction: CsvFile) => void;
  updateNoCategoryTransactions: (updatedTransaction: CsvFile) => void;
  removeNoCategoryTransactions: (id: number) => void;
  resetNoCategoryTransactions: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  setTransactions: (transactions: TransactionTableData[]) =>
    set({ transactions }),
  addTransaction: (transaction: TransactionTableData) =>
    set((state) => ({ transactions: [...state.transactions, transaction] })),
  updateTransaction: (updatedTransaction: TransactionTableData) =>
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
  removeTransactions: (ids: number[]) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => !ids.includes(transaction.id)
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
