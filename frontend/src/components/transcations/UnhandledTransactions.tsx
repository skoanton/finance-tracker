import { Category, CsvFile } from "@/models/generatedTypes";
import { useState } from "react";
import CategorySelectorModal from "../CategorySelectorModal";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      {transactionsWithMultipleCategories &&
        transactionsWithMultipleCategories.length > 0 && (
          <div>
            <h1 className="text-xl font-bold">
              Transactions with multiple categories
            </h1>
            <ScrollArea className="h-[300px] w-[300px] rounded-md border p-4">
              <ul>
                {transactionsWithMultipleCategories.map(
                  (transaction, index) => (
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
                  )
                )}
              </ul>
            </ScrollArea>
          </div>
        )}
      {transactionsWithoutCategories && (
        <div>
          <h1 className="text-xl font-bold">Transactions without Categories</h1>
          <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4 overflow-hidden">
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
          </ScrollArea>
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
