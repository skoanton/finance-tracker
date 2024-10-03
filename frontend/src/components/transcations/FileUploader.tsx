import { useState } from "react";
import Papa from "papaparse";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category, CsvFile } from "@/models/generatedTypes";
import UnhandledTransactions from "./UnhandledTransactions";
import CategorySelectorModal from "../CategorySelectorModal";
import { uploadTransactions } from "@/services/api/transactionService";
import AccountModal from "../AccountModal";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<CsvFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [categoriesWithMultipleMatches, setCategoriesWithMultipleMatches] =
    useState<Category[] | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  const [transactionsWithoutCategories, setTransactionsWithoutCategories] =
    useState<CsvFile[] | null>(null);
  const [
    transactionsWithMultipleCategories,
    setTransactionsWithMultipleCategories,
  ] = useState<CsvFile[] | null>(null);
  const [newAccount, setNewAccount] = useState<CsvFile | null>(null);
  const uploadTransactionToDatabase = async (
    transactionsToUpload: CsvFile[]
  ) => {
    if (transactionsToUpload) {
      setIsLoading(true);
      await uploadTransactions(transactionsToUpload).then((response) => {
        setTransactionsWithMultipleCategories(
          response.transactionsWithMultipleCategories
        );
        setTransactionsWithoutCategories(
          response.transactionsWithoutCategories
        );
        setCategoriesWithMultipleMatches(
          response.categoriesWithMultipleMatches
        );
        setAllCategories(response.allCategories);
        setNewAccount(response.newAccount);
        setIsLoading(false);
      });
    } else {
      console.log("No transactions to upload");
    }
  };

  const onSetTransactionWithMultipleCategories = (transaction: CsvFile) => {
    setTransactionsWithMultipleCategories((prev) => {
      const updatedTransactions = (prev ?? []).filter(
        (t) => t.description !== transaction.description
      );
      return updatedTransactions;
    });
  };

  const onSetTransactionWithoutCategories = (transaction: CsvFile) => {
    setTransactionsWithoutCategories((prev) => {
      const updatedTransactions = (prev ?? []).filter(
        (t) => t.description !== transaction.description
      );
      return updatedTransactions;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("File set:", e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    console.log("Uploading file", file);
    if (file) {
      const transactionsToUpload = await new Promise<CsvFile[]>((resolve) => {
        let transactions: CsvFile[] = [];
        Papa.parse(file, {
          encoding: "iso-8859-1",
          complete: function (results) {
            const data = results.data;
            if (Array.isArray(data)) {
              for (let i = 2; i < data.length - 1; i++) {
                const transaction: CsvFile = {
                  accountName: (data[i] as any[])[3].toString(),
                  transactionDate: new Date((data[i] as any[])[6]),
                  description: (data[i] as unknown as any[])[9].toString(),
                  amount: parseFloat((data[i] as any[])[10].toString()),
                };
                transactions.push(transaction);
              }
            }
            resolve(transactions);
          },
        });
      });

      await uploadTransactionToDatabase(transactionsToUpload);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input type="file" onChange={handleFileChange} className="w-52" />
      <Button onClick={handleFileUpload}>Upload file</Button>
      {isLoading && <p className="animate-pulse">Uploading...</p>}
      {newAccount && <AccountModal newAccount={newAccount} />}
      <UnhandledTransactions
        allCategories={allCategories}
        categoriesWithMultipleMatches={categoriesWithMultipleMatches}
        transactionsWithoutCategories={transactionsWithoutCategories}
        transactionsWithMultipleCategories={transactionsWithMultipleCategories}
        onSetTransactionWithMultipleCategories={
          onSetTransactionWithMultipleCategories
        }
        onSetTransactionWithoutCategories={onSetTransactionWithoutCategories}
      />
    </div>
  );
}
