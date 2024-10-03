import { Category, CsvFile } from "@/models/generatedTypes";
import { useState } from "react";
import CategorySelectorModal from "../CategorySelectorModal";

type UnhandledTransactionsProps = {
  allCategories: Category[] | null;
  categoriesWithMultipleMatches: Category[] | null;
  transactionsWithoutCategories: CsvFile[] | null;
  transactionsWithMultipleCategories: CsvFile[] | null;
  onSetTransactionWithMultipleCategories: (transaction: CsvFile) => void;
  onSetTransactionWithoutCategories: (transaction: CsvFile) => void;
};

export default function UnhandledTransactions({
  allCategories,
  categoriesWithMultipleMatches,
  transactionsWithMultipleCategories,
  transactionsWithoutCategories,
  onSetTransactionWithMultipleCategories,
  onSetTransactionWithoutCategories,
}: UnhandledTransactionsProps) {
  const [selectedTransaction, setSelectedTransaction] =
    useState<CsvFile | null>();
  const [transactionType, setTransactionType] = useState<string>("");

  const onSetSelectedTransactionToNull = () => {
    setSelectedTransaction(null);
  };

  const onSetSelectedTransaction = (transaction: CsvFile) => {
    setSelectedTransaction(null);
    if (transactionType === "No Category") {
      onSetTransactionWithoutCategories(transaction);
    } else {
      onSetTransactionWithMultipleCategories(transaction);
    }
  };
  return (
    <>
      {transactionsWithMultipleCategories && (
        <div>
          <h1 className="text-xl font-bold">
            Transactions with multiple categories
          </h1>
          <ul>
            {transactionsWithMultipleCategories.map((transaction, index) => (
              <li
                key={index}
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
        </div>
      )}
      {transactionsWithoutCategories && (
        <div>
          <h1 className="text-xl font-bold">Transactions without Categories</h1>
          <ul>
            {transactionsWithoutCategories.map((transaction, index) => (
              <li
                key={index}
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
        </div>
      )}

      {selectedTransaction && (
        <CategorySelectorModal
          transaction={selectedTransaction}
          transactionType={transactionType}
          allCategories={allCategories}
          categoriesWithMultipleMatches={categoriesWithMultipleMatches}
          onSetSelectedTransaction={onSetSelectedTransaction}
          onSetSelectedTransactionToNull={onSetSelectedTransactionToNull}
        />
      )}
    </>
  );
}
