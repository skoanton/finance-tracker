import { Account } from "@/models/generatedTypes";
import { create } from "zustand";

interface AccountState {
  accounts: Account[];
  setAccounts: (accounts: Account[]) => void;
  addAccount: (account: Account) => void;
  updateAccount: (updatedAccount: Account) => void;
  removeAccount: (id: number) => void;

  newAccountInfo: { name: string | null; balance: number | null };
  setNewAccountInfo: (newAccountInfo: { name: string | null; balance: number | null }) => void;
  resetNewAccountInfo: () => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accounts: [],
  setAccounts: (accounts: Account[]) => set({ accounts }),
  addAccount: (account: Account) => set((state) => ({ accounts: [...state.accounts, account] })),
  updateAccount: (updatedAccount: Account) =>
    set((state) => ({
      accounts: state.accounts.map((account) => (account.id === updatedAccount.id ? updatedAccount : account)),
    })),
  removeAccount: (id: number) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
    })),

  newAccountInfo: { name: null, balance: null },
  setNewAccountInfo: (newAccountInfo: { name: string | null; balance: number | null }) => set({ newAccountInfo }),
  resetNewAccountInfo: () => set({ newAccountInfo: { name: null, balance: null } }),
}));
