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
  const multiCategoriesTransactions = useTransactionStore(
    (state) => state.multiCategoryTransactions
  );
  const removeNoCategoryTransactions = useTransactionStore(
    (state) => state.removeNoCategoryTransactions
  );
  const removeMultiCategoryTransactions = useTransactionStore(
    (state) => state.removeMultiCategoryTransactions
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<CsvFile | null>();

  const [transactionType, setTransactionType] = useState<string>("");

  const onSetSelectedTransactionToNull = () => {
    setSelectedTransaction(null);
  };

  const onSetSelectedTransaction = (transaction: CsvFile) => {
    setSelectedTransaction(null);
    if (transactionType === "No Category") {
      removeNoCategoryTransactions(transaction.id);
    } else {
      removeMultiCategoryTransactions(transaction.id);
    }
  };
  return (
    <>
      {multiCategoriesTransactions.length > 0 && (
        <div>
          <h1 className="text-xl font-bold">
            Transactions with multiple categories
          </h1>
          <ScrollArea className="h-[300px] w-[300px] rounded-md border p-4">
            <ul>
              {multiCategoriesTransactions.map((transaction) => (
                <li
                  key={transaction.id}
                  onClick={() => {
                    setSelectedTransaction(transaction);
                    setTransactionType("Multiple Categories Found");
                  }}
                  className="hover:underline cursor-pointer"
                >
                  {transaction.description}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
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
                    setTransactionType("No Category");
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
          transactionType={transactionType}
          onSetSelectedTransaction={onSetSelectedTransaction}
          onSetSelectedTransactionToNull={onSetSelectedTransactionToNull}
        />
      )}
    </>
  );
}
