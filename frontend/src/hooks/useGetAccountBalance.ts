import {
  getAccountBalance,
  getTotalAccountBalance,
} from "@/services/api/accountService";
import { useState } from "react";

export const useGetAccountBalance = () => {
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalAccountBalance, setTotalAccountBalance] = useState<number>(0);
  const fetchAccountBalance = async (accountId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getAccountBalance(accountId);
      if (response) {
        setAccountBalance(response);
      } else {
        setAccountBalance(0);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch account balance");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTotalAccountBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTotalAccountBalance();
      if (response) {
        setTotalAccountBalance(response);
      } else {
        setTotalAccountBalance(0);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to fetch account balance");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchTotalAccountBalance,
    totalAccountBalance,
    fetchAccountBalance, // Renamed for clarity
    accountBalance,
    isLoading,
    error,
  };
};
