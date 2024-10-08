import {
  Category,
  CategorySummary,
  CategoryType,
  CsvFile,
  Transaction,
} from "@/models/generatedTypes";
import axios from "axios";

export const uploadTransactions = async (
  transactions: CsvFile[],
  isFirst: boolean = false
) => {
  try {
    console.log("Transactions in upload:", transactions);
    const response = await axios.post(
      "http://localhost:5000/api/transaction/create",
      transactions, // Pass only transactions in the body
      {
        params: {
          isFirst, // Send isFirst as a query parameter
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error uploading data to database");
    }

    const noCategoryTransactions: CsvFile[] = response.data
      .filter((d: any) => d.status === "No Category Found")
      .map((d: any) => d.transaction);
    const newAccountName: string | null =
      response.data.filter((d: any) => d.status === "No account found")[0]
        ?.accountName || null;
    const startingBalance: number | null =
      response.data.filter((d: any) => d.status === "No account found")[0]
        ?.startBalance || null;
    const uploadedTransactions: Transaction[] = response.data
      .filter((d: any) => d.status === "Transaction Uploaded")
      .map((d: any) => d.transaction);
    console.log("Data returned:", {
      noCategoryTransactions,
      newAccountName,
      startingBalance,
      uploadedTransactions,
    });
    return {
      noCategoryTransactions,
      newAccountName,
      startingBalance,
      uploadedTransactions,
    };
  } catch (error) {
    throw new Error("Error uploading data to database");
  }
};

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get("http://localhost:5000/api/transaction");
    if (response.status !== 200) {
      throw new Error("Error fetching data from database");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from database");
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/transaction/${id}`
    );
    if (response.status !== 200) {
      throw new Error("Error deleting transaction");
    }
  } catch (error) {
    throw new Error("Error deleting transaction");
  }
};

export const getTransactionsThisMonth = async (
  startDate: Date,
  endDate: Date,
  type: CategoryType
): Promise<CategorySummary[]> => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/transaction/summaryMonth",
      { params: { startDate, endDate, type } }
    );
    if (response.status !== 200) {
      throw new Error("Error fetching data from database");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from database");
  }
};

export const getTransactionById = async (id: number): Promise<Transaction> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/transaction/${id}`
    );
    if (response.status !== 200) {
      throw new Error("Error fetching data from database");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from database");
  }
};

export const updateTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/transaction/${transaction.id}`,
      transaction
    );
    if (response.status !== 200) {
      throw new Error("Error updating transaction");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error updating transaction");
  }
};

export const getLastTenTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/transaction/lastTen"
    );
    if (response.status !== 200) {
      throw new Error("Error fetching data from database");
    }
    const transactions: Transaction[] = response.data;
    return transactions;
  } catch (error) {
    throw new Error("Error fetching data from database");
  }
};
