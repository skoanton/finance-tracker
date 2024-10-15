"use client";
import { useEffect, useState } from "react";
import { getTransactions } from "@/services/api/transactionService";
import { TransactionTableData, columns } from "@/components/transactions/DataTable/Columns";
import { DataTable } from "@/components/transactions/DataTable/DataTable";
import { useTransactionStore } from "@/stores/useTransactionsStore";
type TransactionsViewProps = {};

export default function TransactionsView({}: TransactionsViewProps) {
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const transactions = useTransactionStore((state) => state.transactions);
  useEffect(() => {
    const getData = async () => {
      const transactions = await getTransactions();

      if (transactions.length !== 0) {
        const formattedTransactions: TransactionTableData[] = transactions.map((t) => {
          return {
            id: t.id!,
            account: t.account!.name,
            description: t.description!,
            category: t.category!.name!,
            amount: t.amount!,
            date: t.transactionDate!,
          };
        });
        setTransactions(formattedTransactions);
      }
    };
    getData();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={transactions} />
    </>
  );
}
