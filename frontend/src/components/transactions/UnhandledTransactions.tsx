"use client";
import { CsvFile } from "@/models/generatedTypes";
import { useState } from "react";
import CategorySelectorModal from "../CategorySelectorModal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTransactionStore } from "@/stores/useTransactionsStore";

type UnhandledTransactionsProps = {};

export default function UnhandledTransactions({}: UnhandledTransactionsProps) {
  const noCategoryTransactions = useTransactionStore(
    (state) => state.noCategoryTransactions
  );

  const removeNoCategoryTransactions = useTransactionStore(
    (state) => state.removeNoCategoryTransactions
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<CsvFile | null>();

  const onSetSelectedTransactionToNull = () => {
    setSelectedTransaction(null);
  };

  const onSetSelectedTransaction = (transaction: CsvFile) => {
    setSelectedTransaction(null);
    removeNoCategoryTransactions(transaction.id);
  };
  return (
    <>
      {noCategoryTransactions.length > 0 && (
        <div>
          <h1 className="text-xl font-bold">Transactions without Categories</h1>
          <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4 overflow-hidden">
            <ul>
              {noCategoryTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  onClick={() => {
                    setSelectedTransaction(transaction);
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {" "}
                  {transaction.description}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}

      {selectedTransaction && (
        <CategorySelectorModal
          selectedTransaction={selectedTransaction}
          onSetSelectedTransaction={onSetSelectedTransaction}
          onSetSelectedTransactionToNull={onSetSelectedTransactionToNull}
        />
      )}
    </>
  );
}
