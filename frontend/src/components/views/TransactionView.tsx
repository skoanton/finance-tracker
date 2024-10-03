import { DataTable } from "../transcations/DataTable/DataTable";

import { useEffect, useState } from "react";
import { getTransactions } from "@/services/api/transactionService";
import {
  columns,
  TransactionTableData,
} from "../transcations/DataTable/Columns";
import { Outlet } from "react-router-dom";
type TransactionViewProps = {};

export default function TransactionView({}: TransactionViewProps) {
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

  return (
    <>
      <DataTable
        columns={columns}
        data={transactions}
        handleDeleteTransactions={handleDeleteTransactions}
      />
      <Outlet />
    </>
  );
}
