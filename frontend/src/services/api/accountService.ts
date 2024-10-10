import { Account, AccountsBalanceSummary } from "@/models/generatedTypes";
import axios from "axios";
export const getAllAccounts = async (): Promise<Account[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/accounts");

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }
    const accounts: Account[] = await response.json();
    return accounts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createAccount = async (account: Account): Promise<Account> => {
  try {
    const response = await fetch("http://localhost:5000/api/accounts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    if (!response.ok) {
      throw new Error("Failed to create account");
    }
    const createdAccount: Account = await response.json();
    return createdAccount;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountByName = async (name: string): Promise<Account | null> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/accounts/name/${name}`);

    // Return account if the status is 200
    const account: Account = response.data;
    return account;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // Handle 404 by returning null instead of throwing an error
      return null;
    } else {
      // For other errors, rethrow them to handle them elsewhere
      console.error(error);
      throw error;
    }
  }
};

export const deleteAccount = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/accounts/${id}`);

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountBalanceSummaryByWeek = async (): Promise<AccountsBalanceSummary[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/accounts/balance/week");

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
    const accounts: AccountsBalanceSummary[] = response.data;
    return accounts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountBalanceSummaryByMonth = async (): Promise<AccountsBalanceSummary[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/accounts/balance/month");

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
    const accounts: AccountsBalanceSummary[] = response.data;
    return accounts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountBalanceSummaryByYear = async (): Promise<AccountsBalanceSummary[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/accounts/balance/year");

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
    const accounts: AccountsBalanceSummary[] = response.data;
    return accounts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAccountBalance = async (id: number): Promise<number> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/accounts/balance/${id}`);

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }

    const balance: number = response.data;
    return balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTotalAccountBalance = async (): Promise<number> => {
  try {
    const response = await axios.get(`http://localhost:5000/api/accounts/balance/total`);

    if (response.status !== 200) {
      throw new Error("Error deleting category");
    }
    const balance: number = response.data;
    return balance;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
