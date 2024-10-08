"use client";
import { useEffect, useState } from "react";
import { getTransactions } from "@/services/api/transactionService";
import {
  TransactionTableData,
  columns,
} from "@/components/transactions/DataTable/Columns";
import { DataTable } from "@/components/transactions/DataTable/DataTable";
type TransactionsViewProps = {};

export default function TransactionsView({}: TransactionsViewProps) {
  const [transactions, setTransactions] = useState<TransactionTableData[]>([]);
  useEffect(() => {
    const getData = async () => {
      const transactions = await getTransactions();

      if (transactions.length !== 0) {
        const formattedTransactions: TransactionTableData[] = transactions.map(
          (t) => {
            return {
              id: t.id!,
              account: t.account!.name,
              description: t.description!,
              category: t.category!.name!,
              amount: t.amount!,
              date: t.transactionDate!,
            };
          }
        );
        setTransactions(formattedTransactions);
      }
    };
    getData();
  }, []);

  const handleDeleteTransactions = (transactionIdsToDelete: number[]) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((t) => !transactionIdsToDelete.includes(t.id))
    );
  };

  const handleSetTransactions = (transaction: TransactionTableData) => {
    setTransactions((prevTransactions) => {
      // Check if the transaction already exists in the array
      const transactionExists = prevTransactions.some(
        (t) => t.id === transaction.id
      );

      if (transactionExists) {
        // If it exists, update the transaction
        return prevTransactions.map((t) =>
          t.id === transaction.id ? transaction : t
        );
      } else {
        // If it doesn't exist, add it to the array
        return [...prevTransactions, transaction];
      }
    });
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={transactions}
        handleDeleteTransactions={handleDeleteTransactions}
      />
    </>
  );
}
