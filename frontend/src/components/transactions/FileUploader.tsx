"use client";
import { useState } from "react";
import Papa from "papaparse";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category, CsvFile } from "@/models/generatedTypes";
import UnhandledTransactions from "./UnhandledTransactions";
import { uploadTransactions } from "@/services/api/transactionService";
import AccountModal from "../AccountModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

type FileUploaderProps = {};

export default function FileUploader({}: FileUploaderProps) {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<CsvFile[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isFirstUpload, setIsFirstUpload] = useState(false);
  const [categoriesWithMultipleMatches, setCategoriesWithMultipleMatches] =
    useState<Category[] | null>(null);
  const [allCategories, setAllCategories] = useState<Category[] | null>(null);
  const [transactionsWithoutCategories, setTransactionsWithoutCategories] =
    useState<CsvFile[] | null>(null);
  const [
    transactionsWithMultipleCategories,
    setTransactionsWithMultipleCategories,
  ] = useState<CsvFile[] | null>(null);
  const [startBalance, setStartBalance] = useState<number | null>(null);
  const [newAccountName, setNewAccountName] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const uploadTransactionToDatabase = async (
    transactionsToUpload: CsvFile[],
    isFirstUpload = false
  ) => {
    if (transactionsToUpload) {
      setIsLoading(true);
      await uploadTransactions(transactionsToUpload, isFirstUpload).then(
        (response) => {
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
          setNewAccountName(response.newAccountName);
          setStartBalance(response.startingBalance);
          setIsLoading(false);
        }
      );
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
                  startBalance: parseFloat((data[i] as any[])[11].toString()),
                };
                transactions.push(transaction);
              }
            }
            resolve(transactions);
          },
        });
      });
      setIsFileUploaded(true);
      setFile(null);
      setTransactions(transactionsToUpload);
      await uploadTransactionToDatabase(transactionsToUpload);
    }
  };

  const handleTransactionUpload = async (message: string) => {
    setIsFirstUpload(true);
    await uploadTransactionToDatabase(transactions, true);
    toast({
      description: message,
    });
  };

  const handleCompletion = async () => {
    setIsLoading(true);
    await uploadTransactionToDatabase(transactions, isFirstUpload);
    setIsLoading(false);
    setIsOpen(false);
    router.back();
    toast({
      description: "Transactions has been added.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Transactions</DialogTitle>
          <DialogDescription>
            Upload a CSV file with transactions
          </DialogDescription>
        </DialogHeader>
        {!isFileUploaded && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 items-center">
              <Input type="file" onChange={handleFileChange} className="w-52" />
              <Button
                disabled={isLoading || file === null}
                onClick={handleFileUpload}
              >
                Submit File
              </Button>
            </div>
          </div>
        )}
        <div>
          {isLoading && <p className="animate-pulse">Uploading...</p>}
          {newAccountName && (
            <AccountModal
              newAccountName={newAccountName}
              startBalance={startBalance}
              handleTransactionUpload={handleTransactionUpload}
            />
          )}
          {(transactionsWithMultipleCategories &&
            transactionsWithMultipleCategories?.length > 0) ||
            (transactionsWithoutCategories &&
              transactionsWithoutCategories?.length > 0 && (
                <UnhandledTransactions
                  allCategories={allCategories}
                  categoriesWithMultipleMatches={categoriesWithMultipleMatches}
                  transactionsWithoutCategories={transactionsWithoutCategories}
                  transactionsWithMultipleCategories={
                    transactionsWithMultipleCategories
                  }
                  onSetTransactionWithMultipleCategories={
                    onSetTransactionWithMultipleCategories
                  }
                  onSetTransactionWithoutCategories={
                    onSetTransactionWithoutCategories
                  }
                />
              ))}
        </div>

        {transactionsWithMultipleCategories?.length === 0 &&
          transactionsWithoutCategories?.length === 0 &&
          newAccountName === null && (
            <>
              <p>Everything taken care of, please complete</p>
              <Button onClick={() => handleCompletion()}>
                Complete upload
              </Button>
            </>
          )}
      </DialogContent>
    </Dialog>
  );
}
