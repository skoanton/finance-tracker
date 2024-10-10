import { CsvFile, Transaction } from "@/models/generatedTypes";
import Papa from "papaparse";
import { toast } from "./use-toast";
import { useEffect, useState } from "react";
import { uploadTransactions } from "@/services/api/transactionService";
import { useUploadToDatabase } from "./useUploadToDatabase";
import { useTransactionStore } from "@/stores/useTransactionsStore";
import { useUploadStore } from "@/stores/useUploadStore";

export const useFileUpload = () => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const setTransactionsToUpload = useUploadStore(
    (state) => state.setTransactionsToUpload
  );
  const [isLoading, setIsLoading] = useState(false);
  const parseCsvFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      if (file.type === "text/csv") {
        setIsLoading(true);
        const transactionsToUploadFromFile = await new Promise<CsvFile[]>(
          (resolve) => {
            let transactions: CsvFile[] = [];
            Papa.parse(file, {
              encoding: "iso-8859-1",
              complete: function (results) {
                const data = results.data;
                if (Array.isArray(data)) {
                  for (let i = 2; i < data.length - 1; i++) {
                    const transaction: CsvFile = {
                      id: i,
                      accountName: (data[i] as any[])[3].toString(),
                      transactionDate: new Date((data[i] as any[])[6]),
                      description: (data[i] as unknown as any[])[9].toString(),
                      amount: parseFloat((data[i] as any[])[10].toString()),
                      startBalance: parseFloat(
                        (data[i] as any[])[11].toString()
                      ),
                    };
                    transactions.push(transaction);
                  }
                }
                resolve(transactions);
              },
            });
          }
        );
        console.log("Parsed transactions:", transactionsToUploadFromFile);
        setTransactionsToUpload(transactionsToUploadFromFile);
        setIsFileUploaded(true);
        setIsLoading(false);
      } else {
        toast({
          description: "Please upload a CSV file",
          variant: "destructive",
        });
      }
    }
  };

  return {
    isFileUploaded,
    parseCsvFile,
    isLoading,
  };
};
